import { Button } from "@/components/ui/button"
import { FiChevronLeft } from "react-icons/fi"

function ModeratorHeader() {
  return (
    <header className="w-full bg-solar-600">
      <nav className="pb-11 pt-17 flex justify-center gap-30 text-white font-semibold">
        <Button className="text-sm py-7 !px-10 bg-solar-900 rounded-2xl hover:bg-amber-900">
          <FiChevronLeft />
          VOLTAR
        </Button>
        <Button
          className="text-sm py-7 !px-14 bg-solar-300 drop-shadow-sm shadow-black/15 hover:bg-amber-900 rounded-2xl">
          INÍCIO
        </Button>
        <Button
          variant={"ghost"}
          className="text-sm py-7 !px-14 rounded-2xl hover:bg-amber-900 hover:text-white">
          ARTESÃOS
        </Button>
        <Button
          variant={"ghost"}
          className="text-sm py-7 !px-14 rounded-2xl hover:bg-amber-900 hover:text-white">
          EVENTOS
        </Button>
        <Button
          variant={"ghost"}
          className="text-sm py-7 !px-14 rounded-2xl hover:bg-amber-900 hover:text-white">
          DOCUMENTAÇÃO
        </Button>
      </nav>
    </header>
  )
}

export default ModeratorHeader