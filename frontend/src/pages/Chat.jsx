import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { API_URL, SOCKET_URL } from '../config';

const socket = io(SOCKET_URL);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Load user from local storage and fetch history
  useEffect(() => {
    const storedUserStr = localStorage.getItem('user');
    if (!storedUserStr) {
      navigate('/login');
      return;
    }
    
    const storedUser = JSON.parse(storedUserStr);
    setUser(storedUser);

    // Fetch message history
    fetch(`${API_URL}/api/messages`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        scrollToBottom();
      })
      .catch(err => console.error('Failed to fetch messages', err));
  }, [navigate]);

  // Handle Socket events
  useEffect(() => {
    if (!user) return;

    const handleConnect = () => {
      socket.emit('join', user._id);
    };

    // If socket is already connected when this runs
    if (socket.connected) {
      handleConnect();
    }

    socket.on('connect', handleConnect);

    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    socket.on('receiveMessage', (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    socket.on('chatCleared', () => {
      setMessages([]);
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('onlineUsers');
      socket.off('receiveMessage');
      socket.off('chatCleared');
    };
  }, [user]);

  // Auto-scroll to bottom whenever messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    
    // Emit message to server
    socket.emit('sendMessage', {
      senderId: user._id,
      content: input,
    });
    
    setInput('');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleClearChat = async () => {
    if (window.confirm("Are you sure you want to clear the entire chat history for everyone?")) {
      try {
        await fetch(`${API_URL}/api/messages`, { method: 'DELETE' });
        socket.emit('clearChat');
      } catch (err) {
        console.error('Failed to clear chat', err);
      }
    }
  };

  if (!user) return null; // Wait for user verification before rendering

  // Find the name of the other person in the chat
  const otherUserMsg = [...messages].reverse().find(msg => {
    const senderId = msg.sender && typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
    return senderId !== user._id;
  });
  const otherUserId = otherUserMsg && otherUserMsg.sender && typeof otherUserMsg.sender === 'object' ? otherUserMsg.sender._id : null;
  const isOnline = otherUserId ? onlineUsers.includes(otherUserId) : false;

  const chatTitle = otherUserMsg && otherUserMsg.sender && otherUserMsg.sender.name 
    ? otherUserMsg.sender.name 
    : 'Global Chat';
  const chatSubtitle = otherUserMsg ? (isOnline ? 'Online' : 'Offline') : 'Waiting for others...';

  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-surface-900 flex flex-col h-[100dvh]">
      {/* Navbar */}
      <nav className="clay-panel flex-none px-6 py-4 flex items-center justify-between border-b-0 rounded-none rounded-b-3xl z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{chatTitle}</h1>
            <p className={`text-xs font-medium ${isOnline ? 'text-primary-500' : 'text-slate-500 dark:text-slate-400'}`}>
              {chatSubtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleClearChat}
            className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-surface-700 rounded-xl transition-colors shadow-inner"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          // Ensure we correctly get the sender ID whether it's an object or a string
          const senderId = msg.sender && typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
          const isCurrentUser = senderId === user._id;
          const isSenderOnline = onlineUsers.includes(senderId);
          
          return (
            <div key={msg._id || index} className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
              {msg.sender && msg.sender.name && (
                <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? 'mr-2 flex-row-reverse' : 'ml-2'}`}>
                  <span className="text-xs text-slate-500 font-semibold">{msg.sender.name}</span>
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isSenderOnline ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {isSenderOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              )}
              <div className={`max-w-[75%] px-5 py-3 rounded-3xl flex flex-col gap-1 ${
                isCurrentUser 
                  ? 'clay-msg-sender rounded-br-sm' 
                  : 'clay-msg-receiver rounded-bl-sm'
              }`}>
                <span>{msg.content}</span>
                <span className={`text-[10px] self-end ${isCurrentUser ? 'text-primary-100' : 'text-slate-400'}`}>
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="clay-panel flex-none p-4 rounded-none rounded-t-3xl border-t-0">
        <form onSubmit={handleSend} className="flex gap-2 max-w-4xl mx-auto">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..." 
            className="clay-input flex-1 rounded-full px-6 py-4"
            autoComplete="off"
          />
          <button 
            type="submit"
            className="clay-btn p-4 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim()}
          >
            <svg className="w-6 h-6 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
}

export default Chat;
