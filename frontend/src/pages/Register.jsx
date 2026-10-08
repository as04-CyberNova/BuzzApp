import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Store token and navigate
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/chat');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface-900 flex items-center justify-center p-4">
      <div className="glass-panel max-w-md w-full rounded-3xl p-8 transition-bounce">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors mb-6">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Create Account</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Join BuzzApp for secure messaging</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="name">Full Name</label>
            <input 
              id="name"
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800 border border-slate-200 dark:border-surface-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800 border border-slate-200 dark:border-surface-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800 border border-slate-200 dark:border-surface-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Create a strong password"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg shadow-primary-500/20 mt-6"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <Link to="/login" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
