const useUserStore = create((set) => ({
  user: null, // Valor inicial seguro para SSR
  iniciarSesion2: (usuario) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(usuario));
    }
    set({ user: usuario });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    set({ user: null });
  },
  syncUserFromLocalStorage: () => {
    if (typeof window !== 'undefined') {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser) {
        set({ user: savedUser });
      }
    }
  }
}));
