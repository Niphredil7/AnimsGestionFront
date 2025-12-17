import React, { useState } from 'react'
import NavBar from '../../features/components/NavBar'
import ButtonAdd from '../../features/components/buttons/ButtonAdd';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router';
import ButtonModify from '../../features/components/buttons/ButtonModify';

interface IMaterial {
    id:number,
    name:string
}

const materials: IMaterial[] = [
  {
    id: 1,
    name: "Sport",
  },
  {
    id: 2,
    name: "Peinture",
  },
  {
    id: 3,
    name: "Jardinage",
  },
];

export default function PageSalles() {
      const [open, setOpen] = useState(false);
  return (
    <>


    {/* NE S'AFFICHE PAS !! */}
    <div className="min-h-screen w-screen bg-[#322C39] flex flex-col items-center">
        <div>
      <h1 className="text-white text-4xl md:text-5xl font-bold mt-10 mb-6 text-center">
        Le matériel
      </h1>
      <FaPen  onClick={() => setOpen(!open)} className="text-white hover:text-orange-500"/>
        </div>
        {open && (
            <div className="absolute right-0 top-12 mt-2 w-56 bg-white text-[#291F09] rounded-lg shadow-lg border border-gray-200 z-50">
              <ul className="py-2">
                <li>
                  <Link to="/admin/salles/ajoutermateriel">
                    <ButtonAdd text="Ajouter un matériel"/>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/salles/modifiermateriel">
                    <ButtonModify text="Modifier un matériel"/>
                  </Link>
                </li>
                <li>
                 <Link to="/admin/salles/supprimermateriel">
                    <ButtonAdd text="Supprimer un matériel"/>
                  </Link>
                </li>
              </ul>
            </div>
          )}
      <div className="bg-white shadow-lg rounded-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 md:p-8">
        {materials.map((material) => (
          <div
            key={material.id}
            className="flex items-start gap-4 border-b border-gray-200 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
          >
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{material.name}</p>
            </div>
          </div>
        ))}

        {materials.length === 0 && (
          <p className="text-center text-gray-500 italic">
            Aucun métriaux pour le moment.
          </p>
        )}

        <ButtonAdd text="Ajouter du matériel"/>
      </div>
    </div>
    </>
  )
}
