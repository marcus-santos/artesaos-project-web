"use client";

import React, { useEffect, useRef, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { FaExclamationTriangle, FaRegCalendarAlt } from "react-icons/fa";
import SignInput from "../AuthenticationModal/SignInput";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

// Validação com Zod
const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Digite um nome com pelo menos 2 letras." }),
    socialName: z.string().optional(),
    cpf: z.string().regex(/^\d{11}$/, {
      message: "O CPF deve conter exatamente 11 números.",
    }),
    email: z
      .string()
      .nonempty({ message: "O e-mail é obrigatório." })
      .email({ message: "Digite um e-mail válido." }),
    birthDate: z
      .string()
      .nonempty({ message: "A data de nascimento é obrigatória." })
      .refine(
        (date) => {
          const birth = new Date(date);
          return !isNaN(birth.getTime()) && birth < new Date();
        },
        { message: "Digite uma data válida no passado." }
      )
      .refine(
        (date) => {
          const birth = new Date(date);
          const today = new Date();
          const minAge = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );
          return birth <= minAge;
        },
        { message: "Você deve ter pelo menos 18 anos." }
      ),
    password: z
      .string()
      .min(8, { message: "Senha inválida: mínimo de 8 caracteres." })
      .regex(/[!@#$%*&^(),.?":{}|<>]/, {
        message: "Senha inválida: precisa de caractere especial.",
      })
      .regex(/[A-Z]/, {
        message: "Senha inválida: precisa de letra maiúscula.",
      })
      .regex(/[a-z]/, {
        message: "Senha inválida: precisa de letra minúscula.",
      })
      .regex(/[0-9]/, { message: "Senha inválida: precisa de número." }),
    confirmPassword: z.string(),
    codigoPais: z
      .string()
      .nonempty({ message: "O código do país é obrigatório." }),
    ddd: z
      .string()
      .length(2, { message: "O código de área deve ter 2 dígitos." })
      .regex(/^\d{2}$/, {
        message: "O código de área deve conter apenas números.",
      }),
    phone: z
      .string()
      .min(8, { message: "O telefone deve ter no mínimo 8 dígitos." })
      .max(9, { message: "O telefone deve ter no máximo 9 dígitos." })
      .regex(/^\d{8,9}$/, {
        message: "O telefone deve possuir apenas números.",
      }),
    isArtisan: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

type SignUpData = z.infer<typeof signUpSchema>;

