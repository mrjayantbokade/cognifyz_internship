const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS setup
const corsOptions = {
    origin: 'http://localhost:5173',
    origins: 'http://localhost:5173/Feedback-Form',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://mrjayant81:thisIsMyMongoDbPassword@cluster0.tyifqyc.mongodb.net/cognifyz-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Mongoose model for Feedback collection
const feedbackSchema = new mongoose.Schema({
    feedbackId: Number,
    fullName: String,
    content: String,
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// POST endpoint to create new feedback entry
app.post('/api/feedback', async (req, res) => {
    // Handle request body to create a new feedback entry
    // Example: create feedback entry using `Feedback.create()`
    // Respond with created feedback entry or error message
});

// GET endpoint to fetch all feedback entries
app.get('/api/feedbackCollection', (req, res) => {
    // Retrieve all feedback entries using `Feedback.find()`
    Feedback.find()
        .then((feedbackEntries) => {
            res.status(200).json(feedbackEntries); // Send feedback entries as JSON response
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to fetch feedback' }); // Handle error
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
