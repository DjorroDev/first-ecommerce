import { useAppSelector } from "@/app/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.isAdmin || user.isSeller ? <Outlet /> : <Navigate to="/products" />;
};
export default PrivateRoutes;
