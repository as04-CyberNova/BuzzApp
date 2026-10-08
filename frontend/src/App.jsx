import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface-900 flex items-center justify-center p-4">
      <div className="glass-panel max-w-md w-full rounded-3xl p-8 transition-bounce hover-lift">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">BuzzApp</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
            Next generation secure messaging with intelligent spam protection.
          </p>
          
          <button className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg shadow-primary-500/20 mb-4">
            Create Account
          </button>
          
          <button className="w-full py-3 px-4 bg-slate-100 dark:bg-surface-700 hover:bg-slate-200 dark:hover:bg-surface-800 text-slate-800 dark:text-slate-200 font-medium rounded-xl transition-colors duration-200">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
