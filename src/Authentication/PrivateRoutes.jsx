import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/" replace/>
}

function PrivateRouteForBlockingLoggingPage({ children }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to="/home" replace/> : children 
}
export { PrivateRouteForBlockingLoggingPage }