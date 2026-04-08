import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "./components/CarritoContext";
import CarritoDrawer from "./components/CarritoDrawer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Mayorista de Mates y Accesorios | Tienda Cuis",
  description:
    "Mayorista de mates y artículos regionales. Especialistas en tiendas de souvenirs y emprendedores. Grabado láser personalizado. Envíos a todo el país.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-10794736685"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10794736685');
            `,
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <CarritoProvider>
          {children}
          <CarritoDrawer />
        </CarritoProvider>
      </body>
    </html>
  );
}