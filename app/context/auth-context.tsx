import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";
import type { AuthSession } from "~/types/auth.type";

interface AuthProviderProps {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  session: AuthSession | null;
  isLoading: boolean;
}
const AuthContext = createContext<AuthProviderProps>({
  login: async () => {},
  logout: () => {},
  session: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedSession = localStorage.getItem("session");
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    } else {
      setSession(null);
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      const session = await response.json();
      setSession(session);
      localStorage.setItem("session", JSON.stringify(session));
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("session");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
