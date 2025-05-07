import Header from "@/components/header";
import CategoriesSlider from "@/components/categories-slider/CategoriesSlider";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-items-center min-h-screen px-4 sm:px-12 lg:px-54 pb-20 gap-16 py-8 font-[family-name:var(--font-poppins)]">
        <h2 className="text-3xl font-bold mb-[-32px]">O que você procura?</h2>
        <CategoriesSlider />
      </main>
    </>
  );
}
