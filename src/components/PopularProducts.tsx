import React from "react";
import { Button } from "./ui/button";
import { BaseCard, ProductCardBody } from "./Card";
import Image from "next/image";
import products from "../db-mock/products.json";

function PopularProducts() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-3xl font-bold">Produtos Populares</h2>
        <Button className="bg-transparent text-mint-600 border-2 rounded-md px-3 border-mint-200 hover:bg-mint-200 hover:text-white transition-colors duration-300 cursor-pointerz\">
          Ver Mais
        </Button>
      </div>
      <div className="justify-between items-center grid grid-cols-6 gap-8 mt-4">
        {products.map((product, i) => (
          <BaseCard key={i}>
            <div className="relative w-full h-34 md:h-40">
              <Image
                src={"/" + product.img}
                alt="Criarte Logo"
                className="rounded-lg object-cover"
                fill
              />
            </div>
            <ProductCardBody
              price={product.price}
              title={product.title}
              author={product.author}
            />
          </BaseCard>
        ))}
      </div>
    </>
  );
}

export default PopularProducts;
