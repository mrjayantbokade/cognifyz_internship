const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Replace <username>, <password>, and <your-database> with your MongoDB details
mongoose.connect('mongodb+srv://mrjayant81:thisIsMyMongoDbPassword@cluster0.tyifqyc.mongodb.net/cognifyz-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const feedbackSchema = new mongoose.Schema({
    fullName: String,
    content: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// POST endpoint to create a new feedback entry from form data
app.post('/api/feedback', async (req, res) => {
    const { fullName, content } = req.body;

    if (!fullName || !content) {
        return res.status(400).json({ error: 'Full Name and Content are required' });
    }



    const feedbacksaveresponse = await Feedback.create(
        {
            fullName,
            content
        }
    )

    const createdFeedback = await Feedback.findById(feedbacksaveresponse._id);


    if (!createdFeedback) {
        return res.status(500).json({ error: 'Failed to create feedback' });
    }


    return res.status(201)
        .json({"created feedback": createdFeedback});

});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// Get all Feedback
// app.get('/api/feedback', (req, res) => {
//     Feedback.find()
//         .then((feedbackEntries) => {
//             res.status(200).json(feedbackEntries);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'Failed to fetch feedback' });
//         });
// });

// Update a Feedback
// app.put('/api/feedback/:id', (req, res) => {
//     const { fullName, content } = req.body;
//
//     Feedback.findByIdAndUpdate(req.params.id, { fullName, content }, { new: true })
//         .then((updatedFeedback) => {
//             res.status(200).json(updatedFeedback);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'Failed to update feedback' });
//         });
// });

// // Delete a Feedback
// app.delete('/api/feedback/:id', (req, res) => {
//     Feedback.findByIdAndRemove(req.params.id)
//         .then(() => {
//             res.status(204).send();
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'Failed to delete feedback' });
//         });
// });

