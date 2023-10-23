import React, { useState } from 'react'
import '../styles/RegistrationPage.css'

import axios from 'axios';
import TopicForm from './TopicForm';

const RegistrationPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegistration = async (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
        };

        try {
            // Send a POST request to the server to generate and send OTP
            const response = await axios.post('http://localhost:8000/generate-otp', user);

            if (!name ) {
                alert('Enter valid Name');
            }
            else if(!email){
                alert('Enter valid Email');
            }

            if (response.status === 200) {
                // Registration successful, update the UI or redirect to a success page
                setIsRegistered(true);
            } else {
                alert("Please enter correct fields")
            }
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    };


    return (
        <div className='container'>

            {
                isRegistered ? (
                    <TopicForm />
                ) : (

                    <div className="login-container">
                        <h2>Login</h2>
                        <form action="" method="post" onSubmit={handleRegistration}>
                            <div className="form-group">
                                <label for="username">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label for="username">E-Mail</label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label for="password">OTP Verification</label>
                                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button type="submit">Registered</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>





    )

}

export default RegistrationPage