// Função para traduzir mensagens de erro
async function traduzirErro(mensagem: string): Promise<string> {
  const texto = Array.isArray(mensagem) ? mensagem.join(" ") : mensagem;
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      texto
    )}&langpair=en|pt-br`
  );
  const data = await res.json();
  return data.responseData.translatedText || texto;
}

// Componente principal
export default function SignUp({ children }: { children: React.ReactNode }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://nest-api-fork.onrender.com/users";

  // Estados UI
  const [visibleFields, setVisibleFields] = useState({
    password: false,
    confirmPassword: false,
    passwordInfo: false,
    calendarVisible: false,
    popover: false,
  });
  const [uiError, setUiError] = useState<string | null>(null);
  const [formErrorFlag, setFormErrorFlag] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    setError: setFormError,
    clearErrors,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      socialName: "",
      cpf: "",
      email: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
      codigoPais: "+55",
      ddd: "",
      phone: "",
      isArtisan: false,
    },
  });

  // Toggle visibilidade
  const toggleVisibility = (field: keyof typeof visibleFields) => {
    setVisibleFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Fecha popover ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        visibleFields.popover &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setVisibleFields((prev) => ({ ...prev, popover: false }));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visibleFields.popover]);

  // Indica erro de validação após submit
  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      setFormErrorFlag(true);
      setTimeout(() => setFormErrorFlag(false), 5000);
    }
  }, [errors, isSubmitted]);

  // Faz o login após o cadastro
  const loginUser = async (email: string, password: string) => {
    try {
      const res = await fetch("https://nest-api-fork.onrender.com/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.message || "Erro ao fazer login.");
      }

      localStorage.setItem("authToken", body.token);

      showUiError("Usuário criado e logado com sucesso!");
      closeButtonRef.current?.click();
    } catch (err: any) {
      showUiError(err.message || "Erro inesperado ao fazer login.");
    }
  };

  // Cria o usuário
  const createUser = async (data: SignUpData) => {
    const payload = {
      name: data.name,
      socialName: data.socialName,
      cpf: data.cpf,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate,
      phone: `${data.codigoPais}${data.ddd}${data.phone}`,
    };

    clearErrors();
    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();

      if (!res.ok) {
        if (res.status === 400 && body.errors) {
          await Promise.all(
            (Object.entries(body.errors) as [keyof SignUpData, string[]][]).map(
              async ([field, msgs]) => {
                const msgTraduzida = await traduzirErro(msgs[0]);
                setFormError(field as keyof SignUpData, {
                  type: "server",
                  message: msgTraduzida,
                });
              }
            )
          );
          return;
        }
        if (res.status === 409) {
          await showUiError(body.message || "Usuário já existe.");
          return;
        }
        await showUiError(body.message || "Erro ao criar usuário.");
        return;
      }

      await loginUser(data.email, data.password);
      await showUiError("Usuário criado e logado com sucesso!");
    } catch (err: any) {
      await showUiError(err.message || "Erro inesperado.");
    }
  };

  // Exibe mensagem de erro na UI
  const showUiError = async (message: string) => {
    const traduzida = await traduzirErro(message);
    setUiError(traduzida);
    setTimeout(() => setUiError(null), 5000);
  };

  // Envia os dados do formulário
  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    await createUser(data);
  };

  // Formulário para (email, senha, nome, CPF)
  const FormField: React.FC<{
    name: keyof SignUpData;
    placeholder: string;
    type: string;
    className?: string;
  }> = ({ name, placeholder, type, className = "" }) => (
    <div className={className}>
      <SignInput
        className="bg-[#FFF2DE] placeholder:text-[#985E00]"
        placeholder={placeholder}
        type={type}
        hasError={!!errors[name]}
        {...register(name)}
      />
      {errors[name] && (
        <span className="text-sm text-magenta">{errors[name]?.message}</span>
      )}
    </div>
  );

  // Renderiza o componente principal
  return (
    <div className="rounded-lg p-[44px] sm:w-96 w-full">
      <header className="mb-6">
        {formErrorFlag ? (
          <div className="flex items-center justify-center text-white bg-magenta mb-4 p-3 rounded-lg text-xs font-bold w-full">
            <FaExclamationTriangle className="mr-1" />
            <span>Campo obrigatório ou com formato inválido.</span>
          </div>
        ) : (
          <>
            {children}
            <DialogTitle className="text-5xl md:text-[45px] font-bold">
              Olá!
            </DialogTitle>
            <p>
              Cadastre-se e <br />
              descubra o melhor do artesanato.
            </p>
          </>
        )}
      </header>

      {uiError && (
        <div
          className={`mb-4 p-3 rounded-lg text-xs text-center ${
            uiError.includes("sucesso")
              ? "bg-mint-600 text-white"
              : "bg-magenta text-white"
          }`}
        >
          <div className="flex items-center text-xs justify-center">
            {!uiError.includes("sucesso") && (
              <FaExclamationTriangle className="mr-2" />
            )}
            <span>{uiError}</span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 mb-6 text-[#985E00]"
      >
        <FormField name="name" placeholder="Nome*" type="text" />
        <FormField name="socialName" placeholder="Nome Social" type="text" />
        <FormField name="cpf" placeholder="CPF*" type="text" />
        <FormField name="email" placeholder="Email*" type="email" />

        <div className="w-full">
          <div className="relative">
            <SignInput
              className="bg-[#FFF2DE] placeholder:text-[#985E00]"
              placeholder="Data de nascimento*"
              type={visibleFields.calendarVisible ? "date" : "text"}
              hasError={!!errors.birthDate}
              {...register("birthDate")}
              onFocus={() =>
                setVisibleFields((p) => ({ ...p, calendarVisible: true }))
              }
              onBlur={() =>
                setVisibleFields((p) => ({ ...p, calendarVisible: false }))
              }
            />
            {!visibleFields.calendarVisible && (
              <FaRegCalendarAlt
                size={16}
                className={`pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  errors.birthDate ? "text-magenta" : "text-[#985E00]"
                }`}
              />
            )}
          </div>
          {errors.birthDate && (
            <span className="text-sm text-magenta">
              {errors.birthDate.message}
            </span>
          )}
        </div>

        <div className="w-full">
          <div className="relative">
            <SignInput
              className="bg-[#FFF2DE] font-bold placeholder:text-[#985E00]"
              placeholder="Senha*"
              type={visibleFields.password ? "text" : "password"}
              hasError={!!errors.password}
              {...register("password")}
              onFocus={() =>
                setVisibleFields((p) => ({ ...p, passwordInfo: true }))
              }
              onBlur={() =>
                setVisibleFields((p) => ({ ...p, passwordInfo: false }))
              }
            />
            <button
              type="button"
              aria-label="Toggle senha"
              onClick={() => toggleVisibility("password")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {visibleFields.password ? (
                <AiOutlineEye
                  size={20}
                  className={
                    errors.password ? "text-magenta" : "text-[#985E00]"
                  }
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  className={
                    errors.password ? "text-magenta" : "text-[#985E00]"
                  }
                />
              )}
            </button>
          </div>
          {errors.password ? (
            <span className="text-sm text-magenta">
              {errors.password.message}
            </span>
          ) : (
            visibleFields.passwordInfo && (
              <div className="text-xs text-[#985E00] p-2 rounded">
                <p>• No mínimo 8 caracteres</p>
                <p>• Pelo menos 1 letra maiúscula</p>
                <p>• Pelo menos 1 letra minúscula</p>
                <p>• Pelo menos 1 número</p>
                <p>• Pelo menos 1 caractere especial</p>
              </div>
            )
          )}
        </div>

        <div className="w-full">
          <div className="relative">
            <SignInput
              className="bg-[#FFF2DE] font-bold placeholder:text-[#985E00] "
              placeholder="Confirmação de Senha*"
              type={visibleFields.confirmPassword ? "text" : "password"}
              hasError={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              aria-label="Toggle confirmação"
              onClick={() => toggleVisibility("confirmPassword")}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 
              }`}
            >
              {visibleFields.confirmPassword ? (
                <AiOutlineEye
                  size={20}
                  className={
                    errors.confirmPassword ? "text-magenta" : "text-[#985E00]"
                  }
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  className={
                    errors.confirmPassword ? "text-magenta" : "text-[#985E00]"
                  }
                />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-sm text-magenta">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <select
            {...register("codigoPais")}
            className="p-2 border bg-[#FFF2DE] inset-shadow-sm inset-shadow-black/40 rounded-3xl font-bold text-center"
          >
            <option value="+55">+55</option>
          </select>

          <div className="text-center">
            <SignInput
              className="bg-[#FFF2DE] placeholder:text-[#985E00]"
              placeholder="DDD"
              type="text"
              {...register("ddd")}
              hasError={!!errors.ddd}
            />
          </div>

          <div className="col-span-2">
            <SignInput
              className="bg-[#FFF2DE] placeholder:text-[#985E00]"
              placeholder="Telefone"
              type="tel"
              {...register("phone")}
              hasError={!!errors.phone}
            />
          </div>
        </div>

        {(errors.phone || errors.ddd || errors.codigoPais) && (
          <p className="text-sm text-magenta">
            {errors.ddd?.message ||
              errors.phone?.message ||
              errors.codigoPais?.message}
          </p>
        )}

        <div className="flex items-center justify-between bg-[#F6F6F6] text-mint-600 w-full h-10 rounded-3xl py-1 px-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)]">
          <div className="flex items-center">
            <input
              id="isArtisan"
              type="checkbox"
              {...register("isArtisan")}
              className="mr-2 h-5 w-3 text-[#E05D00]"
            />
            <label htmlFor="isArtisan" className="text-base">
              Sou Artesão
            </label>
          </div>
          <button
            type="button"
            aria-label="Info artesão"
            onClick={() => toggleVisibility("popover")}
          >
            {" "}
            <AiOutlineInfoCircle />{" "}
          </button>
        </div>
        {visibleFields.popover && (
          <div>
            <div className="fixed inset-0 bg-black/25 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                ref={popoverRef}
                className="bg-white text-black p-5 rounded-3xl shadow-lg max-w-xs text-center"
              >
                <button
                  onClick={() => toggleVisibility("popover")}
                  className="absolute top-2 right-2"
                >
                  X
                </button>
                <p className="font-bold mb-2">Artesão credenciado</p>
                <p className="text-xs">
                  Marque essa opção se você é artesão(a) cadastrado e faz parte
                  da associação vinculada à <strong>Fundacc</strong> (Fundação
                  Educacional e Cultural de Caraguatatuba). Isso garante acesso
                  a funcionalidades exclusivas para membros reconhecidos.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600 text-center mb-6 font-normal">
          <p>
            Ao continuar, você concorda com os
            <br />
            <a href="#" className="underline text-black">
              Termos de Uso e Privacidade
            </a>
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-[191px] h-[42px] bg-solar-700 hover:bg-[#c05000] text-white rounded-[20px] border-b-4 border-[#a04500]"
          >
            {isSubmitting ? "Processando..." : "Continuar"}
          </Button>
        </div>
      </form>

      <DialogClose asChild>
        <button ref={closeButtonRef} style={{ display: "none" }}>
          Fechar
        </button>
      </DialogClose>
    </div>
  );
}
