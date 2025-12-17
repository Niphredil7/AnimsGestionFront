import React, { useState } from 'react'
import NavBar from '../../features/components/NavBar'
import { FaPen } from "react-icons/fa"
import { Link } from 'react-router';
import ButtonAdd from '../../features/components/buttons/ButtonAdd';
import ButtonModify from '../../features/components/buttons/ButtonModify';

interface ISalle {
    id:number,
    name:string
}

const salles: ISalle[] = [
  {
    id: 1,
    name: "Arts Plastiques",
  },
  {
    id: 2,
    name: "Lecture",
  },
  {
    id: 3,
    name: "Cour",
  },
];


export default function RoomPage() {
      const [open, setOpen] = useState(false);
  return (
    <main>


    {/* NE S'AFFICHE PAS !! */}
    <div className="min-h-screen w-screen bg-[#322C39] flex flex-col items-center">
        <div>
      <h1 className="text-white text-4xl md:text-5xl font-bold mt-10 mb-6 text-center">
        Mes salles
      </h1>
      <FaPen onClick={() => setOpen(!open)} className="text-white hover:text-orange-500"/>
        </div>

{open && (
            <div className="absolute right-0 top-12 mt-2 w-56 bg-white text-[#291F09] rounded-lg shadow-lg border border-gray-200 z-50">
              <ul className="py-2">
                <li>
                  <Link to="/admin/salles/ajoutersalle">
                    <ButtonAdd text="Ajouter une salle"/>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/salles/modifiersalle">
                    <ButtonModify text="Modifier une salle"/>
                  </Link>
                </li>
                <li>
                 <Link to="/admin/salles/supprimersalle">
                    <ButtonAdd text="Supprimer une salle"/>
                  </Link>
                </li>
              </ul>
            </div>
          )}

      <div className="bg-white shadow-lg rounded-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 md:p-8">
        {salles.map((salle) => (
          <div
            key={salle.id}
            className="flex items-start gap-4 border-b border-gray-200 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
          >
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{salle.name}</p>
            </div>
          </div>
        ))}

        {salles.length === 0 && (
          <p className="text-center text-gray-500 italic">
            Aucune salles pour le moment.
          </p>
        )}
      </div>
    </div>
    </main>
  )
}
