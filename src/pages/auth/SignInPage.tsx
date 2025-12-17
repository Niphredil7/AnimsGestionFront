import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import ButtonAdd from "../../features/components/buttons/ButtonAdd";
import type { ISigninData } from "../../features/auth/types/auth.type";
import { authService } from "../../services/auth.service";
import { userStore } from "../../features/store/user.store";
import toast from "react-hot-toast";
import { ChevronLeftIcon } from "../../components/ChevronLeftIcon";

export interface ISignInInfos {
  email: string;
  password: string;
  token?: string;
}

function SignInPage() {
  const { setAccessToken, setRefreshToken, setUser } = userStore();

  const navigate = useNavigate();

  const signinMutation = authService.signin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninData>();

  const handleForm: SubmitHandler<ISigninData> = (data: ISigninData) => {
    signinMutation.mutate(data, {
      onSuccess: async (response) => {
        toast.success("Connexion réussie");
        setUser(response.data.user);
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
        if (response.data.user.role === "PARENT") navigate("/profile");
        if (response.data.user.role === "PARENT") navigate("/parent");
        if (response.data.user.role === "ANIMATOR") navigate("/dashboard");
        if (response.data.user.role === "COORDO") navigate("/admin");
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || "Error";
        console.error(errorMessage);
        toast.error("Connexion échouée");
        // alert(errorMessage)
      },
    });
  };

  return (
    <main className="bg-[#3C3344]">
      <Link to="/" aria-label="retour">
        <ChevronLeftIcon
         aria-label="Retour"
          size={48}
          className="text-orange-500 hover:text-orange-800 w-16 h-16 "
        />
      </Link>
      <div className="bg-[#3C3344] h-screen flex flex-col justify-center items-center">
        {/* Logo plus petit */}
        <img
          src="AnimsGestionLogo.png"
          alt="Logo Anim's Gestion"
          className="w-64 md:w-80 h-auto mb-8 animate-pulse-slow"
        />

        {/* Conteneur du formulaire */}
        <div className=" w-full max-w-md md:max-w-lg lg:max-w-xl p-8 md:p-10">
          <form onSubmit={handleSubmit(handleForm)} className="w-full">
            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-white font-medium text-lg"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                role="email"
                className="w-full px-4 py-3 text-gray-900 rounded-lg bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...register("email", { required: "L'email est requis" })}
              />
              {errors.email?.type === "required" && (
                <span className="text-orange-500 text-2xl">
                  Vous devez mettre un email
                </span>
              )}
            </div>

            {/* Mot de passe */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-white font-medium text-lg"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                role="password"
                className="w-full px-4 py-3 text-gray-900 rounded-lg bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...register("password", {
                  required: "Le mot de passe est requis",
                })}
              />
              {errors.password?.type === "minLength" && (
                <span className="text-orange-500 text-2xl">
                  Le mot de passe doit faire au moins 6 caractères
                </span>
              )}
            </div>

            {/* Bouton */}
            <div className="flex justify-center mt-6">
              <ButtonAdd type="submit" text="Se connecter" data-cy="signin-button"/>
            </div>
          </form>

          {/* Lien d'inscription */}
          <div className="flex justify-center gap-2 mt-6 text-sm md:text-base">
            <span className="text-white">Pas de compte ?</span>
            <Link to={"/signup"}>
              <span className="text-orange-500 font-medium hover:underline">
                S'inscrire
              </span>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link to={"/forgetpassword"}>
              <span className="text-orange-500 font-medium hover:underline">
                Mot de passe oublié ?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignInPage;
