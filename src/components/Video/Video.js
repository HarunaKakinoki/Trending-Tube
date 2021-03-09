import React from 'react';
import styles from '../../style/style.module.css';
import { BASE_URL_TO_YOUTUBE_VIDEOS } from '../../data/constants';

function Video({data, id, index}) {
    const url = `${BASE_URL_TO_YOUTUBE_VIDEOS}${id}`
  
    return (
        <div className={styles.test}>
            <iframe src={url} title={data.localized.title}></iframe>
            <p>{index} : {data.localized.title}</p>
        </div>
    )
}

export default Video
