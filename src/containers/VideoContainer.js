import React from 'react';
import Video from '../components/Video/Video';

function VideoContainer({ videos }) {
    return (
        <div>
            {videos && videos.map((video, index) => {
                return <Video key={video.id} index={index+1} id={video.id} data={video.snippet} category={video.categoryName}/>;
            })}
        </div>
    )
}

export default VideoContainer
