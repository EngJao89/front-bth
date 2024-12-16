"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import api from "@/lib/axios";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";


const registerSchema = z.object({
  name: z.string().min(3, "Username is required"),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(13, "Phone must be at least 13 characters"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export function ProfileForm() {
  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, formState: { errors } } = methods;
  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    try {

      const response = await api.post('users', {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });

      if(response.status === 200 || response.status === 201){
        toast.success('User created successfully', {theme: "light"})
        router.replace('/');
      }
    } catch (error: any) {
      toast.error('Error:' +(error),  {theme: "light"});

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Server response:', error.response.data);
          toast.error(
            'Registration failed: ' + (error.response.data.message || 
            'Please check your information and try again.'), 
            {theme: "light"}
          );
        } else if (error.request) {
          console.error('Request error:', error.request);
          toast.error('Registration failed: No response from server.', {theme: "light"});
        } else {
          console.error('Unexpected error:', error.message);
          toast.error('Registration failed: ' + error.message, {theme: "light"});
        }
      } else {
        toast.error('An unexpected error occurred. Please try again later.', {theme: "light"});
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full ml-4 mr-12">
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="name" {...field} className=""/>
              </FormControl>
              <FormMessage />
              {errors.name && <FormMessage className="text-white">{errors.name.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} className="mt-4"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} className="mt-4"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Phone" {...field} className="mt-4"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4">Submit</Button>
      </form>
    </FormProvider>
  );
}
