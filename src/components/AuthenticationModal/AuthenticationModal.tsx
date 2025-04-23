"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { FiChevronLeft } from "react-icons/fi";

function AuthenticationModal() {
  const [modalState, setModalState] = useState(0);
  function openInitial() {
    setModalState(0);
  }
  function openSignIn() {
    setModalState(1);
  }
  function openSignUp() {
    setModalState(2);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={openInitial}
          variant="outline"
          className="bg-transparent cursor-pointer hover:bg-white/20 border-black text-black inset-shadow-black/50 inset-shadow-sm p-6 rounded-full underline underline-offset-1 text-xs"
        >
          Entre ou cadastre-se
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-screen rounded-none sm:rounded-xl sm:h-fit sm:max-w-[425px]">
        {modalState === 0 && (
          <div className="flex flex-col justify-center gap-8">
            <Image
              src="Criarte.svg"
              alt="Criart"
              width={110}
              height={110}
              className="mt-6 mx-auto"
            ></Image>
            <DialogTitle className="font-bold text-6xl mx-auto">
              Olá!
            </DialogTitle>
            <div className="flex flex-col items-center justify-center gap-8 mt-12 mb-6">
              <Button
                onClick={openSignIn}
                className="font-semibold cursor-pointer hover:bg-mint/70 bg-mint inset-shadow-sm text-bla inset-shadow-black/40 text-xl py-7 px-7 rounded-3xl"
              >
                Ja possuo Cadastro
              </Button>
              <Button
                onClick={openSignUp}
                className="mt-5 font-semibold cursor-pointer hover:bg-solar/70 bg-solar inset-shadow-sm text-bla inset-shadow-black/40 text-xl py-7 px-7 rounded-3xl"
              >
                Quero me Cadastrar
              </Button>
              <DialogClose className="mb-6 underline underline-offset-2">
                Continuar sem login
              </DialogClose>
            </div>
          </div>
        )}
        {modalState === 1 && (
          <SignIn>
            <button
              onClick={openInitial}
              className="bg-transparent cursor-pointer"
            >
              <FiChevronLeft className="" size={28} />
            </button>
          </SignIn>
        )}
        {modalState === 2 && (
          <SignUp>
            <button
              onClick={openInitial}
              className="bg-transparent cursor-pointer"
            >
              <FiChevronLeft className="" size={28} />
            </button>
          </SignUp>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthenticationModal;
