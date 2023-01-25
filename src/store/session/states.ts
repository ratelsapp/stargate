export interface SessionState {
  readonly locked: boolean;
}

export const initialState: SessionState = {
  locked: false,
};
