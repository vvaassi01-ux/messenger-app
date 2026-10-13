import React, { useState } from 'react';
import { searchUsersByPrefix, type UserProfile } from '../services/chatService';
import { useAuth } from '../hooks/useAuth';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (targetUser: UserProfile) => void;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({ isOpen, onClose, onStartChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { user } = useAuth();

  // Early return if modal is closed keeps the component entirely unmounted
  if (!isOpen) return null;

  // 💡 NATIVE STATE CLEANUP HANDLER: Clears everything locally in one single thread
  const handleSafeClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    onClose(); // Trigger parent's close toggle safely
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !user?.uid) return;

    setLoading(true);
    setHasSearched(true);
    setSearchResults([]);

    try {
      const usersFound = await searchUsersByPrefix(searchQuery, user.uid);
      setSearchResults(usersFound);
    } catch (err) {
      console.error("Error executing collection index lookup queries:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={handleSafeClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 px-4">
      <div onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col space-y-4">

        {/* Modal Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-900 tracking-tight">New Conversation</h2>
          {/* 💡 Swapped onClose with handleSafeClose */}
          <button onClick={handleSafeClose} className="text-gray-400 hover:text-black cursor-pointer font-bold text-sm">✕</button>
        </div>

        {/* Input Text Form field */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search username (ex. john32)"
            className="flex-1 border border-solid border-gray-300 rounded-xl px-3 py-2 text-xs focus:border-black focus:outline-none focus:ring-1 focus:ring-black bg-gray-50/50"
            required
          />
          <button type="submit" className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer">
            Search
          </button>
        </form>

        {/* Results Container Box */}
        <div className="py-2 overflow-y-auto max-h-60 space-y-2 min-h-[80px]">
          {loading && (
            <div className="text-center text-xs text-gray-500 font-medium py-4 animate-pulse">
              Querying collection prefix values...
            </div>
          )}

          {!loading && hasSearched && searchResults.length === 0 && (
            <div className="text-center text-xs text-gray-400 font-medium py-4">
              No matching profiles found starting with that text.
            </div>
          )}

          {!loading && searchResults.map((user) => (
            <div key={user.uid} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-gray-300 transition-all">
              <div className="flex items-center gap-3 text-left">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 to-green-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {user.firstName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900 leading-none">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-[10px] font-medium text-gray-400 mt-1">
                    @{user.username}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onStartChat(user);
                  handleSafeClose();
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Chat
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
