import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface AuthContextValue {
  clearToken: () => void;
  token: string;
  setToken: (v: string) => void;
}

export const AuthContext = createContext<AuthContextValue>(undefined as any);

const TOKEN_KEY = "token";

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");

  const value: AuthContextValue = useMemo(
    () => ({
      token,
      setToken,
      clearToken() {
        setToken("");
      },
    }),
    [token]
  );

  useEffect(() => {
    localStorage.setItem(TOKEN_KEY, token);
  }, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => useContext(AuthContext);
