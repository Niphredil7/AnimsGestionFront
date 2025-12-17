import { Link, useNavigate } from 'react-router'
import { useForm } from "react-hook-form"
import ButtonSignIn from '../../features/components/buttons/ButtonSignin'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from '../../services/auth.service'
import type { IChangePasswordInputs, IForgotPasswordInputs } from '../../features/auth/types/auth.type'
import { ChevronLeftIcon } from '../../components/ChevronLeftIcon'
import toast from 'react-hot-toast'






function EditForgotPasswordPage() {

 const navigate = useNavigate()

    const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
} = useForm<IForgotPasswordInputs>();


  const [passwordCriteria, setPasswordCriteria] = useState({
    letter: false,
    number: false,
    specialChar: false,
  });

  const checkPasswordCriteria = (value: string) => {
    setPasswordCriteria({
      letter: /[A-Za-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const changePass = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (userPass: IChangePasswordInputs) => changePassword(userPass),
    onSuccess: (data) => {
      toast.success("Changement de mot de passe réussie")
      navigate("/signin");
    },
    onError: (err) => {
      console.error("Erreur :", err);
      toast.error("Echec du changement de mot passe")
    },
  });

  function handleForm(data: IChangePasswordInputs) {
    if (data.password !== data.confirmPassword) return;
    changePass.mutate(data);
  }

 
  return (
    <main>
    <div className="bg-[#3C3344]">
      <Link to="/user/changeprofile">
        <ChevronLeftIcon size={48} aria-label="Retour" className="text-orange-500 hover:text-orange-800 w-16 h-16 "/>
      </Link>
    </div>
    <div className="bg-[#3C3344] h-[100vh] flex flex-col justify-start items-center">
      <img
          src="/AnimsGestionLogo.png"
          alt="Logo Anim's Gestion"
          className="w-64 h-auto md:w-80 animate-pulse-slow"
        />
      <form
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="password"
            role="password"
            className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            {...register("password", { required: true, minLength: 8 })}
            onChange={(e) => checkPasswordCriteria(e.target.value)}
          />
          {errors.password?.type === "minLength" && (
            <span className="text-orange-500">Le mot de passe doit contenir au moins 8 caractères</span>
          )}
        </div>

        {/* Indicateur visuel */}
<div className="flex flex-col space-y-2 mb-6">
  <div className="flex items-center space-x-2">
    <div
      className={`w-4 h-4 rounded-full ${
        passwordCriteria.letter ? "bg-orange-500" : "bg-gray-400"
      }`}
      title="Au moins une lettre"
    ></div>
    <span>Au moins une lettre</span>
  </div>

  <div className="flex items-center space-x-2">
    <div
      className={`w-4 h-4 rounded-full ${
        passwordCriteria.number ? "bg-orange-500" : "bg-gray-400"
      }`}
      title="Au moins un chiffre"
    ></div>
    <span>Au moins un chiffre</span>
  </div>

  <div className="flex items-center space-x-2">
    <div
      className={`w-4 h-4 rounded-full ${
        passwordCriteria.specialChar ? "bg-orange-500" : "bg-gray-400"
      }`}
      title="Au moins un caractère spécial"
    ></div>
    <span>Au moins un caractère spécial</span>
  </div>
</div>

        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-2 font-medium">
            Confirmez le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            role="confirm password"
            className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            {...register('confirmPassword', {
      required: "Vous devez confirmer votre mot de passe",
      validate: (value) =>
        value === watch("password") || "Les mots de passe ne correspondent pas"
    })}
  />
  {errors.confirmPassword && (
    <span className="text-orange-500">{errors.confirmPassword.message}</span>
  )}
 
        </div>

        <div className="flex justify-center">
      <ButtonSignIn text="Changer le mot de passe"/>
      </div>
      </form>

    </div>

    </main>
  )
}
 export default EditForgotPasswordPage;



