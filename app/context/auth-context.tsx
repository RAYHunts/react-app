import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";
import type { AuthSession } from "~/types/auth.type";

interface AuthProviderProps {
  login: (username: string, password: string) => Promise<Error | void>;
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        return errorData as Error;
      }

      const sessionData = await response.json();
      setSession(sessionData);
      localStorage.setItem("session", JSON.stringify(sessionData));
    } catch (error) {
      console.error("An error occurred during login:", error);
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
