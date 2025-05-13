import React from "react";
import { Button } from "./ui/button";
import { BaseCard, ProductCardBody } from "./Card";
import Image from "next/image";

function PopularProducts() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-3xl font-bold">Produtos Populares</h2>
        <Button className="bg-transparent text-mint-600 border-2 rounded-md px-3 border-mint-200 hover:bg-mint-200 hover:text-white transition-colors duration-300">
          Ver Mais
        </Button>
      </div>
      <div className="flex flex-wrap justify-between items-center">
        <BaseCard>
          <Image
            src="/ceramica-e-porcelana.webp"
            alt="Criarte Logo"
            className="rounded-lg w-full"
            width={140}
            height={140}
          />
          <ProductCardBody
            price="R$ 50,00"
            title="Cerâmica e Porcelana"
            author="Criarte"
          />
        </BaseCard>
        <BaseCard>
          <Image
            src="/ceramica-e-porcelana.webp"
            alt="Criarte Logo"
            className="rounded-lg w-full"
            width={140}
            height={140}
          />
          <ProductCardBody
            price="R$ 50,00"
            title="Cerâmica e Porcelana"
            author="Criarte"
          />
        </BaseCard>
        <BaseCard>
          <Image
            src="/ceramica-e-porcelana.webp"
            alt="Criarte Logo"
            className="rounded-lg w-full"
            width={140}
            height={140}
          />
          <ProductCardBody
            price="R$ 50,00"
            title="Cerâmica e Porcelana"
            author="Criarte"
          />
        </BaseCard>
        <BaseCard>
          <Image
            src="/ceramica-e-porcelana.webp"
            alt="Criarte Logo"
            className="rounded-lg w-full"
            width={140}
            height={140}
          />
          <ProductCardBody
            price="R$ 50,00"
            title="Cerâmica e Porcelana"
            author="Criarte"
          />
        </BaseCard>
      </div>
    </>
  );
}

export default PopularProducts;
