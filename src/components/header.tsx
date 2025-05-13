"use client";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import AuthenticationModal from "./AuthenticationModal/AuthenticationModal";
import useStoreUser from "@/hooks/useStoreUser";

function header() {
  const user = useStoreUser((state) => state.user);
  return (
    <header className="w-full bg-mint-200 pt-16 pb-8 px-4 sm:px-12 lg:px-54 grid gap-6 md:grid-cols-12 lg:gap-8">
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
        {!user.isAuthenticated && <AuthenticationModal />}
        {user.isAuthenticated && (
          <div className="flex items-center justify-center">
            <Image
              src={user.userPhoto ?? "/default-avatar.webp"}
              alt="User Avatar"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
        )}
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
