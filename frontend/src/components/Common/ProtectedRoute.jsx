import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const {
    isAuthenticated,
    user,
    isLoggingOut
  } = useAuth();

  if (isLoggingOut) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/login" />;
  }

  return children;
}