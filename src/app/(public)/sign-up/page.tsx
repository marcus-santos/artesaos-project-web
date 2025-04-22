"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { FaExclamationTriangle, FaRegCalendarAlt } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { z } from "zod";
import SignInput from "./components/SignInput";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Digite um nome com pelo menos 2 letras." }),

    socialName: z.string().optional(),

    cpf: z
      .string()
      .min(11, { message: "O CPF deve ter 11 números." })
      .max(11, { message: "O CPF deve ter no máximo 11 números." })
      .regex(/^\d{11}$/, { message: "O cpf deve conter apenas numeros" }),

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
          const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );
          return birth <= eighteenYearsAgo;
        },
        { message: "Você deve ter pelo menos 18 anos." }
      ),

    password: z
      .string()
      .min(8, "Senha Inválida - minimo de 8")
      .regex(/[!@#$%*&^(),.?":{}|<>]/, "Senha Inválida - caractere especial")
      .regex(/[A-Z]/, "Senha Inválida - letra maiuscula")
      .regex(/[a-z]/, "Senha Inválida - letra minuscula")
      .regex(/[0-9]/, "Senha Inválida - numero"),

    confirmPassword: z.string(),

    codigoPais: z
      .string()
      .nonempty({ message: "O código do país é obrigatório." }),

    ddd: z
      .string()
      .nonempty({ message: "O código de área é obrigatório." })
      .min(2, { message: "O código de área deve ter 2 dígitos." })
      .max(2, { message: "O código de área deve ter 2 dígitos." })
      .regex(/^\d{2}$/, {
        message: "O código de área deve conter apenas números.",
      }),

    phone: z
      .string()
      .min(8, { message: "O telefone deve ter no mínimo 8 dígitos." })
      .max(9, { message: "O telefone deve ter no máximo 9 dígitos." })
      .regex(/^\d{8,9}$/, {
        message: "O telefone deve possuir apenas numeros",
      }),

    isArtisan: z.boolean().optional(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

type SignUpSchemaData = z.infer<typeof signUpSchema>;

interface FormFieldProps {
  name: keyof SignUpSchemaData;
  placeholder: string;
  type: string;
  register: UseFormRegister<SignUpSchemaData>;
  errors: Record<string, any>;
  className?: string;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  placeholder,
  type,
  register,
  errors,
  className,
  ...props
}) => {
  return (
    <div className={className}>
      <SignInput
        placeholder={placeholder}
        type={type}
        {...register(name)}
        hasError={!!errors[name]}
        {...props}
      />
      {errors[name] && (
        <span className="text-sm text-magenta">{errors[name].message}</span>
      )}
    </div>
  );
};

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showPasswordInfo, setShowPasswordInfo] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showFormError, setShowFormError] = useState(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const popoverRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setError,
    clearErrors,
  } = useForm<SignUpSchemaData>({
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    }

    if (showPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (apiError) {
      timer = setTimeout(() => {
        setApiError(null);
      }, 5000);
    }

    if (Object.keys(errors).length > 0 && isSubmitted) {
      setShowFormError(true);

      timer = setTimeout(() => {
        setShowFormError(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [apiError, errors, isSubmitted]);

  async function createUser(data: SignUpSchemaData): Promise<void> {
    const telefoneCompleto = `${data.codigoPais}${data.ddd}${data.phone}`;

    const userData = {
      name: data.name,
      socialName: data.socialName || "",
      cpf: data.cpf,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate,
      phone: telefoneCompleto,
    };

    setIsLoading(true);
    setApiError(null);
    clearErrors();

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = (await response.json()) as ApiError;

      if (!response.ok) {
        if (response.status === 400 && responseData.errors) {
          Object.entries(responseData.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              if (field in userData) {
                setError(field as keyof SignUpSchemaData, {
                  type: "server",
                  message: messages[0],
                });
              }
            }
          });
          throw new Error(
            responseData.message ||
              "Erro de validação. Verifique os dados inseridos."
          );
        } else if (response.status === 409) {
          throw new Error(
            responseData.message ||
              "Este usuário já existe. Tente fazer login ou recuperar sua senha."
          );
        } else {
          throw new Error(
            responseData.message || "Ocorreu um erro ao criar usuário."
          );
        }
      }

      setApiError("Usuário criado com sucesso!");
      setTimeout(() => {
        router.replace("/sign-in");
      }, 500);
    } catch (error) {
      console.error("Erro:", error);
      setApiError(
        error instanceof Error
          ? error.message
          : "Erro ao criar usuário. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handleFormSubmit = (data: SignUpSchemaData): void => {
    if (data.isArtisan) {
      try {
        sessionStorage.setItem("artisanRegStep1Data", JSON.stringify(data));
        router.push("/initial");
      } catch (error) {
        console.error("Erro ao salvar dados no sessionStorage:", error);
        setApiError("Ocorreu um erro inesperado. Por favor, tente novamente.");
      }
    } else {
      createUser(data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded-lg shadow-md p-[44px] min-h-[852px] sm:w-96 w-full border-1">
        <header className="mb-6">
          {showFormError ? (
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

        {apiError && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm text-center ${
              apiError.includes("sucesso")
                ? "bg-mint-600 text-white"
                : "bg-magenta text-white"
            }`}
          >
            <div className="flex items-center justify-center">
              {!apiError.includes("sucesso") && (
                <FaExclamationTriangle className="mr-2" />
              )}
              <span>{apiError}</span>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-5xl md:text-5xl font-bold mb-2">Olá!</h1>
          <p>
            Cadastre-se e <br />
            descubra o melhor do artesanato.
          </p>
        </div>

        <form
          className="space-y-3 mb-6 text-[#985E00]"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <FormField
            name="name"
            placeholder="Nome*"
            type="text"
            register={register}
            errors={errors}
          />

          <FormField
            name="socialName"
            placeholder="Nome Social"
            type="text"
            register={register}
            errors={errors}
          />

          <FormField
            name="cpf"
            placeholder="CPF*"
            type="text"
            register={register}
            errors={errors}
          />

          <FormField
            name="email"
            placeholder="Email*"
            type="email"
            register={register}
            errors={errors}
          />

          <div>
            <div className="relative">
              <SignInput
                className="w-full"
                placeholder="Data de nascimento*"
                type={focused ? "date" : "text"}
                {...register("birthDate")}
                hasError={!!errors.birthDate}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
              {!focused && (
                <FaRegCalendarAlt
                  size={16}
                  className={`pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 
                  ${!!errors.birthDate ? "text-magenta" : "text-[#985E00]"}`}
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
                placeholder="Senha*"
                type={showPassword ? "text" : "password"}
                {...register("password")}
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
                {showPassword ? (
                  <AiOutlineEye
                    className={`color-[#985E00] ${
                      errors.password ? "text-magenta" : "text-[#985E00]"
                    }`}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className={`color-[#985E00] ${
                      errors.password ? "text-magenta" : "text-[#985E00]"
                    }`}
                  />
                )}
              </button>
            </div>

            {errors.password && (
              <span className="text-sm text-magenta">
                {errors.password.message}
              </span>
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
                placeholder="Confirmação de Senha*"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                hasError={!!errors.confirmPassword}
              />
              <button
                aria-label="Mostrar ou esconder confirmação de senha"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#985E00]"
              >
                {showConfirmPassword ? (
                  <AiOutlineEye
                    className={`color-[#985E00] ${
                      errors.confirmPassword ? "text-magenta" : "text-[#985E00]"
                    }`}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className={`color-[#985E00] ${
                      errors.confirmPassword ? "text-magenta" : "text-[#985E00]"
                    }`}
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
              className="p-2 border bg-[#FFF2DE] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] rounded-[20px] font-bold text-center"
            >
              <option value="+55">+55</option>
            </select>

            <div>
              <SignInput
                className="text-center"
                placeholder="DDD"
                type="text"
                {...register("ddd")}
                hasError={!!errors.ddd}
              />
            </div>

            <div className="col-span-2">
              <SignInput
                placeholder="Telefone"
                type="tel"
                {...register("phone")}
                hasError={!!errors.phone}
              />
            </div>
          </div>

          {(errors.phone || errors.ddd || errors.codigoPais) && (
            <p className="text-sm text-magenta">
              {errors.phone?.message ||
                errors.ddd?.message ||
                errors.codigoPais?.message}
            </p>
          )}

          <div className="flex items-center justify-between bg-[#F6F6F6] text-mint-600 w-full h-10 rounded-3xl py-1 px-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)]">
            <div className="flex items-center">
              <input
                id="isArtisan"
                type="checkbox"
                {...register("isArtisan")}
                className="ml-2 mr-2 h-5 w-3 text-[#E05D00]"
              />
              <label htmlFor="isArtisan" className="text-base">
                Sou Artesão
              </label>
            </div>
            <button
              type="button"
              onClick={() => setShowPopover(!showPopover)}
              className="relative"
              aria-label="Informação sobre artesão"
            >
              <AiOutlineInfoCircle className="text-black" />
            </button>

            {showPopover && (
              <>
                <div className="fixed inset-0 bg-black/25 z-40"></div>

                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div
                    ref={popoverRef}
                    className="bg-white text-black text-sm rounded-3xl shadow-lg p-5 text-center max-w-72 h-auto"
                  >
                    <div className="flex justify-end mb-1">
                      <button
                        onClick={() => setShowPopover(false)}
                        className="font-sm"
                        aria-label="Fechar"
                      >
                        X
                      </button>
                    </div>
                    <p className="font-bold mb-2">Artesão credenciado</p>
                    <p className="text-xs">
                      Marque essa opção se você é artesão(a) cadastrado e faz
                      parte da associação vinculada à <strong>Fundacc</strong>{" "}
                      (Fundação Educacional e Cultural de Caraguatatuba). Isso
                      garante acesso a funcionalidades exclusivas para membros
                      reconhecidos.
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
            <Button
              disabled={isLoading}
              className="w-[191px] h-[42px] bg-[#E05D00] hover:bg-[#c05000] text-white py-2 px-6 rounded-[20px] border-b-4 border-[#a04500]"
              type="submit"
            >
              {isLoading ? "Processando..." : "Continuar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
