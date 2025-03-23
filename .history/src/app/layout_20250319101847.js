"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/400.css'; // Peso regular
import '@fontsource/roboto/700.css'; // Peso negrita
import Menu from "../app/componentes/Menu";
import Modal from "../app/componentes";
import { useState } from "react";
 


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <html lang="es">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 font-roboto`}
      >
        <Menu handleOpenModal={handleOpenModal} />
        {children}
        <Modal show={showModal} handleCloseModal={handleCloseModal} />
      </body>
    </html>
  );
}
