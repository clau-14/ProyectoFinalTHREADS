import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/400.css'; // Peso regular
import '@fontsource/roboto/700.css'; // Peso negrita


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{font-family: 'Roboto', sans-serif}},
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
