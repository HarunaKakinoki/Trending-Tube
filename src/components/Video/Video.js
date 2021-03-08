import React from 'react';
import styles from '../../style/style.module.css';
import { BASE_URL_TO_YOUTUBE_VIDEOS } from '../../data/constants';

function Video({data, videoId, index}) {
    const url = `${BASE_URL_TO_YOUTUBE_VIDEOS}${videoId}`
  
    return (
        <div className={styles.test}>
            <iframe src={url} title={data.title}></iframe>
            <p>{index} : {data.title}</p>
        </div>
    )
}

export default Video
