"use client"
import Perfil from "../componentes/Perfil";
import Menu from "../componentes/Menu";
import { useState } from "react";
 


const PerfilPage = () => {
    const [showModal, setShowModal] = useState(false); // Mostrar o no el modal
    const handleOpenModal = () => {
      setShowModal(true);
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };

    return(
    <div>
    <section className='absolute left-5 top-10'><Menu handleOpenModal={handleOpenModal} /></section>
    <Perfil />
    </div>

    );
    };

    export default PerfilPage;