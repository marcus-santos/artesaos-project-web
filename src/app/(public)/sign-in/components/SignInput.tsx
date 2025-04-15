import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface SignInputProps{
  placeholder: string;
  type: string;
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({placeholder,type, ...rest}, ref) => {

    return(
      <Input ref={ref}
      className="bg-[#E4F5E9] placeholder:text-color-mint-700 placeholder:px-3 placeholder:text-sm 
      placeholder:font-bold w-full  h-12 rounded-3xl inset-shadow-sm inset-shadow-black/40" 
      type={type} placeholder={placeholder}
      {...rest}/>
    )
  }
);
  
SignInput.displayName = 'SignInput';

export default SignInput;