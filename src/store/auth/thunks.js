import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signIngWithGoogle,
} from "../../firebase/provider";
import { checkingCredentials, login, logout } from "./";
import {clearNotesLogout} from "../journal";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signIngWithGoogle();
    if (!result.ok) dispatch(logout(result.errorMessage));
    delete result.ok;
    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout())
    dispatch(logout(null));
  };
};
