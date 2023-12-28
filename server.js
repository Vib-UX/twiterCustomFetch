const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(express.json());

const twitterToken = process.env.TWITTER_TOKEN;

app.get("/fetchTwitter/:twitter", async (req, res) => {
  //   console.log(twitterToken);
  try {
    const twitter = req.params.twitter;
    if (!twitter) {
      return res.status(400).send("Twitter username is not provided");
    }

    let username = twitter.replace(
      /^(https?:\/\/)?(www\.)?twitter\.com\//i,
      ""
    );
    username = username.replace(/\/+$/, "");
    let url = `https://api.twitter.com/2/users/by/username/${username}`;

    console.log("Requesting URL:", url);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${twitterToken}`,
      },
    });

    console.log("Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error fetching Twitter data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
