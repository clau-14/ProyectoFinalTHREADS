import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null, // Estado inicial
  iniciarSesion2: (usuario) => {
    if (!usuario) {
      console.error("Intentando guardar un usuario inválido");
      return;
    }
  
    console.log("Guardando usuario en localStorage:", usuario);
    localStorage.setItem('user', JSON.stringify(usuario));
    set({ user: usuario });
  },
  
  syncUserFromLocalStorage: () => {
    if (typeof window !== 'undefined') {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser) {
        console.log("Usuario recuperado de localStorage:", savedUser);
        set({ user: savedUser });
      } else {
        console.error("No se encontró un usuario válido en localStorage.");
      }
    }
  },
  logout: () => {
    console.log("Eliminando usuario de localStorage");
    localStorage.removeItem('user');
    set({ user: null });
  },
}));

export default useUserStore;