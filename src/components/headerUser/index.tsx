'use client';

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import axios, { AxiosError } from 'axios';
import api from '@/lib/axios';
import { useRouter } from "next/navigation";
import { FaPowerOff } from "react-icons/fa";
import { toast } from "react-toastify";

import logoHeader from "../../../public/logo-header.png";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
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
          console.error('Error fetching user data:', axiosError.response.data);
          toast.error(`Error fetching user data: ${axiosError.response.data.message}`, { theme: "light" });
        } else if (axiosError.request) {
          console.error('Error fetching user data: No response from server.');
          toast.error('Error fetching user data. No response from server.', { theme: "light" });
        } else {
          console.error('Error fetching user data:', axiosError.message);
          toast.error(`Error fetching user data: ${axiosError.message}`, { theme: "light" });
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }, [userToken, router, handleLogout]);

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
    <nav className="w-full bg-zinc-300 bg-opacity-30 backdrop-blur-lg">
      <div className="container mx-auto px-3 py-3 h-full">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Image src={logoHeader} alt="Logo Header"/>
          </div>
          <div className="ml-4 p-2">
            <Button variant="ghost">Bem vindo(a), {userData?.name ? userData.name : "Usuário"}</Button>
          </div>
          <div className="ml-4 p-2">
            <Button variant="secondary" className="w-full bg-red-600 hover:bg-red-700 ml-4 font-bold text-zinc-100 text-xs">
              Cadastrar Novo Caso
            </Button>
          </div>
          <div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              size="icon" 
              className="bg-zinc-100 hover:bg-zinc-200"
            >
              <FaPowerOff color="red" size={16}/>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}