
import React, { useState, useEffect } from 'react';
import { UserProfile, RegistrationRecord } from '../../types';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../../firebaseConfig';

interface UserDashboardProps {
  user: UserProfile;
  onClose: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onClose }) => {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReg, setSelectedReg] = useState<RegistrationRecord | null>(null);
  const [showFeedback, setShowFeedback] = useState<RegistrationRecord | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchRegistrations();
  }, [user.id]);

  const fetchRegistrations = async () => {
    try {
      const q = query(
        collection(db, user.type === 'INDIVIDUAL' ? 'individual_registrations' : 'org_registrations'),
        where('userId', '==', user.id)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RegistrationRecord));
      setRegistrations(docs.sort((a,b) => b.submittedAt?.seconds - a.submittedAt?.seconds));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async () => {
    if (!showFeedback) return;
    try {
      await addDoc(collection(db, 'feedback'), {
        userId: user.id,
        regId: showFeedback.id,
        rating,
        feedback: feedbackText,
        submittedAt: serverTimestamp()
      });
      alert('Feedback submitted! Thank you.');
      setShowFeedback(null);
      setFeedbackText('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Your Portal</h2>
            <p className="text-gray-500 font-medium">Manage your impact and volunteer details</p>
          </div>
          <button onClick={onClose} className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Profile Summary */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-2xl">👤</div>
              <h3 className="text-xl font-black mb-1">{user.fullName || user.orgName}</h3>
              <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-6">{user.type}</p>
              <div className="space-y-3 text-sm font-medium">
                <div className="flex justify-between border-b border-indigo-500/30 pb-2">
                  <span className="opacity-70">Total Events</span>
                  <span>{registrations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Status</span>
                  <span className="bg-green-400 text-indigo-900 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">Verified</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
              <h4 className="font-black text-gray-900 mb-4">Streamlined Admin</h4>
              <div className="space-y-4">
                <div className="flex space-x-3 items-start">
                  <div className="w-2 h-2 mt-1.5 bg-indigo-600 rounded-full shrink-0"></div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">Automated reminder for your upcoming session in Jurong West sent to your email.</p>
                </div>
                <div className="flex space-x-3 items-start opacity-50">
                  <div className="w-2 h-2 mt-1.5 bg-gray-400 rounded-full shrink-0"></div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">Weekly impact report ready to view.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteerings List */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xl font-black text-gray-900 px-2">Active Volunteerings</h4>
            
            {loading ? (
              <div className="p-20 text-center text-gray-400 font-bold italic">Loading your records...</div>
            ) : registrations.length === 0 ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center text-gray-400">
                <p className="font-bold">No registrations found yet.</p>
                <button onClick={onClose} className="mt-4 text-indigo-600 font-black hover:underline">Browse Map</button>
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.map(reg => (
                  <div key={reg.id} className="bg-white border border-gray-100 rounded-[2rem] p-6 hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between group">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">{reg.location}</p>
                      <h5 className="text-lg font-black text-gray-900">{reg.slot}</h5>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedReg(reg)}
                        className="px-5 py-2.5 bg-gray-900 text-white text-sm font-black rounded-full hover:bg-gray-800 transition-all flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                        Check-in
                      </button>
                      <button 
                         onClick={() => setShowFeedback(reg)}
                         className="px-5 py-2.5 border-2 border-gray-100 text-gray-900 text-sm font-black rounded-full hover:bg-gray-50 transition-all"
                      >
                        Feedback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Modal Overlay */}
      {selectedReg && (
        <div className="fixed inset-0 z-[110] bg-gray-900/95 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full text-center relative shadow-2xl">
            <button onClick={() => setSelectedReg(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Onsite Integration</p>
            <h3 className="text-2xl font-black text-gray-900 mb-8">Digital Check-in</h3>
            
            {/* Mock QR Code UI */}
            <div className="aspect-square bg-white border-8 border-gray-50 rounded-[2rem] p-8 mb-8 relative group overflow-hidden">
               <div className="grid grid-cols-5 grid-rows-5 gap-1.5 w-full h-full">
                 {[...Array(25)].map((_, i) => (
                   <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-gray-900' : 'bg-gray-100'}`}></div>
                 ))}
               </div>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100 transform -rotate-12 group-hover:rotate-0 transition-transform">
                   <div className="text-lg font-black text-indigo-600">HRHS</div>
                 </div>
               </div>
            </div>

            <p className="text-sm font-bold text-gray-800 mb-1">{user.fullName || user.orgName}</p>
            <p className="text-xs text-gray-400 font-medium mb-8">Session ID: {selectedReg.id.slice(0,8)}</p>
            
            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">Present this code to the onsite coordinator at <span className="text-gray-900 font-black">{selectedReg.location}</span> to verify your attendance.</p>
            
            <button onClick={() => setSelectedReg(null)} className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl">Done</button>
          </div>
        </div>
      )}

      {/* Feedback Modal Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 z-[110] bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-in zoom-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setShowFeedback(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Share Your Experience</h3>
            <p className="text-gray-500 font-medium mb-8">Your feedback helps us streamline our operations and improve impact.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-black text-gray-700 mb-4">How was your session?</label>
                <div className="flex justify-between px-2">
                  {[1,2,3,4,5].map(star => (
                    <button 
                      key={star} 
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-all transform hover:scale-125 ${rating >= star ? 'grayscale-0' : 'grayscale opacity-30'}`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-black text-gray-700 mb-3">Additional Comments</label>
                <textarea 
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  placeholder="Tell us what went well or what could be better..."
                ></textarea>
              </div>
              <button 
                onClick={submitFeedback}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-[1.5rem] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
