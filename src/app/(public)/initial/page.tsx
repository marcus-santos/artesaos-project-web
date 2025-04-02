import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <div className="flex h-screen">
      <div className="m-auto px-6 py-12 md:border-2 md:rounded-xl flex flex-col justify-center items-center">
        <Image
          src="Criarte.svg"
          alt="Criart"
          width={110}
          height={110}
          className="mb-8"
        ></Image>
        <h1 className="font-bold text-6xl my-12">Olá!</h1>
        <Link href={"/sign-in"}>
          <Button className="font-semibold cursor-pointer hover:bg-[#FF9D00]/70 bg-[#FF9D00] inset-shadow-sm text-bla inset-shadow-black/40 text-xl py-7 px-7 rounded-3xl">
            Ja possuo Cadastro
          </Button>
        </Link>
        <Link href={"/sign-up"}>
          <Button className="mt-5 font-semibold cursor-pointer hover:bg-[#ABCFB5]/70 bg-[#ABCFB5] inset-shadow-sm text-bla inset-shadow-black/40 text-xl py-7 px-7 rounded-3xl">
            Quero me Cadastrar
          </Button>
        </Link>
        <Link href={"/initial"} className="text-md font-light underline mt-6">
          Continuar sem login
        </Link>
        <Link href={"/initial"} className="text-xl italic underline mt-7">
          Sou artista
        </Link>
      </div>
    </div>
  );
}

export default page;
