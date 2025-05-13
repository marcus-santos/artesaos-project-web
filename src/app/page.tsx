import Header from "@/components/header";
import CategoriesSlider from "@/components/categories-slider/CategoriesSlider";
import BannerNovidades from "@/components/BannerNovidades";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-items-center min-h-screen sm:px-12 lg:px-50 pb-20 py-8 font-[family-name:var(--font-poppins)]">
        <h2 className="text-2xl sm:text-3xl text-center font-bold mb-3">
          O que você procura?
        </h2>
        <CategoriesSlider />
        <div className="w-full order-2 sm:order-1">
          <BannerNovidades />
        </div>
        <div></div>
        <div className="order-1 sm:order-2 flex flex-col w-full px-4 mt-7">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-3xl font-bold">
              Produtos Populares
            </h2>
            <Button className="bg-transparent text-mint-600 border-2 rounded-md px-3 border-mint-200 hover:bg-mint-200 hover:text-white transition-colors duration-300">
              Ver Mais
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </main>
    </>
  );
}
