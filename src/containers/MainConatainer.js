import React, { Component } from 'react';
import YoutubeApi from '../utils/api/Youtube';
import { getUserLocation } from '../utils/api/GeoLocation'; 
import SearchForm from '../components/SearchForm/SearchForm';
import VideoContainer from './VideoContainer';

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
        this.setUserLanguage();
        this.setUserLocation();
        //Fetch Youtube Video Data for the first render.
        // YoutubeApi.get("/search", { params: { q: 'japan' }}).then(res => {
        //     console.log(res)
        // })
        
    }
    
    setUserLocation = async() => {
        const countryCode = await getUserLocation();
        this.setState({ location: countryCode });
    }

    setUserLanguage = () => {
        //Get user's language from browser.
        const lang = window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage;
        this.setState({ language: lang });
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
