import Perfil from "../componentes/Perfil";
import Menu from "../componentes/Menu";


const PerfilPage = () => {
    return(
        <section className='absolute left-5 top-10'><Menu handleOpenModal={handleOpenModal} /></section>
        <div className='flex flex-col items-center justify-center h-full'>
        <div></div>
    <Perfil />
    );
    };

    export default PerfilPage;