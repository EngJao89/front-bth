"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { toast } from "react-toastify";

import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const registerSchema = z.object({
  name: z.string().min(3, "Nome de usuário é obrigatório"),
  email: z.string().email("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  phone: z.string().min(13, "O telefone deve ter pelo menos 13 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export function ProfileUserForm() {
  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, formState: { errors } } = methods;
  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    try {

      const response = await api.post('users', {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });

      if(response.status === 200 || response.status === 201){
        toast.success('Usuário criado com sucesso', {theme: "light"})
        router.replace('/');
      }
    } catch (error: any) {
      toast.error('Error:' +(error),  {theme: "light"});

      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(
            'O registro falhou: ' + (error.response.data.message || 
            'Por favor, verifique suas informações e tente novamente.'), 
            {theme: "light"}
          );
        } else if (error.request) {
          toast.error('Falha no registro: Nenhuma resposta do servidor.', {theme: "light"});
        } else {
          toast.error('O registro falhou: ' + error.message, {theme: "light"});
        }
      } else {
        toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.', {theme: "light"});
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full ml-4 mr-12">
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} className=""/>
              </FormControl>
              {errors.name && <FormMessage className="text-zinc-500">{errors.name.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Digite um email válido" {...field} className="mt-4"/>
              </FormControl>
              {errors.email && <FormMessage className="text-zinc-500">{errors.email.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Digite sua senha..." {...field} className="mt-4"/>
              </FormControl>
              {errors.password && <FormMessage className="text-zinc-500">{errors.password.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Digite seu telefone" {...field} className="mt-4"/>
              </FormControl>
              {errors.phone && <FormMessage className="text-zinc-500">{errors.phone.message}</FormMessage>}
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4">Submit</Button>
      </form>
    </FormProvider>
  );
}
