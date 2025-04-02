import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <div className="flex h-screen">
      <div className="m-auto px-6 py-12 md:border-2 md:rounded-4xl flex flex-col justify-center items-center">
        <Image
          src="Criarte.svg"
          alt="Criart"
          width={125}
          height={125}
          className="mb-4"
        ></Image>
        <h1 className="font-bold text-7xl my-12">Olá</h1>
        <Button className="font-semibold bg-[#FF9D00] inset-shadow-sm text-bla inset-shadow-black/25 text-2xl py-8 px-8 rounded-3xl">
          Ja possuo Cadastro
        </Button>
        <Button className="mt-5 font-semibold bg-[#ABCFB5] inset-shadow-sm text-bla inset-shadow-black/25 text-2xl py-8 px-8 rounded-3xl">
          Quero me Cadastrar
        </Button>
        <Link href={"/initial"} className="text-md font-light underline mt-6">
          {" "}
          Continuar sem login
        </Link>
        <Link href={"/initial"} className="text-xl italic underline mt-7">
          {" "}
          Sou artista
        </Link>
      </div>
    </div>
  );
}

export default page;
