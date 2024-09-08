const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const AuthRouter = require('./Routes/AuthRouter');
const ReviewRouter = require('./Routes/ReviewRoute');
const NoteRouter = require('./Routes/Noteroute'); 
const VideoRouter = require('./Routes/videoRoutes'); 

const app = express();
const PORT = process.env.PORT || 8000;
const mongo_url = process.env.MONGO_URL;


mongoose.connect(mongo_url)
    .then(() => console.log(" db Connected Successfully "))
    .catch(err => console.log("Connection Error", err));


app.use(bodyParser.json());
app.use(cors());


app.use('/auth', AuthRouter);
app.use('/reviews', ReviewRouter);
app.use('/notes', NoteRouter);
app.use('/videos', VideoRouter); 

app.get('/home', (req, res) => {
    res.send("THIS IS HOME PAGE");
});


app.listen(PORT, () => {
    console.log(`Server is Activated at ${PORT}`);
});
