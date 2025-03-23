"use client";
import { useEffect } from "react";
import useUserStore from "@/store/userstore";
import { useRouter } from "next/navigation";

const Header = ({ handleOpenModal }) => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      return; // Esperar a que el estado del usuario se cargue
    }
    if (!user) {
      router.push("/pagina1");
    }
  }, [user, router]);

  if (user === undefined || !user) {
    return null; // No renderizar el header si el estado del usuario aún no se ha cargado o el usuario no está disponible
  }

  console.log(user.photoURL); // Verifica si photoURL es correcta

  return (
    <header className="relative w-full h-screen">
      <div className="inline-flex border-b-2 w-full items-center justify-center gap-36 -my-72 py-6 mt-1">
        <img className="rounded-full w-12" src={user.photoURL || ""} alt="" />
        
        <h1 className="text-slate-400 -ml-28">¿Qué novedades tienes?</h1>
        <button
          onClick={handleOpenModal}
          className="border rounded-lg px-5 py-2 font-bold"
        >
          Publicar
        </button>
      </div>
    </header>
  );
};

export default Header;

