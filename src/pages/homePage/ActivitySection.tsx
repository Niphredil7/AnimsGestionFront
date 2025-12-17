import { MdSportsBasketball } from "react-icons/md"
import { FaPencilRuler, FaBookReader, FaTheaterMasks  } from "react-icons/fa"
import { GiGardeningShears,GiTransportationRings  } from "react-icons/gi"
import { GrYoga } from "react-icons/gr"
import { CgGym } from "react-icons/cg"
import { useEffect, useRef, type JSX } from 'react';
import ScrollReveal from "scrollreveal";
import { Card, CardContent } from "../../features/components/ui/Cart"

interface IActivity {
  name: string;
  icon: JSX.Element;
}

const activity: IActivity[] = [
  { name: "Sport", icon: <MdSportsBasketball size={40} className="text-white" />},
  { name: "Arts Plastiques", icon: <FaPencilRuler size={40} className="text-white" />},
  { name: "Jardinage", icon: <GiGardeningShears size={40} className="text-white" />},
  { name: "Lecture", icon: <FaBookReader size={40} className="text-white" />},
  { name: "Yoga", icon: <GrYoga size={40} className="text-white" />},
  { name: "Gym", icon: <CgGym size={40} className="text-white" />},
  { name: "Danse", icon: <GiTransportationRings  size={40} className="text-white" />},
  { name: "Théâtre", icon: <FaTheaterMasks  size={40} className="text-white" />},
];

export default function ActivitySection() {

   const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const sr = ScrollReveal();

    // récupère explicitement les éléments à l'intérieur de la section
    const activity = sectionRef.current.querySelectorAll(".activity");

    if (activity.length > 0) {
      sr.reveal(activity, {
        distance: "100px",
        origin: "bottom",
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
    <section id="activity" ref={sectionRef} className="bg-[#3C3344] py-16 px-6 sm:px-10">
      <h2 className="text-center text-4xl sm:text-5xl font-bold text-white mb-12 lg:text-7xl">
        Activités et sorties
      </h2>
      <div className="bg-white rounded-2xl py-10 px-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10 justify-items-center">
        {activity.map((activity, a) => (
          <Card
            key={a}
            className="activity w-64 sm:w-72 xl:w-80 rounded-2xl shadow-md transform transition-transform duration-300 hover:scale-105 bg-[#896159]"
          >
            <CardContent className=" flex flex-col items-center justify-center p-6 sm:p-8 text-center">
              {activity.icon}
              <p className="mt-3 lg:text-4xl sm:text-xl font-semibold text-white">{activity.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </section>
  );
}

