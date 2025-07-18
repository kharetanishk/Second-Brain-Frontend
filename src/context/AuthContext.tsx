import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
}
interface ContextUser {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const AuthContext = createContext<ContextUser>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  //if user refreshes the page ...
  useEffect(() => {
    axios
      .get("http://localhost:1601/api/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    //components wrap uder authcontext can access user, loading ,setuser using usecontext...
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
//here we go..
export const useAuth = () => useContext(AuthContext);
