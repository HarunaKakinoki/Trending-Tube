import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import YoutubeApi from '../utils/api/Youtube';
import { getUserLocation } from '../utils/api/GeoLocation';
import { doesDataExistInSessionStorage } from '../utils/util';
import SearchForm from '../components/SearchForm/SearchForm';
import VideoContainer from './VideoContainer';
import { BASE_URL_TO_FETCH_VIDEOS, VIDEOS_KEY } from '../utils/constants';
import { countryData } from '../data/data';

class MainConatainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "",
            locationFullName: "",
            language: "",
            countryBasicData: countryData,
            videos: [],
            userInput: "",
            error: false,
            errorMessage: "",
            isLoading: true,
            label: ""
        }

        //Ref to the form input.
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.setInitialData();
    }

    componentWillUnmount() {
        console.log("will unmount")
    }

    setInitialData = async () => {
        const userLocation = await getUserLocation();
        const userLanguage = window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage;

        //Check browser support local storage or not.
        // if (typeof localStorage) {
        //     //Check if language data already stored in local storage.
        //     if (doesDataExistInSessionStorage(COUNTRY_DATA_KEY)) {
        //         countryData = JSON.parse(localStorage.getItem(COUNTRY_DATA_KEY));
        //     } else {
        //         //countryData = await getCountryDataFromFile();
        //         localStorage.setItem(COUNTRY_DATA_KEY, JSON.stringify(countryData));
        //     }
        // } else {
        //     //countryData = await getCountryDataFromFile();
        // }

        const userLocationFullName = this.state.countryBasicData.find(country => country.ISO === userLocation).Country;

        this.setState({
            location: userLocation,
            language: userLanguage,
            userLocationFullName
        }, () => this.fetchInitialYoutubeVideos());
    }

    fetchInitialYoutubeVideos = () => {
        if (doesDataExistInSessionStorage(VIDEOS_KEY)) {
            const videos = JSON.parse(sessionStorage.getItem(VIDEOS_KEY));
            this.setState({ videos: videos, isLoading: false, error: false});
        } else {
            //Fetch Proper Videos based on user's location.
            YoutubeApi.get(`${BASE_URL_TO_FETCH_VIDEOS}?order=viewCount&chart=mostPopular&regionCode=${this.state.location}&hl=${this.state.language}&maxResults=200`).then(res => {
                this.setState({ videos: res.data.items, isLoading: false, error: false, label: `Most popular videos in your location ${this.state.userLocationFullName}` });
                if (typeof sessionStorage) {
                    sessionStorage.setItem(VIDEOS_KEY, JSON.stringify(res.data.items));
                }
            }).catch(err => this.setState({ isLoading: false, error: true }));
        }
    }

    handleFormSubmission = (e) => {
        e.preventDefault();
        const input = this.inputRef.current.value;
       
        if(input === "") {
            console.log("yes")
            this.setState({ error: true, errorMessage: "Please enter correct country name."});
        } else {
            this.setState({ userInput: this.inputRef.current.value, isLoading: true }, () => {
                const userInput = this.state.userInput;
                const selectedCountry = this.state.countryBasicData.find(country => country.Country.toLowerCase() === userInput.toLowerCase());
    
                if (selectedCountry === undefined) {
                    this.setState({ isLoading: false, error: true });
                } else {
                    //Fetch videos based on user input.
                    YoutubeApi.get(`${BASE_URL_TO_FETCH_VIDEOS}?order=viewCount&chart=mostPopular&regionCode=${selectedCountry.ISO}&hl=${this.state.language}&maxResults=200`).then(res => {
                        const userLocationFullName = this.state.countryBasicData.find(country => country.ISO === selectedCountry.ISO).Country;
                        this.setState({ videos: res.data.items, isLoading: false, error: false, label: `Most Popular videos in ${userLocationFullName}` });
                        if (typeof sessionStorage) {
                            sessionStorage.setItem(VIDEOS_KEY, JSON.stringify(res.data.items));
                        }
                    }).catch(err => this.setState({ isLoading: false, error: true }));
                }
    
            });
        }
    }

    render() {
        console.log("Main render")
        const { isLoading, error, errorMessage, videos, label } = this.state;
        const videosToDispaly = videos.slice(0, 5); //Dispaly only 5 videos on index page.

        return (
            <div>
                <Link to="/">Most-Viewed</Link>
                <SearchForm ref={this.inputRef} clickHandler={this.handleFormSubmission} />
                {label}
                {isLoading ?
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    /> :
                    error ?
                        <p>{errorMessage}</p> :
                        <React.Fragment>
                            <VideoContainer videos={videosToDispaly} />
                            <Link to={{
                                pathname: '/all',
                                state: { videos: this.state.videos }
                            }}> See all popular videos...</Link>
                        </React.Fragment>
                }
            </div>


        )
    }
}

export default MainConatainer
