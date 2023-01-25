import { actor } from "./actor";
import { ActorIdentity } from "../types/global";

// @ts-ignore
import { idlFactory } from "../declarations/ratel_new_backend/ratel_new_backend.did.js";

import { _SERVICE } from "../declarations/ratel_new_backend/ratel_new_backend.did";

export const backend = async (identity?: ActorIdentity) =>
  await actor.create<_SERVICE>({
    idlFactory: idlFactory,
    canisterId: "viz6v-ziaaa-aaaak-qbhqa-cai",
    identity,
  });
