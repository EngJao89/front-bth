import Image from "next/image";
import logoHeader from "../../../public/logo-header.png";
import { Button } from "../ui/button";

export function Header() {
  return (
    <nav className="w-full pl-4 bg-zinc-300 bg-opacity-30 backdrop-blur-lg fixed top-0 left-0 z-50">
      <div className="container mx-auto px-3 py-3 h-full">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Image src={logoHeader} alt="Logo Header"/>
          </div>
          <div className="ml-4 p-2">
            <Button variant="ghost">Bem vinda, APAD</Button>
          </div>
          <div className="ml-4 p-2">
            <Button variant="secondary" className="w-full bg-red-600 ml-4 font-bold text-zinc-100 text-xs">
              Cadastrar Novo Caso
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}