import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AllVideosContainer() {
    const location = useLocation();
    const { videos } = location.state;
    
    useEffect(() => {
       console.log(videos)
      }, [videos]);

    return (
        <div>
            { videos &&
                <table>
                    <tbody>
                        {/* Headers */}
                        <tr>
                            <th>Ranking</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Description</th>
                        </tr>

                        {/* Records */}
                        {
                            videos.map((video, index) => {
                                return (
                                    <tr key={index}>
                                    <td >{video.snippet.title}</td>
                                    
                                    </tr>
                                    )
                            })
                        }
                    </tbody>
                </table> 
            }
        </div>
    )
}

export default AllVideosContainer
