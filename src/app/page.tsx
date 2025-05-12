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
        <BannerNovidades />
      </main>
    </>
  );
}
