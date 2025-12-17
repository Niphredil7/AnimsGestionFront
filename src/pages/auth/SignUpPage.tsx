import { Link, useNavigate } from 'react-router'
import { useForm, type SubmitHandler } from "react-hook-form"
import { useState } from 'react'
import { authService } from '../../services/auth.service'
import type { ISignupData } from '../../features/auth/types/auth.type'
import ButtonAdd from '../../features/components/buttons/ButtonAdd'
import toast from 'react-hot-toast'
import { ChevronLeftIcon } from '../../components/ChevronLeftIcon'




export interface IUserInfos {
  email: string;
  password: string;
  city:string,
  username:string,
}

function SignUpPage() {

 const navigate = useNavigate()
 const signupMutation = authService.signup();

    const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
} = useForm<ISignupData>();

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


  const handleForm: SubmitHandler<ISignupData> = (data: ISignupData) => {

    
    if(data.password === data.confirmPassword) { 
      signupMutation.mutate(data, {
      onSuccess: (response) => {
        toast.success("Création de compte réussie")

        navigate("/signin")
      },
      onError: (error) => {
        console.error("Error signup", error)
        toast.error("Echec de la création du compte")
      } 
    }
  )};
  };


  ;
  return (
    <main className="relative h-[100vh] bg-[#3C3344] flex flex-col pt-6 px-6">
 <div className="absolute top-6 left-6">
    <Link to="/signin" aria-label="Retour">
      <ChevronLeftIcon
        aria-label="Retour"
        size={48}
        className="text-orange-500 hover:text-orange-800 w-16 h-16"
      />
    </Link>
  </div>
   <div className="flex flex-col justify-center items-center flex-grow">
      <img
          src="AnimsGestionLogo.png"
          alt="Logo Anim's Gestion"
          className="w-64 h-auto md:w-80 animate-pulse-slow"
        />
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl p-8 md:p-10">
      <form
        onSubmit={handleSubmit(handleForm)}
        className="w-full"
      >

        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 font-medium text-xl">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            role="username"
            className="w-full text-xl px-3 py-2 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register('username', { required: true })}

          />
                    {errors.email?.type === 'required' && <span className="text-2xl text-orange-500">Vous devez mettre un nom d'utilisateur</span>}
                    </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-xl mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            role="email"
            className="w-full text-xl px-3 py-2 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register('email', { required: true })}

          />
                    {errors.email?.type === 'required' && <span className="text-2xl text-orange-500">Vous devez mettre un email</span>}
                    </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-xl mb-2 font-medium">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            role="password"
            className="w-full text-xl px-3 py-2 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            {...register("password", { required: true, minLength: 8 })}
            onChange={(e) => checkPasswordCriteria(e.target.value)}
          />
          {errors.password?.type === "minLength" && (
            <span className="text-2xl text-orange-500">Le mot de passe doit contenir au moins 8 caractères</span>
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
          <label htmlFor="confirmPassword" className="block text-xl mb-2 font-medium">
            Confirmez le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            role="confirmPassword"
            className="w-full text-xl px-3 py-2 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            {...register('confirmPassword', {
      required: "Vous devez confirmer votre mot de passe",
      validate: (value) =>
        value === watch("password") || "Les mots de passe ne correspondent pas"
    })}
  />
  {errors.confirmPassword && (
    <span className="text-2xl text-orange-500">{errors.confirmPassword.message}</span>
  )}
 
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-xl mb-2 font-medium">
            Ville
          </label>
          <input
            type="text"
            id="city"
            role="city"
            className="w-full text-xl px-3 py-2 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register('city', { required: true })}

          />
                    {errors.email?.type === 'required' && <span className="text-2xl text-orange-500">Vous devez mettre votre ville</span>}
                    </div>

        <div className="flex flex-col items-center">

      <ButtonAdd text="S'inscrire" data-cy="signup-button"/>

      <div className="flex justify-between gap-10 mt-5">
      <span className="text-white">Déjà inscrit ?</span> <Link to={"/signin"} data-cy="signup-link"><span className="text-orange-500 hover:underline">Se connecter</span></Link>
    </div>
      </div>
      </form>
      
    </div>
    </div>
    </main>
  )
}
 export default SignUpPage;



