import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

// Mock structural template data to preview elements instantly before connecting Firestore loops
const MOCK_CHATS = [
  { id: 'chat_1', user: 'Sarah Jenkins', username: 'sarah_j', initial: 'S', lastMsg: 'Did you get those files encrypted?', time: '12:45 PM', online: true },
  { id: 'chat_2', user: 'Alex Rivera', username: 'arivera', initial: 'A', lastMsg: 'Sounds secure, let’s hop on later.', time: 'Yesterday', online: false },
];

const MOCK_CURRENT_CHAT_MESSAGES = [
  { id: 'm1', senderId: 'other', text: 'Hey! Is this channel completely safe?', timestamp: '12:40 PM' },
  { id: 'm2', senderId: 'me', text: 'Yeah bro, it uses zero-knowledge storage architecture.', timestamp: '12:42 PM' },
  { id: 'm3', senderId: 'other', text: 'Awesome! Did you get those files encrypted?', timestamp: '12:45 PM' },
];

const MessagesPage = () => {
  const { user } = useAuth();
  
  // Responsive layout state indicators
  const [activeChatId, setActiveChatId] = useState<string | null>('chat_1');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [messageText, setMessageText] = useState('');

  const currentChat = MOCK_CHATS.find(c => c.id === activeChatId);

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setIsMobileChatOpen(true); // Forces chat panel expansion overlay on small mobile viewports
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    console.log("Writing string block message to Firestore schema collection:", messageText);
    setMessageText('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-[80vh] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 flex overflow-hidden">
      
      {/* 📁 LEFT PANEL: User Profile, Search, Room List */}
      <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col ${isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
        
        {/* User Card Header */}
        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 to-green-500 text-white font-bold text-sm flex items-center justify-center shadow-xs">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-medium text-gray-400 leading-none">My Account</span>
              <span className="text-sm font-bold text-gray-800 truncate max-w-[140px] mt-0.5">{user?.email}</span>
            </div>
          </div>
          
          {/* New Chat Button */}
          <button 
            onClick={() => console.log('Spawning new users lookup drawer modal')}
            className="h-8 px-3 rounded-lg bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
          >
            <span>➕</span> New
          </button>
        </div>

        {/* Chat Search Box */}
        <div className="p-3 border-b border-gray-50">
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full border border-solid border-gray-200 bg-gray-50 px-3 py-1.5 rounded-lg text-xs focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Dynamic Chat Room Navigation Iteration */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {MOCK_CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={`w-full p-4 flex items-start gap-3 text-left transition-colors cursor-pointer hover:bg-gray-50 ${activeChatId === chat.id ? 'bg-purple-50/60 hover:bg-purple-50/60' : ''}`}
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gray-200 font-bold text-gray-700 text-sm flex items-center justify-center">
                  {chat.initial}
                </div>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-900 truncate">{chat.user}</h3>
                  <span className="text-[10px] text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{chat.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 💬 RIGHT PANEL: Main Active Chat Monitor Area */}
      <div className={`flex-1 flex flex-col bg-gray-50/30 ${!isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
        {currentChat ? (
          <>
            {/* Active Room Title Banner */}
            <div className="p-4 border-b border-gray-100 bg-white flex items-center gap-3">
              <button 
                onClick={() => setIsMobileChatOpen(false)}
                className="md:hidden p-1 text-gray-500 hover:text-black font-bold text-lg mr-1"
              >
                ⬅️
              </button>
              <div className="h-9 w-9 rounded-full bg-gray-200 font-bold text-gray-700 text-sm flex items-center justify-center">
                {currentChat.initial}
              </div>
              <div className="flex flex-col text-left">
                <h2 className="text-sm font-bold text-gray-900 leading-none">{currentChat.user}</h2>
                <span className="text-[10px] font-medium text-purple-600 mt-1">🔒 E2E Encrypted Channel</span>
              </div>
            </div>

            {/* Dynamic Conversation Scrolling Shell */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
              {MOCK_CURRENT_CHAT_MESSAGES.map((msg) => {
                const isMe = msg.senderId === 'me';
                return (
                  <div key={msg.id} className={`flex flex-col max-w-[75%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                    <div className={`px-4 py-2 rounded-2xl text-sm ${isMe ? 'bg-black text-white rounded-br-none shadow-sm' : 'bg-white border border-gray-100 text-gray-900 rounded-bl-none shadow-xs'}`}>
                      <p className="text-left leading-relaxed break-words">{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}
            </div>

            {/* Input Form Submission Dock Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
              <input 
                type="text" 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type an encrypted message..." 
                className="flex-1 border border-solid border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all bg-gray-50/50"
              />
              <button 
                type="submit"
                className="bg-black text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer shadow-sm"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          /* Landing Idle Empty View state framework representation */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <span className="text-4xl">💬</span>
            <h3 className="text-base font-bold text-gray-900">No Chat Selected</h3>
            <p className="text-xs text-gray-400 max-w-xs">Select a channel from the navigation sidebar stack or search for contacts to launch secure active data streams.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MessagesPage;
