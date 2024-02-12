import React from 'react'
import Topbar from '../../components/navbar/topbar';
import Sidebar from '@/components/sidebar/sidebar';


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
         <Topbar/>
         <Sidebar></Sidebar>
      {children}
        </div>
     
    );
  }
  