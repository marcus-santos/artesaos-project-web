import { Input } from "@/components/ui/input";

interface SignInputProps{
  placeholder: string;
}

function SignInput(props: SignInputProps){
  return(
    <Input className="bg-[#E4F5E9] w-[305px] h-[53px] rounded-3xl" placeholder={props.placeholder}/>
  )
}

export default SignInput;