import { Input } from "@/components/ui/input";

interface SignInputProps{
  placeholder: string;
  type: string;
}

function SignInput(props: SignInputProps){
  return(
    <Input className="w-full h-12 bg-[#FFF2DE] placeholder:text-[#985E00] rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-none font-bold" type={props.type} placeholder={props.placeholder}/>
  )
}

export default SignInput;