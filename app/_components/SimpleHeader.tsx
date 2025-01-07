'use client'

import '../stylesheets/header.scss';
import { useState, useEffect } from 'react';
import NavigationBar from '@/app/_components/NavigationBar';
import Sidebar from '@/app/_components/SideBar';

export default function SimpleHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`simple-header relative center flex justify-center bg-sub p-4 text-xs ${isScrolled ? 'scrolled' : ''}`}>
      <a href="/">
        <img src="/logo_medium.svg" alt="Itsumoarigatone" width={150} height={47} />
      </a>
      <Sidebar />
      <NavigationBar />
    </header>
  )
}