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
              Personal
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
             Workflow
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
