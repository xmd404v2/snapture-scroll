import { create } from "zustand";

export const useContractStore = create((set) => {
    contracts: [],
    addContract: (contract) => 
        set((state) => ({
            contracts: [...state.contracts, contract],
        })),
    removeContract: (contractId) => 
        set((state) => ({
            contracts: state.cart.filter(contract => contract.id !== contractId),
        })),
    clearContracts: () => set({ contracts: [] })
})