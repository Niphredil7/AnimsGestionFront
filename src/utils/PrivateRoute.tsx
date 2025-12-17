import { Navigate, Outlet } from "react-router";
import { userStore } from "../features/store/user.store";



export default function PrivateRoute() {
  const { access_token } = userStore();
    return access_token ? <Outlet /> : <Navigate to='/'/>
}
