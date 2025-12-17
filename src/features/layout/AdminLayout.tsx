import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { userStore } from "../store/user.store";
import Footer from "../components/FooterSection";


export default function AdminLayout() {
  const { user } = userStore();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#3C3344]">
        <p className="text-white text-lg">Chargement...</p>
      </div>
    );
  }

  if (user.role !== "COORDO") {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <NavBar role={"COORDO"} />
      <main className="pt-20">
      <Outlet />
      </main>
      <Footer />
    </div>
  );
}