

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonAddProps extends NativeButtonProps {
  bgColor?: string;
  textColor?: string;
  hover?: string;
  text?: string;
  loading?: boolean;
}

export default function ButtonAdd({
  bgColor = "bg-orange-500",
  textColor = "text-white",
  hover = "hover:bg-orange-700",
  text = "Ajouter",
  loading = false,
  disabled,
  className = "",
  ...props 

}: ButtonAddProps) {
  return (
    
    <button
      type={props.type ?? "submit"}
      disabled={loading || disabled}
      className={`
        ${bgColor} ${hover} ${textColor}
        font-semibold py-2 px-4 sm:px-5 md:px-6 lg:px-8 rounded-md shadow-md
        text-sm sm:text-base md:text-lg lg:text-2xl
        transition duration-200
        ${loading || disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? "Chargement..." : text}
    </button>
  );
}
