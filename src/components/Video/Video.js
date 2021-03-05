import React from 'react';
import { BASE_URL_TO_YOUTUBE_VIDEOS } from '../../utils/constants';

function Video({data, videoId}) {
    const url = `${BASE_URL_TO_YOUTUBE_VIDEOS}${videoId}`
  
    return (
        <React.Fragment>
            <iframe src={url} title={data.title}></iframe>
            {data.title}
        </React.Fragment>
    )
}

export default Video
