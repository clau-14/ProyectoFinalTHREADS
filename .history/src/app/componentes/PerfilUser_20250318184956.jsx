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
      <article className=" inline-flex border-b-2 w-full items-center justify-center gap-36 -my-72 py-6 mt-1">
        <h1 className="text-slate-400 -ml-28">
          {user.displayName || "Invitado"} {/* Mostrar el nombre del usuario */}
        </h1>
        <img className="rounded-full w-12" src={user.photoURL || ""} alt="" /> {/* Mostrar la foto del usuario */}
<button className="mb-5 border border-slate-500 rounded-lg px-60 mt-10 ml-10" >
          Editar Perfil
        </button>
</article>
        
     
    </header>
  );
};

export default PerfilUser;