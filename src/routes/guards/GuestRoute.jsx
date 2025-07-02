import { useAtomValue } from "jotai";
import { authAtom } from "../../services/atoms";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader";

const GuestRoute = ({ children }) => {
  const auth = useAtomValue(authAtom);
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    setTimeout(() => setRehydrated(true), 300);
  }, []);

  if (!rehydrated) return <Loader />;

  return auth?.token ? <Navigate to="/me" replace /> : children;
};

export default GuestRoute;
