'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RxArrowLeft } from "react-icons/rx";
import { toast } from "react-toastify";

import api from "@/lib/axios";
import logo from "../../../public/Logo.png";
import { Button } from "@/components/ui/button";
import { CardDetails } from "@/components/card-details";

interface IncidentData {
  id: string;
  title: string;
  description: string;
  value: string;
}


export default function DetailsIncident() {
  const router = useRouter();
  const [incident, setIncident] = useState<IncidentData | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        if (id) {
          const response = await api.get(`incidents/${id}`);
          setIncident(response.data);
        }
      } catch (error) {
        toast.error("Erro ao carregar os dados do incidente");
      }
    };

    if (id) {
      fetchIncident();
    }
  }, [id]);

  if (!incident) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex justify-between items-center h-screen">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <Image src={logo} alt="Logo" />
        </div>
        <div className="mt-16">
          <h5 className="text-zinc-950 font-bold text-2xl">Detalhe do Caso</h5>
          <h3 className="text-zinc-400 text-sm mt-6">
            Veja o caso detalhadamente para<br /> encontrar um herói para resolver isso.
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
      <div className="flex flex-col w-1/2 p-8 items-center justify-center">
        <CardDetails incident={incident} />
      </div>
    </div>
  );
}
