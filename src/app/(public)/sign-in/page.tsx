import { FiChevronLeft } from "react-icons/fi";
import  Link  from "next/link";
import { Button } from "@/components/ui/button"
import SignInput from "./components/SignInput";



function page(){
  return(
    <div>
      <header>
        <Link href="/initial"><FiChevronLeft className="" size={24}/></Link>
      </header>
      <div className="w-">
        <h1>Olá!</h1>
        <p>Bom te ver de novo!</p>
        <SignInput placeholder={"email"}/>
        <SignInput placeholder={"senha"}/>
        <Link href="/#">Esqueceu sua senha?</Link>
      </div>
      <Button className="bg-[#E05D00]">Continuar</Button>
      

    </div>
    
  );
}

export default page;