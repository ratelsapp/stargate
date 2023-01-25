export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ ok: IDL.Bool, err: IDL.Text });
  const Result_7 = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
  const User = IDL.Record({
    githubTime: IDL.Opt(IDL.Int),
    twitter: IDL.Opt(IDL.Text),
    twitterTime: IDL.Opt(IDL.Int),
    user: IDL.Principal,
    discordTime: IDL.Opt(IDL.Int),
    account: IDL.Text,
    discord: IDL.Opt(IDL.Text),
    principalId: IDL.Text,
    github: IDL.Opt(IDL.Text),
  });
  const Result_1 = IDL.Variant({ ok: IDL.Vec(User), err: IDL.Text });
  const UserAccountResponse = IDL.Record({
    nickname: IDL.Text,
    code: IDL.Text,
    user: IDL.Principal,
    followers: IDL.Nat,
    following: IDL.Nat,
  });
  const Result_6 = IDL.Variant({
    ok: IDL.Opt(UserAccountResponse),
    err: IDL.Text,
  });
  const Result_5 = IDL.Variant({
    ok: IDL.Vec(IDL.Principal),
    err: IDL.Text,
  });
  const Result_4 = IDL.Variant({ ok: IDL.Opt(User), err: IDL.Text });
  const Result_3 = IDL.Variant({ ok: User, err: IDL.Text });
  const Result_2 = IDL.Variant({
    ok: UserAccountResponse,
    err: IDL.Text,
  });
  const VerifyType = IDL.Variant({
    twitter: IDL.Null,
    discord: IDL.Null,
    github: IDL.Null,
  });
  return IDL.Service({
    addFollowing: IDL.Func([IDL.Principal], [Result], []),
    cycleAvailable: IDL.Func([], [Result_7], []),
    cycleBalance: IDL.Func([], [Result_7], ["query"]),
    deleteFollowing: IDL.Func([IDL.Principal], [Result], []),
    find: IDL.Func([IDL.Nat, IDL.Nat], [Result_1], ["query"]),
    findAccount: IDL.Func([IDL.Principal], [Result_6], ["query"]),
    findFollower: IDL.Func([IDL.Principal], [Result_5], ["query"]),
    findFollowing: IDL.Func([IDL.Principal], [Result_5], ["query"]),
    findUser: IDL.Func([IDL.Principal], [Result_4], ["query"]),
    get: IDL.Func([], [Result_3], ["query"]),
    getAccount: IDL.Func([], [Result_2], []),
    searchDiscordAccount: IDL.Func([IDL.Text], [Result_1], ["query"]),
    searchGithubAccount: IDL.Func([IDL.Text], [Result_1], ["query"]),
    searchIcpAccount: IDL.Func([IDL.Text], [Result_1], ["query"]),
    searchMultiTwitterAccount: IDL.Func([IDL.Vec(IDL.Text)], [Result_1], ["query"]),
    searchTwitterAccount: IDL.Func([IDL.Text], [Result_1], ["query"]),
    updateNickname: IDL.Func([IDL.Text], [Result], []),
    verify: IDL.Func([VerifyType, IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
