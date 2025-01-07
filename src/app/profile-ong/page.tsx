'use client';

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { RxArrowLeft } from "react-icons/rx";
import { toast } from "react-toastify";

import api from "@/lib/axios";
import logo from "../../../public/Logo.png";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileOngService() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center h-screen">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <Image src={logo} alt="Logo" />
        </div>
        <div className="mt-16">
          <h5 className="text-zinc-950 font-bold text-2xl">Perfil de Ong</h5>
          <h3 className="text-zinc-400 text-sm mt-6">
            Este é seu perfil de Ong com todas informações,<br /> aqui você pode checar e editar sua infos.
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
                  <Input id="name" defaultValue="ASPAAN" className="bg-white"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Email</Label>
                  <Input id="username" defaultValue="aspaan.ong@gmail.com" className="bg-white"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">Telefone</Label>
                  <Input id="name" defaultValue="5562995166462" className="bg-white"/>
                </div>
                <div className="space-y-1 flex items-baseline">
                  <div className="mt-4 w-96">
                    <Label htmlFor="username">Cidade</Label>
                    <Input id="username" defaultValue="Anápolis" className="bg-white"/>
                  </div>

                  <div className="ml-8 w-1/2">
                    <Label htmlFor="username">UF</Label>
                    <Input id="username" defaultValue="GO" className="bg-white"/>
                  </div>
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