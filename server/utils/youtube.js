require('dotenv').config();
const axios = require('axios');
const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.REACT_APP_API_KEY;

//axios settings.
const YoutubeApi = axios.create({
    baseURL: YOUTUBE_API_BASE_URL
});

const baseParams = {
    part: "snippet",
    key: API_KEY
};

module.exports = { YoutubeApi, baseParams };