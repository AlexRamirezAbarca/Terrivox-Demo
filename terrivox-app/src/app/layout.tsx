import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Terrivox ERP',
  description: 'Sistema integral de gestión ambiental y mitigación operativa',
};

// RootLayout is the absolute top level. 
// It ONLY handles the HTML document wrapper, Fonts and Global CSS Theme Variables.
// Es 100% limpio y no arrastra componentes pesados a todas partes.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


/*Desfase en la ejecucion de las medidas de acuerdo a la frecuencia en los planes de manejo

Plan de manejo = Crongrama de actividades a realizar anualmente

Subida de informacoin y creacion automayica de indicadores

Conectividad whatsappp
Conectividad correo electronico

Dashboard administrador, usuario

PWA

Agenda recordatoria  

*/