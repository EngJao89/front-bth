import Image from "next/image";
import { RxEnter } from "react-icons/rx";

import logo from "../../public/Logo.png";
import bg from "../../public/ background-home.png";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <main className="flex justify-around items-center h-screen">
        <div>
          <div className="mt-10">
          <Image src={logo} alt={"Logo"} className="items-center ml-4"/>
          </div>

          <div className="mt-16">
            <h5 className="text-zinc-950 font-bold ml-4">Faça seu logon</h5>
            <Input placeholder="Your username" className="bg-zinc-100 text-zinc-400 m-4"/>
            <Input placeholder="Password" className="bg-zinc-100 text-zinc-400 text-lg m-4"/>
            <Button className="w-full bg-red-600 ml-4">Entrar</Button>
          </div>

          <div className="mt-8">
            <Button variant="ghost" className="w-full ml-4 font-bold text-sm">
              <RxEnter color="red" size={24}/>
              Não tenho cadastro
            </Button>
          </div>
        </div>
        <div>
          <Image src={bg} alt="background"/>
        </div>
      </main>
    </div>
  );
}
