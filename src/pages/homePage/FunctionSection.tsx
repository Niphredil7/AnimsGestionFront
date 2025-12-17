import { Eye, Calendar, MapPin, Heart, ClipboardList, Users } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import ButtonSignUp from "../../features/components/buttons/ButtonSignUp";

export default function FunctionSection() {

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const sr = ScrollReveal();

    // récupère explicitement les éléments à l'intérieur de la section
    const parents = sectionRef.current.querySelectorAll(".function-parent");
    const anims = sectionRef.current.querySelectorAll(".function-anim");

    if (parents.length > 0) {
      sr.reveal(parents, {
        distance: "100px",
        origin: "left",
        opacity: 0,
        duration: 1000,
        easing: "ease-in-out",
        viewFactor: 0.2,
        reset: false,
      });
    }

    if (anims.length > 0) {
      sr.reveal(anims, {
        distance: "100px",
        origin: "right",
        opacity: 0,
        duration: 1000,
        easing: "ease-in-out",
        viewFactor: 0.2,
        reset: false,
      });
    }


    return () => {
        sr.destroy();
    };
  }, []);
  
  return (
    <section
      id="function"
      ref={sectionRef}
      className="min-h-screen bg-white py-12 px-6 flex flex-col items-center justify-center"
    >
      <div  className="flex flex-col md:flex-row justify-center items-stretch gap-32 w-full mb-10">
        {/* Pour les parents */}
        <div className="function-parent bg-[#3C3344] shadow-lg rounded-xl p-8 flex-1  md:min-w-[420px] flex flex-col">
          <h2 className="text-3xl lg:text-6xl font-semibold text-white mb-6 text-center">
            Pour les <span className="text-orange-500">parents</span>
          </h2>
          <ul className="space-y-4 text-white text-base md:text-lg lg:text-4xl flex-1 flex flex-col justify-center">
            <li className="flex items-center gap-3 lg:gap-10 lg:pb-10">
              <Eye className="w-6 lg:w-12 h-6 lg:h-12 text-orange-500" />
              <span>Visibilité sur les animations</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-10  lg:pb-10">
              <ClipboardList className="w-6 lg:w-12 h-6 lg:h-12 text-orange-500" />
              <span>Intégrations des informations d'animations</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-10  lg:pb-10">
              <Calendar className="w-6 lg:w-12 h-6 lg:h-12 text-orange-500" />
              <span>Planning précis</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-10  lg:pb-10">
              <MapPin className="w-6 lg:w-12 h-6 lg:h-12 text-orange-500" />
              <span>Proposition de sorties</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-10  lg:pb-10">
              <Heart className="w-6 lg:w-12 h-6 lg:h-12 text-orange-500" />
              <span>Animations en favoris</span>
            </li>
          </ul>
        </div>

        {/* Pour les animateurs */}
        <div id="function-anim" className="function-anim bg-[#3C3344] shadow-lg rounded-xl p-8 flex-1 min-w-[280px] md:min-w-[420px] flex flex-col">
          <h2 className="text-3xl lg:text-6xl font-semibold text-white mb-6 text-center">
            Pour les <span className="text-orange-500">animateurs</span>
          </h2>
       
          <ul className="space-y-4 text-white text-base md:text-lg lg:text-4xl flex-1 flex flex-col justify-center">
            <li className="flex items-center gap-3 lg:gap-10  lg:pb-10">
              <Calendar className="w-6 lg:w-12 h-6 lg:h-12 text-orange-500" />
              <span>Organisation des plannings</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-10  lg:pb-10">
              <MapPin className="w-6 lg:w-12 h-6 lg:h-12 text-orange-500" />
              <span>Propositions d'activités et de sorties</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-10  lg:pb-10">
              <ClipboardList className="w-6 lg:w-12 h-6 lg:h-12 text-orange-500" />
              <span>Gestion du matériel</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-10  lg:pb-10">
              <Eye className="w-6 lg:w-12 h-6 lg:h-12 text-orange-500" />
              <span>Visibilité sur les animations favorites</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-10  lg:pb-10">
              <Users className="w-6 lg:w-12 h-6 lg:h-12 text-orange-500" />
              <span>Visibilité pour employabilité</span>
            </li>
          </ul>

        </div>
      </div>

      <Link to={"/signup"}>
        <ButtonSignUp variant="orange" />
      </Link>
    </section>
  );
}



