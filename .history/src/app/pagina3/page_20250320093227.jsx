import Perfil from "../componentes/Perfil";

const PerfilPage = () => {
    return(
        <div className='relative w-full h-screen'>
    {/* Sección del menú */}
    <section className='absolute left-5 top-10'>
      <Menu />
      <Modal show={showModal}  onClose={handleCloseModal} onPublish={handlePublishContent} />
    </section>
    <Perfil />
    </div>
    );
    };

    export default PerfilPage;