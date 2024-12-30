'use client'

import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";

import api from "@/lib/axios";
import { Card } from "@/components/card";
import { HeaderOng } from "@/components/headerOng";

interface IncidentData {
  id: string;
  title: string;
  description: string;
  value: string;
}

export default function DashboardOng() {
  const [incidents, setIncidents] = useState<IncidentData[]>([]);

  const fetchIncident = useCallback(async () => {
    try {
      const response = await api.get<IncidentData[]>('incidents');
      setIncidents(response.data);
    }catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          toast.error(`Error fetching data: ${axiosError.response.data.message}`, { theme: "light" });
        } else if (axiosError.request) {
          toast.error('Error fetching data. No response from server.', { theme: "light" });
        } else {
          toast.error(`Error fetching data: ${axiosError.message}`, { theme: "light" });
        }
      } else {
        toast.error('Unexpected error:', error);
      }
    }
  }, [])

  useEffect(() =>{
    fetchIncident();
  }, [fetchIncident])

  return (
    <>
      <HeaderOng />
      <div className="m-8">
        <div className="mt-20 ml-16">
          <h5 className="font-bold text-zinc-950 text-xl">Casos Cadastrados</h5>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6 ml-16">
        {incidents.map((incident) => (
          <Card key={incident.id} incident={incident} />
        ))}
      </div>
    </>
  )
}
