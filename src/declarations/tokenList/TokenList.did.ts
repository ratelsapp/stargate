export const idlFactory = ({ IDL }: any) => {
  const Media = IDL.Record({ link: IDL.Text, mediaType: IDL.Text });
  const TokenMetadata = IDL.Record({
    fee: IDL.Nat,
    decimals: IDL.Nat,
    name: IDL.Text,
    rank: IDL.Nat32,
    mediaLinks: IDL.Vec(Media),
    totalSupply: IDL.Nat,
    introduction: IDL.Text,
    standard: IDL.Text,
    symbol: IDL.Text,
    canisterId: IDL.Text,
  });
  const BoolResult = IDL.Variant({ ok: IDL.Bool, err: IDL.Text });
  const NatResult = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
  const Result_2 = IDL.Variant({
    ok: IDL.Opt(TokenMetadata),
    err: IDL.Text,
  });
  const Result_1 = IDL.Variant({ ok: IDL.Vec(IDL.Text), err: IDL.Text });
  const Result = IDL.Variant({
    ok: IDL.Vec(TokenMetadata),
    err: IDL.Text,
  });
  return IDL.Service({
    add: IDL.Func([TokenMetadata], [BoolResult], []),
    addAdmin: IDL.Func([IDL.Text], [BoolResult], []),
    cycleAvailable: IDL.Func([], [NatResult], []),
    cycleBalance: IDL.Func([], [NatResult], ["query"]),
    get: IDL.Func([IDL.Text], [Result_2], ["query"]),
    getAdminList: IDL.Func([], [Result_1], ["query"]),
    getList: IDL.Func([], [Result], ["query"]),
    remove: IDL.Func([IDL.Text], [BoolResult], []),
    removeAdmin: IDL.Func([IDL.Text], [BoolResult], []),
  });
};
