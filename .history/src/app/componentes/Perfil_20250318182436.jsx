"use client";
import useUserStore from '@/store/userstore'; // Ruta según dónde tengas el userStore
import { FaPen, FaPlus } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

export default function Perfil() {
  const user = useUserStore((state) => state.user); // Obtener usuario desde userStore

  return (
  )
