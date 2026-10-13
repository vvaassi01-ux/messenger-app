import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { NewChatModal } from '../components/NewChatModal';
import { getOrCreateChatRoom, sendMessageToRoom, type UserProfile, type MessagePayload, type ActiveChatSummary } from '../services/chatService';
import { db } from '../config/firebase';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

const MessagesPage = () => {
  const { user, username } = useAuth();

  // Interface Visibility and Input Controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Real-Time Subscriptions Memory Arrays
  const [chatRoomsList, setChatRoomsList] = useState<ActiveChatSummary[]>([]);
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      // Create a macro-task buffer queue to let React finish rendering the new text bubble first
      const scrollTimeout = setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 30); // 30ms is the sweet spot for a smooth, glitch-free animation bump

      return () => clearTimeout(scrollTimeout);
    }
  }, [messages])

  // 🔄 STREAM 1: LISTEN TO ACTIVE CHAT CHANNELS LIST IN SIDEBAR
  useEffect(() => {
    if (!user?.uid) return;

    const chatsCollectionRef = collection(db, "chats");
    const q = query(
      chatsCollectionRef,
      where("participants", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const compiledSummaryRooms: ActiveChatSummary[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const targetContactId = data.participants?.find((id: string) => id !== user.uid) || '';
        const displayHandle = data.metadata ? data.metadata[targetContactId] : 'Secure Contact';

        const rawTimestamp = data.lastMessageTimestamp || data.createdAt || { seconds: 0 };
        const sortingMillis = rawTimestamp?.seconds ? rawTimestamp.seconds * 1000 : 0;


        compiledSummaryRooms.push({
          id: doc.id,
          participants: data.participants || [],
          lastMessage: data.lastMessage || 'No messages written.',
          lastMessageTimestamp: sortingMillis,
          displayName: displayHandle ? `@${displayHandle}` : 'Chat Channel'
        });
      });

      compiledSummaryRooms.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);

      setChatRoomsList(compiledSummaryRooms);
    }, (error) => {
      console.error("Sidebar live loop connection failed:", error);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  // 🔄 STREAM 2: LISTEN TO LIVE MESSAGES INSIDE THE SELECTED ROOM
  useEffect(() => {
    if (!activeChatId) return;

    const messagesRef = collection(db, "chats", activeChatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMessagesList: MessagePayload[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        updatedMessagesList.push({
          id: doc.id,
          senderId: data.senderId,
          text: data.text,
          timestamp: data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'
        });
      });

      setMessages(updatedMessagesList);
    });

    return () => unsubscribe();
  }, [activeChatId]);


  const handleCreateChatRoomTrigger = async (targetContact: UserProfile) => {
    if (!user?.uid || !username) return;
    try {
      const roomId = await getOrCreateChatRoom(user.uid, username, targetContact);
      setIsModalOpen(false);
      setActiveChatId(roomId);
      setIsMobileChatOpen(true);
    } catch (err) {
      console.error("Failed to establish chat session:", err);
    }
  };

  const handleSendMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChatId || !user?.uid) return;

    try {
      const currentTextInput = messageText;
      setMessageText('');
      await sendMessageToRoom(activeChatId, user.uid, currentTextInput);
    } catch (err) {
      console.error("Transmission layout upload failed:", err);
    }
  };

  const activeRoomMeta = chatRoomsList.find(c => c.id === activeChatId);
  return (
    <div className="w-full max-w-6xl mx-auto h-[80vh] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 flex overflow-hidden">

      {/* 📁 LEFT SIDEBAR PANEL */}
      <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col ${isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>

        {/* User Badge Profile Header */}
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-8 px-3 rounded-lg bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
          >
            <span>➕</span> New
          </button>
        </div>

        {/* 💡 LIVE CHANNEL STREAM LIST */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-zinc-300 to-purple-200">
          {chatRoomsList.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-400 font-medium pt-12">
              Tap the ➕ button to locate contact handles and launch live encrypted room channels.
            </div>
          ) : (

            chatRoomsList.map((room) => {
              const isActive = activeChatId === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => {
                    setActiveChatId(room.id);
                    setIsMobileChatOpen(true);
                  }}
                  className={`w-full p-4 flex items-center gap-3 text-left border-b border-gray-50/50 cursor-pointer hover:bg-gray-50/90 ${
                    isActive
                      ? 'bg-gray-200 border-l-3 border-solid border-purple-600 pl-3 shadow-inner hover:bg-gray-100/40'
                      : 'bg-white'
                    }`}
                >
                  {/* Symmetrical Initial Avatar Profile Badge */}
                  <div className="relative shrink-0">
                    <div className={`h-11 w-11 rounded-full font-black text-xs flex items-center justify-center uppercase tracking-wider ${isActive ? 'bg-purple-600 text-white shadow-sm' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border border-gray-200/40'
                      }`}>
                      {room.displayName.charAt(1) || 'C'}
                    </div>
                    {/* Glow point indicating a connected chat pipeline */}
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                  </div>

                  {/* Profile Text Metadata Track */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm tracking-tight truncate ${isActive ? 'font-black text-purple-950' : 'font-bold text-gray-900'}`}>
                        {room.displayName}
                      </h3>
                    </div>
                    <p className={`text-xs truncate mt-1 font-medium ${isActive ? 'text-purple-700/80' : 'text-gray-400'}`}>
                      {room.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })

          )}
        </div>
      </div>

      {/* 💬 RIGHT DISPLAY PANEL */}
      <div className={`flex-1 flex flex-col bg-gray-50/30 ${!isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
        {activeChatId ? (
          <>
            {/* Active Thread Banner View bar */}
            {/* Active Thread Banner header wrapper — ensure this container is set to "relative" */}
            <div className="p-4 border-b border-gray-100 bg-white flex items-center relative h-[69px]">

              {/* 📱 BACK BUTTON (Stays on the far left) */}
              <button
                type="button"
                onClick={() => setIsMobileChatOpen(false)}
                aria-label="Go back"
                className="md:hidden p-2 -ml-1 rounded-md text-zinc-900 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300/80 border border-zinc-200/40 transition-colors mr-1 cursor-pointer flex items-center justify-center focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>

              {/* 🎯 DEAD-CENTERED CHAT USER TEXT BLOCK */}
              <div className="flex flex-col items-center mx-auto text-center">
                <h2 className="text-sm font-black text-gray-900 tracking-tight leading-none">
                  {activeRoomMeta?.displayName || 'Active Chat'}
                </h2>
                <span className="text-[10px] font-medium text-purple-600 mt-1 flex items-center gap-1 justify-center">
                  <span>🔒</span> Secure End-to-End Channel
                </span>
              </div>

              {/* 🖼️ ABSOLUTE HARD-ANCHORED AVATAR PHOTO: Locked to the far right edge */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center uppercase shrink-0 border border-purple-200/30 shadow-xs">
                {activeRoomMeta?.displayName.charAt(1) || 'C'}
              </div>

            </div>

            {/* Scrolling Messages Stream Block Layout */}
            <div ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
              {messages.map((msg) => {
                const isMe = msg.senderId === user?.uid;
                return (
                  <div key={msg.id} className={`flex flex-col max-w-[75%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                    <div className={`px-4 py-2 rounded-2xl text-sm ${isMe ? 'bg-black text-white rounded-br-none shadow-sm' : 'bg-white border border-gray-100 text-gray-900 rounded-bl-none shadow-xs'}`}>
                      <p className="text-left leading-relaxed break-words">{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}
              <div />
            </div>

            {/* Form messaging submittal typing input area */}
            <form onSubmit={handleSendMessageSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type an encrypted message..."
                className="flex-1 border border-solid border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:border-black focus:outline-none bg-gray-50/50"
              />
              <button type="submit" className="bg-black text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer shadow-sm">
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <span className="text-4xl">💬</span>
            <h3 className="text-base font-bold text-gray-900">No Chat Selected</h3>
            <p className="text-xs text-gray-400 max-w-xs">Select a conversation channel inside your active navigation sidebar stack or search a user handle to launch live secure data loops.</p>
          </div>
        )}
      </div>

      <NewChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onStartChat={handleCreateChatRoomTrigger} />
    </div>
  );
};

export default MessagesPage;
