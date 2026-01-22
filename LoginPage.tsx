
import React, { useState } from 'react';
import { UserProfile, AccountType } from '../../types';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
  onSwitchToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate finding a user from local storage
    const users = JSON.parse(localStorage.getItem('hrhs_mock_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email);

    if (foundUser) {
      onLogin(foundUser);
    } else {
      alert("Account not found. Please register first.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to join our community efforts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center border-t pt-6">
          <p className="text-gray-600 mb-4">New to Hao Ren Hao Shi?</p>
          <button 
            onClick={onSwitchToRegister}
            className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
