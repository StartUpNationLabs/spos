import {create} from "zustand/index";

interface OffersState {
  offers: { name: string }[];
}

export const useOffers = create<OffersState>((set, get) => ({
  offers: [
    {
      name: 'Classic'
    },
    {
      name: 'Cousinade'
    },
    {
      name: 'Company'
    },
  ],
}));
