'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "../../../public/Logo.png";
import { RxArrowLeft } from "react-icons/rx";

export default function EditIncident() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center h-screen">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <Image src={logo} alt="Logo"/>
        </div>
        <div className="mt-16">
          <h5 className="text-zinc-950 font-bold text-2xl">Editar Casos</h5>
          <h3 className="text-zinc-400 text-sm mt-6">
            Edite ou corrija o caso detalhadamente<br/> para encontrar um herói para resolver isso. 
          </h3>

          <Button variant="ghost" className="w-full mt-20 font-bold text-base" onClick={() => router.back()}>
            <RxArrowLeft color="red" size={24}/>
            Voltar para o Dashboard
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-1/2 items-center justify-center">
        {/* <FormIncident /> */}
      </div>
    </div>
  )
}