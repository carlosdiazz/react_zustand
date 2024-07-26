import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = `https://zustand-storage-379ab-default-rtdb.firebaseio.com/zustand`;

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      console.log(data);
      return JSON.stringify(data);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  setItem: async function (name: string, value: string): Promise<unknown> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
    console.log(data);
    return;
  },
  removeItem: function (name: string): unknown | Promise<unknown> {
    console.log(name);
    return null;
  },
};

export const customFirebaseStorage = createJSONStorage(() => storageApi);
