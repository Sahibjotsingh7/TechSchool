const fs = require('fs'); // For reading the JSON file

// Load FAQs from FAQ.json
const faqFilePath = './Models/FQA.json'; // Adjust the path if necessary
let faq = [];

try {
    const faqData = fs.readFileSync(faqFilePath, 'utf8');
    faq = JSON.parse(faqData);
} catch (error) {
    console.error("Error loading FAQ.json:", error.message);
    process.exit(1); // Exit if the file can't be loaded
}

// Helper function to calculate relevance score
const calculateScore = (userInput, faqItem) => {
    const inputWords = userInput.toLowerCase().split(/\s+/); // Split input into words
    let score = 0;

    // Check for keyword matches
    faqItem.keywords.forEach(keyword => {
        if (inputWords.includes(keyword)) {
            score += 3; // Higher score for exact keyword matches
        } else if (inputWords.some(word => word.includes(keyword))) {
            score += 1; // Partial match gets lower score
        }
    });

    // Check for similarity in the full question
    const questionWords = faqItem.q.toLowerCase().split(/\s+/);
    inputWords.forEach(word => {
        if (questionWords.includes(word)) {
            score += 2; // Boost score for words matching the question
        }
    });

    return score;
};

// Controller function for chatbot queries
const handleChatbotQuery = (req, res) => {
    const userInput = req.body.query;

    if (!userInput || userInput.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Query cannot be empty!'
        });
    }

    // Calculate scores for each FAQ item
    const results = faq.map(item => ({
        ...item,
        score: calculateScore(userInput, item)
    }));

    // Sort by score in descending order and get the top 5
    const topMatches = results
        .filter(item => item.score > 0) // Exclude items with no score
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    // Format the response to only include the question and answer
    const formattedMatches = topMatches.map(item => ({
        q: item.q,
        a: item.a
    }));

    if (formattedMatches.length === 0) {
        return res.json({
            success: true,
            query: userInput,
            message: "Sorry, no relevant FAQs found. Try rephrasing your question.",
            topMatches: []
        });
    }

    res.json({
        success: true,
        query: userInput,
        topMatches: formattedMatches
    });
};

// Exporting the controller
module.exports = {
    handleChatbotQuery
};
