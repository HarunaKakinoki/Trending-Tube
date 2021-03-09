import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Video from '../components/Video/Video';

function VideoContainer({ videos }) {
    return (
            <Container fluid>
                <Row xs={1} md={2} lg={3} xl={3}>
                    {videos && videos.map((video, index) => {
                        return (
                            <Col><Video key={video.id} index={index + 1} id={video.id} data={video.snippet} category={video.categoryName} /></Col>
                        );
                    })}
                </Row>
            </Container>
    )
}

export default VideoContainer
