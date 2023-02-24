export interface GlobalState {
  logos: { [key: string]: string };
}

export const initialState: GlobalState = {
  logos: {},
};
