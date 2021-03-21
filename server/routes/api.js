const axios = require('axios');
const express = require('express');
const router = express();
const youtube = require('../utils/youtube');
const BASE_URL_TO_FETCH_VIDEOS = "/videos";
const BASE_URL_TO_FETCH_CATEGORIES = "/videoCategories";


//Make an api call to Youtube Data API.
router.get('/', (req, res) => {
    const { regionCode, hl } = req.query;

    const videoRequest = youtube.YoutubeApi.get(BASE_URL_TO_FETCH_VIDEOS, {
        params: {
            ...youtube.baseParams,
            regionCode,
            hl,
            maxResults: 50,
            order: "viewCount",
            chart: "mostPopular",
        }
    });

    const categoryRequest = youtube.YoutubeApi.get(BASE_URL_TO_FETCH_CATEGORIES, {
        params: {
            ...youtube.baseParams,
            regionCode,
            hl
        }
    });

    axios.all([videoRequest, categoryRequest]).then(axios.spread((...responses) => {
        const videoResponse = responses[0].data.items;
        const categoryRequest = responses[1].data.items;
        const videoData = videoResponse.map(video => {
            const categoryId = categoryRequest.find(category => category.id === video.snippet.categoryId).snippet.title;
            return { ...video, categoryName: categoryId };
        });

        res.send({ videos: videoData });

    })).catch(err => {
        res.status(500);
        res.send(err);
    });
})


module.exports = router;
