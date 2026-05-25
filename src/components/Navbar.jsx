"use client";

import { useState } from 'react';
import Link from 'next/link';
import { IconMenu2, IconX } from '@tabler/icons-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/80 transition-all">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Logo Brand Block */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5 group relative z-50">
          <div className="w-10 h-10 bg-[#0F172A] flex items-center justify-center rounded-xl text-white font-black tracking-wider text-sm shadow-md group-hover:bg-cyan-600 transition-colors duration-300">
            LIPS
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg leading-none tracking-tight text-[#0F172A]">Luminary</span>
            <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase mt-0.5">Student Hub</span>
          </div>
        </Link>

        {/* Premium Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <Link 
            href="/explore" 
            className="text-sm font-medium text-gray-500 hover:text-[#0F172A] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-cyan-500 hover:after:w-full after:transition-all"
          >
            Explore
          </Link>
          {/* <Link 
            href="/categories" 
            className="text-sm font-medium text-gray-500 hover:text-[#0F172A] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-cyan-500 hover:after:w-full after:transition-all"
          >
            Categories
          </Link> */}
          <Link 
            href="#about" 
            className="text-sm font-medium text-gray-500 hover:text-[#0F172A] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-cyan-500 hover:after:w-full after:transition-all"
          >
            About LIPS
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login"
            className="text-sm font-semibold text-[#0F172A] px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors">
            Sign in
          </Link>
          <Link href="/project/new"
            className="text-sm font-semibold text-white bg-[#0F172A] px-6 py-2.5 rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-sm shadow-[#0F172A]/10 hover:shadow-cyan-500/20 active:scale-[0.98]">
            Share work
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="md:hidden p-2.5 rounded-xl text-[#0F172A] hover:bg-gray-100 transition-colors relative z-50"
        >
          {isOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
        </button>
      </nav>

      {/* Responsive Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between pt-32 pb-10 px-8 bg-white">
          {/* Mobile Links */}
          <div className="flex flex-col gap-6">
            <Link 
              href="/explore" 
              onClick={closeMenu}
              className="text-2xl font-medium text-gray-800 hover:text-cyan-600 transition-colors"
            >
              Explore
            </Link>
            {/* <Link 
              href="/categories" 
              onClick={closeMenu}
              className="text-2xl font-medium text-gray-800 hover:text-cyan-600 transition-colors"
            >
              Categories
            </Link> */}
            <Link 
              href="#about" 
              onClick={closeMenu}
              className="text-2xl font-medium text-gray-800 hover:text-cyan-600 transition-colors"
            >
              About LIPS
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex flex-col gap-4 w-full">
            <Link 
              href="/login"
              onClick={closeMenu}
              className="w-full text-center font-semibold text-[#0F172A] py-3.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Sign in
            </Link>
            <Link 
              href="/project/new"
              onClick={closeMenu}
              className="w-full text-center font-semibold text-white bg-[#0F172A] py-3.5 rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-slate-900/10"
            >
              Share work
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
