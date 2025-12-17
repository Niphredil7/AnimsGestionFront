import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import AdminLayout from "./features/layout/AdminLayout";
import { Route, Routes } from "react-router";
import NotificationsPage from "./pages/communPage/NotificationPage";
import ForgetPasswordPage from "./pages/auth/ForgotPasswordPage";
import PrivateRoute from "./utils/PrivateRoute";
import AnimDashboardPage from "./pages/animator/DashboardAnimPage";
import ProfileEditPage from "./pages/communPage/EditProfilePage";
import PasswordEditPage from "./pages/communPage/EditPasswordPage";
import PrivateRouteRole from "./utils/PrivateRouteRole";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import PlanningsPage from "./pages/animator/PlanningsPage";
import ProfilePage from "./pages/parentVisiteurPages/ProfilePage";
import RoomPage from "./pages/adminPages/RoomPage";
import MaterialPage from "./pages/adminPages/MaterialPage";
import { Toaster } from "react-hot-toast";
import UserLayout from "./features/layout/UserLayout";
import ParentLayout from "./features/layout/ParentLayout";
import AdminDashboardPage from "./pages/adminPages/AdminDashboardPage";
import AnimLayout from "./features/layout/AnimLayout";
import PlanningsAdminPage from "./pages/adminPages/PlanningsAdminPage";


function App() {
  return (
    <div className="w-screen">
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgetpassword" element={<ForgetPasswordPage />} />

        {/*Routes protégées */}

        <Route element={<PrivateRoute />}>

          {/* Domaine utilisateur visiteur et parent */}

          <Route element={<PrivateRouteRole role="VISITOR"/>}></Route>
          <Route path="/user" element={<UserLayout />}>
          <Route index element={<ProfilePage/>} />
          </Route>

          <Route element={<PrivateRouteRole role="PARENT"/>}></Route>
          <Route path="/parent" element={<ParentLayout />}>
          <Route index element={<ProfilePage/>} />
          </Route>

          {/* Animator */}
          <Route element={<PrivateRouteRole role="ANIMATOR"/>}>
          <Route path="/dashboard" element={<AnimLayout />}>
            <Route index element={<AnimDashboardPage />} />
            <Route path="profile" element={<ProfilePage/>} />
            <Route path="plannings" element={<PlanningsPage/>} />
            <Route path="changeprofile" element={<ProfileEditPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="changeprofile/changepassword" element={<PasswordEditPage />} />
          </Route>
          </Route>

          {/*ADMIN */}

          <Route element={<PrivateRouteRole role="COORDO"/>}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage/>} />
            <Route path="plannings" element={<PlanningsAdminPage/>} />
            <Route path="changeprofile" element={<ProfileEditPage />} />
            <Route path="changeprofile/changepassword" element={<PasswordEditPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="room" element={<RoomPage/>} />
            <Route path="material" element={<MaterialPage/>} />
          </Route>
          </Route>
        </Route>
        
      </Routes>

      <ReactQueryDevtools />
    </div>
  );
}

export default App;
