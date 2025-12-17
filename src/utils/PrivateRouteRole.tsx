import { Navigate, Outlet } from "react-router";
import { userStore } from "../features/store/user.store";

export default function PrivateRouteRole(props:any) {
  const { role } = props;
  const { user } = userStore();
  return user?.role === role ? <Outlet /> : <Navigate to="/signin" />;
}
