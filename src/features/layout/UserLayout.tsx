import { Navigate, Outlet } from "react-router";
import { userStore } from "../store/user.store"
import NavBar from "../components/NavBar";
import Footer from "../components/FooterSection";


export default function UserLayout() {
  const { user } = userStore();

  // connecté et rôle VISITEUR ou PARENT
  if (!["VISITOR", "PARENT", "ADMIN", "ANIMATOR"].includes(user!.role)) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <NavBar role="VISITOR"/>
      <Outlet /> {/* visiteur et parent */}
      <Footer/>
    </div>
  );
}