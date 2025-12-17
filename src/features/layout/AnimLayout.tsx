import { Navigate, Outlet } from "react-router";
import { userStore } from "../../features/store/user.store";
import NavBar from "../components/NavBar";
import Footer from "../components/FooterSection";


export default function AnimLayout() {
  const { user } = userStore();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#3C3344]">
        <p className="text-white text-lg">Chargement...</p>
      </div>
    );
  }

  if (user.role !== "ANIMATOR") {
    return <Navigate to="/" replace />;
  }



  return (
    <div>
      <NavBar role={"ANIMATOR"} />
      <Outlet />
      <Footer />
    </div>
  );
}