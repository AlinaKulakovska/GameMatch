import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { Link } from 'react-router-dom'
const SignInForm = ({ isVisible, closeForm}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        // Basic validation (you can replace this with more robust validation)
        if (!email || !password) {
            setError('Please fill in all fields');
        } else {
            setError('');
            // Handle form submission (e.g., send data to server)
            console.log('Email:', email);
            console.log('Password:', password);
        }
    };

    return (
        <div className={`signinsection ${isVisible ? 'show' : ''}`}>
            <div className="sign-in-form">
                <div className='close-icon' onClick={closeForm}><IoIosClose/></div>
                <h2>Sign In</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Link to='/profile' className='flex items-center link'><button type="submit">Sign In</button></Link>
                </form>
            </div></div>
    );
};

export default SignInForm;