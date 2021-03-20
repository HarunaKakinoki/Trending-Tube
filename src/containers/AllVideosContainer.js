import React from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';
import { APP_TITLE, BASE_URL_TO_YOUTUBE_VIDEOS } from '../data/constants';
import ScrollToTop from '../components/ScrollToTop';
import styles from '../style/style.module.css';

function AllVideosContainer() {
    let videos, countryCode, countryFullName;
    const history = useHistory();
    const location = useLocation();
    const countryFlagStyle = { width: '2em', height: '2em', margin: '0.3em' };

    //Restrict accessing /all page before loading video data.
    if (history.location.state === undefined) {
        history.push("/");
    } else {
        videos = location.state.videos;
        countryCode = location.state.locationCode;
        countryFullName = location.state.locationName
    }

    return (
        <div className={styles.allVideos}>
            <div className={styles.allVideosHeader}>
                <h1><Link to="/">{APP_TITLE}</Link></h1>
                <p>TOP 50 Trending Videos in {countryFullName}
                    <ReactCountryFlag
                        countryCode={countryCode}
                        svg
                        style={countryFlagStyle}
                        title={countryFullName} />
                </p>
            </div>
            { videos &&
                <Table variant="primary" responsive striped>
                    {/* Headers */}
                    <thead>
                        <tr>
                            <th><ReactCountryFlag
                                countryCode={countryCode}
                                svg
                                style={countryFlagStyle}
                                title={countryFullName}
                            /></th>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Channel Title</th>
                            <th>Category</th>
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
                                        <td className={styles.rank}>{index + 1}</td>
                                        <td className={styles.thumnail}><a href={`${BASE_URL_TO_YOUTUBE_VIDEOS}${id}`} target="_blank" rel="noopener noreferrer"><img src={video.thumbnails.default.url} alt="thumnail-image" /></a></td>
                                        <td className={styles.title}><a href={`${BASE_URL_TO_YOUTUBE_VIDEOS}${id}`} target="_blank" rel="noopener noreferrer">{video.localized.title}</a></td>
                                        <td>{video.channelTitle}</td>
                                        <td className={styles.category}>{categoryName}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            }
            <ScrollToTop />
        </div>
    )
}

export default AllVideosContainer
