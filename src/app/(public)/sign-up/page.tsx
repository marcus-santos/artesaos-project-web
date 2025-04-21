'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FiChevronLeft } from "react-icons/fi";
import SignInput from "./components/SignInput";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineEye, AiOutlineEyeInvisible,  AiOutlineInfoCircle } from "react-icons/ai";
import { FaExclamationTriangle } from "react-icons/fa";

const signUpSchema = z.object({
  name: z.string()
    .min(2, { message: "Digite um nome com pelo menos 2 letras." }),

  socialName: z.string().optional(),

  cpf: z.string()
    .min(11, { message: "O CPF deve ter 11 números." })
    .max(11, { message: "O CPF deve ter no máximo 11 números." })
    .regex(/^\d{11}$/, {message: "O cpf deve conter apenas numeros"}),

  email: z.string()
    .nonempty({ message: "O e-mail é obrigatório." })
    .email({ message: "Digite um e-mail válido." }),

  birthDate: z.string()
    .nonempty({ message: "A data de nascimento é obrigatória." })
    .refine(date => {
      const birth = new Date(date);
      return !isNaN(birth.getTime()) && birth < new Date();
    }, { message: "Digite uma data válida no passado." })
    .refine(date => {
      const birth = new Date(date);
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return birth <= eighteenYearsAgo;
    }, { message: "Você deve ter pelo menos 18 anos." }),

  password: z
    .string()
    .min(8, 'Senha Inválida - minimo de 8')
    .regex(/[!@#$%*&^(),.?":{}|<>]/, 'Senha Inválida - caractere especial')
    .regex(/[A-Z]/, 'Senha Inválida - letra maiuscula')
    .regex(/[a-z]/, 'Senha Inválida - letra minuscula')
    .regex(/[0-9]/, 'Senha Inválida - numero'),

  confirmPassword: z.string(),

  codigoPais: z.string()
    .nonempty({ message: "O código do país é obrigatório." }),

  ddd: z.string()
    .nonempty({ message: "O código de área é obrigatório." })
    .min(2, { message: "O código de área deve ter 2 dígitos." })
    .max(2, { message: "O código de área deve ter 2 dígitos." })
    .regex(/^\d{2}$/, { message: "O código de área deve conter apenas números." }),
  
  phone: z.string()
    .min(8, { message: "O telefone deve ter no mínimo 8 dígitos." })
    .max(9, { message: "O telefone deve ter no máximo 9 dígitos." })
    .regex(/^\d{8,9}$/, {message: "O telefone deve possuir apenas numeros"}),

  isArtisan: z.boolean().optional(),

}).refine((fields) => fields.password === fields.confirmPassword,{
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais'
})

type signUpSchemaData = z.infer<typeof signUpSchema>

function SignUp() {
  const router = useRouter(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false)
  const [hasFormError, setHasFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const {register,
    handleSubmit, 
    formState: {errors}} 
    = useForm<signUpSchemaData>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        name: "",
        socialName: "",
        cpf: "",
        email: "",
        birthDate: "",
        password: "",
        codigoPais: "+55",
        ddd: "",
        phone: "",
        isArtisan: false,
      },
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowPopover(false);
      }
    }

    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopover]);

  async function createUser(data: signUpSchemaData) {
    const telefoneCompleto = `${data.codigoPais}${data.ddd}${data.phone}`;
  
    const userData = {
      name: data.name,
      socialName: data.socialName,
      cpf: data.cpf,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate,
      phone: telefoneCompleto,
    };
    
    console.log(userData)


    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar usuário.");
      } 
  
      alert("Usuário criado com sucesso!");
      router.push('/sign-in');
    } catch (error) {
      console.error("Erro:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro ao criar usuário. Tente novamente.";
      alert(errorMessage);
    }
  }

  const handleFormSubmit = (data: signUpSchemaData) => {
    setHasFormError(false); 

    if (data.isArtisan) {
      console.log("Usuário é artesão, redirecionando...");

      try{
        sessionStorage.setItem('artisanRegStep1Data', JSON.stringify(data));
        router.push('/initial');
      } catch (error){
        console.error("Erro ao salvar dados no sessionStorage:", error);
        alert("Ocorreu um erro inesperado. Por favor, tente novamente.");
      }
    } else {
      console.log("Usuário não é artesão, criando usuário comum...");
      createUser(data);
    }
  };

  const handleFormError = (formErrors: any) => {
      console.log("Erros no formulário:", formErrors)
      if (Object.keys(formErrors).length > 0) {
        setHasFormError(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          setHasFormError(false);
        }, 5000);
      }
    }
  
  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded-lg shadow-md p-[44px] min-h-[852px] sm:w-96  w-full border-1">
            <header className="mb-6">

            {hasFormError ? (
            <div className="flex items-center justify-center text-white bg-magenta rounded-3xl text-xs p-2.5 font-bold w-full">
              <FaExclamationTriangle className="mr-1" />
              <span>Campo obrigatório ou com formato inválido.</span>
            </div>
          ) : (
            <Link href="/initial">
              <FiChevronLeft size={28} />
            </Link>
          )}
            </header>

        <div className="mb-6">
          <h1 className="text-5xl md:text-5xl font-bold mb-2">Olá!</h1>
          <p>
            Cadastre-se e <br />descubra o melhor do artesanato.
          </p>
        </div>
        <div>
            <form className="space-y-3 mb-6 text-[#985E00]" onSubmit={handleSubmit(handleFormSubmit, handleFormError)}>
              <div>
                <SignInput placeholder={"Nome*"} type={"text"} {...register('name')} hasError={!!errors.name}/>
                {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
              </div>

              <div>
                <SignInput placeholder={"Nome Social"} type={"text"} {...register('socialName')}/>
              </div>

              <div>
                <SignInput placeholder={"CPF*"} type={"text"} {...register('cpf')} hasError={!!errors.cpf}/>
                {errors.cpf && <span className='text-sm text-red-500'>{errors.cpf.message}</span>}
              </div>

              <div>
                <SignInput placeholder={"Email*"} type={"email"} {...register('email')} hasError={!!errors.email}/>
                {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
              </div>

              <div>
                <SignInput placeholder={"Data de Nascimento"} type={"date"} {...register('birthDate')} hasError={!!errors.birthDate}/>
                {errors.birthDate && <span className='text-sm text-red-500'>{errors.birthDate.message}</span>}
              </div>

              <div className="w-full">
                <div className="relative">
                  <SignInput
                    placeholder="Senha*"
                    type={showPassword ? "text" : "password"}
                    {...register('password')}
                    hasError={!!errors.password}
                    onFocus={() => setShowPasswordInfo(true)}
                    onBlur={() => setShowPasswordInfo(false)}
                  />
                  <button
                    aria-label="Mostrar ou esconder senha"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#985E00]"
                  >
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </button>
                </div>

                {errors.password && (
                  <span className="text-sm text-red-500">{errors.password.message}</span>
                )}

                {showPasswordInfo && !errors.password && (
                  <div className="text-xs text-[#985E00] p-2 rounded">
                    <p>• No mínimo 8 caracteres</p>
                    <p>• Pelo menos 1 letra maiúscula</p>
                    <p>• Pelo menos 1 letra minúscula</p>
                    <p>• Pelo menos 1 número</p>
                    <p>• Pelo menos 1 caractere especial (como !, @, #, etc.)</p>
                  </div>
                )}
              </div>


              <div className="w-full">
                <div className="relative">
                  <SignInput
                    placeholder={"Confirmação de Senha*"}
                    type={showConfirmPassword ? "text" : "password"}
                    {...register('confirmPassword')}
                    hasError={!!errors.confirmPassword}
                  />
                  <button
                    aria-label="Mostrar ou esconder senha"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#985E00]"
                  >
                    {showConfirmPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
                )}
              </div>

              <div className='grid grid-cols-4 gap-2'>
                  <select {...register('codigoPais')} className="p-2 border bg-[#FFF2DE] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] rounded-[20px] font-bold ">
                    <option value="+55">+55</option>
                  </select>

                <div className='text-center'>
                  <SignInput placeholder={"DDD"} type={"text"} {...register('ddd')} hasError={!!errors.ddd}/>
                </div>

                <div className='col-span-2'>
                  <SignInput placeholder={"Telefone"} type={"tel"} {...register('phone')} hasError={!!errors.phone}/>
                </div>
              </div>

              {(errors.phone || errors.ddd || errors.codigoPais) && (
                <p className='text-sm text-red-500'>
                  {errors.phone?.message || errors.ddd?.message || errors.codigoPais?.message}
                </p>
              )}
              
              <div className="flex items-center justify-between bg-[#F6F6F6] text-mint-600 w-full h-10 rounded-3xl py-1 px-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)]">
                <div className="flex items-center">
                  <input
                    id="isArtisan"
                    type="checkbox"
                    {...register('isArtisan')}
                    className="ml-2 mr-2 h-5 w-3 text-[#E05D00]"
                  />
                  <label htmlFor="isArtisan" className="text-base">
                    Sou Artesão
                  </label>
                </div>
                <button type="button"
                    onClick={() => setShowPopover(!showPopover)}
                    className="relative">
                  <AiOutlineInfoCircle className="text-black" />
                </button>

                {showPopover && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/25 z-40"
                    ></div>

                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div
                            ref={popoverRef}
                            className="bg-white text-black text-sm rounded-3xl shadow-lg p-5 text-center max-w-72 h-auto"
                          >
                            <div className='flex justify-end mb-1'>
                              <button onClick={() => setShowPopover(false)} className='font-sm'>X</button>
                            </div>
                            <p className="font-bold mb-2">Artesão credenciado</p>
                            <p className="text-xs">
                              Marque essa opção se você é artesão(a) cadastrado e faz parte da associação vinculada à <strong>Fundacc</strong> (Fundação Educacional e Cultural de Caraguatatuba). Isso garante acesso a funcionalidades exclusivas para membros reconhecidos.
                            </p>
                        </div>
                    </div>
                  
                  </>

                )}
                
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
                  <Button disabled={isLoading} className="w-[191px] h-[42px] bg-[#E05D00] hover:bg-[#c05000] text-white py-2 px-6 rounded-[20px] border-b-4 border-[#a04500] " type='submit'>
                    {isLoading ? 'Enviando...' : 'Continuar'}
                  </Button>
              </div>
            </form>
        </div>
      </div>
    </div>
    

  );
}

export default SignUp;