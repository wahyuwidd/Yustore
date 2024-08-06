import localFont from 'next/font/local';
import "./globals.css";
import ClientLayout from './clientLayout'; 
import axios from "axios";


const myFont = localFont({ src: '../assets/font/static/DMSans_18pt-Regular.ttf' });
type Metadata = {
  title: string;
  description: string | null | undefined;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  let data 
  try {
    const response = await axios.get(API_URL + '/home?timestamp=' + Date.now());
    data = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    data = null;
  }
  
  
  return (
    <html lang="en">
      <body className={myFont.className}>
        <ClientLayout data={data}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
