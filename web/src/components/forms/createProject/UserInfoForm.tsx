import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItems } from "@/components/forms/createProject/CreateNewProject";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const UserInfoForm = ({
  name,
  // email,
  // phone,
  contractAmount,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Personal info"
      description="Please provide your name and intended contract amount."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Stephen King"
            value={name}
            onChange={(e) => updateForm({ name: e.target.value })}
            className="w-full"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="contractAmount">Contract Amount</Label>
          <Input
            type="number"
            name="contractAmount"
            id="contractAmount"
            placeholder="e.g. 1000"
            value={contractAmount}
            onChange={(e) => updateForm({ contractAmount: Number(e.target.value) })}
            className="w-full"
            required
          />
          {errors.contractAmount && <p className="text-red-500 text-sm">{errors.contractAmount}</p>}
        </div>
        {/* <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            value={email}
            className="w-full"
            onChange={(e) => updateForm({ email: e.target.value })}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div> */}
        {/* <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            placeholder="e.g. +1 234 567 890"
            value={phone}
            className="w-full"
            onChange={(e) => updateForm({ phone: e.target.value })}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div> */}
      </div>
    </FormWrapper>
  );
};

export default UserInfoForm;
