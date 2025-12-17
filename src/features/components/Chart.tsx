import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ButtonAdd from "./buttons/ButtonAdd";
import { Link } from "react-router-dom";

import { userStore } from "../store/user.store";
import { classService } from "../../services/class.service";
import { classStore } from "../store/class.store";
import { childService } from "../../services/child.service";

export default function GenderChart() {
  const { user } = userStore();
  const { setClass } = classStore();

  const role = user?.role; // "ANIMATOR", "COORDO", etc.
  const isCoordo = role === "COORDO";
  const isAnimator = role === "ANIMATOR";

  // 👉 pour un ANIMATOR : on récupère sa classe
  const { data: classe } = classService.getMyClass();

  useEffect(() => {
    if (classe && isAnimator) {
      setClass(classe);
    }
  }, [classe, isAnimator, setClass]);

  // 👉 choix de l'API selon le rôle
  const genderQuery = isCoordo
    ? childService.getGenderPercentage()
    : childService.getGenderPercentageByClass();

  const { data: genderData = [0, 0], isLoading, error } = genderQuery;

  const [options] = useState<ApexOptions>({
    chart: {
      type: "pie",
      toolbar: { show: false },
    },
    labels: ["Filles", "Garçons"],
    colors: ["#FF69B4", "#1E90FF"],
    legend: {
      show: false,
    },
  });

  const series = genderData;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl w-full shadow-lg flex flex-col p-5">
        <p className="text-gray-600">Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl w-full shadow-lg flex flex-col p-5">
        <p className="text-orange-500">
          Erreur lors du chargement de la répartition filles / garçons.
        </p>
      </div>
    );
  }

  return (
    <section>
      {/* MOBILE */}
      <div className="h-full max-w-screen w-full block md:hidden">
        <div className="bg-white rounded-2xl w-full shadow-lg flex flex-col p-5">
          <h2 className="lg:text-2xl sm:text-xl font-semibold text-gray-800 mb-6">
            Répartition filles / garçons
          </h2>

          {/* chart + légende en colonne */}
          <div className="flex flex-col gap-4">
  {/* CHART centré */}
  <div className="w-full flex justify-center">
    <div className="max-w-xs w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width="100%"
      />
    </div>
  </div>

  {/* LÉGENDE alignée à gauche */}
  <div className="flex flex-col gap-3 w-full">
    <div className="flex gap-2 items-center">
      <span className="w-4 h-4 rounded-full bg-[#FF69B4]"></span>
      <span className="text-gray-700 font-medium">Filles</span>
    </div>

    <div className="flex gap-2 items-center">
      <span className="w-4 h-4 rounded-full bg-[#1E90FF]"></span>
      <span className="text-gray-700 font-medium">Garçons</span>
    </div>
  </div>
</div>
          {isAnimator && (
            <div className="flex flex-col justify-around gap-5 mt-4 w-full">
              <ButtonAdd text="Ajouter une sortie" className="w-full" />
              <Link to="plannings" className="w-full">
                <ButtonAdd
                  text="Voir les autres plannings"
                  className="w-full"
                />
              </Link>
            </div>
          )}
          {isCoordo && (
            <div className="flex flex-col justify-around gap-5 mt-4 w-full">
              <ButtonAdd text="Voir les sortie" className="w-full" />
              <Link to="plannings" className="w-full">
                <ButtonAdd
                  text="Voir les autres plannings"
                  className="w-full"
                />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="h-full max-w-screen hidden md:block">
        <div className="bg-white rounded-2xl w-full shadow-lg flex flex-col p-5">
          <h2 className="lg:text-2xl sm:text-xl font-semibold text-gray-800 mb-6">
            Répartition filles / garçons
          </h2>

          <div className="flex justify-between">
            <div className="flex">
              <div id="chart">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="pie"
                  width="100%"
                />
              </div>

              <div className="flex flex-col gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#FF69B4]"></span>
                  <span className="text-gray-700 font-medium">Filles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#1E90FF]"></span>
                  <span className="text-gray-700 font-medium">Garçons</span>
                </div>
              </div>
            </div>

            {isAnimator && (
              <div className="flex flex-col justify-around gap-5">
                <ButtonAdd text="Ajouter une sortie" />
                <Link to="plannings">
                  <ButtonAdd text="Voir les autres plannings" />
                </Link>
              </div>
            )}
            {isCoordo && (
              <div className="flex flex-col justify-around gap-5">
                <ButtonAdd text="Voir les sorties" />
                <Link to="plannings">
                  <ButtonAdd text="Voir les autres plannings" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
