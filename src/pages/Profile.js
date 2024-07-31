import { FaSuitcase } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import Select from 'react-select';

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, deleteUser } from "firebase/auth";
import { auth, db } from "../components/firebaseConfig"; // Ensure you have firestore imported here
import { getUserProfile, updateUserProfile } from "../components/getdata";
import { doc, deleteDoc } from "firebase/firestore"; // Ensure you have firestore functions imported
const Profile = () => {
    // transfer to databse
    const gamesOptions = [
        { value: 'Among Us', label: 'Among Us' },
        { value: 'Fortnite', label: 'Fortnite' },
        { value: 'Minecraft', label: 'Minecraft' },
        { value: 'Overwatch', label: 'Overwatch' },
        { value: 'Call of Duty', label: 'Call of Duty' },
        { value: 'League of Legends', label: 'League of Legends' },
        { value: 'Valorant', label: 'Valorant' },
    ];

    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState({
        name: "",
        age: "",
        job: "",
        location: "",
        bio: "",
        profilePicture: "",
        interests: [],
        games: []
    });
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        job: "",
        location: "",
        bio: "",
        profilePicture: "",
        interests: [],
        games: []
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const data = await getUserProfile(currentUser.uid);
                if (data) {
                    setProfileData(data);
                    setFormData(data);
                }
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'interests') {
            setFormData({
                ...formData,
                interests: value.split(',').map(interest => interest.trim())
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    const handleGamesChange = (selectedOptions) => {
        setFormData({
            ...formData,
            games: selectedOptions ? selectedOptions.map(option => option.value) : []
        });
    };


    const handleSave = async () => {
        if (user) {
            await updateUserProfile(user.uid, formData);
            setProfileData(formData);
            setEditing(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            try {
                await deleteDoc(userDocRef); // Delete user data from Firestore
                await deleteUser(user); // Delete user from Firebase Authentication
                alert("Account deleted successfully");
            } catch (error) {
                console.error("Error deleting account: ", error);
                alert("Failed to delete account. Please try again.");
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile</div>;
    }

    return (
        <div className="profile-page my-10">

            {editing ? (
                <div className="profile-form">
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </label>
                    <label>
                        Age:
                        <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
                    </label>
                    <label>
                        Job:
                        <input type="text" name="job" value={formData.job} onChange={handleInputChange} />
                    </label>
                    <label>
                        Location:
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
                    </label>
                    <label>
                        Bio:
                        <textarea name="bio" value={formData.bio} onChange={handleInputChange} />
                    </label>
                    <label>
                        Link to profile avatar:
                        <input type="text"  name="profilePicture" value={formData.profilePicture} onChange={handleInputChange} />
                    </label>
                    <label>
                        Interests:
                        <input type="text" name="interests" value={formData.interests.join(', ')} onChange={handleInputChange} />
                    </label>
                    <label>
                        Games:
                        <Select
                            isMulti
                            name="games"
                            options={gamesOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={gamesOptions.filter(option => formData.games.includes(option.value))}
                            onChange={handleGamesChange}
                        />
                    </label>
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <div className="profile-header">
                        <img src={profileData.profilePicture || "https://static.thenounproject.com/png/363640-200.png"} alt="Profile" className="profile-picture" />
                    </div>
                    <div className="profile-info">
                   <h2><b>{profileData.name || "Not set"}, {profileData.age || "Age is not set"}</b></h2>
                   <h6 className='mb-2 flex justify-center items-center'><FaSuitcase className='mr-2' /> {profileData.job || "Not set"}</h6>
                   <p>{profileData.bio}</p>
                   <h3>Interests</h3>
                   <ul>
                       {profileData.interests.map((interest, index) => (
                           <li key={index}>{interest}</li>
                       ))}
                   </ul>
                   <h3>Games</h3>
                   <ul>
                       {profileData.games.map((game, index) => (
                           <li key={index}>{game}</li>
                       ))}
                   </ul>
                   <h6 className='mb-2 flex justify-center items-center'><FaMapLocationDot className='mr-2' /> {profileData.location || "Not set"}</h6>
               </div>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={handleDeleteAccount} className='mt-5 delete-btn'>Delete Account</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
