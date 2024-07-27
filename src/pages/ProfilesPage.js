import React, { useState } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FaSuitcase } from 'react-icons/fa';
import Select from 'react-select';

const profilesData = [
    {
        name: 'Jane Doe',
        age: 28,
        job: 'Marketing',
        location: 'Ukraine',
        bio: 'Lover of adventure, food, and good company.',
        interests: ['Hiking', 'Cooking', 'Traveling', 'Reading', 'Video games'],
        profilePicture: 'https://via.placeholder.com/150',
        games: ['Minecraft', 'Overwatch'],
    },
    {
        name: 'John Smith',
        age: 30,
        job: 'Software Developer',
        location: 'USA',
        bio: 'Tech enthusiast and coffee lover.',
        interests: ['Coding', 'Gaming', 'Reading', 'Traveling'],
        profilePicture: 'https://via.placeholder.com/150',
        games: ['Valorant', 'League of Legends'],
    },
    // Add more profiles as needed
];


const gameOptions = [
    { value: 'Minecraft', label: 'Minecraft' },
    { value: 'Overwatch', label: 'Overwatch' },
    { value: 'Valorant', label: 'Valorant' },
    { value: 'League of Legends', label: 'League of Legends' },
    // Add more game options as needed
];

const locationOptions = [
    { value: 'Ukraine', label: 'Ukraine' },
    { value: 'USA', label: 'USA' },
    // Add more location options as needed
];




const ProfilesPage = () => {
    const [profiles, setProfiles] = useState(profilesData);
    const [filteredProfiles, setFilteredProfiles] = useState(profilesData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ageFilter, setAgeFilter] = useState('');
    const [gameFilter, setGameFilter] = useState(null);
    const [locationFilter, setLocationFilter] = useState(null);

    const filterProfiles = () => {
        const filtered = profiles.filter(profile => {
            const ageMatch = ageFilter ? profile.age >= parseInt(ageFilter) : true;
            const gameMatch = gameFilter ? profile.games.includes(gameFilter.value) : true;
            const locationMatch = locationFilter ? profile.location === locationFilter.value : true;

            return ageMatch && gameMatch && locationMatch;
        });
        setFilteredProfiles(filtered);
        setCurrentIndex(0);
    };

    const handleNextProfile = () => {
        if (currentIndex < filteredProfiles.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevProfile = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentProfile = filteredProfiles[currentIndex];

    return (
        <div className="profiles-page">
            <div className="filters">
                <div className="filter">
                    <label>Age</label>
                    <input
                        type="number"
                        value={ageFilter}
                        min={18}
                        max={100}
                        onChange={(e) => setAgeFilter(e.target.value)}
                        placeholder="Enter age"
                    />
                </div>
                <div className="filter">
                    <label>Game</label>
                    <Select
                        options={gameOptions}
                        value={gameFilter}
                        onChange={setGameFilter}
                        placeholder="Select game"
                    />
                </div>
                <div className="filter">
                    <label>Location</label>
                    <Select
                        options={locationOptions}
                        value={locationFilter}
                        onChange={setLocationFilter}
                        placeholder="Select location"
                    />
                </div>
                <button onClick={filterProfiles} className="filter-button">Filter</button>
            </div>
            {filteredProfiles.length > 0 ? (
                <div className="profile-card">
                    <img src={currentProfile.profilePicture} alt="Profile" className="profile-picture" />
                    <h2>{currentProfile.name}, {currentProfile.age}</h2>
                    <h6 className='mb-2 flex justify-center items-center'><FaSuitcase className='mr-2' /> {currentProfile.job}</h6>
                    <p><strong>Bio:</strong> {currentProfile.bio}</p>
                    <h3>Interests</h3>
                    <ul>
                        {currentProfile.interests.map((interest, index) => (
                            <li key={index}>{interest}</li>
                        ))}
                    </ul>
                    <h3>Games</h3>
                    <ul>
                        {currentProfile.games.map((game, index) => (
                            <li key={index}>{game}</li>
                        ))}
                    </ul>
                    <h6 className='mb-2 flex justify-center items-center'><FaMapLocationDot className='mr-2' /> {currentProfile.location}</h6>
                    <div className="buttons">
                        <button onClick={handlePrevProfile} disabled={currentIndex === 0} className="like-button">Previous</button>
                        <button onClick={handleNextProfile} disabled={currentIndex === filteredProfiles.length - 1} className="dislike-button">Next</button>
                    </div>

                </div>
            ) : (
                <p>No profiles match the filters</p>
            )}
        </div>
    );
};

export default ProfilesPage;