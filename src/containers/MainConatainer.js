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
            languageData = JSON.stringify(languageData); //Convert object to JSON.
            saveDataToLocalStorage(LANGUAGE_DATA_KEY, languageData);
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
        //Fetch which regions are available on Youtube.
        // YoutubeApi.get("/i18nRegions", { params: { }}).then(res => {
        //     //Check languages used in each country & stored them onto localsotrage.
        //     if(res) {
        //         console.log()
        //     }
        // });
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
