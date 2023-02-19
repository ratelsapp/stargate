import { BaseTokenAdapter, BalanceRequest, GetFeeRequest, MetadataRequest, LogoRequest } from "./BaseTokenAdapter";
import { principalToAccount, enumResultFormat } from "utils/index";
import { icp } from "actors/index";
import { Metadata } from "./types";
import { _SERVICE as LedgerService } from "declarations/icp/ledger";
import { ResultStatus } from "types/global";

export class ICPAdapter extends BaseTokenAdapter<LedgerService> {
  public async balance({ canisterId, params }: BalanceRequest) {
    let account = "";

    if (params.user.address) {
      account = params.user.address;
    } else if (params.user.principal) {
      account = principalToAccount(params.user.principal.toString()) ?? "";
    }

    return enumResultFormat<bigint>(
      (
        await (
          await this.actor()
        ).account_balance({
          account: Array.from(Uint8Array.from(Buffer.from(account, "hex"))),
        })
      ).e8s
    );
  }

  public async getFee({ canisterId }: GetFeeRequest) {
    return enumResultFormat<bigint>(await (await (await this.actor()).transfer_fee({})).transfer_fee.e8s);
  }

  public async metadata({ canisterId }: MetadataRequest) {
    const symbol = (await (await this.actor(canisterId)).symbol()).symbol;
    const decimals = (await (await this.actor()).decimals()).decimals;
    const name = "Internet Computer";

    return {
      status: ResultStatus.OK,
      data: {
        decimals: decimals,
        ownerAccount: "",
        metadata: [],
        name: name,
        symbol: symbol,
      } as Metadata,
      message: "",
    };
  }

  public async logo({ canisterId }: LogoRequest) {
    return enumResultFormat<string>("");
  }
}

export const icpAdapter = new ICPAdapter({
  actor: icp,
});
