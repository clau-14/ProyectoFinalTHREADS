import Perfil from "../componentes/Perfil";
import Menu from "../componentes/Menu";


const PerfilPage = () => {
    return(
    <div>
             <section className='absolute left-5 top-10'><Menu handleOpenModal={handleOpenModal} /></section>
    <Perfil />
    </div>

    );
    };

    export default PerfilPage;