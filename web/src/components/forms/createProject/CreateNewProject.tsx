import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useMultiplestepForm } from "@/app/hooks/useMultiplestepForm";
import { AnimatePresence, motion } from "framer-motion";
import UserInfoForm from "@/components/forms/createProject/UserInfoForm";
import WorkFlowForm from "@/components/forms/createProject/WorkFlowForm";
import FinalStep from "@/components/forms/createProject/FinalStep";
import SuccessMessage from "@/components/forms/createProject/SuccessMessage";
import SideBar from "@/components/forms/createProject/SideBar";

export type FormItems = {
  name: string;
  contractAmount: number;
  jobName: string;
  jobDescription: string;
  jobType: string;
  email: string;
  phone: string;
};

const initialValues: FormItems = {
  name: "",
  contractAmount: 0,
  jobName: "",
  jobDescription: "",
  jobType: "Job",
  email: "",
  phone: "",
};

interface CreateNewProjectProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "job" | "payment";
  initialData?: Partial<FormItems>;
}

export default function CreateNewProject({ 
  isOpen, 
  onClose, 
  mode, 
  initialData = {} 
}: CreateNewProjectProps) {
  const [formData, setFormData] = useState({ ...initialValues, ...initialData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(2);

  useEffect(() => {
    if (isOpen && mode) {
      if (mode === "job") {
        goTo(1);
      } else if (mode === "payment") {
        goTo(2);
      }
    }
  }, [isOpen, mode, goTo]);

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const { name, email, phone, contractAmount, jobName, jobDescription, jobType } = fieldToUpdate;

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

    if (jobName && jobName.trim().length < 3) {
      setErrors((prevState) => ({ ...prevState, jobName: "Job name should be at least 3 characters long" }));
    } else {
      setErrors((prevState) => ({ ...prevState, jobName: "" }));
    }

    if (jobDescription && jobDescription.trim().length < 3) {
      setErrors((prevState) => ({ ...prevState, jobDescription: "Job description should be at least 3 characters long" }));
    } else {
      setErrors((prevState) => ({ ...prevState, jobDescription: "" }));
    }

    console.log('Updating form with:', fieldToUpdate);
    setFormData((prevData) => {
      const newData = { ...prevData, ...fieldToUpdate };
      console.log('New form data:', newData);
      return newData;
    });
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    nextStep();
  };

  const isReadOnly = mode === "payment";

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
            className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg max-w-[95vw] max-h-[95vh] flex flex-col"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black text-xl font-semibold">
                {mode === "job" ? "Create New Job" : 
                 mode === "payment" ? "Payment Details" : 
                 "Create New Project"}
              </h2>
              <Button onClick={onClose} variant="ghost">✖</Button>
            </div>

            {/* Content Area: Sidebar & Form */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Only show sidebar if not in a specific mode */}
              {!showSuccessMsg && !mode && <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />}

              {"\u00A0"} {"\u00A0"} {"\u00A0"}

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto [&_label]:text-black">
                {showSuccessMsg ? (
                  <AnimatePresence mode="wait">
                    <SuccessMessage name={formData.name} jobName={formData.jobType === 'Job' ? formData.jobName : undefined} />
                  </AnimatePresence>
                ) : (
                  <form onSubmit={handleOnSubmit} className="flex flex-col h-full">
                    <div className="flex-1">
                      <AnimatePresence mode="wait">
                        {currentStepIndex === 0 && (
                          <UserInfoForm 
                            key="step1" 
                            {...formData} 
                            updateForm={updateForm} 
                            errors={errors}
                            readOnly={isReadOnly} 
                          />
                        )}
                        {currentStepIndex === 1 && (
                          <WorkFlowForm 
                            key="step2" 
                            {...formData} 
                            updateForm={updateForm} 
                            errors={errors}
                            readOnly={isReadOnly} 
                          />
                        )}
                        {currentStepIndex === 2 && (
                          <FinalStep 
                            key="step3" 
                            {...formData} 
                            goTo={goTo}
                            readOnly={isReadOnly} 
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="w-full flex justify-between mt-4">
                      <Button
                        onClick={previousStep}
                        type="button"
                        variant="ghost"
                        className={isFirstStep || isReadOnly ? "invisible" : "visible p-0 text-black-900 hover:text-black-700"}
                      >
                       ←  Go Back
                      </Button>
                      {!isReadOnly && (
                        <Button type="submit" className="bg-neutral-900 text-white px-4 py-2 rounded-lg">
                          {isLastStep ? "Confirm" : "Next Step"}
                        </Button>
                      )}
                      {isReadOnly && (
                        <Button onClick={onClose} className="bg-neutral-900 text-white px-4 py-2 rounded-lg">
                          Close
                        </Button>
                      )}
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
