"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RxEnter } from "react-icons/rx";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { toast } from "react-toastify";

import logo from "../../public/Logo.png";
import bg from "../../public/ background-home.png";

import api from '@/lib/axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function Home() {
  const router = useRouter();
  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, formState: { errors } } = methods;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('authToken');
      if (token) {
        router.replace('/dashboard-user');
      }
    }
  }, [router]);

  const onSubmit = async (data: LoginSchema) => {
    try {
      if (!data.email || !data.password) {
        toast.warning('Por favor, forneça o nome de usuário e a senha', {theme: "light"});
        throw new Error('Por favor, forneça o nome de usuário e a senha');
      }

      const response = await api.post('auth/login', data, { withCredentials: true });

      if (response.data.accessToken) {
        localStorage.setItem('authToken', response.data.accessToken);
        toast.success(`Usuário Logado: ${data.email}, Seja Bem vindo!`, {theme: "light"})
        router.replace('/dashboard-user');
      } else {
        toast.error('Token não encontrado na resposta', {theme: "light"})
        throw new Error('Token não encontrado na resposta');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = 'Login falhou. Por favor, verifique suas credenciais e tente novamente.';
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
            <h5 className="text-zinc-950 font-bold ml-4">Login Usuário</h5>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
                  <FormField
                    name="email"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Seu Usuário" 
                            {...field} 
                            value={field.value || ''} 
                            className="bg-zinc-100 text-zinc-400 ml-4 mt-8" 
                          />
                        </FormControl>
                        {errors.email && <FormMessage className="ml-4 text-zinc-400">{errors.email.message}</FormMessage>}
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Sua Senha" 
                            {...field} 
                            value={field.value || ''} 
                            className="bg-zinc-100 text-zinc-400 text-lg ml-4 mt-6" 
                          />
                        </FormControl>
                        {errors.password && <FormMessage className="ml-4 text-zinc-400">{errors.password.message}</FormMessage>}
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 ml-4 mt-8 font-bold">
                    Entrar
                  </Button>
                </form>
              </FormProvider>
          </div>

          <div className="mt-8">
            <Button variant="ghost" className="w-full ml-4 font-bold text-sm" onClick={() => router.push('/register-user')}>
              <RxEnter color="red" size={24}/>
              Não tenho cadastro
            </Button>
          </div>

          <div className="mt-8">
            <Button variant="ghost" className="w-full ml-4 font-bold text-sm" onClick={() => router.push('/auth-ong')}>
              <RxEnter color="red" size={24}/>
              É Ong? Clique aqui para login.
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
