
import React, { useState } from 'react';
import SingaporeMap from '../Map/SingaporeMap';
import VolunteerForm from './VolunteerForm';
import { LOCATIONS } from '../../constants';
import { MapLocation, VolunteerSession, UserProfile } from '../../types';

interface VolunteerMapProps {
  user: UserProfile;
}

const VolunteerMap: React.FC<VolunteerMapProps> = ({ user }) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeSlot, setActiveSlot] = useState<VolunteerSession | null>(null);

  const handleSignUp = (loc: MapLocation, slot: VolunteerSession) => {
    setActiveSlot(slot);
    setShowForm(true);
  };

  const getStatusColor = (current: number, total: number) => {
    const ratio = current / total;
    if (ratio >= 1) return 'bg-red-500';
    if (ratio > 0.7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <section id="volunteer-map" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Volunteer Availability Map</h2>
          <p className="text-gray-600">Find opportunities to give back near you. Real-time availability tracking.</p>
        </div>

        <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[700px]">
          {/* Map Side */}
          <div className="lg:w-2/3 relative h-[400px] lg:h-auto bg-sky-100 p-8">
            <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-sm border border-white space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase">
                <span className="w-8 h-2 bg-green-500 rounded"></span> <span>High Availability</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase">
                <span className="w-8 h-2 bg-yellow-500 rounded"></span> <span>Limited Slots</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase">
                <span className="w-8 h-2 bg-red-500 rounded"></span> <span>Full / Closed</span>
              </div>
            </div>
            <SingaporeMap onSelect={setSelectedLocation} selectedId={selectedLocation?.id} />
          </div>

          {/* Details Side */}
          <div className="lg:w-1/3 border-l border-gray-100 p-8 flex flex-col">
            {!selectedLocation ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-bold text-gray-400">Select a location on the map to view session details.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-indigo-600 p-3 rounded-2xl text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">{selectedLocation.name}</h3>
                </div>

                <div className="space-y-4 overflow-y-auto pr-2 max-h-[500px]">
                  {selectedLocation.sessions.map((session) => {
                    const slotsLeft = session.total - session.current;
                    const percent = (session.current / session.total) * 100;
                    return (
                      <div key={session.id} className="bg-gray-100 rounded-3xl p-6 transition-transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                          <span className="font-bold text-gray-800">{session.date}</span>
                        </div>
                        <div className="flex items-center space-x-3 mb-4">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                          </svg>
                          <span className="font-bold text-gray-800">{session.time}</span>
                        </div>
                        <div className="mb-4">
                           <div className="flex justify-between text-xs font-black uppercase tracking-tighter mb-2 text-gray-500">
                             <span>Slots Occupied</span>
                             <span>{session.current} / {session.total}</span>
                           </div>
                           <div className="w-full bg-white h-3 rounded-full overflow-hidden">
                             <div 
                                className={`h-full transition-all duration-1000 ${getStatusColor(session.current, session.total)}`} 
                                style={{ width: `${percent}%` }}
                              />
                           </div>
                        </div>
                        {slotsLeft > 0 ? (
                          <button 
                            onClick={() => handleSignUp(selectedLocation, session)}
                            className="w-full py-3 bg-gray-900 text-white font-black rounded-full hover:bg-gray-800 transition-all"
                          >
                            Sign Up
                          </button>
                        ) : (
                          <div className="text-center py-2 text-red-600 font-bold uppercase tracking-widest text-xs">Session Full</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Volunteer Form Modal */}
      {showForm && selectedLocation && activeSlot && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 my-8 relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="mb-8 pr-12">
              <h3 className="text-3xl font-black text-gray-900 mb-2">Volunteer Registration</h3>
              <p className="text-gray-500">Please complete the details below to secure your spot.</p>
            </div>

            <VolunteerForm 
              user={user} 
              location={selectedLocation} 
              session={activeSlot} 
              onClose={() => setShowForm(false)} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VolunteerMap;
