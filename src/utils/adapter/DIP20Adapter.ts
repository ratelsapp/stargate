import { BaseTokenAdapter, BalanceRequest, GetFeeRequest, MetadataRequest, LogoRequest } from "./BaseTokenAdapter";
import { principalToAccount, enumResultFormat } from "utils/index";
import { dip20 } from "actors/index";
import { DIP20Metadata, Metadata } from "./types";
import DIP20Service from "declarations/dip20/dip20";
import { ResultStatus } from "types/global";

export class DIP20TokenAdapter extends BaseTokenAdapter<DIP20Service> {
  public async balance({ canisterId, params }: BalanceRequest) {
    if (!!params.user.principal) {
      let balance = BigInt(0);

      try {
        balance = (await (await this.actor(canisterId)).balanceOf(params.user.principal)) as bigint;
      } catch (error) {}

      return {
        status: ResultStatus.OK,
        data: balance,
        message: "",
      };
    }

    return enumResultFormat<bigint>(BigInt(0));
  }

  public async getFee({ canisterId }: GetFeeRequest) {
    const metadata = await (await this.actor(canisterId)).getMetadata();
    return enumResultFormat<bigint>(metadata.fee);
  }

  public async metadata({ canisterId }: MetadataRequest) {
    const metadata = (await (await this.actor(canisterId)).getMetadata()) as DIP20Metadata;

    return {
      status: ResultStatus.OK,
      data: {
        decimals: metadata.decimals,
        ownerAccount: principalToAccount(metadata.owner.toString()),
        metadata: [],
        name: metadata.name,
        symbol: metadata.symbol,
      } as Metadata,
      message: "",
    };
  }

  public async logo({ canisterId }: LogoRequest) {
    const logo = (await (await this.actor(canisterId)).logo()) as string;

    return {
      status: ResultStatus.OK,
      data: logo,
      message: "",
    };
  }
}

export const DIP20Adapter = new DIP20TokenAdapter({
  actor: dip20,
});
