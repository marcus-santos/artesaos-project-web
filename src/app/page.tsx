import Header from "@/components/header";
import CategoriesSlider from "@/components/categories-slider/CategoriesSlider";
import BannerNovidades from "@/components/BannerNovidades";
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-items-center min-h-screen sm:px-12 lg:px-50 pb-20 py-8 font-[family-name:var(--font-poppins)]">
        <h2 className="text-3xl text-center font-bold mb-3">
          O que você procura?
        </h2>
        <CategoriesSlider />
        <div className="w-full order-2 sm:order-1">
          <BannerNovidades />
        </div>
        <div></div>
        <div className="order-1 sm:order-2">
          <h2 className="text-3xl w-full font-bold mb-3 mt-7">
            Produtos Populares
          </h2>
          <div className="flex flex-col sm:flex-row gap-6"></div>
        </div>
      </main>
    </>
  );
}
