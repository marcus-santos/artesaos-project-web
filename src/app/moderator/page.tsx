import { MdSupervisorAccount } from "react-icons/md"
import ModeratorCard from "./components/ModeratorCard"
import ModeratorHeader from "./components/ModeratorHeader"
import ModeratorTitle from "./components/ModeratorTitle"

function page() {
  return (
    <>
      <ModeratorHeader />
      <ModeratorTitle/>
      <div className="w-2/3 mx-auto flex">
        <ModeratorCard icon={<MdSupervisorAccount size={50}/>} title={"Artesãos"} description={"Aprovar, editar, desativar contas..."} pending={0} finished={56}/>
      </div>
      
    </>

  )
}

export default page