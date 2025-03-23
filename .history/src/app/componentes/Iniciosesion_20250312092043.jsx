"use client";
//import Link from 'next/link';

import { AiOutlineRight } from 'react-icons/ai';
//import { FaInstagramSquare } from "react-icons/fa"; 
import { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

//import FacebookLogin from 'react-facebook-login';
import useUserStore from "@/store/userstore";
import  {InstagramLogin}  from '@amraneze/react-instagram-login';






const Iniciosesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Usa useRouter

  const { iniciarSesion2 } = useUserStore();

  const iniciaSeccion = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      alert("¡Éxito!");
      console.log(response);
      iniciarSesion2(response.user);
      router.push("/pagina1");
    } catch (error) {
      alert("Credenciales inválidas: " + error);
    }
  };

  const iniciaGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const respuesta = await signInWithPopup(auth, provider);
      alert("¡Éxito!");
      iniciarSesion2(respuesta.user);
      router.push("pagina1");
      console.log(respuesta);
    } catch (error) {
      console.log("Error al iniciar sesión con Google: " + error);
    }
  };
 
  const responseInstagram = (respuesta) => {
    if (respuesta.error_type) {
      alert(`Error: ${respuesta.error_message}`);
    } else {
      alert("¡Éxito!");
      iniciarSesion2(respuesta.user);
      router.push("/pagina1");
      console.log(respuesta);
    }
  };
/*

 
  const responseFacebook = (response) => {
    const provider = new responseFacebook();
    console.log(response);
    if (response.accessToken) {
        // Lógica para manejar la respuesta de Facebook
        iniciarSesion2(response);
        router.push("/paginainicio"); // Usa router.push para navegar
      } else {
        alert("Error al iniciar sesión con Facebook");
      }
  };
  */

  return (
    <div className="container sm:w-full md:w-full lg:w-full xl:w-full flex flex-col items-center justify-center -m-10">
      <div className="w-full h-auto flex items-center justify-center">
        <img className="-mt-4 hidden sm:block w-full md:w-full lg:w-full xl:w-full h-auto" src="/Picture → THmkXhzz2_a.avif.png" alt="" />
        <img className="w-1/4 sm:w-full md:hidden lg:hidden xl:hidden p-5 mt-10 h-auto" src="/Container.png" alt="" />
      </div>

      <form className='w-full flex flex-col items-center justify-center md:-mt-40 lg:-mt-40 xl:-mt-40' onSubmit={iniciaSeccion}>
        <p className="text-black font-bold font-sans text-xs lg:text-base xl:text-base">Inicia sesión con tu cuenta de Instagram</p>

        <input className='w-3/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mt-2 pl-3 text-left text-gray-700 text-xs py-5 bg-sky-100 rounded-lg' type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='w-3/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mt-2 pl-3 text-left text-gray-700 text-xs py-5 bg-sky-100 rounded-lg' type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='w-3/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mt-2 text-center font-bold text-white text-sm xl:text-base py-5 font-sans bg-black rounded-lg' type="submit">Iniciar sesión</button>
        <p className='text-sm text-gray-500 pl-50 p-4'>¿Olvidaste mi contraseña?</p>

        <div className="w-3/4 -mt-4 flex items-center justify-center">
          <div className="border-b border-solid border-slate-400 p-4"></div>
          <p className="-mb-7 pl-5 pr-5 font-sans text-slate-400">o</p>
          <div className="border-b border-solid border-slate-400 p-4"></div>
        </div>

        <div className="relative w-3/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mt-8 text-center font-bold text-black text-sm py-8 font-sans rounded-xl border border-solid border-zinc-300" onClick={iniciaGoogle}>
          <h1 className="-ml-10">Continuar con Instagram<span className="absolute left-3 top-5"><img src="/Img - Instagram.png" alt="" /></span></h1>
          <span className='absolute left-80 top-9 text-zinc-400'><AiOutlineRight /></span>
        </div>
      </form>
      <div>
         
      <InstagramLogin
  clientId="2166818413735725"
  redirectUri=""
  scope="user_profile,user_media"
  buttonText="Iniciar sesión"
  onSuccess={responseInstagram}
  onFailure={responseInstagram}
/>

        
        {/*  
        <FacebookLogin
          appId="1025100406105499"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook} />,
        */}
      </div>

      <footer className="flex relative justify-center w-full text-gray-400 text-xs mt-16">
        <nav className="gap-4 flex ml-11">
          <p className='-ml-5'>&copy; 2025</p>
          <a href="https://help.instagram.com/769983657850450" target="_blank">Condiciones de threads</a>
          <a href="https://help.instagram.com/515230437301944" target="_blank">Política de Privacidad</a>
          <a href="https://privacycenter.instagram.com/policies/cookies/" target="_blank">Política de privacidad</a>
          <a href="">Reportar Problemas</a>
        </nav>
        <section className='flex'>
          <p className='absolute -mt-40 ml-64'>Escanea el código para descargar la app</p>
          <img className='absolute -mt-52 ml-64' src="/qr.png" alt="" />
        </section>
      </footer>
    </div>
  );
};

export default Iniciosesion;



