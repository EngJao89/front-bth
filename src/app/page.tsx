"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RxEnter } from "react-icons/rx";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import api from '@/lib/axios';
import { toast } from "react-toastify";

import logo from "../../public/Logo.png";
import bg from "../../public/ background-home.png";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function Home() {
  const router = useRouter();
  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, formState: { errors } } = methods;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('authToken');
      if (token) {
        router.replace('/dashboard');
      }
    }
  }, [router]);

  const onSubmit = async (data: LoginSchema) => {
    try {
      if (!data.email || !data.password) {
        toast.warning('Por favor, forneça o nome de usuário e a senha', {theme: "light"});
        throw new Error('Por favor, forneça o nome de usuário e a senha');
      }

      const response = await api.post('auth/login', data);

      if (response.data.accessToken) {
        localStorage.setItem('authToken', response.data.accessToken);
        toast.success(`Usuário Logado: ${data.email}, Seja Bem vindo!`, {theme: "light"})
        router.replace('/dashboard');
      } else {
        toast.error('Token não encontrado na resposta', {theme: "light"})
        throw new Error('Token não encontrado na resposta');
      }
    } catch (error) {
      console.error('Erro:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error.response?.data?.message || 'Login falhou. Por favor, verifique suas credenciais e tente novamente.';
        toast.error(axiosError, {theme: "light"});
      } else {
        toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.', {theme: "light"});
      }
    }
  };

  return (
    <div>
      <main className="flex justify-around items-center h-screen">
        <div>
          <div className="mt-10">
          <Image src={logo} alt={"Logo"} className="items-center ml-4"/>
          </div>

          <div className="mt-16">
            <h5 className="text-zinc-950 font-bold ml-4">Faça seu logon</h5>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
                  <FormField
                    name="email"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu Usuário" {...field} className="bg-zinc-100 text-zinc-400 ml-4" />
                        </FormControl>
                        {errors.email && <FormMessage className="text-white">{errors.email.message}</FormMessage>}
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Sua senha" {...field} className="bg-zinc-100 text-zinc-400 text-lg ml-4" />
                        </FormControl>
                        {errors.password && <FormMessage className="text-white">{errors.password.message}</FormMessage>}
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-red-600 ml-4 mt-8 font-bold">Entrar</Button>
                </form>
              </FormProvider>
          </div>

          <div className="mt-8">
            <Button variant="ghost" className="w-full ml-4 font-bold text-sm" onClick={() => router.push('/register')}>
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
