"use client";
import useUserStore from '@/store/userstore'; // Ruta según dónde tengas el userStore
import Menu from '../componentes/Menu';
import PerfilUser from '../componentes/PerfilUser';
import { AiOutlineDown } from 'react-icons/ai';


export default function Perfil() {
  const user = useUserStore((state) => state.user); // Obtener usuario desde userStore

  return (
  


  
