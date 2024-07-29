import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { customFirebaseStorage, customSessionStorage } from "../storages";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

const storeApi: StateCreator<PersonState & Actions> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (firstName: string) =>
    set((state) => ({ firstName: firstName })),
  setLastName: (lastName: string) => set((state) => ({ lastName: lastName })),
});

export const usePersonStore = create<PersonState & Actions>()(
  //Este middleware es para almacenar la informacion en el localStorage
  logger(
    devtools(
      persist(storeApi, {
        name: "person-store",
        //storage: customSessionStorage,
        storage: customFirebaseStorage,
      })
    )
  )
);
