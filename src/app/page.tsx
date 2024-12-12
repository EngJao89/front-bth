import Image from "next/image";
import { RxEnter } from "react-icons/rx";

import logo from "../../public/Logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="m-10">
          <Image src={logo} alt={"Logo"} className="items-center ml-4"/>

          <div className="mt-10">
            <h5 className="text-zinc-950 font-bold ml-4">Faça seu logon</h5>
            <Input placeholder="Your username" className="bg-zinc-100 text-zinc-400 m-4"/>
            <Input placeholder="Password" className="bg-zinc-100 text-zinc-400 m-4"/>
            <Button className="w-full bg-red-600 ml-4">Entrar</Button>
          </div>

          <div className="mt-6">
            <Button variant="ghost" className="w-full ml-4">
              <RxEnter color="red" size={24}/>
              Não tenho cadastro
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
