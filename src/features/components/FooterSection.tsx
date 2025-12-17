export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#3C3344] text-white py-5 px-8">
      <div className="flex justify-center items-center">
        <img
          src="/AnimsGestionLogo.png"
          alt="Anim's Gestion"
          className="h-20 w-auto"
        />
        <div className="flex justify-between items-center">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            © {currentYear} —{" "}
            <span className="font-semibold">
              Lena Foucteau - Anim's Gestion
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-center pl-20">
        <p>All rights reserved</p>
      </div>
    </footer>
  );
}
