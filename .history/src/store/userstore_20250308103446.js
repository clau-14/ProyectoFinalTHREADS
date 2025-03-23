import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null, // Estado inicial
  iniciarSesion2: (usuario) => {
    localStorage.setItem('user', JSON.stringify(usuario));
    set({ user: usuario });
  },
  syncUserFromLocalStorage: () => {
    if (typeof window !== 'undefined') {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser) {
        set({ user: savedUser });
      } else {
        console.error("No se encontró un usuario válido en localStorage.");
      }
    }
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));

export default useUserStore;