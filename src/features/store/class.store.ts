import {create} from 'zustand'
import type { Class } from '../types/class.type'
import { persist } from 'zustand/middleware'


interface StoreClass {
    cls:Class | null


    setClass:(cls:Class) => void
    clearClass:() => void
  
}

export const classStore = create<StoreClass>()(
  persist(
    (set) => ({
      cls:{
    id:"",
    name:"",
    userId:""
},
      setClass:(cls:Class) => set({cls}),
      clearClass:()=> set ({
        cls:null,
      }),
    }),
    {
      name:"class-store",
    }
  )
)

 