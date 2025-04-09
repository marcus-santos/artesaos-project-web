import React from 'react';
import { Button } from "@/components/ui/button";
import { FiChevronLeft } from "react-icons/fi";
import SignInput from "./components/SignInput";
import Link from 'next/link'

function SignUp() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded-lg shadow-md p-[44px] min-h-[852px] min-w-[393px] border-1">
            <header className="mb-6">
              <Link href="/initial"><FiChevronLeft className="" size={28}/></Link>
            </header>
    
        <div className="mb-6">
          <h1 className="text-5xl md:text-5xl font-bold mb-2">Olá!</h1>
          <p>
            Cadastre-se e <br />descubra o melhor do artesanato.
          </p>
        </div>
        <div>
            <form className="space-y-3 mb-6 text-[#985E00]">
                <SignInput placeholder={"Nome"} type={"text"}/>
                <SignInput placeholder={"Nome Social"} type={"text"}/>
                <SignInput placeholder={"CPF"} type={"text"}/>
                <SignInput placeholder={"Email"} type={"email"}/>
                <SignInput placeholder={"Data de Aniversario"} type={"date"}/>
                <SignInput placeholder={"Senha"} type={"password"}/>
                <SignInput placeholder={"Confirmação de Senha"} type={"password"}/>
                <SignInput placeholder={"Endereço"} type={"text"}/>
                <SignInput placeholder={"Telefone"} type={"tel"}/>
            </form>
        </div>

        <div className="text-sm text-gray-600 text-center mb-6">
          <p>
            Ao continuar, você concorda com os <br />
            <a href="#" className="text-black underline">
              Termos de Uso e Privacidade
            </a>
          </p>
        </div>

        <div className="flex justify-center">
            <Button className="w-[191px] h-[42px] bg-[#E05D00] hover:bg-[#c05000] text-white py-2 px-6 rounded-[20px] border-b-4 border-[#a04500] ">
                Continuar
            </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;