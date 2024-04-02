const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './')));

let tempStorage = {};

app.set('view engine', 'ejs');

app.post('/submit-form', (req, res) => {
    const { name, email, sem, duration } = req.body;
    if (!name || !email || !sem || !duration) {
        return res.status(400).send('Invalid data provided.');
    }

    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Semester: ${sem}`);
    console.log(`Duration: ${duration}`);
    tempStorage = { ...req.body };
    console.log('Stored data:', tempStorage);

    res.status(200);
    res.render('status', { name });
});

app.get('/about', (req, res) => {
    res.render('status');
});
app.use((req, res) => {
    if (res.statusCode === 200) {
        res.render('status');
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
