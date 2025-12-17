import { Link, useNavigate } from 'react-router'
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'
import ButtonAdd from '../../features/components/buttons/ButtonAdd'
import { useState } from 'react'
import { verifyCode } from '../../services/auth.service'


export interface ICodeInput {
  code: string;
}

function CodePage() {
    const navigate = useNavigate();
 const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICodeInput>();


  const mutation = useMutation({
    mutationKey: ["verifyCode"],
    mutationFn: verifyCode,
    onSuccess: (msg) => {
      setServerMessage(msg);
     if (msg.includes("validé")) {
        navigate("/newpassword"); //seulement si le code est bon
      }
      reset();
    },
    onError: () => {
      setServerMessage("Erreur serveur. Veuillez réessayer plus tard.");
    },
  });

  // Gestion du submit
  const onSubmit = (data: ICodeInput) => {
    setServerMessage("");
    mutation.mutate(data);
  };

  return (
  <main className="bg-[#3C3344] h-screen flex flex-col justify-center items-center">
    {/* Logo plus petit */}
    <img
      src="AnimsGestionLogo.png"
      alt="Logo Anim's Gestion"
      className="w-64 md:w-80 h-auto mb-8 animate-pulse-slow"
    />

    {/* Conteneur du formulaire */}
    <div className=" w-full max-w-md md:max-w-lg lg:max-w-xl p-8 md:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Email */}
        <div className="mb-6">
          <label htmlFor="text" className="block mb-2 text-white font-medium text-lg">
            Code de récupération
          </label>
          <input
            type="text"
            id="code"
            role="code"
            className="w-full px-4 py-3 text-gray-900 rounded-lg bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-orange-500"
            {...register("code", { required: true })}

          />
         {errors.code && (
              <span className="text-orange-500 text-sm mt-1 block">
                {errors.code.message}
              </span>
            )}
        </div>



        {/* Bouton */}
        <div className="flex justify-center mt-6">
            <ButtonAdd text="Envoyer le code de récupération" />
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
  </main>
);

}
 export default CodePage
;



