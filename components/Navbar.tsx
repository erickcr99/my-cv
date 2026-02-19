"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: "all 0.5s ease",
    background: scrolled ? "rgba(12, 12, 15, 0.85)" : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled ? "1px solid #2e2e38" : "none",
  };

  const innerStyle: React.CSSProperties = {
    maxWidth: "72rem",
    width: "100%",
    margin: "0 auto",
    padding: "0 1.5rem",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
  };

  const linksStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "2.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>
        {/* Logo */}
        <a href="#" className="nav-logo">
          A<span className="nav-logo-dot">.</span>E
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <div style={linksStyle}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Hamburger — móvil */}
        {isMobile && (
          <button
            className="nav-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`nav-hamburger-line ${isOpen ? "nav-hamburger-open-1" : ""}`} />
            <span className={`nav-hamburger-line ${isOpen ? "nav-hamburger-open-2" : ""}`} />
          </button>
        )}
      </div>

      {/* Mobile menu desplegable */}
      {isMobile && isOpen && (
        <div className="nav-mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
