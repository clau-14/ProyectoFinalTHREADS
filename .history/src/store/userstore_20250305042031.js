import {create} from 'zustand';

const useUserStore = create(set => ({
  user: null,
  iniciarSesion2: (usuario) => 
  set({ user: usuario })
  logout: () => {
    set({user: null }); // limpiar el estado del usuario
  
  }
}));

export default useUserStore;
