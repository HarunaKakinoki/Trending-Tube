import React, { useEffect } from 'react'
import Video from '../components/Video/Video';

function VideoContainer({ videos }) {
    return (
        <div>
            {videos && videos.map(video => {
                return <Video key={video.id} videoId={video.id} data={video.snippet}/>;
            })}
        </div>
    )
}

export default VideoContainer
