import { db } from '../config/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  addDoc,
  serverTimestamp,
  doc,
   updateDoc
} from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export const searchUsersByPrefix = async (searchQuery: string, myUid: string): Promise<UserProfile[]> => {
  const cleanQuery = searchQuery.replace('@', '').toLowerCase().trim();
  if (!cleanQuery) return [];

  const usersRef = collection(db, "users");
  
  const strFrontCode = cleanQuery;
  const strEndCode = cleanQuery.slice(0, -1) + String.fromCharCode(cleanQuery.charCodeAt(cleanQuery.length - 1) + 1);

  const q = query(
    usersRef, 
    orderBy("username"),
    where("username", ">=", strFrontCode), 
    where("username", "<", strEndCode),
    limit(11) // Fetch 11 items instead of 10 in case you are in the list, ensuring 10 show up
  );
  
  const querySnapshot = await getDocs(q);
  const results: UserProfile[] = [];
  
  querySnapshot.forEach((doc) => {
    results.push(doc.data() as UserProfile);
  });

  // 💡 THE FIX: Filter out any profile card document that matches your own unique User ID (UID)
  return results.filter(userProfile => userProfile.uid !== myUid);
};


// 🆕 PHASE 3: Chat Room Creation & Verification Engine
export const getOrCreateChatRoom = async (myUid: string, myUsername: string, targetUser: UserProfile): Promise<string> => {
  const chatsRef = collection(db, "chats");

  // 1. Query all rooms where YOU are a participant
  const q = query(chatsRef, where("participants", "array-contains", myUid));
  const querySnapshot = await getDocs(q);

  let existingRoomId: string | null = null;

  // 2. Loop through your rooms to check if the target contact is also in any of them
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.participants && data.participants.includes(targetUser.uid)) {
      existingRoomId = doc.id;
    }
  });

  // If a matching room exists, return its ID instantly to avoid duplicate rooms
  if (existingRoomId) {
    return existingRoomId;
  }

  // 3. If no room exists, initialize a brand-new chat session structure
 const newChatDoc = await addDoc(chatsRef, {
    participants: [myUid, targetUser.uid],
    createdAt: serverTimestamp(),
    
    // 💡 THE CRITICAL SIDEBAR FIX:
    lastMessage: "Room created. No messages yet.", 
    lastMessageTimestamp: serverTimestamp(), // Sets a valid timestamp instantly so the sidebar sees it!
    
    metadata: {
      [myUid]: myUsername.replace('@', '').toLowerCase().trim(),
      [targetUser.uid]: targetUser.username
    }
  });

  return newChatDoc.id;
};
export interface MessagePayload {
  id?: string;
  senderId: string;
  text: string;
  timestamp: any;
}

// 🆕 PHASE 4: Writes a clean message payload document into a chat room sub-collection
export const sendMessageToRoom = async (roomId: string, senderId: string, messageText: string) => {
  if (!messageText.trim()) return;

  // 1. Reference the nested sub-collection path: chats -> ROOM_ID -> messages
  const messagesSubCollectionRef = collection(db, "chats", roomId, "messages");

  // 2. Add the clean message document layout
  await addDoc(messagesSubCollectionRef, {
    senderId: senderId,
    text: messageText.trim(),
    timestamp: serverTimestamp() // Forces uniform global clock alignments
  });

  // 3. Update the parent room's metadata overview for the sidebar preview indicators
  const parentChatRoomDocRef = doc(db, "chats", roomId);
  await updateDoc(parentChatRoomDocRef, {
    lastMessage: messageText.trim(),
    lastMessageTimestamp: serverTimestamp()
  });
};

export interface ActiveChatSummary {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTimestamp: any;
  displayName: string; // The specific username of the OTHER person
}
