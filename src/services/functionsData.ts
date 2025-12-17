import type { Child } from "../features/types/child.type";
import type { IProfileInputs } from "../pages/communPage/EditProfilePage";


export const API_URL = import.meta.env.VITE_API_URL; 



// fetch data children pour parent
export async function getChildrenForParent(): Promise<Child[]> {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/child/parentId`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
    },
  });
  if (!response.ok) throw new Error("Erreur getChildrenForParent");
  return response.json();
}

// fetch data children pour anim ou admin
export async function getChildrenForClass(classId: string): Promise<Child[]> {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/children/class/${classId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
    },
  });
  if (!response.ok) throw new Error("Erreur getChildrenForClass");
  return response.json();
}

export async function updateUserProfile(userId: string, data: IProfileInputs) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/user/changepassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Erreude la mise à jour");
  }

  return response.json();
}






