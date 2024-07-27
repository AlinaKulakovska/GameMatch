import React, { useState } from 'react';

const matchedProfilesData = [
  {
    id: 1,
    name: 'Jane Doe',
    age: 28,
    job: 'Marketing',
    location: 'Ukraine',
    bio: 'Lover of adventure, food, and good company.',
    interests: ['Hiking', 'Cooking', 'Traveling', 'Reading', 'Video games'],
    profilePicture: 'https://via.placeholder.com/150',
    games: ['Minecraft', 'Overwatch'],
    messages: [],
  },
  {
    id: 2,
    name: 'John Smith',
    age: 30,
    job: 'Software Developer',
    location: 'USA',
    bio: 'Tech enthusiast and coffee lover.',
    interests: ['Coding', 'Gaming', 'Reading', 'Traveling'],
    profilePicture: 'https://via.placeholder.com/150',
    games: ['Valorant', 'League of Legends'],
    messages: [],
  },
  // Add more matched profiles as needed
];

const MatchesPage = () => {
  const [matchedProfiles, setMatchedProfiles] = useState(matchedProfilesData);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [message, setMessage] = useState('');

  const handleProfileClick = (profileId) => {
    setSelectedProfileId(profileId);
  };

  const handleSendMessage = () => {
    const updatedProfiles = matchedProfiles.map(profile => {
      if (profile.id === selectedProfileId) {
        return {
          ...profile,
          messages: [...profile.messages, { text: message, sender: 'me' }]
        };
      }
      return profile;
    });

    setMatchedProfiles(updatedProfiles);
    setMessage('');
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
              {selectedProfile.messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
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
