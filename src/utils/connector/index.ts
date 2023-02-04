import { StoicConnector } from "./stoic";
import type { IConnector, IWalletConnector, RequestTransferParams } from "./connectors";
import { IDL } from "@dfinity/candid";
import { ActorSubclass } from "@dfinity/agent";
import { WalletType } from "constants/index";
import { PlugConnector } from "./plug";
import { updateAuth } from "store/wallet/hooks";

type ConnectorClass = {
  new (...args: any[]): IConnector & Partial<IWalletConnector>;
};

export type ProviderOptions = {
  connector: ConnectorClass;
  id: string;
  name: string;
};

export type Provider = {
  connector: IConnector & Partial<IWalletConnector>;
  id: string;
  name: string;
};

export type ConnectConfig = {
  whitelist: Array<string>;
  host: string;
  providerUrl: string;
  dev: boolean;
};

export class Connector {
  public connector: (IConnector & Partial<IWalletConnector>) | null = null;
  public walletType: WalletType = WalletType.STOIC;

  public async init(connector: WalletType) {
    await this.create(connector);
    this.walletType = connector;
    await this.connector?.init();

    if (!(await this.isConnected())) {
      await this.connect();
    }

    // @ts-ignore
    window.connector = this.connector;
  }

  public async create(connector: WalletType, config?: { [key: string]: any }) {
    this.walletType = connector;

    const _config = {
      host: "https://ic0.app",
      ...(config ?? {}),
    };

    switch (connector) {
      case WalletType.STOIC:
        this.connector = new StoicConnector(_config);
        break;
      case WalletType.PLUG:
        this.connector = new PlugConnector(_config);
        break;
      default:
        throw new Error("Not support this connect for now");
    }
  }

  public async connect() {
    await this.connector?.init();
    const isConnectedSuccessfully = await this.connector?.connect();
    // @ts-ignore
    window.connector = this.connector;
    updateAuth({ type: this.walletType });
    return isConnectedSuccessfully;
  }

  public async isConnected() {
    return this.connector?.isConnected();
  }

  public async createActor<Service>(
    canisterId: string,
    idlFactory: IDL.InterfaceFactory
  ): Promise<ActorSubclass<Service> | undefined> {
    return await this.connector?.createActor(canisterId, idlFactory);
  }
}

export async function getConnectorIsConnected(): Promise<boolean> {
  return window.connector.isConnected();
}

export async function getConnectorPrincipal(): Promise<string> {
  return window.connector.getPrincipal;
}

export async function createC2ICActor<Service>(canisterId: string, idlFactory: IDL.InterfaceFactory) {
  return window.connector.createActor<Service>(canisterId, idlFactory);
}

export async function initialConnector(wallet: WalletType, config?: { [key: string]: any }) {
  const connector = new Connector();
  await connector.init(wallet);
}

export async function requestTransfer(data: RequestTransferParams) {
  // @ts-ignore
  return await window.connector?.requestTransfer(data);
}

export async function getHttpAgent() {
  return await window.connector.getHttpAgent();
}
