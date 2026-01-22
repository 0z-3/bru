
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Volunteer', href: '#volunteer-map' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className={`font-black text-2xl tracking-tighter transition-colors ${scrolled ? 'text-indigo-600' : 'text-white'}`}>
            HAO REN HAO SHI
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className={`font-semibold hover:text-indigo-500 transition-colors ${scrolled ? 'text-gray-700' : 'text-white/90'}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center space-x-4 border-l pl-6 border-gray-200">
              <span className={`text-sm font-bold transition-colors ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>
                {user.fullName || user.orgName}
              </span>
              <button 
                onClick={onLogout}
                className="text-xs font-black uppercase tracking-widest px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md shadow-red-100"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex-grow">
        {children}
      </div>

      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-black text-3xl mb-4 tracking-tighter">HAO REN HAO SHI</div>
          <p className="text-gray-400 max-w-md mx-auto mb-10 font-medium">
            Building a stronger, more inclusive society through compassionate action and community solidarity.
          </p>
          <div className="flex justify-center space-x-6 mb-12">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="border-t border-gray-800 pt-10 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Hao Ren Hao Shi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
