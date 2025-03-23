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
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          console.log("Usuario recuperado de localStorage:", parsedUser);
          set({ user: parsedUser });
        } catch (error) {
          console.error("Error al parsear el usuario de localStorage:", error);
        }
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
