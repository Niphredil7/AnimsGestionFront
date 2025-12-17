

interface ButtonSignUpProps {
 variant?: "white" | "orange"


}

const variants = {
  white: "bg-white hover:bg-gray-300 text-[#c25305] focus:ring-gray-300",
  orange: "bg-orange-500 hover:bg-orange-700 text-white focus:ring-orange-400",
} as const;

export default function ButtonSignUp({
  variant = "white"
}: ButtonSignUpProps) {
  return (

    <button
      className={`font-semibold py-2 px-4 sm:px-5 md:px-6 lg:px-8 rounded-md shadow-md transition text-sm sm:text-base md:text-lg lg:text-6xl ${variants[variant]}`}
    >
      S'inscrire
    </button>
  );
}