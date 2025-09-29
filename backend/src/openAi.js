require("dotenv").config({ path: "../.env" });
const { postTweet } = require("./twitter"); // Make sure this path is correct
const express = require("express");
const router = express.Router();

console.log("Twitter API Key present:", !!process.env.TWITTER_API_KEY);

/**
 * AI content generation
 */
router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        if (!process.env.OPENROUTER_API_KEY) {
            return res.status(500).json({
                error: "API key not configured",
                reply: "Demo: Here's a sample post about '" + message + "' - Stay tuned for more updates! #socialmedia",
            });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "SocialScheduler",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat-v3.1:free",
                messages: [
                    {
                        role: "user",
                        content: `You are a social media content assistant. Help create engaging posts. User asks: ${message}`,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.choices && data.choices[0]) {
            res.json({
                reply: data.choices[0].message.content,
            });
        } else {
            res.status(500).json({ error: "No response from AI", details: data });
        }
    } catch (error) {
        console.error("Chat error:", error);
        res.json({
            reply: `I'd love to help you create content about "${req.body.message}"! Here's an idea:\n\n"Exciting news about ${req.body.message}! Follow for more updates. #content #socialmedia"`,
        });
    }
});

/**
 * Twitter posting route - ADD THIS
 */
router.post("/twitter", async (req, res) => {
    const { content } = req.body;
    
    console.log("🔧 Twitter route called with content:", content);
    console.log("🔧 API Key exists:", !!process.env.TWITTER_API_KEY);
    console.log("🔧 Access Token exists:", !!process.env.TWITTER_ACCESS_TOKEN);

    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    try {
        // Check if Twitter credentials are configured
        if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_ACCESS_TOKEN) {
            return res.status(500).json({ 
                error: "Twitter API not configured - check .env file",
                success: false 
            });
        }

        console.log("✅ Attempting to post tweet...");
        const tweet = await postTweet(content);
        console.log("✅ Tweet posted successfully:", tweet);
        
        res.json({ 
            success: true, 
            tweet,
            message: "Posted to Twitter/X successfully!" 
        });
    } catch (err) {
        console.error("❌ Twitter posting error:", err);
        res.status(500).json({ 
            error: err.message,
            success: false,
            details: "Check Twitter app permissions are 'Read and write'"
        });
    }
});

router.get("/twitter-test", async (req, res) => {
    try {
        const { TwitterApi } = require('twitter-api-v2');
        
        const client = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_SECRET,
        });

        // Test authentication by getting user info
        const user = await client.v2.me();
        res.json({ 
            success: true, 
            user: user.data,
            message: "Twitter authentication successful!" 
        });
    } catch (error) {
        res.json({ 
            success: false, 
            error: error.message,
            details: "Check permissions and tokens" 
        });
    }
});

module.exports = router;