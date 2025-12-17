import { Link, useNavigate } from "react-router";
import ButtonSignIn from "../../features/components/buttons/ButtonSignin";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import type { IChangePasswordInputs } from "../../features/auth/types/auth.type";
import { userStore } from "../../features/store/user.store";
import { userService } from "../../services/user.service";
import { ChevronLeftIcon } from "../../components/ChevronLeftIcon";


export const PasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required(
    "Le mot de passe actuel est obligatoire."
  ),

  // Nouveau mot de passe
  password: Yup.string()
    .required("Le mot de passe est obligatoire")
    .min(8, "Le mot de passe doit avoir au moins 8 caractères.")
    .matches(/[A-Za-z]/, "Le mot de passe doit contenir au moins une lettre.")
    .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Le mot de passe doit contenir au moins un caractère spécial."
    ),

  // Confirmation du mot de passe
  confirmPassword: Yup.string()
    .required("La confirmation du mot de passe est obligatoire.")
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas."),
});

function PasswordEditPage() {
  const navigate = useNavigate();
      const { user } = userStore();
      const editPasswordMutation = userService.editPassword();

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

  const formik = useFormik<IChangePasswordInputs>({
        initialValues: {
            currentPassword: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: PasswordValidationSchema,
        onSubmit: (values: IChangePasswordInputs) => {
            if (!user || editPasswordMutation.isPending) {
                toast.loading("Veuillez patienter.");
                return;
            }
            
            if (values.password === values.confirmPassword) {
                editPasswordMutation.mutate({ userId: user.id, data: values }, {
                    onSuccess:() => {
                        toast.success("Mot de passe mis à jour");
                        navigate("/dashboard");
                        formik.resetForm();
                    },
                    onError: (err:any) => {
                        console.error("Erreur lors de la mise à jour.", err);
                        const msg = err?.message || "Erreur lors de la mise à jour du mot de passe";
                        console.error(msg)
                        toast.error("Echec du changement de mot de passe")
                    },
                });
            } else {
                toast.error("Les mots de passe ne correspondent pas.");
            }
        },
    });

  const isInvalid = (field: keyof IChangePasswordInputs) =>
    formik.touched[field] && formik.errors[field];
  const getInputClass = (field: keyof IChangePasswordInputs) =>
    `w-full text-2xl px-3 py-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500
         ${
           isInvalid(field) ? "border-2 border-red-500" : "border-transparent"
         }`;

  return (
    <>
      <Toaster />
      <div className="pt-20 bg-[#3C3344] h-screen ">
        <Link to="changeprofile" aria-label="Back">
          <ChevronLeftIcon aria-label="Back" size={48} className="text-orange-500 hover:text-orange-800 w-16 h-16 " />
        </Link>

        <div className="bg-[#3C3344] flex flex-col justify-center items-center">
          <img
            src="/AnimsGestionLogo.png"
            alt="Logo Anim's Gestion"
            className="w-64 h-auto md:w-80 animate-pulse-slow"
          />
          <div className=" w-full max-w-md md:max-w-lg lg:max-w-xl p-8 md:p-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="block text-2xl mb-2 font-medium"
                >
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  role="currentPassword"
                  className={getInputClass("currentPassword")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currentPassword}
                />
                {isInvalid("currentPassword") && (
                  <span className="text-2xl text-orange-500">
                    {formik.errors.currentPassword}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-2xl mb-2 font-medium"
                >
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  role="password"
                  className={getInputClass("password")}
                  onChange={(e) => {
                    formik.handleChange(e);
                    checkPasswordCriteria(e.target.value); // Maintien de l'indicateur visuel
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {isInvalid("password") && (
                  <span className="text-2xl text-orange-500">
                    {formik.errors.password}
                  </span>
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
                      passwordCriteria.specialChar
                        ? "bg-orange-500"
                        : "bg-gray-400"
                    }`}
                    title="Au moins un caractère spécial"
                  ></div>
                  <span>Au moins un caractère spécial</span>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-2xl mb-2 font-medium"
                >
                  Confirmez le mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  role="confirmPassword"
                  className={getInputClass("confirmPassword")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {isInvalid("confirmPassword") && (
                  <span className="text-2xl text-orange-500">
                    {formik.errors.confirmPassword}
                  </span>
                )}
              </div>

              <div className="flex justify-center">
                <Link to={"/signin"}>
                  <ButtonSignIn text="Changer le mot de passe" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default PasswordEditPage;
