'use client';

import { useRouter } from "next/navigation";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

import api from "@/lib/axios";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { RxArrowRight } from "react-icons/rx";

interface IncidentData {
  id: string;
  title: string;
  description: string;
  value: string;
}

interface CardProps {
  incident: IncidentData;
}

export function Card({ incident }: CardProps) {
  const router = useRouter();

  const handleDeletePlayer = async (id: string) => {
    try {

      await api.delete(`incidents/${id}`);

      toast.success(`Incidente "${id}" deletado com successo`, { theme: "light" });

      window.location.reload();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        toast.error(`Erro ao deletar incident: ${axiosError.message}`, { theme: "light" });
      } else {
        toast.error('Um erro inexperado aconteceu', { theme: "light" });
      }
    }
  }

  return (
    <div className="bg-zinc-200 w-10/12 rounded-md mx-3 my-4 p-3">
      <div className="flex mt-4 mb-2 justify-between">
        <h1 className="text-zinc-950 font-bold text-sm">Caso:</h1>
        <div>
          <Button variant="ghost" className="mt-0 mr-1" onClick={() => router.push(`/edit-incident?id=${incident.id}`)}>
            <FaPencilAlt size={12} color="gray"/>
          </Button>
          <Button variant="ghost" onClick={() => handleDeletePlayer(incident.id)}>
            <FaRegTrashAlt size={12} color="gray"/>
          </Button>
        </div>
      </div>
      <div>
        <h1 className="text-zinc-500 text-xs">{incident.title}</h1>
      </div>

      <div className="mt-4 mb-2">
        <h1 className="text-zinc-950 font-bold text-sm">Descrição:</h1>
      </div>
      <div>
        <h1 className="text-zinc-500 text-xs">{incident.description}</h1>
      </div>

      <div className="mt-4 mb-2">
        <h1 className="text-zinc-950 font-bold text-sm">Valor:</h1>
      </div>
      <div className="mb-4">
        <h1 className="text-zinc-500 text-xs">R$ {incident.value}</h1>
      </div>

      <Separator className="bg-white"/>

      <Button
        variant="ghost"
        className="w-full mt-4 justify-between font-bold text-sm text-red-600 hover:text-red-700"
        onClick={() => router.push('/details-incident')}
      >
        Ver mais detalhes
        <RxArrowRight color="red" size={24} />
      </Button>
    </div>
  );
}
