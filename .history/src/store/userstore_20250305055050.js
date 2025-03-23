import {create} from 'zustand';
//define el store

const useUserStore = create((set) => ({
  user :undefined, // estado inicial del usuario
  error: null,// manejo de errore
  iniciarSesion2: (usuario) => {
    set({user: usuario, }); // actualizar el estado del usuario
  },
  //accion para crear seccion
  logout: () => {
    set({user: null }); // limpiar el estado del usuario
  
  }}));
  
export default useUserStore;
