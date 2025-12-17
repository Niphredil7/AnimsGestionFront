interface ButtonDeleteProps {
  bgColor?: string;
  textColor?: string;
  hover?:string
  text?:string


}

export default function ButtonDelete({
  bgColor = "bg-orange-500",
  textColor = "text-white",
  hover ="hover:bg-orange-700",
  text="Supprimer"


}: ButtonDeleteProps) {
  return (
    
    <button
      className={`${bgColor} ${hover} ${textColor} font-semibold py-2 px-4 sm:px-5 md:px-6 lg:px-8 rounded-md shadow-md  text-sm sm:text-base md:text-lg lg:text-2xl`}
    >
      {text}
    </button>
  );
}