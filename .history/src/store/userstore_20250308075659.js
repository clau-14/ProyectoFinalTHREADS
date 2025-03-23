import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { photoURL: '' }, // valor inicial seguro
  error: null,
  iniciarSesion2: (usuario) => {
    localStorage.setItem('user', JSON.stringify(usuario)); // guarda el usuario en localstorage
    set({ user: usuario });// actualiza el usuario de localstorage
  },
  logout: () => {
    localStorage.removeItem('user');// eliminar el usuario de localStorage
    set({ user: null });// limpiar el estado del usuario
  },
}));

export default useUserStore;


