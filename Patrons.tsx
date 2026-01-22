
import React from 'react';

const Patrons: React.FC = () => {
  const logos = [
    { name: "Temasek", src: "https://www.temasek.com.sg/content/dam/temasek-corporate/logos/logo-temasek.png" },
    { name: "OCBC", src: "https://www.ocbc.com/iwov-resources/sg/ocbc/gbc/assets/images/logo.png" },
    { name: "DBS", src: "https://www.dbs.com/iwov-resources/images/logos/dbs-logo-red.png" },
    { name: "UOB", src: "https://www.uobgroup.com/uobgroup/assets/images/common/uob-logo.png" },
    { name: "Singtel", src: "https://www.singtel.com/content/dam/singtel/about-singtel/logos/singtel-logo.png" },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-sm font-black text-gray-400 tracking-[0.2em] uppercase mb-12">Proudly Supported By</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {logos.map((logo) => (
            <div key={logo.name} className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 transform hover:scale-110">
              <img src={logo.src} alt={logo.name} className="h-12 md:h-16 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Patrons;
