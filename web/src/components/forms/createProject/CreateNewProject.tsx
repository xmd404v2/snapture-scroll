import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMultiplestepForm } from "@/app/hooks/useMultiplestepForm";
import { AnimatePresence, motion } from "framer-motion";
import UserInfoForm from "@/components/forms/createProject/UserInfoForm";
import PlanForm from "@/components/forms/createProject/PlanForm";
import AddonsForm from "@/components/forms/createProject/AddonsForm";
import FinalStep from "@/components/forms/createProject/FinalStep";
import SuccessMessage from "@/components/forms/createProject/SuccessMessage";
import SideBar from "@/components/forms/createProject/SideBar";

interface AddOn {
  id: number;
  checked: boolean;
  title: string;
  subtitle: string;
  price: number;
}

export type FormItems = {
  name: string;
  email: string;
  phone: string;
  plan: "arcade" | "advanced" | "pro";
  yearly: boolean;
  addOns: AddOn[];
};

const initialValues: FormItems = {
  name: "",
  email: "",
  phone: "",
  plan: "arcade",
  yearly: false,
  addOns: [
    { id: 1, checked: true, title: "Online Service", subtitle: "Access to multiple games", price: 1 },
    { id: 2, checked: false, title: "Large Storage", subtitle: "Extra 1TB of cloud save", price: 2 },
    { id: 3, checked: false, title: "Customizable Profile", subtitle: "Custom theme on your profile", price: 2 },
  ],
};

interface CreateNewProjectProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateNewProject({ isOpen, onClose }: CreateNewProjectProps) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(4);

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const { name, email, phone } = fieldToUpdate;

    if (name && name.trim().length < 3) {
      setErrors((prevState) => ({ ...prevState, name: "Name should be at least 3 characters long" }));
    } else if (name && name.trim().length > 15) {
      setErrors((prevState) => ({ ...prevState, name: "Name should be no longer than 15 characters" }));
    } else {
      setErrors((prevState) => ({ ...prevState, name: "" }));
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevState) => ({ ...prevState, email: "Please enter a valid email address" }));
    } else {
      setErrors((prevState) => ({ ...prevState, email: "" }));
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      setErrors((prevState) => ({ ...prevState, phone: "Please enter a valid 10-digit phone number" }));
    } else {
      setErrors((prevState) => ({ ...prevState, phone: "" }));
    }

    setFormData({ ...formData, ...fieldToUpdate });
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    nextStep();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
  className="bg-[#262626] p-4 rounded-lg shadow-lg w-[95vw] max-h-[95vh] flex flex-col"
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: -50, opacity: 0 }}
  onClick={(e) => e.stopPropagation()}
>
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-white text-xl font-semibold">Create New Project</h2>
    <Button onClick={onClose} variant="ghost">✖</Button>
  </div>

  {/* Content Area: Sidebar & Form */}
  <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
    {/* Sidebar: displays full width on mobile (top), and on left on desktop */}
    {!showSuccessMsg && <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />}

    {"\u00A0"} {"\u00A0"} {"\u00A0"}

    {/* Form Content */}
    <div className="flex-1 overflow-y-auto">
      {showSuccessMsg ? (
        <AnimatePresence mode="wait">
          <SuccessMessage />
        </AnimatePresence>
      ) : (
        <form onSubmit={handleOnSubmit} className="flex flex-col h-full">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {currentStepIndex === 0 && (
                <UserInfoForm key="step1" {...formData} updateForm={updateForm} errors={errors} />
              )}
              {currentStepIndex === 1 && (
                <PlanForm key="step2" {...formData} updateForm={updateForm} />
              )}
              {currentStepIndex === 2 && (
                <AddonsForm key="step3" {...formData} updateForm={updateForm} />
              )}
              {currentStepIndex === 3 && (
                <FinalStep key="step4" {...formData} goTo={goTo} />
              )}
            </AnimatePresence>
          </div>
          {/* Navigation Buttons */}
          <div className="w-full flex justify-between mt-4">
            <Button
              onClick={previousStep}
              type="button"
              variant="ghost"
              className={isFirstStep ? "invisible" : "visible p-0 text-neutral-200 hover:text-white"}
            >
              Go Back
            </Button>
            <Button type="submit" className="bg-neutral-900 text-white px-4 py-2 rounded-lg">
              {isLastStep ? "Confirm" : "Next Step"}
            </Button>
          </div>
        </form>
      )}
    </div>
  </div>
</motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
