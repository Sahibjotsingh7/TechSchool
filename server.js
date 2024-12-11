const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authenticateToken = require('./Middlewares/authMiddleware'); // Import the middleware
const { handleChatbotQuery } = require('./Controllers/fqas'); // Adjust path as needed
const { generateFile } = require("./generateFile");
// const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");

// Set up the route to handle chatbot queries

// Import routes
const AuthRouter = require('./Routes/AuthRouter');
const ReviewRouter = require('./Routes/ReviewRoute');
const NoteRouter = require('./Routes/Noteroute');
const VideoRouter = require('./Routes/videoRoutes');
const FeedbackRouter = require('./Routes/feedbackRoute');
const mcqRoutes = require('./Routes/mcqRoutes'); // Adjust the path if necessary

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const mongo_url = process.env.MONGO_URL;

// MongoDB connection
mongoose.connect(mongo_url)
    .then(() => console.log("DB Connected Successfully"))
    .catch(err => console.log("Connection Error", err));

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Apply the authentication middleware globally
app.use(authenticateToken); // All requests go through this middleware first

// Define routes
app.use('/auth', AuthRouter); // Public routes are exempt in the middleware
app.use('/reviews', ReviewRouter); // Protected route
app.use('/notes', NoteRouter);     // Protected route
app.use('/videos', VideoRouter);   // Protected route
app.use('/feedback', FeedbackRouter); // Protected route
app.use('/api/mcqs', mcqRoutes);   // Protected route
app.post('/api/chatbot', handleChatbotQuery);

// Public route example
app.get('/home', (req, res) => {
    res.send("THIS IS HOME PAGE");
});

app.post("/run", async (req, res) => {
    const { language, code, userInputs } = req.body;
    console.log("Request Body:", req.body);  // Log the entire request body
  
    if (!code) {
      return res.status(400).json({ success: false, error: "Empty code body" });
    }
  
    try {
      let modifiedCode = code;
  
      // If language is Python and userInputs are provided, inject the user input into the code.
      if (language === 'py' && userInputs) {
        // Split the user inputs by commas and trim any spaces
        const inputs = userInputs.split(',').map(input => input.trim());
  
        // Convert each input to a number if possible, otherwise leave it as a string
        const processedInputs = inputs.map(input => {
          const parsedInput = parseInt(input, 10);
          return isNaN(parsedInput) ? input : parsedInput;  // Return as string if not a valid number
        });
  
        // Replace input() calls in the code with corresponding processed input values
        modifiedCode = modifiedCode.replace(/input\(".*?"\)/g, () => {
          if (processedInputs.length > 0) {
            const nextInput = processedInputs.shift();
            return`"${nextInput}"`;  // Convert the input to string and inject it
          }
          return '""';  // Default empty input if no more values left
        });
      }
  
      // Generate file based on the language and modified code
      const filepath = await generateFile(language, modifiedCode, userInputs);
  
      let output;
      
      if (language === "py") {
        output = await executePy(filepath);  // Execute Python code
      } else {
        return res.status(400).json({ success: false, error: "Unsupported language" });
      }
  
      return res.json({ success: true, output });
  
    } catch (error) {
      console.error("Error occurred:", error);
  
      return res.status(500).json({
        success: false,
        error: error.error || "Internal Server Error",
        details: error.details || error.message || "An unexpected error occurred"
      });
    }
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
