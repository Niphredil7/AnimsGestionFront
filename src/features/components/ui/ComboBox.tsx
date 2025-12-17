import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { userService } from "../../../services/user.service";
import { userStore } from "../../../features/store/user.store";

// adapte ce type à ton projet si tu en as déjà un
type AppUser = {
  id: string;
  username: string;
  role: string;
  schoolId?: string | null;
};

export default function SearchUser() {
  const { user } = userStore();            // coordo connecté
  const schoolId = user?.schoolId ?? null;

  // 🔹 hook React Query -> DOIT être dans le composant
  const {
    data: users = [],
    isLoading,
    error,
  } = userService.getAllUsers();

  // 🔹 ne garder que les animateurs de la même école
  const animators: AppUser[] = useMemo(
    () =>
      (users as AppUser[]).filter(
        (u) =>
          u.role === "ANIMATOR" &&
          (schoolId ? u.schoolId === schoolId : true)
      ),
    [users, schoolId]
  );

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AppUser | null>(null);

  const filteredAnimators =
    query === ""
      ? animators
      : animators.filter((a) =>
          a.username.toLowerCase().includes(query.toLowerCase())
        );

  // états de base
  if (!user || user.role !== "COORDO") {
    return (
      <p className="text-sm text-gray-500">
        Ce sélecteur est réservé au coordinateur.
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-sm text-gray-500">Chargement des animateurs...</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-red-500">
        Erreur lors du chargement des utilisateurs.
      </p>
    );
  }

  if (animators.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Aucun animateur trouvé pour cette école.
      </p>
    );
  }

  return (
    <div className="mx-auto h-screen w-52 pt-20">
      <Combobox
        value={selected}
        onChange={(value: AppUser) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(user: AppUser | null) => user?.username ?? ""}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-(--input-width) rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:--spacing(1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredAnimators.map((anim) => (
            <ComboboxOption
              key={anim.id}
              value={anim}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{anim.username}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
