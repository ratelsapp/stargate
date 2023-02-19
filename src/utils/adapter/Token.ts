import { BalanceRequest, GetFeeRequest, MetadataRequest, LogoRequest } from "./BaseTokenAdapter";
import { EXTAdapter, EXTTokenAdapter } from "./EXTAdapter";
import { DIP20Adapter, DIP20TokenAdapter } from "./DIP20Adapter";
import { icrc1Adapter, ICRC1Adapter } from "./ICRC1";
import { icrc2Adapter, ICRC2Adapter } from "./ICRC2";
import { icpAdapter, ICPAdapter } from "./ICP";
import { TOKEN_STANDARD } from "./types";
import { Override } from "utils/index";

export type AdapterRequest<T> = Override<T, {}>;

export class Token {
  public canisterAdapters = new Map<string, TOKEN_STANDARD>();
  public adapters = new Map<
    TOKEN_STANDARD,
    DIP20TokenAdapter | EXTTokenAdapter | ICRC1Adapter | ICRC2Adapter | ICPAdapter
  >();

  public initialAdapter(
    name: TOKEN_STANDARD,
    adapter: DIP20TokenAdapter | EXTTokenAdapter | ICRC1Adapter | ICRC2Adapter | ICPAdapter
  ) {
    if (this.adapters.get(name)) throw Error("This adapter is already initialed");
    this.adapters.set(name, adapter);
  }

  public register({ canisterIds, standard }: { canisterIds: string[]; standard: TOKEN_STANDARD }) {
    canisterIds.forEach((canisterId) => {
      this.canisterAdapters.set(canisterId, standard);
    });
  }

  public getAll() {
    return this.canisterAdapters;
  }

  public getAdapter(canisterId: string) {
    let standard = this.canisterAdapters.get(canisterId);
    if (!standard) {
      console.error(`Can't not found adapter ===> ${canisterId}`);
      standard = TOKEN_STANDARD.EXT;
    }
    return this.getAdapterByName(standard);
  }

  public getAdapterByName(adapterName: TOKEN_STANDARD | undefined) {
    if (!adapterName || !this.adapters.get(adapterName)) throw Error(`Can't not found adapter ${adapterName}`);
    return this.adapters.get(adapterName);
  }

  public async balance({ canisterId, params }: AdapterRequest<BalanceRequest>) {
    const adapter = this.getAdapter(canisterId);

    return await adapter!.balance({
      canisterId,
      params,
    });
  }

  public async getFee({ canisterId }: AdapterRequest<GetFeeRequest>) {
    const adapter = this.getAdapter(canisterId);
    return await adapter!.getFee({
      canisterId,
    });
  }

  public async metadata({ canisterId }: AdapterRequest<MetadataRequest>) {
    const adapter = this.getAdapter(canisterId);
    return await adapter!.metadata({
      canisterId,
    });
  }

  public async logo({ canisterId }: AdapterRequest<LogoRequest>) {
    const adapter = this.getAdapter(canisterId);
    return await adapter!.logo({
      canisterId,
    });
  }
}

export const Tokens = new Token();

export const registerTokens = ({ canisterIds, standard }: { canisterIds: string[]; standard: TOKEN_STANDARD }) =>
  Tokens.register({ canisterIds, standard });

Tokens.initialAdapter(TOKEN_STANDARD.EXT, EXTAdapter);
Tokens.initialAdapter(TOKEN_STANDARD.DIP20, DIP20Adapter);
Tokens.initialAdapter(TOKEN_STANDARD.ICRC1, icrc1Adapter);
Tokens.initialAdapter(TOKEN_STANDARD.ICRC2, icrc2Adapter);
Tokens.initialAdapter(TOKEN_STANDARD.ICP, icpAdapter);
