import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { FirebaseAuth } from "../firebase/config";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { logout, login } from "../store/auth";
import CheckingAuth from "../ui/components/CheckingAuth";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      dispatch(login(user));
    });
  }, []);

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
      {/* Login y Registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* JournalApp */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  );
};
