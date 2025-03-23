import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { displayName: "Usuario desconocido", photoURL: "default-placeholder.jpg" },
  iniciarSesion2: (usuario) => {
    localStorage.setItem('user', JSON.stringify(usuario));
    set({ user: usuario });
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));
