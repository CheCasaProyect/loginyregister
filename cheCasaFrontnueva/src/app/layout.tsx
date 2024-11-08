// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "../components/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "CheCasa",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`min-h-screen flex flex-col `}>
      
//         <Navbar />
      
//         <main className="flex-grow w-full">
//           {children}
//         </main>
        
//         <Footer />
//       </body>
//     </html>
//   );
// }
import { GoogleOAuthProvider } from "@react-oauth/google"; 
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CheCasa",
  description: "Generated by create next app",
};
const clientId = process.env.NEXT_PUBLIC_GOOGLE_ID_CLIENT;
if (!clientId) {
  throw new Error("La variable de entorno GOOGLE_CLIENT_ID es necesaria");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col `}>
       
        <GoogleOAuthProvider clientId={clientId as string}>
          <Navbar />
          
          <main className="flex-grow w-full">
            {children}
          </main>
          
          <Footer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
