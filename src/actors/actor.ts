import { createBaseActor } from "./BaseActor";
import { HttpAgent, ActorSubclass } from "@dfinity/agent";
import { ActorIdentity } from "../types/global";
import { IDL } from "@dfinity/candid";
import { WalletType } from "constants/index";

export type ActorConstructor = {
  canisterId?: string;
  host?: string;
  idlFactory: IDL.InterfaceFactory;
  identity?: ActorIdentity;
  agent?: HttpAgent;
};

const icHost = "https://ic0.app";

export function isICConnector(connector: WalletType) {
  return connector === WalletType.STOIC;
}

export function isPlugConnector(connector: WalletType) {
  return connector === WalletType.PLUG;
}

export type ActorError = {
  canisterId: string;
  message: string;
  method: string;
};

export type ActorErrorCallback = (error: ActorError) => void;

export class Actor {
  private connector: WalletType = WalletType.STOIC;
  private agent: null | HttpAgent = null;
  private host: string = icHost;
  private errorCallbacks: ActorErrorCallback[] = [];

  public setConnector(connector: WalletType) {
    this.connector = connector;
  }

  public async create<T>({
    canisterId,
    host,
    idlFactory,
    identity,
    agent,
  }: ActorConstructor): Promise<ActorSubclass<T>> {
    if (!canisterId) throw Error(`No canister id`);

    const _host = host ?? this.host;

    if (!idlFactory) throw Error(`No idlFactory for ${canisterId}`);

    let _agent = this.AnonymousAgent(host);
    let isRejected = false;

    // catch plug type wallet reject error
    try {
      _agent = agent
        ? agent
        : !identity
        ? this.AnonymousAgent(host)
        : this.agent
        ? this.agent
        : await this.createAgent(canisterId, _host, identity);
    } catch (err) {
      isRejected = true;
      console.error(err);
    }

    const serviceClass = idlFactory({ IDL: IDL });

    const actor = await createBaseActor<T>({
      canisterId,
      idlFactory,
      agent: _agent,
      fetchRootKey: _host !== icHost,
    });

    const _actor: any = {};

    serviceClass._fields.forEach((ele) => {
      const key = ele[0];

      _actor[key] = async (...args: any) => {
        if (isRejected) return { err: "The agent creation was rejected" };

        try {
          if (!actor) return { err: "no actor" };
          // @ts-ignore
          const result = actor[key](...args) as Promise<any>;
          return await result;
        } catch (error) {
          const _error = String(error);

          let message = "";
          if (_error.includes("Reject text:")) {
            const _message = _error.split(`Reject text: `)[1]?.split(" at") ?? "";
            message = !!_message ? _message[0]?.trim() : _error;
          } else {
            const _message = _error.includes(`"Message"`) ? _error.split(`"Message": `)[1]?.split('"') : "";
            message = _error.includes(`"Message"`) && !!_message ? _message[1] : _error;
          }

          this.errorCallbacks.forEach((call) => {
            call({ canisterId, method: key, message });
          });

          return { err: message };
        }
      };
    });

    return _actor as ActorSubclass<T>;
  }

  public AnonymousAgent(host?: string) {
    return new HttpAgent({
      host: host ?? this.host,
    });
  }

  public async createAgent(canisterId: string, host: string, identity?: ActorIdentity): Promise<HttpAgent> {
    // connector is plug type
    if (identity === true) {
      if (this.connector === WalletType.PLUG) {
        await window.ic.plug.createAgent({ whitelist: [canisterId], host });
        return window.ic.plug.agent;
      } else if (isICConnector(this.connector)) {
        return window.connector.httpAgent;
      }
    } else if (!!identity) {
      return new HttpAgent({
        host: host ?? this.host,
        identity,
      });
    }

    return new HttpAgent({
      host: host ?? this.host,
    });
  }

  public setAgent(agent: HttpAgent | null) {
    this.agent = agent;
  }

  public setHost(host: string) {
    this.host = host;
  }

  public onError(callback: ActorErrorCallback) {
    this.errorCallbacks.push(callback);
  }
}

export const actor = new Actor();
