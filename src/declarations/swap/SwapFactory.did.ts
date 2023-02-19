export const idlFactory = ({ IDL }: any) => {
  const Value = IDL.Rec();
  const Token = IDL.Record({ address: IDL.Text, standard: IDL.Text });
  const CreatePoolArgs = IDL.Record({
    fee: IDL.Nat,
    sqrtPriceX96: IDL.Text,
    token0: Token,
    token1: Token,
  });
  const PoolData = IDL.Record({
    fee: IDL.Nat,
    key: IDL.Text,
    tickSpacing: IDL.Int,
    token0: Token,
    token1: Token,
    canisterId: IDL.Principal,
  });
  const Error = IDL.Variant({
    CommonError: IDL.Null,
    InternalError: IDL.Text,
    UnsupportedToken: IDL.Text,
    InsufficientFunds: IDL.Null,
  });
  const Result_1 = IDL.Variant({ ok: PoolData, err: Error });
  const Action = IDL.Text;
  const Strategy = IDL.Text;
  const State = IDL.Record({
    strategys: IDL.Vec(IDL.Tuple(Action, Strategy)),
    whiteList: IDL.Vec(IDL.Text),
    devList: IDL.Vec(IDL.Text),
  });
  Value.fill(
    IDL.Variant({
      Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
      List: IDL.Vec(Value),
      Text: IDL.Text,
    })
  );
  const Config = IDL.Record({
    id: IDL.Text,
    value: Value,
    appName: IDL.Opt(IDL.Text),
    version: IDL.Nat32,
    group: IDL.Text,
    category: IDL.Opt(IDL.Text),
    namespace: IDL.Text,
  });
  const CycleInfo = IDL.Record({ balance: IDL.Nat, available: IDL.Nat });
  const Result_2 = IDL.Variant({ ok: CycleInfo, err: Error });
  const GetPoolArgs = IDL.Record({
    fee: IDL.Nat,
    token0: Token,
    token1: Token,
  });
  const Result = IDL.Variant({ ok: IDL.Vec(PoolData), err: Error });
  const SwapFactory = IDL.Service({
    createPool: IDL.Func([CreatePoolArgs], [Result_1], []),
    deletePool: IDL.Func([IDL.Text], [], []),
    getAvailabilityState: IDL.Func([], [State], []),
    getConfigs: IDL.Func([], [IDL.Vec(Config)], []),
    getCycleInfo: IDL.Func([], [Result_2], []),
    getPool: IDL.Func([GetPoolArgs], [Result_1], ["query"]),
    getPools: IDL.Func([], [Result], ["query"]),
    getRemovedPools: IDL.Func([], [Result], ["query"]),
    onMessage: IDL.Func([IDL.Vec(Config)], [], ["oneway"]),
    register: IDL.Func([], [], ["oneway"]),
    removePool: IDL.Func([GetPoolArgs], [], []),
    setStrategys: IDL.Func([IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], [], []),
    setWhiteList: IDL.Func([IDL.Vec(IDL.Text)], [], []),
  });
  return SwapFactory;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text];
};
