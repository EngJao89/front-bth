import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from 'axios';
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import api from "@/lib/axios";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

const registerSchema = z.object({
  title: z.string().min(3, "Título é obrigatório"),
  description: z.string().min(15, "Descrição é obrigatória"),
  value: z.string().min(4, "Insira um valor válido"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export function FormIncident() {
  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, formState: { errors } } = methods;
  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    try {

      const response = await api.post('incidents', {
        title: data.title,
        description: data.description,
        value: data.value,
      });

      if(response.status === 200 || response.status === 201){
        toast.success('Incidente criado com sucesso', {theme: "light"})
        router.replace('/');
      }
    } catch (error: any) {
      toast.error('Error:' +(error),  {theme: "light"});

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Server response:', error.response.data);
          toast.error(
            'O registro falhou: ' + (error.response.data.message || 
            'Por favor, verifique suas informações e tente novamente.'), 
            {theme: "light"}
            );
        } else if (error.request) {
          console.error('Erro de solicitação:', error.request);
          toast.error('Falha no registro: Nenhuma resposta do servidor.', {theme: "light"});
        } else {
          console.error('Unexpected error:', error.message);
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} className=""/>
              </FormControl>
              {errors.title && <FormMessage className="text-zinc-500">{errors.title.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Descrição do incidente" {...field} className="mt-4"/>
              </FormControl>
              {errors.description && <FormMessage className="text-zinc-500">{errors.description.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Valores em Reais" {...field} className="mt-4"/>
              </FormControl>
              {errors.value && <FormMessage className="text-zinc-500">{errors.value.message}</FormMessage>}
            </FormItem>
          )}
        />

        <div className="flex items-baseline">
          <Button className="w-1/2 mt-4 mr-2">Cancelar</Button>
          <Button type="submit" className="w-1/2 mt-4 ml-2 bg-red-600 hover:bg-red-700">Cadastrar</Button>
        </div>
      </form>
    </FormProvider>
  )
}