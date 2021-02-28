import React, { Component } from 'react';
import YoutubeApi from '../utils/api/Youtube';
import { getUserLocation } from '../utils/api/GeoLocation';
import { getLanguageDataByCountry, saveDataToLocalStorage, doesDataExistInLocalStorage } from '../utils/util'; 
import SearchForm from '../components/SearchForm/SearchForm';
import VideoContainer from './VideoContainer';
import { LANGUAGE_DATA_KEY } from '../utils/constants';
import Youtube from '../utils/api/Youtube';

class MainConatainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "",
            language: "",
            countryLanguages: [],
            fetchedData: [],
            userInput: ""
        }

         //Ref to the form input.
         this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.setInitialData();
    }

    setInitialData = async () => {
        let languageData = [];
        const userLocation = await getUserLocation();
        const userLanguage = window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage;
        
        //Check if language data already stored in local storage.
        if(doesDataExistInLocalStorage(LANGUAGE_DATA_KEY)) {
            languageData = JSON.parse(localStorage.getItem(LANGUAGE_DATA_KEY));
        } else {
            languageData = await getLanguageDataByCountry();
            saveDataToLocalStorage(LANGUAGE_DATA_KEY, JSON.stringify(languageData));
        }

        this.setState({
            countryLanguages: languageData,
            location: userLocation,
            language: userLanguage
        }, () => this.fetchInitialYoutubeVideos());
    }

    getLanguages = () => {
      
    }

    fetchInitialYoutubeVideos = () => {
        console.log(this.state.countryLanguages)
        const languagesBasedOnLocaiton = this.state.countryLanguages.filter(country => country.ISO === this.state.location) || [window.navigator.browserLanguage];
        const isUserLanguageIncluded = languagesBasedOnLocaiton.find(language => language.Languages === this.state.language);
        const BASE_URL_TO_FETCH_VIDEOS = "/videos?order=viewCount&chart=mostPopular&type=video";
        console.log(languagesBasedOnLocaiton)
        console.log(this.state.language)
        //Fetch Proper Videos based on user's location.
        // YoutubeApi.get(`${BASE_URL_TO_FETCH_VIDEOS}&regionCode=${this.state.location}`).then(res => {
            
        // });

       languagesBasedOnLocaiton.map(language => {
            YoutubeApi.get(`${BASE_URL_TO_FETCH_VIDEOS}&hl=${language}`).then(res => {
                //console.log(res, 'based on language');
            });
       })
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
