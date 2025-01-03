'use client';

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { RxArrowLeft } from "react-icons/rx";
import { toast } from "react-toastify";

import api from "@/lib/axios";
import logo from "../../../public/Logo.png";
import { Button } from "@/components/ui/button";
import { EditFormIncident } from "@/components/edit-form-incident";
import { RegisterSchema } from "@/components/edit-form-incident";

export default function EditIncident() {
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

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const response = await api.put(`incidents/${id}`, data);
      console.log(response.data);
      toast.success("Incidente atualizado com sucesso");
      router.back();
    } catch (error) {
      toast.error("Erro ao atualizar o incidente");
    }
  };

  if (!incidentData) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex justify-between items-center h-screen">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <Image src={logo} alt="Logo" />
        </div>
        <div className="mt-16">
          <h5 className="text-zinc-950 font-bold text-2xl">Editar Casos</h5>
          <h3 className="text-zinc-400 text-sm mt-6">
            Edite ou corrija o caso detalhadamente<br /> para encontrar um herói para resolver isso.
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
      <div className="flex flex-col w-1/2 items-center justify-center">
        <EditFormIncident
          id={id}
          initialData={incidentData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
