import React, { useState } from 'react';
import { FaSuitcase } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import Select from 'react-select';

const Profile = () => {
    const gamesOptions = [
        { value: 'Among Us', label: 'Among Us' },
        { value: 'Fortnite', label: 'Fortnite' },
        { value: 'Minecraft', label: 'Minecraft' },
        { value: 'Overwatch', label: 'Overwatch' },
        { value: 'Call of Duty', label: 'Call of Duty' },
        { value: 'League of Legends', label: 'League of Legends' },
        { value: 'Valorant', label: 'Valorant' },
    ];


    const [user, setUser] = useState({
        name: 'Jane Doe',
        age: 28,
        job: 'Marketing',
        location: 'Ukraine',
        bio: 'Lover of adventure, food, and good company.',
        interests: ['Hiking', 'Cooking', 'Traveling', "Reading", 'Video games'],
        profilePicture: 'https://via.placeholder.com/150',
        games: ['Minecraft', 'Overwatch'],
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setUser(editedUser);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'interests') {
            setEditedUser({
                ...editedUser,
                interests: value.split(',').map(interest => interest.trim())
            });
        } else {
            setEditedUser({
                ...editedUser,
                [name]: value
            });
        }
    };
    const handleGamesChange = (selectedOptions) => {
        setEditedUser({
            ...editedUser,
            games: selectedOptions ? selectedOptions.map(option => option.value) : []
        });
    };
    return (
        <div className="profile-page my-10">
            <div className="profile-header">
                <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>
            </div>
            {isEditing ? (
                <div className="profile-form">
                    <label>
                        Name:
                        <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
                    </label>
                    <label>
                        Age:
                        <input type="number" name="age" value={editedUser.age} onChange={handleChange} />
                    </label>
                    <label>
                        Job:
                        <input type="text" name="job" value={editedUser.job} onChange={handleChange} />
                    </label>
                    <label>
                        Location:
                        <input type="text" name="job" value={editedUser.location} onChange={handleChange} />
                    </label>
                    <label>
                        Bio:
                        <textarea name="bio" value={editedUser.bio} onChange={handleChange} />
                    </label>
                    <label>
                        Interests:
                        <input type="text" name="interests" value={editedUser.interests.join(', ')} onChange={handleChange} />
                    </label>
                    <label>
                        Games:
                        <Select
                            isMulti
                            name="games"
                            options={gamesOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={gamesOptions.filter(option => editedUser.games.includes(option.value))}
                            onChange={handleGamesChange}
                        />
                    </label>
                    <button className="save-button" onClick={handleSaveClick}>Save</button>
                </div>
            ) : (
                <div className="profile-info">
                    <h2><b>{user.name}, {user.age}</b></h2>
                    <h6 className='mb-2 flex justify-center items-center'><FaSuitcase className='mr-2' /> {user.job}</h6>
                    <p>{user.bio}</p>
                    <h3>Interests</h3>
                    <ul>
                        {user.interests.map((interest, index) => (
                            <li key={index}>{interest}</li>
                        ))}
                    </ul>
                    <h3>Games</h3>
                    <ul>
                        {user.games.map((game, index) => (
                            <li key={index}>{game}</li>
                        ))}
                    </ul>
                    <h6 className='mb-2 flex justify-center items-center'><FaMapLocationDot className='mr-2' /> {user.location}</h6>
                </div>
            )}
        </div>
    );
};

export default Profile;
