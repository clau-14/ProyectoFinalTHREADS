"use client"
import { useEffect } from 'react';
import useUserStore from '@/store/userstore';
import { useRouter } from 'next/navigation';





const Header = ({ handleOpenModal }) => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      // Esperar a que el estado del usuario se cargue
      return;
    }
    if (!user) {
      router.push("/pagina1");
    }
  }, [user, router]);

  if (user === undefined) {
    return null; // No renderizar el header si el estado del usuario aún no se ha cargado
  }

  if (!user) {
    return null; // No renderizar el header si el usuario no está disponible
  }
  return (
   <header className= 'relative w-full h-screen '>

