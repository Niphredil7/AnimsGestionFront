import { Link } from 'react-router'
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'
import ButtonAdd from '../../features/components/buttons/ButtonAdd'
import { useState } from 'react'
import { forgetPassword } from '../../services/auth.service'
import { ChevronLeftIcon } from '../../components/ChevronLeftIcon'


export interface IForgetPasswordInput {
  email: string;
}

export interface IForgetPassInfos {
  email: string;
}

function ForgetPasswordPage() {
 const [serverMessage, setServerMessage] = useState("");

  // Initialisation du formulaire
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForgetPasswordInput>();

  // Mutation react-query
  const mutation = useMutation({
    mutationKey: ["forgetPassword"],
    mutationFn: forgetPassword,
    onSuccess: (msg) => {
      setServerMessage(msg);
      reset(); // vide le champ après envoi
    },
    onError: () => {
      setServerMessage("Erreur serveur. Veuillez réessayer plus tard.");
    },
  });

  // Gestion du submit
  const onSubmit = (data: IForgetPasswordInput) => {
    setServerMessage("");
    mutation.mutate(data);
  };

  return (
    <main>
    <div className="pt-20 bg-[#3C3344] h-screen">
          <Link to="/signin">
            <ChevronLeftIcon aria-label="Retour" size={48} className="text-orange-500 hover:text-orange-800 w-16 h-16 "/>
          </Link>
        </div>
  <div className="bg-[#3C3344]  flex flex-col justify-center items-center">
    {/* Logo plus petit */}
    <img
      src="AnimsGestionLogo.png"
      alt="Logo Anim's Gestion"
      className="w-64 md:w-80 h-auto mb-8 animate-pulse-slow"
    />

    {/* Conteneur  */}
    <div className=" w-full max-w-md md:max-w-lg lg:max-w-xl p-8 md:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-white font-medium text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            role="email"
            className="w-full px-4 py-3 text-gray-900 rounded-lg bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-orange-500"


          />
          {errors.email?.type === "required" && (
            <span className="text-orange-500 text-sm">Vous devez mettre un email</span>
          )}
        </div>



        {/* Bouton */}
        <div className="flex justify-center mt-6">
          <Link to={"/user"}>
            <ButtonAdd text="Envoyer l'email de récupération" />
          </Link>
        </div>

         {/* Message du serveur */}
        {serverMessage && (
          <p className="text-center text-gray-700 text-sm mt-4">
            {serverMessage}
          </p>
        )}
      </form>

      {/* Lien d'inscription */}
      <div className="flex justify-center gap-2 mt-6 text-sm md:text-base">
        <span className="text-white">Pas de compte ?</span>
        <Link to={"/signup"}>
          <span className="text-orange-500 font-medium hover:underline">S'inscrire</span>
        </Link>
      </div>
    </div>
  </div>
  </main>
);

}
 export default ForgetPasswordPage
;



