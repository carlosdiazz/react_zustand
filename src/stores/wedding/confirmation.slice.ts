import { StateCreator } from "zustand";

export interface ConfirmationSlice {
  isConfirmed: boolean;

  setIsConfirmend: (value: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (
  set
) => ({
  isConfirmed: true,

  setIsConfirmend: (isConfirmed) => set({ isConfirmed }),
});
