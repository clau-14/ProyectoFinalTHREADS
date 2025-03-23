import {create} from 'zustand';

const useUserStore = create(set => ({
  user: null,
  iniciarSesion2: (usuario) => 
  set({ user: usuario })
},
  

export default useUserStore;
