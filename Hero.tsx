
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
          Building a <span className="text-indigo-400">Stronger</span>, <br/>
          More Inclusive Society
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          At HAO REN HAO SHI, we believe that everyone deserves the opportunity to thrive. 
          We work tirelessly to support those in need and foster a spirit of giving.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a 
            href="#volunteer-map" 
            className="px-10 py-4 bg-indigo-600 text-white font-black rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-xl inline-block"
          >
            Volunteer Now
          </a>
          <button className="px-10 py-4 bg-white text-gray-900 font-black rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
            Our Impact
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
