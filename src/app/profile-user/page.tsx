'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RxArrowLeft } from "react-icons/rx";

import logo from "../../../public/Logo.png";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileUser() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center h-screen">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <Image src={logo} alt="Logo" />
        </div>
        <div className="mt-16">
          <h5 className="text-zinc-950 font-bold text-2xl">Perfil de Usuário</h5>
          <h3 className="text-zinc-400 text-sm mt-6">
            Este é seu perfil de Usuário com todas suas<br />  
            informações, aqui você pode checar e editar suas infos.
          </h3>

          <Button
            variant="ghost"
            className="w-full mt-20 font-bold text-base"
            onClick={() => router.back()}
          >
            <RxArrowLeft color="red" size={24} />
            Voltar para o Dashboard
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-1/2 ml-2 mr-4 items-center justify-center">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="bg-zinc-700 grid w-full grid-cols-2">
            <TabsTrigger value="account">Dados de conta</TabsTrigger>
            <TabsTrigger value="password">Senha</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card className="bg-zinc-200">
              <CardHeader>
                <CardTitle>Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" defaultValue="Rafaela Rabelo Barbosa" className="bg-white"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Email</Label>
                  <Input id="username" defaultValue="rafaela.rb@gmail.com" className="bg-white"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">Telefone</Label>
                  <Input id="name" defaultValue="5562975311306" className="bg-white"/>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-red-600 hover:bg-red-700 font-bold">
                  Salvar Alterações
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card className="bg-zinc-200">
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Senha Atual</Label>
                  <Input id="current" type="password" className="bg-white"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Nova Senha</Label>
                  <Input id="new" type="password" className="bg-white"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Confirmar Senha</Label>
                  <Input id="new" type="password" className="bg-white"/>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-red-600 hover:bg-red-700 font-bold">
                  Salvar Senha
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
