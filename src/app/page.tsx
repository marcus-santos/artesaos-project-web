import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-poppins)]">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-bold text-center">Criarte</h1>
          <p className="text-lg text-center">
            Uma plataforma de arte para artesãos
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <h2 className="text-2xl font-bold">Bem-vindo ao Criarte!</h2>
          <p className="text-lg text-center">
            Aqui você pode encontrar uma variedade de produtos artesanais feitos
            com amor e dedicação.
          </p>
        </div>
      </div>
    </>
  );
}
