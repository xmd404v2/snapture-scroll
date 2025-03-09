'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface FormData {
  name: string;
  contractAmount: number;
  jobName: string;
  jobDescription: string;
  jobType: string;
  email: string;
  phone: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const FormContext = createContext<FormContextType>({
  formData: {
    name: '',
    contractAmount: 0,
    jobName: '',
    jobDescription: '',
    jobType: '',
    email: '',
    phone: '',
  },
  setFormData: () => {},
});

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contractAmount: 0,
    jobName: '',
    jobDescription: '',
    jobType: '',
    email: '',
    phone: '',
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
} 