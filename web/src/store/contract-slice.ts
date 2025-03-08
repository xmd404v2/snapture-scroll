type ContractState = {
    fullName: string;
    contractAmount: number;
    jobName: string;
    jobDescription: string;
}


type ContractActions = {
    addContract: () => void;
    removeContract: () => void;
}

export type ContractSlice = ContractState & ContractActions;