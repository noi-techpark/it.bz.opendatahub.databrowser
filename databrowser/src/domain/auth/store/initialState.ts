interface AuthState {
  ready: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
}

export const initialState: AuthState = {
  ready: false,
  isAuthenticated: false,
  accessToken: null,
};
