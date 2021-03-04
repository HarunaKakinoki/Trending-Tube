import React, { Component } from 'react';
import Loader from "react-loader-spinner";
import YoutubeApi from '../utils/api/Youtube';
import { getUserLocation } from '../utils/api/GeoLocation';
import { getCountryDataFromFile, doesDataExistInLocalStorage } from '../utils/util';
import SearchForm from '../components/SearchForm/SearchForm';
import VideoContainer from './VideoContainer';
import { COUNTRY_DATA_KEY, BASE_URL_TO_FETCH_VIDEOS } from '../utils/constants';

class MainConatainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "",
            language: "",
            countryBasicData: [],
            videos: [],
            userInput: "",
            error: false,
            isLoading: false
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
                countryData = await getCountryDataFromFile();
                localStorage.setItem(COUNTRY_DATA_KEY, JSON.stringify(countryData));
            }
        } else {
            countryData = await getCountryDataFromFile();
        }

        this.setState({
            countryBasicData: countryData,
            location: userLocation,
            language: userLanguage,
            isLoading: true
        }, () => this.fetchInitialYoutubeVideos());
    }

    fetchInitialYoutubeVideos = () => {
            //Fetch Proper Videos based on user's location.
            YoutubeApi.get(`${BASE_URL_TO_FETCH_VIDEOS}?order=viewCount&chart=mostPopular&regionCode=${this.state.location}&hl=${this.state.language}`).then(res => {
                this.setState({ videos: res.data.items, isLoading: false, error: false });
            }).catch(err => this.setState({ isLoading: false, error: true }));
    }

    handleFormSubmission = (e) => {
        e.preventDefault();

        this.setState({ userInput: this.inputRef.current.value, isLoading: true }, () => {
            const userInput = this.state.userInput;
            const selectedCountry = this.state.countryBasicData.find(country => country.Country.toLowerCase() === userInput.toLowerCase());

            if (selectedCountry === undefined) {
                this.setState({ isLoading: false, error: true });
            } else {
                //Fetch videos based on user input.
                YoutubeApi.get(`${BASE_URL_TO_FETCH_VIDEOS}?order=viewCount&chart=mostPopular&regionCode=${selectedCountry.ISO}&hl=${this.state.language}`).then(res => {
                    this.setState({ videos: res.data.items, isLoading: false, error: false });
                }).catch(err => this.setState({ isLoading: false, error: true }));
            }

        });
    }

    render() {
        const { isLoading, error, videos } = this.state;
        return (
            <div>
                <h2>Most-viewed</h2>
                <SearchForm ref={this.inputRef} clickHandler={this.handleFormSubmission} />
                {isLoading ?
                     <Loader
                     type="ThreeDots"
                     color="#00BFFF"
                     height={100}
                     width={100}
                   /> :
                    error ? 
                    <p>Error</p> :
                    <VideoContainer videos={videos} />
                }
            </div>
        )
    }
}

export default MainConatainer
