import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("Cannot use AuthCOntext");
  return authContext;
};

export default useAuth;
