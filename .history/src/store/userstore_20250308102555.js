import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null, // Estado inicial del usuario
  iniciarSesion2: (usuario) => {
    localStorage.setItem('user', JSON.stringify(usuario)); // Guardar el usuario en localStorage
    set({ user: usuario });
  },
  syncUserFromLocalStorage: () => {
    if (typeof window !== 'undefined') {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      set({ user: savedUser });
    }
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));


export default useUserStore;