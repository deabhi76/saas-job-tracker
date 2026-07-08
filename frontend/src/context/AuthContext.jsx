import {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  const [isAuthenticated,
    setIsAuthenticated] =
    useState(false);

  const [accessToken, setAccessToken] =
  useState(null);

const [loading, setLoading] =
  useState(true);

  const [isLoggingOut,
    setIsLoggingOut] =
    useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        accessToken,
        setAccessToken,

        isAuthenticated,
        setIsAuthenticated,

        loading,
        setLoading,

        isLoggingOut,
        setIsLoggingOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}