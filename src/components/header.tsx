import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import AuthenticationModal from "./AuthenticationModal/AuthenticationModal";

function header() {
  return (
    <header className="w-full bg-mint-200 pt-16 pb-8 px-4 grid gap-6 sm:px-12 md:grid-cols-12 lg:px-20 lg:gap-8">
      <div className="flex items-center justify-between md:col-span-8">
        <div className="">
          <IoMenu size={30} />
        </div>
        <Image
          src="Criarte.svg"
          alt="Criarte Logo"
          className="md:w-36"
          width={100}
          height={20}
          priority
        />
        <AuthenticationModal></AuthenticationModal>
        {/* <Button
          onClick={handleClick}
          variant="outline"
          className="bg-transparent cursor-pointer hover:bg-white/20 border-black text-black inset-shadow-black/50 inset-shadow-sm p-6 rounded-full underline underline-offset-1 text-xs"
        >
          Entre ou cadastre-se
        </Button> */}
      </div>
      <div className="relative md:col-span-4">
        <Input
          type="text"
          placeholder="Pesquise aqui..."
          className="bg-white rounded-3xl pl-10 pr-6 py-7 drop-shadow-lg shadow-black/40"
        />
        <IoIosSearch className="absolute left-1.5 top-[25%]" size={30} />
      </div>
    </header>
  );
}

export default header;
