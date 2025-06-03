import React from "react";
import { FaRegHeart } from "react-icons/fa";

type ṔroductCardProps = {
  price: number;
  title: string;
  author: string;
};

function BaseCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-mint-200 p-2 flex flex-col sm:max-w-40 rounded-lg md:max-w-full">
      {children}
    </div>
  );
}

function ProductCardBody({ price, title, author }: ṔroductCardProps) {
  return (
    <>
      <header className="flex justify-between items-center mt-2 mb-2">
        <p className="font-bold lg:text-xl md:text-lg text-mint-600 truncate">
          R$ {price}
        </p>
        <FaRegHeart size={25} color="#E00061" />
      </header>
      <p className="text-xs lg:text-lg truncate">{title}</p>
      <p className="text-xs lg:text-lg truncate italic font-light">{author}</p>
    </>
  );
}

export { BaseCard, ProductCardBody };
