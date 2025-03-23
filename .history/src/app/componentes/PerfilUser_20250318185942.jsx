"use client";
import { useEffect } from "react";
import useUserStore from "@/store/userstore";
import { useRouter } from "next/navigation";

const PerfilUser = ({ handleOpenModal }) => {
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
      <article className=" inline-flex w-full items-center justify-center  -my-72 py-6 mt-1">
        <h1 className="text-slate-400 ml-20">
          {user.displayName || "Invitado"} {/* Mostrar el nombre del usuario */}
        </h1>
        <img className="rounded-full w-12 ml-72" src={user.photoURL || ""} alt="" /> {/* Mostrar la foto del usuario */}
        </article>
        <div className=" border-b-2 w-full flex justify-center">
        <button className="mb-5 border border-slate-200 rounded-lg px-60 py-1 mt-10 font-bold text-slate-4000000" >
          Editar Perfil
        </button>
        </div>
     
    </header>
  );
};

export default PerfilUser;