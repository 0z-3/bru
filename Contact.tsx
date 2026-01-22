
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-24 bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-black mb-8 leading-tight">Connect with Our Team</h2>
          <p className="text-indigo-100 text-xl mb-12 max-w-lg">
            Have questions about volunteering or want to partner with us? We're here to help.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="bg-indigo-500/50 p-4 rounded-2xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-indigo-200 uppercase tracking-widest">Email Us</p>
                <p className="text-lg font-black">HRHS@tp.edu.sg</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="bg-indigo-500/50 p-4 rounded-2xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-indigo-200 uppercase tracking-widest">Call Us</p>
                <p className="text-lg font-black">+65 1234 5678</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="bg-indigo-500/50 p-4 rounded-2xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-indigo-200 uppercase tracking-widest">Visit Us</p>
                <p className="text-lg font-black">21 Tampines Ave 1, Singapore 529757</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-100 border-none rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-100 border-none rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-gray-100 border-none rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
