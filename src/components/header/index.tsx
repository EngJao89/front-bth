import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPowerOff } from "react-icons/fa";

import logoHeader from "../../../public/logo-header.png";
import { Button } from "../ui/button";

export function Header() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('authToken');
    setToken(null);
    toast.warn('User Logged Out', { theme: "dark" });
    router.replace('/login');
  }

  return (
    <nav className="w-full bg-zinc-300 bg-opacity-30 backdrop-blur-lg fixed">
      <div className="container mx-auto px-3 py-3 h-full">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Image src={logoHeader} alt="Logo Header"/>
          </div>
          <div className="ml-4 p-2">
            <Button variant="ghost">Bem vinda, APAD</Button>
          </div>
          <div className="ml-4 p-2">
            <Button variant="secondary" className="w-full bg-red-600 hover:bg-red-700 ml-4 font-bold text-zinc-100 text-xs">
              Cadastrar Novo Caso
            </Button>
          </div>
          <div>
            <Button variant="outline" size="icon" className="bg-zinc-100 hover:bg-zinc-200">
              <FaPowerOff color="red" size={16}/>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}