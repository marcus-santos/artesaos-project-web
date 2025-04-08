import { Input } from "@/components/ui/input";

interface SignInputProps{
  placeholder: string;
  type: string;
}

function SignInput(props: SignInputProps){
  return(
    <Input className="bg-[#E4F5E9] placeholder:text-[#859E8B] placeholder:px-5 placeholder:text-sm 
    placeholder:font-bold w-full p-0 h-12 rounded-3xl inset-shadow-sm inset-shadow-black/40" type={props.type} placeholder={props.placeholder}/>
  )
}

export default SignInput;