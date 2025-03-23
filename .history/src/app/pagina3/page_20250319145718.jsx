import Perfil from "../componentes/Perfil";
import { useModal } from "@/context/ModalContext";
import Modal from "../componentes/Modal";
const PerfilPage = () => {
    const { showModal, handleCloseModal } = useModal();
    return(
    <Perfil />
    {showModal && (
        <Modal show={showModal} onClose={handleCloseModal} />
        )};

    )
    
    

    export default PerfilPage;