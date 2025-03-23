import React, { createContext, useState } from 'react';

const PublicacionesContext = createContext(); // Crear el contexto

export const PublicacionesProvider = ({ children }) => {
    const [publicaciones, setPublicaciones] = useState([]); // Estado global

    const agregarPublicacion = (contenido) => {
        setPublicaciones([...publicaciones, contenido]); // Agregar una publicación nueva
    };

    return (
        <PublicacionesContext.Provider value={{ publicaciones, agregarPublicacion }}>
            {children} {/* Aquí se renderizan los componentes hijos */}
        </PublicacionesContext.Provider>
    );
};

export default PublicacionesContext;
