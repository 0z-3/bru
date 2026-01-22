
import React, { useState } from 'react';
import { UserProfile, AccountType } from '../../types';

interface RegisterPageProps {
  onRegister: (user: UserProfile) => void;
  onSwitchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onSwitchToLogin }) => {
  const [accountType, setAccountType] = useState<AccountType>(AccountType.INDIVIDUAL);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    type: AccountType.INDIVIDUAL,
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      ...formData as UserProfile,
      id: `user_${Math.random().toString(36).substr(2, 9)}`,
      type: accountType,
    };
    
    const users = JSON.parse(localStorage.getItem('hrhs_mock_users') || '[]');
    users.push(newUser);
    localStorage.setItem('hrhs_mock_users', JSON.stringify(users));
    
    onRegister(newUser);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-500">Join our community of change-makers</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl mb-10">
          <button 
            type="button"
            onClick={() => setAccountType(AccountType.INDIVIDUAL)}
            className={`flex-1 py-3 rounded-lg font-bold transition-all ${accountType === AccountType.INDIVIDUAL ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
          >
            Individual
          </button>
          <button 
            type="button"
            onClick={() => setAccountType(AccountType.ORGANIZATION)}
            className={`flex-1 py-3 rounded-lg font-bold transition-all ${accountType === AccountType.ORGANIZATION ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
          >
            Organization
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input 
                name="email"
                type="email" 
                required 
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                placeholder="name@example.com"
              />
            </div>

            {accountType === AccountType.INDIVIDUAL ? (
              <>
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input name="fullName" required onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number</label>
                  <input name="contactNumber" required onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-500" placeholder="+65 9123 4567" />
                </div>
              </>
            ) : (
              <>
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name of Organization</label>
                  <input name="orgName" required onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Organization Ltd." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Contact Person</label>
                  <input name="contactPerson" required onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Manager Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                  <input name="mobileNumber" required onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-500" placeholder="+65 9XXX XXXX" />
                </div>
              </>
            )}
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
          >
            Register Account
          </button>
        </form>

        <div className="mt-8 text-center border-t pt-6">
          <p className="text-gray-500 mb-2">Already have an account?</p>
          <button onClick={onSwitchToLogin} className="text-indigo-600 font-bold hover:underline">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
