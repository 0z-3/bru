
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../../firebaseConfig';
import { UserProfile, AccountType, MapLocation, VolunteerSession } from '../../types';

interface VolunteerFormProps {
  user: UserProfile;
  location: MapLocation;
  session: VolunteerSession;
  onClose: () => void;
}

const VolunteerForm: React.FC<VolunteerFormProps> = ({ user, location, session, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullDuration: true,
    hours: 2,
    willInform48h: false,
    confirmAccuracy: false,
    role: '',
    volunteerCount: 1,
    orgAgreementAccuracy: false,
    orgAgreementEmail: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const collectionName = user.type === AccountType.INDIVIDUAL ? 'individual_registrations' : 'org_registrations';
      
      const submission = {
        userId: user.id,
        userEmail: user.email,
        userName: user.fullName || user.orgName,
        location: location.name,
        slot: `${session.date} (${session.time})`,
        ...formData,
        submittedAt: serverTimestamp(),
      };

      await addDoc(collection(db, collectionName), submission);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting to Firebase:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black mb-2 text-gray-900">Registration Successful!</h3>
        <p className="text-gray-600 mb-8 font-medium">Thank you for your kindness. We have received your volunteering request.</p>
        <button onClick={onClose} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors">Return Home</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="bg-indigo-50 p-5 rounded-2xl mb-6 border border-indigo-100">
        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">Selected Location & Slot</p>
        <p className="font-bold text-gray-900">{location.name}</p>
        <p className="text-sm text-gray-700">{session.date} • {session.time}</p>
      </div>

      {user.type === AccountType.INDIVIDUAL ? (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3">Can you attend the full 2-hour duration?</label>
            <div className="flex space-x-3">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, fullDuration: true, hours: 2})}
                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${formData.fullDuration ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-200'}`}
              >
                Yes
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, fullDuration: false})}
                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${!formData.fullDuration ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-200'}`}
              >
                No
              </button>
            </div>
          </div>

          {!formData.fullDuration && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-bold text-gray-800 mb-2">How many hours will you be volunteering?</label>
              <input 
                type="number" 
                min="0.5" 
                max="2" 
                step="0.5"
                required
                value={formData.hours}
                onChange={(e) => setFormData({...formData, hours: parseFloat(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              />
            </div>
          )}

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <label className="flex items-start space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                required
                checked={formData.willInform48h}
                onChange={(e) => setFormData({...formData, willInform48h: e.target.checked})}
                className="mt-1 h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 transition-all border-gray-300" 
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-snug font-medium">
                If you are unable to attend after signing up, will you inform us at least 48 hours in advance?
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                required
                checked={formData.confirmAccuracy}
                onChange={(e) => setFormData({...formData, confirmAccuracy: e.target.checked})}
                className="mt-1 h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 transition-all border-gray-300" 
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-snug font-medium">
                I confirm that the information provided is accurate and I understand that no-shows will affect my future sign-ups.
              </span>
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Your role in the organization</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Program Coordinator"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">How many volunteers are you bringing?</label>
            <input 
              type="number" 
              min="1" 
              required
              value={formData.volunteerCount}
              onChange={(e) => setFormData({...formData, volunteerCount: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <label className="flex items-start space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                required
                checked={formData.orgAgreementAccuracy}
                onChange={(e) => setFormData({...formData, orgAgreementAccuracy: e.target.checked})}
                className="mt-1 h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" 
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-snug font-medium">
                I agree that the information above is accurate.
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                required
                checked={formData.orgAgreementEmail}
                onChange={(e) => setFormData({...formData, orgAgreementEmail: e.target.checked})}
                className="mt-1 h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" 
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-snug font-medium">
                I agree to email HRHS at least 48 hours in advance in case of change of details and acknowledge that failure to do so can result in future limits in number of volunteers.
              </span>
            </label>
          </div>
        </div>
      )}

      <div className="pt-6">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
        >
          {loading ? 'Processing...' : 'Confirm Registration'}
        </button>
      </div>
    </form>
  );
};

export default VolunteerForm;
