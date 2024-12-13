'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RxArrowLeft } from "react-icons/rx";

import logo from "../../../public/Logo.png"
import { Button } from "@/components/ui/button";

export default function Register() {
  const router = useRouter();

  return (
    <div className="flex justify-around items-center h-screen">
      <div>
        <div>
          <Image src={logo} alt="Logo"/>
        </div>
        <div className="mt-16">
          <h5 className="text-zinc-950 font-bold text-xl">Cadastro</h5>
          <h3 className="text-zinc-400 text-xs mt-6">
            Faça seu cadastro, entre na plataforma e ajude<br/> pessoas a encontrarem os casos da sua ONG.
          </h3>

          <Button variant="ghost" className="w-full mt-20 font-bold text-sm" onClick={() => router.push('/')}>
            <RxArrowLeft color="red" size={24}/>
            Voltar para o Logon
          </Button>
        </div>
      </div>
    </div>
  )
}
