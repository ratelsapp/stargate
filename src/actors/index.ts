import { actor } from "./actor";
import { ActorIdentity } from "../types/global";

import { idlFactory as BackendIdl } from "../declarations/ratel_new_backend/backend.did";
import { _SERVICE as BackendService } from "../declarations/ratel_new_backend/backend";

import { idlFactory as TokenListIdl } from "../declarations/tokenList/TokenList.did";
import { _SERVICE as TokenListService } from "../declarations/tokenList/TokenList";

import DIP20Service from "../declarations/dip20/dip20";
import DIP20Idl from "../declarations/dip20/dip20.did";

import { _SERVICE as EXTService } from "../declarations/ext/token";
import { idlFactory as EXTIdl } from "../declarations/ext/token.did";

import { _SERVICE as LedgerService } from "../declarations/icp/ledger";
import { idlFactory as LedgerIdl } from "../declarations/icp/ledger.did";

import { _SERVICE as ICRC1Service } from "../declarations/icrc/icrc1";
import { idlFactory as ICRC1Idl } from "../declarations/icrc/icrc1.did";

import { _SERVICE as ICRC2Service } from "../declarations/icrc/icrc2";
import { idlFactory as ICRC2Idl } from "../declarations/icrc/icrc2.did";

import { _SERVICE as SwapFactoryService } from "../declarations/swap/SwapFactory";
import { idlFactory as SwapFactoryIdl } from "../declarations/swap/SwapFactory.did";

import { _SERVICE as SwapPoolService } from "../declarations/swap/SwapPool";
import { idlFactory as SwapPoolIdl } from "../declarations/swap/SwapPool.did";

import { _SERVICE as BaseDataStructure } from "../declarations/swap/BaseDataStructure";
import { idlFactory as BaseDataStructureIdl } from "../declarations/swap/BaseDataStructure.did";

export const backend = async (identity?: ActorIdentity) =>
  await actor.create<BackendService>({
    idlFactory: BackendIdl,
    canisterId: "viz6v-ziaaa-aaaak-qbhqa-cai",
    identity,
  });

export const tokenList = async () =>
  await actor.create<TokenListService>({
    idlFactory: TokenListIdl,
    canisterId: "5hl3d-3aaaa-aaaan-qapta-cai",
  });

export const dip20 = async (canisterId?: string) =>
  await actor.create<DIP20Service>({
    idlFactory: DIP20Idl,
    canisterId: canisterId,
  });

export const ext = async (canisterId?: string) =>
  await actor.create<EXTService>({
    idlFactory: EXTIdl,
    canisterId: canisterId,
  });

export const icp = async () =>
  await actor.create<LedgerService>({
    idlFactory: LedgerIdl,
    canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
  });

export const icrc1 = async (canisterId?: string) =>
  await actor.create<ICRC1Service>({
    idlFactory: ICRC1Idl,
    canisterId: canisterId,
  });

export const icrc2 = async (canisterId?: string) =>
  await actor.create<ICRC2Service>({
    idlFactory: ICRC2Idl,
    canisterId: canisterId,
  });

export const swapFactory = async () =>
  await actor.create<SwapFactoryService>({
    idlFactory: SwapFactoryIdl,
    canisterId: "4mmnk-kiaaa-aaaag-qbllq-cai",
  });

export const swapPool = async (canisterId?: string) =>
  await actor.create<SwapPoolService>({
    idlFactory: SwapPoolIdl,
    canisterId: canisterId,
  });

export const swapData = async () =>
  await actor.create<BaseDataStructure>({
    idlFactory: BaseDataStructureIdl,
    canisterId: "4coac-ryaaa-aaaag-qblkq-cai",
  });
