'use client';

import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";

import api from "@/lib/axios";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

interface IncidentData {
  id: string;
  title: string;
  description: string;
  value: string;
}

interface CardProps {
  incident: IncidentData;
}
export function CardDetails({ incident }: CardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [incidentData, setIncidentData] = useState<IncidentData | null>(null);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await api.get(`incidents/${id}`);
        setIncidentData(response.data);
      } catch (error) {
        toast.error("Erro ao carregar os dados do incidente");
      }
    };

    if (id) {
      fetchIncident();
    }
  }, [id]);

  return (
    <div className="bg-zinc-200 w-full rounded-md mx-3 my-4 p-3">
      <div className="flex mt-4 mb-2 justify-between">
        <h1 className="text-zinc-950 font-bold text-sm">Caso:</h1>
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
    </div>
  )
}