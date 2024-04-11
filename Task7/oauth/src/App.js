import React from 'react';
import './App.css';
import LoginButton from './components/LoginButton.jsx';
import LogoutButton from './components/LogoutButton';
import SignupButton from './components/SignupButton';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';

const internshipsData = [
    {
        id: 1,
        company: 'Cognifyz',
        position: 'Full-Stack Intern',
        location: 'On-site (India, Nagpur)',
        duration: '3 months',
        description: 'Industry level task and learning will be given and provided.',
    },
    {
        id: 2,
        company: 'Cognifyz',
        position: 'Backend Developer Intern',
        location: 'Remote',
        duration: '4 months',
        description: 'Explore the world of how things are working under the hood!',
    },

];

function App() {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="App">
            <header className="navbar">
                <div className="khali"></div>

                <div className="auth-buttons">
                    {isAuthenticated ? <LogoutButton /> : <SignupButton />}
                    {!isAuthenticated && <LoginButton />}
                </div>
            </header>

            <div className="middle-section">
                {isAuthenticated ? (
                    <>
                        <Profile />
                        <h1>Successfully Logged in</h1>
                        <h2>Internship Opportunities</h2>
                        <h2 style={{ color: 'indianred', fontSize: '15px', } }>Scroll down</h2>
                        <div className="internships-container">
                            {internshipsData.map((internship) => (
                                <div key={internship.id} className="internship-card">
                                    <h3>{internship.company}</h3>
                                    <p>{internship.position}</p>
                                    <p>{internship.location}</p>
                                    <p>Duration: {internship.duration}</p>
                                    <p>{internship.description}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <h1 style={{marginTop: '50px'}}>Signup or Login to Discover Opportunities</h1>
                    //add image background here from public/cognifyz-1.png
                )}
            </div>
        </div>
    );
}

export default App;
