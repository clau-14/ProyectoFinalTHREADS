import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : undefined, // estado inicial del usuario
  error: null, // manejo de errores
  iniciarSesion2: (usuario) => {
    localStorage.setItem('user', JSON.stringify(usuario)); // guardar el usuario en localStorage
    set({ user: usuario }); // actualizar el estado del usuario
  },
  logout: () => {
    localStorage.removeItem('user'); // eliminar el usuario de localStorage
    set({ user: null }); // limpiar el estado del usuario
  },
}));

export default useUserStore;
