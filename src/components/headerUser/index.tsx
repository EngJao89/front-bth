'use client';

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import axios, { AxiosError } from 'axios';
import { useRouter } from "next/navigation";
import { FaPowerOff } from "react-icons/fa";
import { toast } from "react-toastify";

import api from '@/lib/axios';
import { useAuth } from "@/contexts/AuthContext";
import logoHeader from "../../../public/logo-header.png";
import { Button } from "../ui/button";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  accessToken: string;
}

export function HeaderUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const { userToken, setUserToken } = useAuth();

  const fetchUserData = useCallback(async () => {
    try {
      if (!userToken) {
        router.push('/');
        throw new Error('No token available');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };

      const response = await api.post<UserData>('auth/me', {}, { headers });
      setUserData(response.data);

      localStorage.setItem('userData', JSON.stringify(response.data));
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          if (axiosError.response.status === 401 || axiosError.response.data.error === 'Invalid Token') {
            handleLogout();
          }
          toast.error(`Error fetching user data: ${axiosError.response.data.message}`, { theme: "light" });
        } else if (axiosError.request) {
          toast.error('Error fetching user data. No response from server.', { theme: "light" });
        } else {
          toast.error(`Error fetching user data: ${axiosError.message}`, { theme: "light" });
        }
      } else {
        toast.error(`Unexpected error: ${error}`, { theme: "light" });
      }
    }
  }, [userToken, router]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setUserToken(storedToken);
      fetchUserData();
    } else {
      router.replace('/');
    }
  }, [setUserToken, fetchUserData, router]);

  function handleLogout() {
    localStorage.removeItem('authToken');
    setUserToken(null);
    toast.warn('Você saiu! Até breve...', { theme: "light" });
    router.replace('/');
  }

  return (
    <nav className="bg-zinc-300 bg-opacity-30 backdrop-blur-lg">
      <div className="w-full h-full px-3 py-3">
        <div className="flex w-full items-center justify-around">
          <Image src={logoHeader} alt="Logo Header" className="ml-8"/>

          <Button 
            variant="ghost" 
            className="ml-8 mr-16" 
            onClick={() => router.push('profile-user')}
          >
            Bem vindo(a), {userData?.name ? userData.name : "Usuário"}
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
            <FaPowerOff color="red" size={16}/>
          </Button>
        </div>
      </div>
    </nav>
  )
}
