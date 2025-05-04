import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface SignInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder: string;
  type: string;
  hasError?: boolean;
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({ hasError,className, placeholder, type, ...rest }, ref) => {

    return (
      <Input
        ref={ref}
        type={type} 
        placeholder={placeholder}
        className={`${className} ${hasError
          ? "border-magenta border-2 focus-visible:ring-2 focus-visible:border-magenta placeholder:text-magenta"
          : ""}
           placeholder:text-sm placeholder:font-bold w-full h-12 rounded-3xl inset-shadow-sm inset-shadow-black/40`}
        {...rest} />
    )
  }
);

SignInput.displayName = 'SignInput';

export default SignInput;