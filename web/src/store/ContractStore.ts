import { create } from 'zustand';
import type { Edge, Node } from '@xyflow/react';

type Contract = {
  id: number;
  nodes: Node[];
  edges: Edge[];
};

interface ContractState {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
  removeContract: (contractId: number) => void;
  clearContracts: () => void;
}

export const useContractStore = create<ContractState>((set) => ({
  contracts: [],
  addContract: (contract) =>
    set((state) => ({
      contracts: [...state.contracts, contract],
    })),
  removeContract: (contractId) =>
    set((state) => ({
      contracts: state.contracts.filter((contract) => contract.id !== contractId),
    })),
  clearContracts: () => set({ contracts: [] }),
}));
