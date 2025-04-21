import { forwardRef } from "react";
import { Input } from "@/components/ui/input";

const SignInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }>(
  ({hasError, className, ...props}, ref) => (
    <Input
      
      ref={ref}
      className={`${className} ${hasError ? 'border-magenta border-2 focus-visible:ring-2 focus-visible:border-magenta placeholder:text-magenta' : 'border-none placeholder:text-[#985E00]'} w-full h-10 bg-[#FFF2DE]  rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] font-bold`}
      {...props}
    />
  )
);

SignInput.displayName = "SignInput";

export default SignInput;
