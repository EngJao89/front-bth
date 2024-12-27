'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaListAlt } from "react-icons/fa";
import { RxArrowLeft } from "react-icons/rx";

import logo from "../../../public/Logo.png"
import { Button } from "@/components/ui/button";
import { ProfileUserForm } from "@/components/forms-user";

export default function UserRegister() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center h-screen">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <Image src={logo} alt="Logo"/>
        </div>
        <div className="mt-16">
          <h5 className="text-zinc-950 font-bold text-xl">Cadastro Usuários</h5>
          <h3 className="text-zinc-400 text-xs mt-6">
            Faça seu cadastro, entre na plataforma e ajude<br/> pessoas a encontrarem os casos da sua ONG.
          </h3>

          <Button variant="ghost" className="w-full mt-20 font-bold text-sm" onClick={() => router.push('/')}>
            <RxArrowLeft color="red" size={24}/>
            Voltar para o Login de Usuário
          </Button>

          <Button variant="ghost" className="w-full mt-10 font-bold text-sm" onClick={() => router.push('/register-ong')}>
            <FaListAlt color="red" size={24}/>
            Cadastro de Ongs
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-1/2 items-center justify-center">
        <ProfileUserForm />
      </div>
    </div>
  )
}
