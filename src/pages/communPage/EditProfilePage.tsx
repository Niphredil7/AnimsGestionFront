import { Link, useNavigate } from "react-router";
import ButtonAdd from "../../features/components/buttons/ButtonAdd";
import { userStore } from "../../features/store/user.store";
import { userService } from "../../services/user.service";
import type { IProfileInputs } from "../../utils/ProfileData.type";
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from "formik";

export const ProfileValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Le nom d'utilisateur est obligatoire.")
        .max(50, "Le nom d'utilisateur ne doit pas dépasser 50 caractères."),
        
    email: Yup.string()
        .email("Veuillez saisir une adresse email valide.")
        .required("L'email est obligatoire."),
        
    firstname: Yup.string().optional(),
    
    lastname: Yup.string().optional(),

    address: Yup.string().optional(),
    
    city: Yup.string()
        .required("La ville est obligatoire.")
        .max(100, "La ville ne doit pas dépasser 100 caractères."),
        
    zipCode: Yup.number()
        .nullable() 
        .transform((value, originalValue) => (originalValue === "" ? null : value)) 
        .integer("Le code postal doit être un nombre entier.")
        .test(
            'len', 
            "Le code postal doit contenir 5 chiffres.", 
            val => val === null || (String(val).length === 5)
        )
        .optional(), 
        
    phone: Yup.string().optional(),
    
    available: Yup.string().optional(),
    
    content: Yup.string().optional(),
});

