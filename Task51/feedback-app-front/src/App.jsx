import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logoImage from './assets/cognifyz-1.png';

function FeedbackForm() {
    const [feedbackId, setFeedbackId] = useState('');
    const [fullName, setFullName] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showSubmittedMessage, setShowSubmittedMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submitting) return;

        setSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3000/api/feedback', { feedbackId, fullName, content });

            console.log('Feedback submitted:', response.data);

            // Show submitted message
            setShowSubmittedMessage(true);

            setFeedbackId('');
            setFullName('');
            setContent('');
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseMessage = () => {
        setShowSubmittedMessage(false);
    };

    return (
        <div className="feedback-form-container">
            {!showSubmittedMessage && (
                <div>
                    <div className="logo-container">
                        <img src={logoImage} alt="Company Logo" className="logo-image" />
                    </div>
                    <h2>Internship Feedback</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="feedbackId">Feedback Unique Id: </label>
                            <input
                                type="number"
                                id="feedbackId"
                                value={feedbackId}
                                onChange={(e) => setFeedbackId(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="fullName">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content">Content:</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {showSubmittedMessage && (
                <div className="submitted-message">
                    <p>Feedback submitted successfully!</p>
                    <button onClick={handleCloseMessage}>Close</button>
                </div>
            )}
        </div>
    );
}

export default FeedbackForm;
