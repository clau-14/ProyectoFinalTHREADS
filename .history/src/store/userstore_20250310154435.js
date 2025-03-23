import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null, // Estado inicial
  iniciarSesion2: (usuario) => {
    console.log("Guardando usuario en localStorage:", usuario);
    localStorage.setItem('user', JSON.stringify(usuario));
    set({ user: usuario });
  },
  syncUserFromLocalStorage: () => {
    if (typeof window !== 'undefined') {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser) {
        
  },
  logout: () => {
    console.log("Eliminando usuario de localStorage");
    localStorage.removeItem('user');
    set({ user: null });
  },
}));

export default useUserStore;