function ProfileEditPage() {
    const navigate = useNavigate();
    const { user, setUser } = userStore();
    const editMutation = userService.editProfile();

    // Formik avec le schéma Yup
    const formik = useFormik<IProfileInputs>({
        initialValues: {
            username: user?.username || '',
            email: user?.email || '',
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
            address: user?.address || '',
            zipCode: user?.zipCode || undefined, 
            city: user?.city || '',
            phone: user?.phone || '',
            available: user?.available || '',
            content: user?.content || '',
        },
        validationSchema: ProfileValidationSchema,
        onSubmit: (values: IProfileInputs) => {
            if (!user || editMutation.isPending) {
                toast.error("Veuillez patienter.");
                return;
            }

            // mutation
            editMutation.mutate(
                { userId: user.id, data: values },
                {
                    onSuccess: (updatedUser) => {
                        toast.success("Profil mis à jour !");
                        setUser(updatedUser); 
                        navigate("/dashboard");
                    },
                    onError: (err: any) => {
                        console.error("Erreur lors de la mise à jour :", err);
                        const msg =
                            err?.response?.data?.message ||
                            "Erreur lors de la mise à jour du profil";
                        toast.error("Echec de la mise à jour du profil");
                    },
                }
            );
        },
    });

    // Fonctions utilitaires pour le style et l'affichage des erreurs
    const isInvalid = (field: keyof IProfileInputs) => 
        formik.touched[field] && formik.errors[field];
    
    const getInputClass = (field: keyof IProfileInputs) =>
        `w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none 
         ${isInvalid(field) ? "border-2 border-orange-500" : "border-transparent"}`;


    return (
        <>
            <Toaster position="top-center" reverseOrder={false}/>
            <div className="min-h-screen flex flex-col items-center justify-center py-10 bg-white pt-32">
                <form
                    onSubmit={formik.handleSubmit} 
                    className="w-full max-w-4xl bg-[#3C3344] shadow-xl rounded-2xl p-8 md:p-10"
                >
                    <h2 className="text-white text-3xl font-semibold mb-8 text-center">
                        Modifier mon profil
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* colonne gauche */}
                        <div className="space-y-4">
                            {/* Nom d'utilisateur */}
                            <div>
                                <label htmlFor="username" className="block mb-2 font-medium text-white">
                                    Nom d'utilisateur{" "}
                                    <span className={isInvalid('username') ? "text-orange-500" : "text-white"}>*</span>
                                </label>
                                <input
                                    id="username"
                                    name="username" 
                                    type="text"
                                    className={getInputClass('username')}
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.username} 
                                />
                                {isInvalid('username') && (
                                    <p className="text-orange-500 text-sm mt-1">
                                        {formik.errors.username}
                                    </p>
                                )}
                            </div>

                            {/* Prénom */}
                            <div>
                                <label htmlFor="firstname" className="block mb-2 font-medium text-white">
                                    Prénom
                                </label>
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    className={getInputClass('firstname')}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstname}
                                />
                                {isInvalid('firstname') && <p className="text-orange-500 text-sm mt-1">{formik.errors.firstname}</p>}
                            </div>

                            {/* Nom */}
                            <div>
                                <label htmlFor="lastname" className="block mb-2 font-medium text-white">Nom</label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    className={getInputClass('lastname')}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastname}
                                />
                                {isInvalid('lastname') && <p className="text-orange-500 text-sm mt-1">{formik.errors.lastname}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block mb-2 font-medium text-white">
                                    Email{" "}
                                    <span className={isInvalid('email') ? "text-orange-500" : "text-white"}>*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={getInputClass('email')}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {isInvalid('email') && (
                                    <p className="text-orange-500 text-sm mt-1">
                                        {formik.errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* colonne droite */}
                        <div className="space-y-4">
                            {/* Adresse */}
                            <div>
                                <label htmlFor="address" className="block mb-2 text-white font-medium">Adresse</label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    className={getInputClass('address')}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                />
                                {isInvalid('address') && <p className="text-orange-500 text-sm mt-1">{formik.errors.address}</p>}
                            </div>

                            {/* Code postal */}
                            <div>
                                <label htmlFor="zipCode" className="block mb-2 font-medium text-white">
                                    Code postal
                                </label>
                                <input
                                    id="zipCode"
                                    name="zipCode"
                                    type="number"
                                    className={getInputClass('zipCode')}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // Afficher une chaîne vide si la valeur est null ou undefined, sinon Formik affiche 0
                                    value={formik.values.zipCode === undefined || formik.values.zipCode === null ? '' : formik.values.zipCode} 
                                />
                                {isInvalid('zipCode') && (
                                    <p className="text-orange-500 text-sm mt-1">
                                        {formik.errors.zipCode}
                                    </p>
                                )}
                            </div>

                            {/* Ville */}
                            <div>
                                <label htmlFor="city" className="block mb-2 font-medium text-white">
                                    Ville{" "}
                                    <span className={isInvalid('city') ? "text-orange-500" : "text-white"}>*</span>
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    className={getInputClass('city')}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                />
                                {isInvalid('city') && (
                                    <p className="text-orange-500 text-sm mt-1">
                                        {formik.errors.city}
                                    </p>
                                )}
                            </div>

                            {/* Téléphone */}
                            <div>
                                <label htmlFor="phone" className="block mb-2 font-medium text-white">
                                    Téléphone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    className={getInputClass('phone')}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                />
                                {isInvalid('phone') && <p className="text-orange-500 text-sm mt-1">{formik.errors.phone}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section supplémentaire */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Disponibilité */}
                        <div>
                            <label htmlFor="available" className="block mb-2 font-medium text-white">
                                Disponibilité
                            </label>
                            <input
                                id="available"
                                name="available"
                                type="text"
                                className={getInputClass('available')}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.available}
                                placeholder="Ex: Tous les week-ends"
                            />
                            {isInvalid('available') && <p className="text-orange-500 text-sm mt-1">{formik.errors.available}</p>}
                        </div>

                        {/* Description / tranche d'âge */}
                        <div>
                            <label htmlFor="content" className="block mb-2 font-medium text-white">
                                Description / tranche d'âge
                            </label>
                            <input
                                id="content"
                                name="content"
                                type="text"
                                className={getInputClass('content')}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.content}
                                placeholder="Ex: Enfants de 6 à 12 ans"
                            />
                            {isInvalid('content') && <p className="text-orange-500 text-sm mt-1">{formik.errors.content}</p>}
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <ButtonAdd 
                            text={editMutation.isPending ? "Mise à jour..." : "Enregistrer les modifications"} 
                            type="submit" 
                            disabled={editMutation.isPending || !formik.isValid} 
                        />
                    </div>
                </form>

                <div className="pt-8">
                    <Link to="changepassword">
                        <ButtonAdd text="Changer mon mot de passe" type="button"></ButtonAdd>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ProfileEditPage;
