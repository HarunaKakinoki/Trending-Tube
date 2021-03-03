import React, { Component } from 'react';
import YoutubeApi from '../utils/api/Youtube';
import { getUserLocation } from '../utils/api/GeoLocation';
import { getLanguageDataByCountry, doesDataExistInLocalStorage } from '../utils/util';
import SearchForm from '../components/SearchForm/SearchForm';
import VideoContainer from './VideoContainer';
import { COUNTRY_DATA_KEY } from '../utils/constants';

class MainConatainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "",
            language: "",
            countryBasicData: [],
            initialVideos: [],
            userInput: ""
        }

        //Ref to the form input.
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.setInitialData();
    }

    setInitialData = async () => {
        let countryData = [];
        const userLocation = await getUserLocation();
        const userLanguage = window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage;

        //Check browser support local storage or not.
        if (typeof localStorage) {
            //Check if language data already stored in local storage.
            if (doesDataExistInLocalStorage(COUNTRY_DATA_KEY)) {
                countryData = JSON.parse(localStorage.getItem(COUNTRY_DATA_KEY));
            } else {
                countryData = await getLanguageDataByCountry();
                localStorage.setItem(COUNTRY_DATA_KEY, JSON.stringify(countryData));
            }
        } else {
            countryData = await getLanguageDataByCountry();
        }

        this.setState({
            countryBasicData: countryData,
            location: userLocation,
            language: userLanguage
        }, () => this.fetchInitialYoutubeVideos());
    }

    fetchInitialYoutubeVideos = () => {
        const BASE_URL_TO_FETCH_VIDEOS = "/videos";
        
        //Fetch Proper Videos based on user's location.
        YoutubeApi.get(`${BASE_URL_TO_FETCH_VIDEOS}?order=viewCount&chart=mostPopular&snippet&regionCode=${this.state.location}&hl=${this.state.language}`).then(res => {
            this.setState({ initialVideos: res.data.items });
        });
    }

    handleFormSubmission = (e) => {
        e.preventDefault();
        this.setState({ userInput: this.inputRef.current.value });
    }

    render() {
        return (
            <div>
                <h2>Most-viewed</h2>
                <VideoContainer videos={this.state.initialVideos}/>
                <SearchForm ref={this.inputRef} clickHandler={this.handleFormSubmission} />
            </div>
        )
    }
}

export default MainConatainer
