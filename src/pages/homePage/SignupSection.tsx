import { Link } from "react-router";
import ButtonSignUp from "../../features/components/buttons/ButtonSignUp";

function SignUpSection() {
  return (
    <section className="flex flex-col items-center justify-between px-6 md:px-16 py-12 bg-[#F5F5F5]">


        <p className="text-gray-700 mb-4 leading-relaxed lg:text-2xl">
          En tant que <span className="text-orange-600 font-bold">visiteur</span>, vous pouvez vous inscrire, pour être visible par les écoles en cas de recherche d'un emploi.
          Votre profil peut être visible ou non, ainsi que votre CV si vous le transmettez.</p>
            <Link to={"/signup"} data-cy="link-signup">
            <ButtonSignUp variant="orange"/>
            </Link>
    </section>
  );
}

export default SignUpSection;

