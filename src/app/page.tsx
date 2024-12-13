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
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
        toast.warning('Please provide both username and password', {theme: "light"});
        throw new Error('Please provide both username and password');
      }

      const response = await api.post('auth/login', data);

      console.log(response);

      if (response.data.accessToken) {
        localStorage.setItem('authToken', response.data.accessToken);
        toast.success(`Login in user: ${data.email} successfully!`, {theme: "light"})
        router.replace('/dashboard');
      } else {
        toast.error('Token not found in response', {theme: "light"})
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error('Erro:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error.response?.data?.message || 'Login failed. Please check your credentials and try again.';
        toast.error(axiosError, {theme: "light"});
      } else {
        toast.error('An unexpected error has occurred. Try again later.', {theme: "light"});
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
                <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-4">
                  <FormField
                    name="email"
                    control={methods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Your username" {...field} className="bg-zinc-100 text-zinc-400 m-4" />
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
                          <Input type="password" placeholder="Password" {...field} className="bg-zinc-100 text-zinc-400 text-lg m-4" />
                        </FormControl>
                        {errors.password && <FormMessage className="text-white">{errors.password.message}</FormMessage>}
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-red-600 ml-4 font-bold">Entrar</Button>
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
