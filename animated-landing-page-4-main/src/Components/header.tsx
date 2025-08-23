"use client";

import { useState, useEffect, JSX } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { GradientBorderProvider } from "./gradientBorderProvider";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Reviews", href: "/#reviews" },
  { name: "Contact", href: "/#contact" },
];

export default function Header(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-[90vw] max-w-[750px] flex gap-4 top-4 left-[50%] translate-x-[-50%] items-center transition-all duration-300 ${
        isScrolled ? "!top-2 scale-95" : ""
      }`}
      style={{ zIndex: 10000000 }}
    >
      <GradientBorderProvider className="rounded-[24px] w-full hover:-translate-y-0.5 bg-gradient-to-br backdrop-blur-xl from-[#00000011] to-[#00000022] !p-1 transition-transform duration-300 relative">
        <div className="w-full h-full p-3 flex justify-between items-center bg-white/40 rounded-[22px]">
          <div className="flex items-center gap-4">
            <div
              className="bg-gradient-to-b to-neutral-200 from-white shadow-xl shadow-neutral-500/30 outline-2 outline-[#0000ff11] text-base items-center text-white/80 rounded-[14px] 
                 transition-all p-2 duration-300 relative overflow-hidden flex justify-center items-center gap-2 hover:gap-4"
            >
              <img src="/logo.png" className="w-6 h-6 rounded-lg" />
            </div>
          </div>

          {/* Desktop Navigation - Fixed underline animation */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative group text-black/60 hover:text-black px-1 py-1 transition-all duration-300"
              >
                {link.name}
                <span className="absolute bottom-0.5 left-[50%] translate-x-[-50%] w-0 h-[2px] bg-blue-700 rounded-full transition-all duration-300 group-hover:w-[90%]" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100/30 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-600" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-600" />
              )}
            </button>

            <Link
              href="/#contact"
              className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-xl shadow-blue-500/30 outline-2 outline-[#ffffff33] text-base items-center text-white/80 px-4 py-2 rounded-[14px] 
                  hover:bg-blue-500/80 hover:!px-7 transition-all duration-300 relative overflow-hidden flex justify-center items-center gap-2 hover:gap-4"
            >
              Start now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Fixed Mobile Navigation */}
      </GradientBorderProvider>
      <div
        className={`fixed top-full left-0 w-full bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-[500px] opacity-100 mt-2 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
        style={{
          zIndex: 10000001,
        }}
      >
        <div className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="py-3 px-4 rounded-xl hover:bg-neutral-100/50 text-neutral-600 font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
