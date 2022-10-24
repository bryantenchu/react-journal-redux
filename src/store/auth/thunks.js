import { signIngWithGoogle } from "../../firebase/provider";
import { checkingCredentials } from "./";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signIngWithGoogle();
    console.log(result);
  };
};
