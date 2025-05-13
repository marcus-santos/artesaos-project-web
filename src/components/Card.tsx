import React from "react";
import { FaRegHeart } from "react-icons/fa";

type ṔroductCardProps = {
  price: string;
  title: string;
  author: string;
};

function BaseCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-mint-200 p-2 flex flex-col max-w-40 rounded-lg mt-4">
      {children}
    </div>
  );
}

function ProductCardBody({ price, title, author }: ṔroductCardProps) {
  return (
    <>
      <header className="flex justify-between items-center mt-2 mb-2">
        <p className="font-bold text-mint-600 truncate">R$ {price}</p>
        <FaRegHeart size={25} color="#E00061" />
      </header>
      <p className="text-xs truncate">{title}</p>
      <p className="text-xs truncatr italic font-light">{author}</p>
    </>
  );
}

export { BaseCard, ProductCardBody };
