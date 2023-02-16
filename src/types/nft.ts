export type UserNFTElement = {
  time: number;
  price: number;
  owner: string;
  metadata: string;
  id: string;
  canister: string;
};

export type NFTTransaction = {
  buyer: string;
  canister: string;
  id: string;
  price: number;
  seller: string;
  time: number;
  token: string;
};
