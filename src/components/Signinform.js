import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { Link } from 'react-router-dom'

import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const SignInForm = ({ isVisible, closeForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    closeForm()
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode)
                    // ..
                });
        } 
    const handleLogin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                closeForm()
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
            })
    };

    return (
        <div className={`signinsection ${isVisible ? 'show' : ''}`}>
            <div className="sign-in-form">
                <div className='close-icon' onClick={closeForm}><IoIosClose /></div>
                <h2>Sign In</h2>
                {error && <p className="error">{error}</p>}
                <form>
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
                    <button type="submit" onClick={handleRegister}>Register</button>
                    <button type="submit" className='mt-5' onClick={handleLogin}>Sign In</button>
                </form>
            </div></div>
    );
};

export default SignInForm;