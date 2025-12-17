import { Switch } from '@headlessui/react';
import { FiEdit2 } from 'react-icons/fi';
import { useState } from 'react';
import ButtonAdd from '../buttons/ButtonAdd';

interface CVCartProps {
  parent?: boolean;
  visitor?: boolean;
}

export default function CVCart({ parent = false, visitor = true }: CVCartProps) {
  const [cvPublic, setCvPublic] = useState(false);

  // 👉 Ne rien afficher si c’est un parent
  if (parent) return null;

if(visitor)
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-[90%] md:w-[90%] lg:w-[90%] mt-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-medium text-gray-700">CV public</span>
          <Switch
            checked={cvPublic}
            onChange={setCvPublic}
            className={`${
              cvPublic ? "bg-green-500" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition`}
          >
            <span
              className={`${
                cvPublic ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <button className="flex items-center text-orange-500 hover:text-orange-700 transition">
          <FiEdit2 className="text-xl" />
        </button>
      </div>

      <ButtonAdd text="Télécharger mon CV (PDF)" />

      <div className="bg-gray-100 w-full h-64 rounded-xl flex items-center justify-center text-6xl font-bold text-gray-400">
        CV
      </div>
    </div>
  );
}
