import React, { Component } from 'react'
import VideoContainer from './VideoContainer'

class MainConatainer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            location: "",
            language: "",
            fetchedData: []
        }
    }


    componentDidMount() {
        //Fetch Youtube Video Data.
    }

    getUserLocation = () => {
        //Get user's location from google geo location.
    }

    getUserLanguage = () => {
        //Get user's language from browser.
    }
    
    render() {
        return (
            <div>
                <h2>Most-viewed</h2>
                <VideoContainer />
                <form>
                    <input type="search" />
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}

export default MainConatainer
