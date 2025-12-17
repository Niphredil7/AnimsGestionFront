import { Navigate, Outlet } from "react-router";
import NavBar from "../components/NavBar";


const ParentLayout = () => {
  // Ces infos viendront du contexte / store
  const user = { token: true, parent: true };


  return (
    <div className="flex flex-col items-center">
      <NavBar role="PARENT"/>
      {/* Si le user est un parentafficher autre chose */}
      {user.parent ? <Outlet /> : <Navigate to="/signin" />}
    </div>
  );
};

export default ParentLayout;