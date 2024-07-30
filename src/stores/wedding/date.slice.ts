import { StateCreator } from "zustand";

export interface DateSlice {
  eventDate: Date; //Number, string, primitivo se recomienda manejarlo

  eventYYYYMMDD: () => string;
  eventHHMM: () => string;

  setEventDate: (parcialDate: string) => void;
  setEventTime: (parcialTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),

  eventHHMM: () => {
    // padStart agrega un 0 si no tiene una longitud de dos
    const hours = get().eventDate.getHours().toString().padStart(2, "0");
    const minutes = get().eventDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  },

  eventYYYYMMDD: () => {
    return get().eventDate.toISOString().split("T")[0];
  },

  setEventDate: (parcialDate) =>
    set((state) => {
      const date = new Date(parcialDate);

      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate() + 1;

      const newDate = new Date(state.eventDate);
      newDate.setFullYear(year, month, day);

      return { eventDate: newDate };
      //console.log({ year, month, day });
    }),

  setEventTime: (parcialTime) =>
    set((state) => {
      const hours = parseInt(parcialTime.split(":")[0]);
      const minutes = parseInt(parcialTime.split(":")[1]);

      const newDate = new Date(state.eventDate);
      newDate.setHours(hours, minutes);

      return { eventDate: newDate };
    }),
});
