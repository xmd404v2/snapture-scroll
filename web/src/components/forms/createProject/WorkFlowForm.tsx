import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItems } from "@/components/forms/createProject/CreateNewProject";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const WorkFlowForm = ({
  jobName,
  jobDescription,
  jobType,
  contractAmount,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Workflow Info"
      description="Choose you workflow type and fill out respective form."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="jobType">Type</Label>
          <select
            name="jobType"
            id="jobType"
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            value={jobType}
            onChange={(e) => {
              console.log('Selected job type:', e.target.value);
              updateForm({ jobType: e.target.value });
              // Reset other fields when switching types
              if (e.target.value === 'Job') {
                updateForm({ jobName: '', jobDescription: '' });
              } else {
                updateForm({ contractAmount: 0 });
              }
            }}
          >
            <option value="Job">Job</option>
            <option value="Payment">Payment</option>
          </select>
        </div>

        {jobType === 'Payment' ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor="contractAmount">Amount</Label>
            <Input
              type="number"
              name="contractAmount"
              id="contractAmount"
              placeholder="Enter amount in dollars"
              value={contractAmount || ''}
              onChange={(e) => updateForm({ contractAmount: Number(e.target.value) })}
              className="w-full"
              min="0"
              required
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="jobName">Name</Label>
              <Input
                type="text"
                name="jobName"
                id="jobName"
                placeholder="e.g. Build a fence"
                value={jobName}
                onChange={(e) => updateForm({ jobName: e.target.value })}
                className="w-full"
                required
              />
              {errors.jobName && <p className="text-red-500 text-sm">{errors.jobName}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="jobDescription">Description</Label>
              <Input
                type="text"
                name="jobDescription"
                id="jobDescription"
                placeholder="Enter job description"
                value={jobDescription}
                onChange={(e) => updateForm({ jobDescription: e.target.value })}
                className="w-full"
                required
              />
              {errors.jobDescription && <p className="text-red-500 text-sm">{errors.jobDescription}</p>}
            </div>
          </>
        )}
      </div>
    </FormWrapper>
  );
};

export default WorkFlowForm;
