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
      </div>
    </FormWrapper>
  );
};

export default UserInfoForm;
