'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RxArrowLeft } from "react-icons/rx";

import logo from "../../../public/Logo.png"
import { Button } from "@/components/ui/button";
import { ProfileOngForm } from "@/components/forms-ong";
//import { ProfileForm } from "@/components/forms";

export default function RegisterOng() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center h-screen">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <Image src={logo} alt="Logo"/>
        </div>
        <div className="mt-16">
          <h5 className="text-zinc-950 font-bold text-xl">Cadastro Ongs</h5>
          <h3 className="text-zinc-400 text-xs mt-6">
            Faça seu cadastro, entre na plataforma e ajude<br/> pessoas a encontrarem os casos da sua ONG.
          </h3>

          <Button variant="ghost" className="w-full mt-20 font-bold text-sm" onClick={() => router.push('/auth-ong')}>
            <RxArrowLeft color="red" size={24}/>
            Voltar para o Login de Ongs
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-1/2 items-center justify-center">
        <ProfileOngForm />
      </div>
    </div>
  )
}
