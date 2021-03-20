const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const axios = require('axios');
const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL_TO_FETCH_VIDEOS = "/videos";
const BASE_URL_TO_FETCH_CATEGORIES = "/videoCategories";


//Serve files under the "build" folder.
app.use(express.static('build'));
app.listen(5000, () => {
  console.log('server is listening on port 3000!')
});

//axios settings.
const YoutubeApi = axios.create({
  baseURL: YOUTUBE_API_BASE_URL
});

const baseParams = {
  part: "snippet",
  key: API_KEY
};


app.get('/api/*', (req, res, next) => {
  const regionCode = req.query.regionCode;
  const hl = req.query.hl;

  //Video Request.
  const videoRequest = YoutubeApi.get(BASE_URL_TO_FETCH_VIDEOS, {
    params: {
      ...baseParams,
      regionCode,
      hl,
      maxResults: 50,
      order: "viewCount",
      chart: "mostPopular",
    }
  }, console.log('req body'));

  const categoryRequest = YoutubeApi.get(BASE_URL_TO_FETCH_CATEGORIES, {
    params: {
      ...baseParams,
      regionCode: regionCode,
      hl: hl
    }
  });

  axios.all([videoRequest, categoryRequest]).then(axios.spread((...responses) => {
    console.log(responses, 'res')
    const videoResponse = responses[0].data.items;
    const categoryRequest = responses[1].data.items;
    //const locationFullName = this.state.countryData.find(country => country.ISO === countryCode).Country || countryCode;
    const videoData = videoResponse.map(video => {
      const categoryId = categoryRequest.find(category => category.id === video.snippet.categoryId).snippet.title;
      return { ...video, categoryName: categoryId };
    });

    res.send({
      data: {
        videos: videoData,
        // isLoading: false,
        // error: false,
        location: regionCode,
        // label: GENERAL_LABEL + locationFullName,
        //locationFullName
      }
    });

    //saveDataToSessionStorage(VIDEOS_KEY, { videos: videoData, countryCode, locationFullName });
  })).catch(errors => {
    //this.setState({ isLoading: false, error: true, errorMessage: ERROR_MESSAGE_NO_COUNTRY_DATA });
    console.log(errors)
  });
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});