import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../components/firebaseConfig";
import { useAuth } from "../components/AuthContext";
import Select from 'react-select';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FaSuitcase } from 'react-icons/fa';

const ProfilesPage = () => {
    const { currentUser } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ageFilter, setAgeFilter] = useState(18);
    const [gameFilter, setGameFilter] = useState(null);
    const [locationFilter, setLocationFilter] = useState(null);
    const [likedProfiles, setLikedProfiles] = useState([]);
    
    const gameOptions = [
        { value: 'Minecraft', label: 'Minecraft' },
        { value: 'Overwatch', label: 'Overwatch' },
        { value: 'Valorant', label: 'Valorant' },
        { value: 'League of Legends', label: 'League of Legends' },
    ];

    const locationOptions = [
        { value: 'Ukraine', label: 'Ukraine' },
        { value: 'USA', label: 'USA' },
    ];

    useEffect(() => {
        const fetchProfiles = async () => {
            // Fetch all profiles
            const querySnapshot = await getDocs(collection(db, "users"));
            const profilesArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setProfiles(profilesArray);

            // Fetch liked profiles for the current user
            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                const liked = userDoc.data()?.liked || [];
                setLikedProfiles(liked);
            }

            setLoading(false);
        };
        fetchProfiles();
    }, [currentUser]);

    useEffect(() => {
        filterProfiles(profiles);
    }, [profiles, ageFilter, gameFilter, locationFilter, likedProfiles]);

    const filterProfiles = (profilesArray) => {
        const filtered = profilesArray.filter(profile => {
            const isCurrentUser = profile.id === currentUser.uid;
            const ageMatch = ageFilter ? profile.age >= parseInt(ageFilter) : true;
            const gameMatch = gameFilter ? profile.games.includes(gameFilter.value) : true;
            const locationMatch = locationFilter ? profile.location === locationFilter.value : true;
            const notLiked = !likedProfiles.includes(profile.id); // Filter out liked profiles

            return ageMatch && gameMatch && locationMatch && notLiked && !isCurrentUser;
        });
        setFilteredProfiles(filtered);
        setCurrentIndex(0);
    };

    const handleLike = async (profileId) => {
        if (currentUser) {
            const userDocRef = doc(db, "users", currentUser.uid);
            await updateDoc(userDocRef, {
                liked: arrayUnion(profileId)
            });
        } else {
            alert("You need to log in to like profiles.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleNextProfile = () => {
        if (currentIndex < filteredProfiles.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevProfile = () => {
        if (currentIndex < filteredProfiles.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const currentProfile = filteredProfiles[currentIndex];

    return (
        <div>
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

                <button onClick={() => filterProfiles(profiles)} className="filter-button">Filter</button>
            </div>
            <div className="m-20">
                {filteredProfiles.length > 0 ? (
                    <div key={currentProfile.id} className="profile-card">
                        <img src={currentProfile.profilePicture} alt={currentProfile.name} className="profile-picture" />
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
                            <button onClick={handlePrevProfile} className="dislike-button" disabled={currentIndex === filteredProfiles.length}>Dislike</button>
                            <button onClick={() => { handleLike(currentProfile.id); handleNextProfile(); }} disabled={currentIndex === filteredProfiles.length } className="like-button">Like</button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">No profiles match the filters</p>
                )}
            </div>
        </div>
    );
};

export default ProfilesPage;
