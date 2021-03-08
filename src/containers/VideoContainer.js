import React from 'react';
import Video from '../components/Video/Video';

function VideoContainer({ videos }) {
    return (
        <div>
            {videos && videos.map((video, index) => {
                return <Video key={video.id} videoId={video.id} category={video.categoryName} data={video.snippet} index={index+1}/>;
            })}
        </div>
    )
}

export default VideoContainer
