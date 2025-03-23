import Perfil from "../componentes/Perfil";
import { useModal } from "@/context/ModalContext";
import Modal from "../componentes/Modal";
const PerfilPage = () => {
    const { showModal, handleCloseModal } = useModal();
    return(
        <div>
        <Modal show={showModal} onClose={handleCloseModal} />
        </div>

    );
    };

    export default PerfilPage;