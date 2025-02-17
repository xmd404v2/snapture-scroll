import { RoughNotation } from "react-rough-notation";

type NavProps = {
  currentStepIndex: number;
  goTo: (index: number) => void;
};

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
  return (
    <div className="w-full flex-row md:w-1/4">
      <nav className="py-5 text-slate-200 bg-neutral-900 h-full rounded-md border border-neutral-700 p-5">
        <ul className="flex flex-row justify-around md:flex-col md:justify-start">
          <li className="flex flex-col items-center md:items-start font-medium">
            <span className="block text-neutral-500 uppercase text-xs mb-1 md:mb-2">
              Step 1
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(0)}
              className={`text-xs md:text-base ${
                currentStepIndex === 0 ? "text-[#ffe666]" : "text-white"
              }`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 0}
                color="#ffe666"
              >
                Your info
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-center md:items-start font-medium">
            <span className="block text-neutral-500 uppercase text-xs mb-1 md:mb-2">
              Step 2
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(1)}
              className={`text-xs md:text-base ${
                currentStepIndex === 1 ? "text-[#bd284d]" : "text-white"
              }`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 1}
                color="#bd284d"
              >
                Select plan
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-center md:items-start font-medium">
            <span className="block text-neutral-500 uppercase text-xs mb-1 md:mb-2">
              Step 3
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(2)}
              className={`text-xs md:text-base ${
                currentStepIndex === 2 ? "text-[#E7B8FF]" : "text-white"
              }`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 2}
                color="#E7B8FF"
              >
                Add-ons
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-center md:items-start font-medium">
            <span className="block text-neutral-500 uppercase text-xs mb-1 md:mb-2">
              Step 4
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(3)}
              className={`text-xs md:text-base ${
                currentStepIndex === 3 ? "text-[#6fe79f]" : "text-white"
              }`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 3}
                color="#6fe79f"
              >
                Summary
              </RoughNotation>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
