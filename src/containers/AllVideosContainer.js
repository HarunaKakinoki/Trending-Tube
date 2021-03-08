import React from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { APP_TITLE, BASE_URL_TO_YOUTUBE_VIDEOS } from '../data/constants';
import styles from '../style/style.module.css';

function AllVideosContainer() {
    let videos, countryCode, countryFullName;
    const history = useHistory();
    const location = useLocation();

    //Restrict accessing /all page before loading video data.
    if (history.location.state === undefined) {
        history.push("/");
    } else {
        videos = location.state.videos;
        countryCode = location.state.location || "Rank";
        countryFullName = location.state.locationFullName
    }

    return (
        <div className={styles.allVideos}>
            <div className={styles.allVideosHeader}>
                <h1><Link to="/">{APP_TITLE}</Link></h1>
                <h2>TOP 50 Trending Videos in {countryFullName}</h2>
            </div>
            { videos &&
                <table className={styles.videosTable}>

                    {/* Headers */}
                    <thead>
                        <tr>
                            <th><ReactCountryFlag
                                countryCode={countryCode}
                                svg
                                style={{
                                    width: '2em',
                                    height: '2em',
                                }}
                                title={countryFullName}
                            /></th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Thumbnail</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Records */}
                        {
                            videos.map((data, index) => {
                                const { id, categoryName } = data;
                                const video = data.snippet;

                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td ><a href={`${BASE_URL_TO_YOUTUBE_VIDEOS}${id}`} target="_blank" rel="noopener noreferrer">{video.title}</a></td>
                                        <td>{categoryName}</td>
                                        <td><a href={`${BASE_URL_TO_YOUTUBE_VIDEOS}${id}`} target="_blank" rel="noopener noreferrer"><img src={video.thumbnails.default.url} alt="thumnail-image" /></a></td>
                                        <td>{video.description}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            }
            {/* Button to go back to top */}
            <button onclick="topFunction()">Go</button>
        </div>
    )
}

export default AllVideosContainer
