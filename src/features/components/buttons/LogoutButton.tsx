
import { useNavigate } from "react-router";
import { authService } from "../../../services/auth.service";
import toast from "react-hot-toast";

function LogoutButton() {
  const navigate = useNavigate();
  const logoutMutation = authService.logout();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    toast.success("Déconnexion réussie")
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-orange-500 font-medium hover:underline pl-4"
    >
      Se déconnecter
    </button>
  );
}

export default LogoutButton;
