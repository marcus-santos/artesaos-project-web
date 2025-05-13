import React from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";

function Card() {
  return (
    <div className="border border-mint-200 p-2 flex flex-col max-w-40 rounded-lg mt-4">
      <Image
        src="/ceramica-e-porcelana.webp"
        alt="Criarte Logo"
        className="rounded-lg w-full"
        width={140}
        height={140}
      />
      <header className="flex justify-between items-center mt-2 mb-2">
        <p className="font-bold text-mint-600 truncate">R$ 100,00</p>
        <FaRegHeart size={25} color="#E00061" />
      </header>
      <p className="text-xs truncate">Colar de Miçangas</p>
      <p className="text-xs truncatr italic font-light">Helena Tavares</p>
    </div>
  );
}

export default Card;
