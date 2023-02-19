import { BaseTokenAdapter, BalanceRequest, GetFeeRequest, MetadataRequest, LogoRequest } from "./BaseTokenAdapter";
import { enumResultFormat } from "utils/index";
import { ext as token } from "actors/index";
import { Metadata } from "./types";
import { _SERVICE as EXTTokenService } from "declarations/ext/token";
import { ResultStatus } from "types/global";

export class EXTTokenAdapter extends BaseTokenAdapter<EXTTokenService> {
  public async balance({ canisterId, params }: BalanceRequest) {
    if (!params.user.address && !params.user.principal) throw Error("no user address or principal");

    return enumResultFormat<bigint>(
      await (
        await this.actor(canisterId)
      ).balance({
        token: params.token,
        user: params.user.address ? { address: params.user.address } : { principal: params.user.principal! },
      })
    );
  }

  public async getFee({ canisterId }: GetFeeRequest) {
    return enumResultFormat<bigint>(await (await this.actor(canisterId)).getFee());
  }

  public async metadata({ canisterId }: MetadataRequest) {
    const metadata = enumResultFormat<{
      fungible: Metadata;
    }>(await (await this.actor(canisterId)).metadata()).data?.fungible;

    return {
      status: ResultStatus.OK,
      data: metadata,
      message: "",
    };
  }

  public async logo({ canisterId }: LogoRequest) {
    return enumResultFormat<string>(await (await this.actor(canisterId)).logo());
  }
}

export const EXTAdapter = new EXTTokenAdapter({
  actor: token,
});
