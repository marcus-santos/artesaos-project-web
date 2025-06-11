'use client'

import ModeratorHeader from "../../components/ModeratorHeader"
import ModeratorTitle from "../../components/ModeratorTitle"
import { useParams } from 'next/navigation'
import artisans from "@/db-mock/artisans.json"
import { Button } from "@/components/ui/button"
import { FaCheck } from "react-icons/fa"
import { BsXLg } from "react-icons/bs"

function Page() {
  const params = useParams();
  const artisanId = params.id as unknown as number;
  const artisan = artisans.at(artisanId - 1);

  return (
    <div className='overflow-x-hidden'>
      <ModeratorHeader />
      <ModeratorTitle title={'Artesãos'} />
      <div className="w-2/3 flex mx-auto mt-10 items-center justify-between">
        <h2 className="text-2xl text-midnight font-semibold">
          {artisan ? artisan.name : "Artesão não encontrado"}
        </h2>
        <div className="flex gap-4">
          <Button className="h-7 text-xs my-1 bg-green-600 rounded-xl" aria-label="Aprovar artesão">
            <FaCheck className="text-white" />
            APROVAR
          </Button>
          <Button className="h-7 text-xs my-1 text-white font-bold border bg-red-500 rounded-xl" aria-label="Desativar artesão">
            <BsXLg className="text-white" />
            DESATIVAR
          </Button>
        </div>
      </div>
      <div className="w-2/3 h-[632px] mx-auto my-10 text-midnight rounded-lg shadow ring-[0.5px] ring-black/20 shadow-black/30">
        <h3>Dados Pessoais</h3>
      </div>

    </div>
  )
}

export default Page