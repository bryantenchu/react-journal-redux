import { signIngWithGoogle } from "../../firebase/provider";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signIngWithGoogle();
    if (!result.ok) dispatch(logout(result.errorMessage));
    delete result.ok;
    dispatch(login(result));
  };
};
