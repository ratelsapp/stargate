import { BaseTokenAdapter, BalanceRequest, GetFeeRequest, MetadataRequest, LogoRequest } from "./BaseTokenAdapter";
import { principalToAccount, enumResultFormat, nullParamsFormat } from "utils/index";
import { icrc1 } from "actors/index";
import { Metadata } from "./types";
import { _SERVICE as ICRC1Service } from "declarations/icrc/icrc1";
import { Principal } from "@dfinity/principal";
import { ResultStatus } from "types/global";

export class ICRC1Adapter extends BaseTokenAdapter<ICRC1Service> {
  public async balance({ canisterId, params }: BalanceRequest) {
    if (!!params.user.principal) {
      return enumResultFormat<bigint>(
        await (
          await this.actor(canisterId)
        ).icrc1_balance_of({
          owner: params.user.principal,
          subaccount: nullParamsFormat<Uint8Array>(params.subaccount ? Uint8Array.from(params.subaccount) : undefined),
        })
      );
    }

    return enumResultFormat<bigint>(BigInt(0));
  }

  public async getFee({ canisterId }: GetFeeRequest) {
    return enumResultFormat<bigint>(await (await this.actor(canisterId)).icrc1_fee());
  }

  public async metadata({ canisterId }: MetadataRequest) {
    const metadata = await (await this.actor(canisterId)).icrc1_metadata();

    let name: string = "";
    let symbol: string = "";
    let decimals: bigint = BigInt(0);
    let fee: bigint = BigInt(0);

    for (let i = 0; i < metadata.length; i++) {
      const ele = metadata[i];
      if (ele[0] === "icrc1:name") {
        const val = ele[1] as { Text: string };
        name = val.Text;
      } else if (ele[0] === "icrc1:symbol") {
        const val = ele[1] as { Text: string };
        symbol = val.Text;
      } else if (ele[0] === "icrc1:decimals") {
        const val = ele[1] as { Nat: bigint };
        decimals = val.Nat;
      } else if (ele[0] === "icrc1:fee") {
        const val = ele[1] as { Nat: bigint };
        fee = val.Nat;
      }
    }

    const owner = await (await this.actor(canisterId)).icrc1_minting_account();

    let _owner: Principal | undefined = undefined;

    if (owner[0]) {
      _owner = owner[0].owner;
    }

    return {
      status: ResultStatus.OK,
      data: {
        decimals: Number(decimals),
        ownerAccount: _owner ? principalToAccount(_owner.toString()) : "",
        metadata: [],
        name: name,
        symbol: symbol,
        fee,
      } as Metadata,
      message: "",
    };
  }

  public async logo({ canisterId }: LogoRequest) {
    return enumResultFormat<string>(await (await this.actor(canisterId)).icrc1_logo());
  }
}

export const icrc1Adapter = new ICRC1Adapter({
  actor: icrc1,
});
