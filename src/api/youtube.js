import axios from 'axios';
import { YOUTUBE_API_BASE_URL } from '../data/constants';

const API_KEY = process.env.REACT_APP_API_KEY;

export default axios.create({
    baseURL: YOUTUBE_API_BASE_URL
});

export const baseParams = {
    part: "snippet",
    maxResults: 50,
    order: "viewCount",
    chart: "mostPopular",
    key: API_KEY
  };