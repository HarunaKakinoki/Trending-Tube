import React from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { APP_TITLE, BASE_URL_TO_YOUTUBE_VIDEOS } from '../data/constants';

function AllVideosContainer() {
    let videos;
    const history = useHistory();
    const location = useLocation();

    //Restrict accessing /all page before loading video data.
    if (history.location.state === undefined) {
        history.push("/");
    } else {
        videos = location.state.videos;
    }

    return (
        <div>
            <Link to="/">{APP_TITLE}</Link>
            <h2>TOP 50 Trending Videos in Korea</h2>
            { videos &&
                <table>

                    {/* Headers */}
                    <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Title</th>
                        <th>Thumbnail</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* Records */}
                        {
                            videos.map((data, index) => {
                                const videoId = data.id;
                                const video = data.snippet;
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td ><a href={`${BASE_URL_TO_YOUTUBE_VIDEOS}${videoId}`} target="_blank" rel="noopener noreferrer">{video.title}</a></td>
                                        <td><a href={`${BASE_URL_TO_YOUTUBE_VIDEOS}${videoId}`} target="_blank" rel="noopener noreferrer"><img src={video.thumbnails.default.url} alt="thumnail-image" /></a></td>
                                        <td>{video.description}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default AllVideosContainer
