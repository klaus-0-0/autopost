// backend/twitter.js
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function postTweet(content) {
  try {
    console.log("Attempting to tweet:", content);
    const tweet = await client.v2.tweet(content);
    console.log("Tweet successful:", tweet);
    return tweet;
  } catch (error) {
    console.error("Twitter API error:", error);
    throw new Error(`Twitter API error: ${error.message}`);
  }
}

module.exports = { postTweet };