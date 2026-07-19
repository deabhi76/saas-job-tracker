import {
  createContext,
  useContext,
  useState
} from "react";

import {

    getUnreadCount

} from "../api/notificationApi";

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

    const [

    unreadCount,

    setUnreadCount

] = useState(0);

const loadUnreadCount =
async () => {

    try {

        const response =
            await getUnreadCount();

        setUnreadCount(
            response.data.count
        );

    } catch (err) {

        console.error(err);

    }

};

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
        setIsLoggingOut,

        unreadCount,

        setUnreadCount,

        loadUnreadCount,
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