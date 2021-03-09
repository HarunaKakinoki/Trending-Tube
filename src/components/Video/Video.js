import React from 'react';
import styles from '../../style/style.module.css';
import { BASE_URL_TO_YOUTUBE_VIDEOS } from '../../data/constants';

function Video({ index, id, data, category }) {
    const url = `${BASE_URL_TO_YOUTUBE_VIDEOS}${id}`;

    return (
        <div className={styles.video}>
            <p> {index} : {data.localized.title}</p>
            <iframe src={url} title={data.localized.title}></iframe>
            <p>Category : {category}</p>
        </div>
    )
}

export default Video
