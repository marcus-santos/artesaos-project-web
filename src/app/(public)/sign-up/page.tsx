import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiChevronLeft } from "react-icons/fi";
import Link from 'next/link'

function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded-lg shadow-md p-[44px] min-h-[852px] min-w-[393px] border-1">
            <header>
                <Link href="/initial"><FiChevronLeft className="h-12 w-12"/></Link>
            </header>
    
        <div className="mb-6">
          <h1 className="text-6xl md:text-6xl font-bold mb-2">Olá!</h1>
          <p>
            Cadastre-se e <br />descubra o melhor do artesanato.
          </p>
        </div>
        <div>
            <form className="space-y-3 mb-6 text-[#985E00]">
                <Input placeholder="Nome" type="text" className="w-full h-12 bg-[#FFF2DE] placeholder:text-[#985E00] rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-none font-bold" />
                <Input placeholder="Nome Social" type="text" className="w-full h-12 bg-[#FFF2DE] placeholder:text-[#985E00] rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-none font-bold" />
                <Input placeholder="CPF" type="text" className="w-full h-12 bg-[#FFF2DE] placeholder:text-[#985E00] rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-none font-bold" />
                <Input placeholder="Email" type="email" className="w-full h-12 bg-[#FFF2DE] placeholder:text-[#985E00] rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-none font-bold" />
                <Input placeholder="Data de Nascimento" type="date" className="w-full  h-12 bg-[#FFF2DE] placeholder:text-[#985E00] rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-none font-bold" />
                <Input placeholder="Senha" type="password" className="w-full h-12 bg-[#FFF2DE] placeholder:text-[#985E00] rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-none font-bold" />
                <Input placeholder="Endereco" type="text" className="w-full h-12 bg-[#FFF2DE] placeholder:text-[#985E00] rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-none font-bold" />
                <Input placeholder="Telefone" type="tel" className="w-full h-12 bg-[#FFF2DE] placeholder:text-[#985E00] rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-none font-bold" />
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