import React from 'react';
import styles from '../../style/style.module.css';
import { BASE_URL_TO_YOUTUBE_VIDEOS } from '../../data/constants';

function Video({data, videoId, category, index}) {
    const url = `${BASE_URL_TO_YOUTUBE_VIDEOS}${videoId}`
    console.log(data)
    return (
        <div className={styles.test}>
            <iframe src={url} title={data.title}></iframe>
            <p>{index} : {data.title}</p>
            <p>Category: {category}</p>
        </div>
    )
}

export default Video
