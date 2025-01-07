'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { FaPowerOff } from 'react-icons/fa';

import { useAuth } from "@/contexts/AuthContext";
import api from '@/lib/axios';
import { Button } from "../ui/button";
import logoHeader from "../../../public/logo-header.png";

interface OngData {
  id: string;
  name: string;
  email: string;
  phone: string;
  accessToken: string;
  city: string;
  uf: string;
}

export function HeaderOng() {
  const [userData, setUserData] = useState<OngData | null>(null);
  const router = useRouter();
  const { ongToken, setOngToken } = useAuth();

  const fetchOngData = useCallback(async () => {
    if (!ongToken) {
      router.replace('/auth-ong');
      return;
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ongToken}`,
      };
      
      const response = await api.post<OngData>('auth-ong/me', {}, { headers });
      setUserData(response.data);
      localStorage.setItem('ongData', JSON.stringify(response.data));
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          const status = axiosError.response.status;
          const errorData = axiosError.response.data;

          if (status === 401 || errorData.error === 'Invalid Token') {
            handleLogout();
          }

          toast.error(`Error fetching user data: ${errorData.message}`, { theme: 'light' });
        } else if (axiosError.request) {
          toast.error('Error fetching user data. No response from server.', { theme: 'light' });
        } else {
          toast.error(`Error fetching user data: ${axiosError.message}`, { theme: 'light' });
        }
      } else {
        toast.error('An unexpected error occurred.', { theme: 'light' });
      }
    }
  }, [ongToken, router]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authOngToken');
    if (storedToken) {
      setOngToken(storedToken);
      fetchOngData();
    } else {
      router.replace('/auth-ong');
    }
  }, [setOngToken, fetchOngData, router]);

  function handleLogout() {
    localStorage.removeItem('authOngToken');
    localStorage.removeItem('ongData');
    setOngToken(null);
    setUserData(null);
    toast.warn('Você saiu! Até breve...', { theme: 'light' });
    router.replace('/auth-ong');
  }

  return (
    <nav className="bg-zinc-300 bg-opacity-30 backdrop-blur-lg">
      <div className="w-full h-full px-3 py-3">
        <div className="flex w-full items-center justify-around">
          <Image src={logoHeader} alt="Logo Header" className="ml-8"/>

          <Button 
            variant="ghost" 
            className="ml-8 mr-16" 
            onClick={() => router.push('profile-ong')}
          >
            Bem vindo(a), {userData?.name || 'Usuário'}
          </Button>

          <Button
            variant="secondary"
            className="w-1/3 p-2 ml-8 mr-3 bg-red-600 hover:bg-red-700 font-bold text-zinc-100 text-xs"
            onClick={() => router.push('register-incident')}
          >
            Cadastrar Novo Caso
          </Button>

          <Button
            onClick={handleLogout}
            variant="outline"
            size="icon"
            className="p-2 mr-3 bg-zinc-100 hover:bg-zinc-200"
          >
            <FaPowerOff color="red" size={16} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
