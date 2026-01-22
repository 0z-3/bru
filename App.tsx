
import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import Layout from './components/Layout';
import Hero from './components/Home/Hero';
import Mission from './components/Home/Mission';
import VolunteerMap from './components/Home/VolunteerMap';
import Contact from './components/Home/Contact';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hrhs_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (u: UserProfile) => {
    setUser(u);
    localStorage.setItem('hrhs_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hrhs_user');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!user) {
    return isRegistering ? (
      <RegisterPage onRegister={handleLogin} onSwitchToLogin={() => setIsRegistering(false)} />
    ) : (
      <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setIsRegistering(true)} />
    );
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <main>
        <Hero />
        <Mission />
        <VolunteerMap user={user} />
        <Contact />
      </main>
    </Layout>
  );
};

export default App;
