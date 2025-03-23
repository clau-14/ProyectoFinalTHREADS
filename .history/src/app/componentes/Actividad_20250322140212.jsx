"use client";
import Menu from "../componentes/Menu";
import { AiOutlineDown } from "react-icons/ai";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore"; // Importar Firestore
import db from "../firebaseConfig"; // Tu configuración de Firebase

export default function Actividad() {
  const [actividades, setActividades] = useState([]); // Estado para almacenar actividades

  // Función para cargar actividades desde Firestore
  const cargarActividades = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "actividades")); // Consulta a Firestore
      const listaActividades = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); // Extraer datos de cada documento
      setActividades(listaActividades); // Actualizar estado con las actividades
    } catch (error) {
      console.error("Error al cargar actividades:", error);
    }
  };

  // Función para agregar una nueva actividad
  const agregarActividad = async (actividad) => {
    try {
      await addDoc(collection(db, "actividades"), actividad); // Guardar en Firestore
      cargarActividades(); // Recargar actividades después de guardar
    } catch (error) {
      console.error("Error al guardar actividad:", error);
    }
  };

  // Cargar actividades al montar el componente
  useEffect(() => {
    cargarActividades();
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Sección del menú */}
      <section className="absolute left-5 top-10">
        <Menu />
      </section>

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center h-full">
        <section>
          <button className="absolute top-5 flex font-bold text-sm">
            Actividad
            <span className="ml-3 bg-white border rounded-full p-1">
              <AiOutlineDown />
            </span>
          </button>
        </section>
        <section
          style={{
            overflowY: "auto",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          className="container bg-white flex-col items-center justify-center w-2/5 h-full gap-2 rounded-3xl fixed mt-32"
        >
          {/* Listado dinámico de actividades */}
          {actividades.length > 0 ? (
            actividades.map((actividad) => (
              <div key={actividad.id} className="p-4 border-b border-gray-300">
                <p className="font-bold">{actividad.tipo}</p>
                <p>{actividad.texto}</p>
                <small className="text-gray-500">
                  {new Date(actividad.fecha).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No hay actividades registradas.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}


   



