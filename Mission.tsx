
import React from 'react';

const Mission: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black text-indigo-600 tracking-widest uppercase mb-4">Our Core Philosophy</h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Empowering Communities</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            To provide essential support and resources to vulnerable individuals and families, 
            empowering them to overcome challenges and build a brighter future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Transparency", icon: "💎", desc: "Open reporting on all funds and impact generated." },
            { title: "Integrity", icon: "🛡️", desc: "Commitment to ethical practices in every project." },
            { title: "Impact", icon: "🚀", desc: "Driven by data and measurable change in lives." },
          ].map((item) => (
            <div key={item.title} className="p-8 bg-gray-50 rounded-3xl hover:bg-indigo-50 transition-colors group">
              <div className="text-4xl mb-6">{item.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
