// import { create } from "zustand";
// import type { User } from "../types/user.type";
// import { persist } from "zustand/middleware";

// interface StoreUser {
//   user: User | null;
//    access_token: string | null;
//      refresh_token: string | null;

//   setUser: (user: User) => void;
//  setTokens:(access:string, refresh:string) => void;
//  getAccessToken:() => string | null;
//  getRefreshToken:() => string | null;
//  setAccessToken: (token: string) => void;
//     setRefreshToken: (token: string) => void;
//  clearTokens:() => void;
//   clearUser:() => void;
// }
// export const userStore = create<StoreUser>()(
//   persist(
//     (set) => ({
//       user: null,
    
//       setUser: (user: User) => set(() => ({ user })),
//       setTokens:(access, refresh) => {
//         localStorage.setItem("access_token", access);
//         localStorage.setItem("refresh_token", refresh)
//         },
//         getAccessToken:() => localStorage.getItem("access_token"),
//         getRefreshToken:() => localStorage.getItem("refresh_token"),
//          setAccessToken: (access_token) => set({ access_token }),
//           setRefreshToken: (refresh_token) => set({ refresh_token }),
//         clearTokens: () => {
//             localStorage.removeItem("access_token");
//             localStorage.removeItem("refresh_token");
//         },
//       clearUser: () => set({
//         user: null,
//         access_token: null,
//          refresh_token: null,
//       }),
//     }),
//     {
//       name: "user-store",
//     }
//   )
// );
