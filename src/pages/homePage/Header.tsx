import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router";
import { User } from "lucide-react";
import { userStore } from "../../features/store/user.store";
import ButtonSignin from "../../features/components/buttons/ButtonSignin";

function Header() {
  const links = [
    { id: "accueil", label: "Accueil" },
    { id: "function", label: "Fonctionnalités" },
    { id: "activity", label: "Activités et sorties" },
  ];

  const navigate = useNavigate();
  const { access_token } = userStore();

  const handleAccountClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-full">
      <nav
        className="
          fixed inset-x-0 top-0 z-50 
          bg-[#3C3344] 
          flex items-center justify-between 
          px-4 py-3
        "
      >
        {/* Logo */}
        <img
          src="/AnimsGestionLogo.png"
          alt="Anim's Gestion"
          className="h-16 w-auto sm:h-24 md:h-32"
        />

        {/* Liens (desktop uniquement) */}
        <ul className="hidden md:flex space-x-6 text-[#F5F5DC] font-medium lg:text-4xl md:text-xl">
          {links.map((link) => (
            <li key={link.id}>
              <ScrollLink
                to={link.id}
                smooth
                duration={500}
                spy
                offset={-80}
                activeClass="text-[#c25305] after:scale-x-100"
                className="
                  relative m-3 inline-block cursor-pointer 
                  transition-colors duration-300 
                  hover:text-[#c25305]
                  after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                  after:h-[2px] after:w-full after:bg-[#c25305] 
                  after:origin-center after:scale-x-0 
                  after:transition-transform after:duration-300 
                  hover:after:scale-x-100 after:-translate-x-1/2
                "
              >
                {link.label}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Bouton connexion / compte */}
        <div className="flex items-center gap-3">
          {access_token ? (
            <button
              onClick={handleAccountClick}
              className="p-2 rounded-full bg-[#F5F5DC] hover:bg-[#c25305] transition"
              title="Mon compte"
            >
              <User className="text-[#3C3344] hover:text-white w-6 h-6" />
            </button>
          ) : (
            
            <Link to="/signin" data-cy="signin-button-header">
              <ButtonSignin />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
