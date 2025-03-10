"use client";

import FormWrapper from "./FormWrapper";
import { FormItems } from "@/components/forms/createProject/CreateNewProject";

type StepProps = FormItems & {
  goTo: (index: number) => void;
  readOnly?: boolean;
};

const FinalStep = ({ goTo, readOnly = false }: StepProps) => {
  return (
    <FormWrapper
      title="Workflow Visualizer"
      description="Visualize your workflow structure and dependencies."
    >
      <div className="flex items-center justify-center p-8">
        <h2 className="text-2xl font-semibold text-white">
          Workflow Visualizer
        </h2>
      </div>
    </FormWrapper>
  );
};

export default FinalStep;
