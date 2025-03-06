import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCcw, Sparkles } from "lucide-react";
import { Button } from "../../ui/button";
import successIcon from "../../../../public/snapture_black.svg";
import { useRouter } from "next/navigation";

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
};

const SuccessMessage = ({ name, jobName }: { name: string; jobName?: string }) => {
  const router = useRouter();
  
  return (
    <motion.section
      className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-2 text-center"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <Image
        src={successIcon}
        width="150"
        height="150"
        alt="Success Icon"
        className="md:mb-4"
      />
      <h4 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
        New Project: {jobName || name}
      </h4>
      <p className="text-sm max-w-md text-neutral-500 md:text-base">
        Your project was created successfully! Now let's build your smart contract in our no-code Snapflow tool.
      </p>
      <div className="flex items-center mt-6">
        <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
          <Button
            onClick={() => router.push('/snapflow')}
            className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white"
          >
            <Sparkles className="mr-2 h-4 w-4" /> Build w/ Snapflow
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default SuccessMessage;
