
import Planning from '../../features/components/Planning'
import { Link } from 'react-router-dom'
import { addWeeks, getMondayBeforeDate } from '../../utils/planningFunction';
import { classStore } from '../../features/store/class.store';
import { ChevronLeftIcon } from '../../components/ChevronLeftIcon';


export default function PlanningsPage() {
     const today = new Date();
  const currentMonday = getMondayBeforeDate(today);

  const weekOne = addWeeks(currentMonday, 1)
  const weekTwo = addWeeks(currentMonday, 2)
  const weekThree= addWeeks(currentMonday, 3)
  const weekFour = addWeeks(currentMonday, 4)

  const { cls } = classStore()
  
    return(
  <main className="min-h-screen pt-24 bg-white">

          <Link to="/dashboard" aria-label="Retour">
            <ChevronLeftIcon aria-label="Retour" size={48} className="text-orange-500 hover:text-orange-800 w-16 h-16 "/>
          </Link>

       {/* Conteneur centré commun */}
       <div className="max-w-5xl mx-auto flex flex-col gap-10 px-5">
         <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Plannings 
        </h1>
        <h1 className="text-3xl text-gray-900">Classe de {cls?.name}</h1>
        </div>
         {/* Plannings */}
         <h2 className="text-2xl text-gray-900 text-center font-semibold mb-4">
        Semaine du{" "}
        <span className="font-bold">
          {weekOne.toLocaleDateString("fr-FR")}
        </span>
      </h2>
         <Planning monday={weekOne}/>
         <h2 className="text-2xl text-gray-900 text-center font-semibold mb-4">
        Semaine du{" "}
        <span className="font-bold">
          {weekTwo.toLocaleDateString("fr-FR")}
        </span>
      </h2>
         <Planning monday={weekTwo}/>
         <h2 className="text-2xl text-gray-900 text-center font-semibold mb-4">
        Semaine du{" "}
        <span className="font-bold">
          {weekThree.toLocaleDateString("fr-FR")}
        </span>
      </h2>
         <Planning monday={weekThree}/>
         <h2 className="text-2xl text-gray-900 text-center font-semibold mb-4">
        Semaine du{" "}
        <span className="font-bold">
          {weekFour.toLocaleDateString("fr-FR")}
        </span>
      </h2>
         <Planning monday={weekFour}/>
       </div>
     </main>
   );
 }
