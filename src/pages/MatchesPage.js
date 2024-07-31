import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, setDoc, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../components/firebaseConfig'; // Adjust import path as needed

const MatchesPage = () => {
  const [matchedProfiles, setMatchedProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [message, setMessage] = useState('');
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch current user UID from Firebase Authentication
    const user = auth.currentUser;
    if (user) {
      setCurrentUserUid(user.uid);
    }
  }, []);

  useEffect(() => {
    if (!currentUserUid) return;

    const fetchMatchedProfiles = async () => {
      try {
        // Fetch current user liked profiles
        const currentUserDocRef = doc(db, 'users', currentUserUid);
        const currentUserDoc = await getDoc(currentUserDocRef);
        const currentUserData = currentUserDoc.data();
        const likedProfiles = currentUserData?.liked || [];

        // Fetch all users
        const querySnapshot = await getDocs(collection(db, 'users'));
        const allProfiles = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        // Find mutual matches
        const mutualMatches = allProfiles.filter(profile => 
          likedProfiles.includes(profile.id) &&
          (profile.liked || []).includes(currentUserUid)
        );
        setMatchedProfiles(mutualMatches);
      } catch (error) {
        console.error('Error fetching matched profiles:', error);
      }
    };

    fetchMatchedProfiles();
  }, [currentUserUid]);

  useEffect(() => {
    if (!selectedProfileId || !currentUserUid) return;

    // Set up real-time listener for messages
    const conversationId = [currentUserUid, selectedProfileId].sort().join('_');
    const messagesRef = doc(db, 'messages', conversationId);

    const unsubscribe = onSnapshot(messagesRef, (doc) => {
      const data = doc.data();
      if (data) {
        setMessages(data.messages || []);
      }
    }, (error) => {
      console.error('Error listening for messages:', error);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [selectedProfileId, currentUserUid]);

  const handleProfileClick = (profileId) => {
    setSelectedProfileId(profileId);
  };

  const handleSendMessage = async () => {
    if (!selectedProfileId || !message.trim() || !currentUserUid) return;

    try {
      const messageObj = { text: message, sender: currentUserUid, timestamp: new Date() };

      // Create a unique conversation ID based on both participants' IDs
      const conversationId = [currentUserUid, selectedProfileId].sort().join('_');
      const messagesDocRef = doc(db, 'messages', conversationId);

      // Fetch the current messages for this conversation
      const messagesDoc = await getDoc(messagesDocRef);
      const currentMessages = messagesDoc.exists() ? messagesDoc.data().messages || [] : [];

      // Update the messages in Firestore
      await setDoc(messagesDocRef, {
        participants: [currentUserUid, selectedProfileId],
        messages: [...currentMessages, messageObj],
      }, { merge: true });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const selectedProfile = matchedProfiles.find(profile => profile.id === selectedProfileId);

  return (
    <div className="matches-page">
      <div className="profiles-list">
        {matchedProfiles.map(profile => (
          <div key={profile.id} className="profile-card" onClick={() => handleProfileClick(profile.id)}>
            <img src={profile.profilePicture} alt="Profile" className="profile-picture" />
            <h2>{profile.name}, {profile.age}</h2>
            <p>{profile.job}</p>
          </div>
        ))}
      </div>
      <div className="chat-section">
        {selectedProfile ? (
          <>
            <div className="chat-header">
              <img src={selectedProfile.profilePicture} alt="Profile" className="profile-picture" />
              <h2>{selectedProfile.name}</h2>
            </div>
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === currentUserUid ? 'me' : 'other'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a profile to start messaging</p>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
