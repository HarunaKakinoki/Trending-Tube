import React, { Component } from 'react';
import YoutubeApi from '../api/Youtube';
import SearchForm from '../components/SearchForm/SearchForm';
import VideoContainer from './VideoContainer'

class MainConatainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "",
            language: "",
            fetchedData: [],
            userInput: ""
        }

         //Ref to the form input.
         this.inputRef = React.createRef();
    }

    componentDidMount() {
        //Fetch Youtube Video Data for the first render.
        YoutubeApi.get("/search", { params: { q: 'japan' }}).then(res => {
            console.log(res)
        })
    }

    getUserLocation = () => {
        //Get user's location from google geo location.
    }

    getUserLanguage = () => {
        //Get user's language from browser.
    }
    
    handleFormSubmission = (e) => {
        e.preventDefault();
        this.setState({ userInput: this.inputRef.current.value});
    }

    render() {
        return (
            <div>
                <h2>Most-viewed</h2>
                <VideoContainer />
                <SearchForm ref={this.inputRef} clickHandler={this.handleFormSubmission}/>
            </div>
        )
    }
}

export default MainConatainer
