import React from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL_TO_YOUTUBE_VIDEOS } from '../utils/constants';

function AllVideosContainer() {
    const location = useLocation();
    const { videos } = location.state;

    return (
        <div>
            { videos &&
                <table>
                    <tbody>
                        {/* Headers */}
                        <tr>
                            <th>Ranking</th>
                            <th>Title</th>
                            <th>Thumbnail</th>
                            <th>Description</th>
                        </tr>

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
