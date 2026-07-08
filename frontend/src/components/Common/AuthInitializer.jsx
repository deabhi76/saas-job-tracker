import { useEffect } from "react";

import { useAuth }
from "../../context/AuthContext";

import {
  refreshToken,
  getMe
}
from "../../api/authApi";

import { setAuthToken }
from "../../api/axios";

export default function AuthInitializer({
  children
}) {

  const {
    setUser,
    setAccessToken,
    setIsAuthenticated,
    loading,
    setLoading
  } = useAuth();

  useEffect(() => {

    const initialize =
      async () => {

        try {

          const refreshResponse =
            await refreshToken();

          const token =
            refreshResponse.data.accessToken;

          setAccessToken(token);

          setAuthToken(token);

          const meResponse =
            await getMe();

          setUser(
            meResponse.data.user
          );

          setIsAuthenticated(
            true
          );

        } catch (err) {

          console.log(
            "No active session"
          );

        } finally {

          setLoading(false);
        }
      };

    initialize();

  }, []);

  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  return children;
}