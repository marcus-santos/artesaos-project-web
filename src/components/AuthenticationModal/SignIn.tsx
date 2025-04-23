'use client'

import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import SignInput from "../AuthenticationModal/SignInput";
import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";



const loginSchema = z.object({
  email: z.string().email('Email e/ou senha Incorretos'),
  password: z
    .string()
    .min(8, 'Email e/ou senha Incorretos')
    .regex(/[!@#$%*&^(),.?":{}|<>]/, 'Email e/ou senha Incorretos')
    .regex(/[A-Z]/, 'Email e/ou senha Incorretos')
    .regex(/[a-z]/, 'Email e/ou senha Incorretos')
    .regex(/[0-9]/, 'Email e/ou senha Incorretos')
});

type LoginFormData = z.infer<typeof loginSchema>;

function SignIn({ children }: { children: React.ReactNode }) {

  const [backendError, setBackendError] = useState<string | null>(null);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('https://nest-api-fork.onrender.com/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.status === 500) {
        setBackendError('Credenciais Incorretas');
      }
      else if (response.status === 201) {
        router.push('/');
      }


      const result = await response.json();
      console.log('Resposta da API:', result);

    } catch (error) {
      console.error('Erro:', error);
    }
  }
  return (
    <div className="flex flex-col items-center md:justify-center h-screen">

      <div className="rounded-lg p-[44px] min-w-[393px] md:border-1  md:shadow-md w-">
        {children}
        <div className="mt-28 mb-14 md:mt-14">
          <DialogTitle className="text-5xl md:text-[45px] font-bold">Olá!</DialogTitle>
          <p className="text-xl italic mt-2">Bom te ver de novo!</p>
        </div>
        <div>
          <form className="space-y-3 mb-3 text-end" onSubmit={handleSubmit(onSubmit)}>
            <SignInput
              hasError={!!errors.email}
              placeholder={"Email"}
              type={"email"}
              {...register('email')}
            />
            <div className="relative">
              <SignInput
                hasError={!!errors.password}
                placeholder={"Senha"}
                type={visiblePassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setVisiblePassword(!visiblePassword)}
              >
                {visiblePassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {(errors.email || errors.password) && (
              <p className="ml-3 text-[12px] text-magenta text-bold text-start font-semibold">
                {errors.email?.message || errors.password?.message}</p>
            )}
            {backendError && (
              <p className="ml-3 text-[12px] text-magenta text-bold text-start font-semibold">
                {backendError}
              </p>
            )}
            <Link className="underline italic text-sm text-end" href="/#">Esqueceu sua senha?</Link>
            <div className="w-full flex justify-center mt-10">
              <Button
                type="submit"
                className="bg-solar-700 w-[191px] h-[42px] rounded-2xl border-b-3 border-[#c04500] 
              hover:bg-[#c04500] cursor-pointer">
                Continuar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
