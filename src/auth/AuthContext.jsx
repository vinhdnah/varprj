import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
    onAuthStateChanged(auth, u => { setUser(u); setLoading(false); }), []);

  const logout = () => signOut(auth);
  return (
    <AuthCtx.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthCtx.Provider>
  );
}
