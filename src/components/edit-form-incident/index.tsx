import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/lib/axios";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const registerSchema = z.object({
  title: z.string().min(3, "Título é obrigatório"),
  description: z.string().min(15, "Descrição é obrigatória"),
  ong: z.string().min(3, "ONG é obrigatória"),
  email: z.string().email("E-mail é obrigatório"),
  whatsapp: z.string().min(13, "O whatsapp deve ter pelo menos 13 caracteres"),
  value: z.string().min(4, "Insira um valor válido"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

interface FormIncidentProps {
  id: string;
  title: string;
  description: string;
  ong: string;
  email: string;
  whatsapp: string;
  value: string;
}

interface EditCardProps {
  id: FormIncidentProps;
  onSubmit: (data: RegisterSchema) => Promise<void>;
}

export function EditFormIncident({ id, onSubmit }: EditCardProps) {
  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, formState: { errors }, reset } = methods;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await api.get(`incidents/${id}`);

        reset({
          title: response.data.title || "",
          description: response.data.description || "",
          ong: response.data.ong || "",
          email: response.data.email || "",
          whatsapp: response.data.whatsapp || "",
          value: response.data.value || "",
        });
      } catch (error) {
        toast.error("Erro ao carregar os dados do incidente");
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id, reset]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full ml-4 mr-12">
        <FormField
          control={methods.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Digite o título" {...field} />
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
                <Textarea placeholder="Descrição do incidente" {...field} className="mt-4" />
              </FormControl>
              {errors.description && <FormMessage className="text-zinc-500">{errors.description.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="ong"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  placeholder="Digite a ONG responsável pelo incidente" 
                  {...field} 
                  className="mt-4" 
                />
              </FormControl>
              {errors.ong && <FormMessage className="text-zinc-500">{errors.ong.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Digite o seu email de contato" {...field} className="mt-4" />
              </FormControl>
              {errors.email && <FormMessage className="text-zinc-500">{errors.email.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Digite o seu o whatsapp de contato" {...field} className="mt-4" />
              </FormControl>
              {errors.whatsapp && <FormMessage className="text-zinc-500">{errors.whatsapp.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Valores em Reais" {...field} className="mt-4" />
              </FormControl>
              {errors.value && <FormMessage className="text-zinc-500">{errors.value.message}</FormMessage>}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-4 bg-red-600 hover:bg-red-700">Salvar</Button>
      </form>
    </FormProvider>
  );
}
