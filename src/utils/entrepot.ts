import { decodeTokenId, encodeTokenIdentifier } from "./nft";

const icpbunnyimg = (index: number) => {
  const icbstorage = [
    "efqhu-yqaaa-aaaaf-qaeda-cai",
    "ecrba-viaaa-aaaaf-qaedq-cai",
    "fp7fo-2aaaa-aaaaf-qaeea-cai",
    "fi6d2-xyaaa-aaaaf-qaeeq-cai",
    "fb5ig-bqaaa-aaaaf-qaefa-cai",
    "fg4os-miaaa-aaaaf-qaefq-cai",
    "ft377-naaaa-aaaaf-qaega-cai",
    "fu2zl-ayaaa-aaaaf-qaegq-cai",
    "f5zsx-wqaaa-aaaaf-qaeha-cai",
    "f2yud-3iaaa-aaaaf-qaehq-cai",
  ];

  return "https://" + icbstorage[index % 10] + ".raw.ic0.app/Token/" + index;
};

export default {
  EntrepotNFTImage: (tokenId: string) => {
    const { index, canister } = decodeTokenId(tokenId);

    let ref = 0;
    if (canister === "yrdz3-2yaaa-aaaah-qcvpa-cai") ref = 1;

    let cachePriority = "10";

    if (canister === "4ggk4-mqaaa-aaaae-qad6q-cai") {
      return (
        "https://images.entrepot.app/t/dexpm-6aaaa-aaaal-qbgrq-cai/" +
        encodeTokenIdentifier("dexpm-6aaaa-aaaal-qbgrq-cai", index) +
        ref +
        "&cache=" +
        cachePriority
      );
    }

    if (canister === "jeghr-iaaaa-aaaah-qco7q-cai")
      return "https://fl5nr-xiaaa-aaaai-qbjmq-cai.raw.ic0.app/nft/" + index;
    if (canister === "bxdf4-baaaa-aaaah-qaruq-cai")
      return "https://qcg3w-tyaaa-aaaah-qakea-cai.raw.ic0.app/Token/" + index;
    if (canister === "y3b7h-siaaa-aaaah-qcnwa-cai")
      return "https://4nvhy-3qaaa-aaaah-qcnoq-cai.raw.ic0.app/Token/" + index;
    if (canister === "3db6u-aiaaa-aaaah-qbjbq-cai")
      return "https://d3ttm-qaaaa-aaaai-qam4a-cai.raw.ic0.app?tokenId=" + index;
    if (canister === "q6hjz-kyaaa-aaaah-qcama-cai") return icpbunnyimg(index);
    if (canister === "pk6rk-6aaaa-aaaae-qaazq-cai") {
      return "https://images.entrepot.app/t/7budn-wqaaa-aaaah-qcsba-cai/" + tokenId;
    }
    if (canister === "dhiaa-ryaaa-aaaae-qabva-cai") {
      return "https://images.entrepot.app/tnc/qtejr-pqaaa-aaaah-qcyvq-cai/" + tokenId;
    }
    if (canister === "skjpp-haaaa-aaaae-qac7q-cai") {
      return "https://images.entrepot.app/tnc/wtwf2-biaaa-aaaam-qauoq-cai/" + tokenId;
    }

    //add canisters with wearables or other dynamic traits here
    //these images will not be cached
    if (canister === "7i54s-nyaaa-aaaal-abomq-cai ") {
      let cacheParam = (Math.random() + 1).toString(36).substring(7);
      return (
        "https://images.entrepot.app/t/7i54s-nyaaa-aaaal-abomq-cai /" +
        tokenId +
        "?cache=" +
        cachePriority +
        "&cachebuster=" +
        cacheParam
      );
    }
    if (canister === "yrdz3-2yaaa-aaaah-qcvpa-cai")
      return "https://images.entrepot.app/tnc/" + canister + "/" + tokenId + ref;
    if (canister === "rw7qm-eiaaa-aaaak-aaiqq-cai")
      return "https://images.entrepot.app/tnc/" + canister + "/" + tokenId + ref;
    if (canister === "5movr-diaaa-aaaak-aaftq-cai")
      return "https://images.entrepot.app/tnc/" + canister + "/" + tokenId + ref;
    if (canister === "e3izy-jiaaa-aaaah-qacbq-cai")
      return "https://images.entrepot.app/tnc/" + canister + "/" + tokenId + ref;
    if (canister === "xjjax-uqaaa-aaaal-qbfgq-cai")
      return "https://images.entrepot.app/tnc/" + canister + "/" + tokenId + ref;

    if (canister === "6wih6-siaaa-aaaah-qczva-cai")
      return "https://" + canister + ".raw.ic0.app/?cc" + Date.now() + "&type=thumbnail&tokenid=" + tokenId + ref;
    if (canister === "kss7i-hqaaa-aaaah-qbvmq-cai")
      return "https://" + canister + ".raw.ic0.app/?type=thumbnail&tokenid=" + tokenId;
    return "https://images.entrepot.app/t/" + canister + "/" + tokenId + "?cache=" + cachePriority;
  },
};
