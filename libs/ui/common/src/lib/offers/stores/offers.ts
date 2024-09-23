import {create} from "zustand/index";

interface OffersState {
  offers: { name: string, availableDishesIds: number[] }[];
}

export const useOffers = create<OffersState>((set, get) => ({
  offers: [
    {name: 'Classic', availableDishesIds: [1,2,3,4,5,6,7,8,9,10,11,12]},
    {name: 'Cousinade', availableDishesIds: [1,2,3,4,5,7,10,11]},
    {name: 'Company', availableDishesIds: [1,2,6,7,8,9,10,11,12]}
  ],
}));
