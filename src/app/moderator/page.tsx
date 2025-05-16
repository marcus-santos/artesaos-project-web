import { MdSupervisorAccount } from "react-icons/md"
import ModeratorCard from "./components/ModeratorCard"
import ModeratorHeader from "./components/ModeratorHeader"
import ModeratorTitle from "./components/ModeratorTitle"
import { FiChevronRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

function page() {
  return (
    <>
      <ModeratorHeader />
      <ModeratorTitle />
      <div className="w-2/3 mx-auto flex justify-center gap-10">
        <ModeratorCard icon={<MdSupervisorAccount size={50} />} title={"Artesãos"} description={"Aprovar, editar, desativar contas..."} pending={0} finished={56} />
        <ModeratorCard icon={<MdSupervisorAccount size={50} />} title={"Artesãos"} description={"Visualizar, excluir produtos."} pending={0} finished={56} />
        <ModeratorCard icon={<MdSupervisorAccount size={50} />} title={"Artesãos"} description={"Gerenciar denúncias"} pending={0} finished={56} />
        <ModeratorCard icon={<MdSupervisorAccount size={50} />} title={"Artesãos"} description={"Acessar documentos importantes."} pending={0} finished={56} />
      </div>
      <div className="w-2/3 mx-auto flex justify-between mt-20 bg-solar text-sm py-4 px-6 items-center font-bold rounded-t-3xl">
        <p>NOTIFICAÇÕES</p>
        <Button
          className="text-[#711B29] hover:bg-solar hover:text-white cursor-pointer "
          variant={'ghost'}
        >
          VER TODAS
          <FiChevronRight />
        </Button>
      </div>

    </>

  )
}

export default page