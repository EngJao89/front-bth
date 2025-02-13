'use client';

import { useSearchParams } from "next/navigation";
import { RxClipboardCopy } from "react-icons/rx";
import { toast } from "react-toastify";

import api from "@/lib/axios";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

interface IncidentData {
  id: string;
  title: string;
  description: string;
  ong: string;
  email: string;
  whatsapp: string;
  value: string;
}

interface CardProps {
  incident: IncidentData;
}
export function CardDetails({ incident }: CardProps) {
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

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copiado para a área de transferência!");
    }).catch(() => {
      toast.error("Erro ao copiar para a área de transferência");
    });
  };

  return (
    <>
      <div className="bg-zinc-200 w-full rounded-md mx-6 my-6 p-3">
        <div className="flex justify-between">
          <div>
            <div className="mt-4 mb-2 ">
              <h1 className="text-zinc-950 font-bold text-sm">Caso:</h1>
            </div>
            <div>
              <h1 className="text-zinc-500 text-xs">{incident.title}</h1>
            </div>
          </div>

          <div>
            <div className="mt-4 mb-2">
              <h1 className="text-zinc-950 font-bold text-sm">ONG:</h1>
            </div>
            <div>
              <h1 className="text-zinc-500 text-xs">{incident.ong}</h1>
            </div>
          </div>
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

      <div className="bg-zinc-200 w-full rounded-md mx-3 my-4 p-3">
        <div className="flex mt-4 mb-2 justify-between">
          <h1 className="text-zinc-950 font-bold text-sm">
            Salve o dia!<br />
            Seja o herói desse caso.
          </h1>
        </div>
        <div>
          <h1 className="text-zinc-500 text-xs">Entre em contato:</h1>
        </div>
        <div className="flex items-baseline">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-1/2 mt-4 mb-4 bg-red-600 hover:bg-red-700">
                Whatsapp
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full bg-zinc-600 text-white text-sm">
              <div>
                <Button 
                  variant="ghost" 
                  className="hover:bg-zinc-500 font-medium leading-none"
                  onClick={() => handleCopyToClipboard(incident.whatsapp)}
                >
                  {incident.whatsapp}
                  <RxClipboardCopy color="white" size={14}/>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-1/2 mt-4 ml-4 mb-4 bg-red-600 hover:bg-red-700">
                Email
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full bg-zinc-600 text-white text-sm">
              <div>
                <Button 
                  variant="ghost" 
                  className="hover:bg-zinc-500 font-medium leading-none"
                  onClick={() => handleCopyToClipboard(incident.email)}
                >
                  {incident.email}
                  <RxClipboardCopy color="white" size={14}/>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  )
}