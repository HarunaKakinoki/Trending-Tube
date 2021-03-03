import React from 'react'

function Video({data, videoId}) {
    const VIDEO_BASE_URL = `https://www.youtube.com/embed/`;
    const url = `${VIDEO_BASE_URL}${videoId}`
  
    return (
        <React.Fragment>
            <iframe src={url} title={data.title}></iframe>
            {data.title}
        </React.Fragment>
    )
}

export default Video
