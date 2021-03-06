import React from 'react';
import Video from '../components/Video/Video';

function VideoContainer({ videos }) {
    console.log("VIDEOS render")
    return (
        <div>
            {videos && videos.map(video => {
                return <Video key={video.id} videoId={video.id} data={video.snippet}/>;
            })}
        </div>
    )
}

export default VideoContainer
