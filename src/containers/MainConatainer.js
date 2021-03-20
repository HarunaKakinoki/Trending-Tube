import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import ReactCountryFlag from 'react-country-flag';
import axios from 'axios';
import { countryData } from '../data/data';
//import YoutubeApi, { baseParams } from '../api/youtube';
import { getUserLocation } from '../api/geoLocation';
import { doesDataExistInSessionStorage, saveDataToSessionStorage } from '../utils/util';
import {
    APP_TITLE, BASE_URL_TO_FETCH_VIDEOS,
    BASE_URL_TO_FETCH_CATEGORIES,
    GENERAL_LABEL,
    ERROR_MESSAGE_NO_COUNTRY_DATA,
    ERROR_MESSAGE_NO_INPUT, VIDEOS_KEY
} from '../data/constants';
import SearchForm from '../components/SearchForm/SearchForm';
import VideoContainer from './VideoContainer';
import styles from '../style/style.module.css';

class MainConatainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "", //Initally user's location.
            locationFullName: "",
            language: "",
            countryData: countryData,
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

    setInitialData = async () => {
        const userLocation = await getUserLocation();
        const userLanguage = window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage;
        const userLocationFullName = this.state.countryData.find(country => country.ISO === userLocation).Country;

        this.setState({
            location: userLocation,
            language: userLanguage,
            locationFullName: userLocationFullName
        }, () => this.setInitialVideoData());
    }

    //Fetch vidoe data thorugh youtube data api & set response as state & session storage.
    fetchVideosBasedOnCountry = () => {
        const countryCode =this.state.location;
        axios.get(`/api/initial`, {
            params: {
                regionCode: countryCode,
                hl: this.state.language
            }
        })
            .then(function (response) {
                console.log(response)
            });

        // const videoRequest = YoutubeApi.get(BASE_URL_TO_FETCH_VIDEOS, {
        //     params: {
        //         //...baseParams,
        //         regionCode: countryCode,
        //         hl: this.state.language,
        //         maxResults: 50,
        //         order: "viewCount",
        //         chart: "mostPopular",
        //     }
        // });

        // const categoryRequest = YoutubeApi.get(BASE_URL_TO_FETCH_CATEGORIES, {
        //     params: {
        //         ...baseParams,
        //         regionCode: countryCode,
        //         hl: this.state.language
        //     }
        // });

        // axios.all([videoRequest, categoryRequest]).then(axios.spread((...responses) => {
        //     const videoResponse = responses[0].data.items;
        //     const categoryRequest = responses[1].data.items;
        //     const locationFullName = this.state.countryData.find(country => country.ISO === countryCode).Country || countryCode;
        //     const videoData = videoResponse.map(video => {
        //         const categoryId = categoryRequest.find(category => category.id === video.snippet.categoryId).snippet.title;
        //         return { ...video, categoryName: categoryId };
        //     });

        //     this.setState({
        //         videos: videoData,
        //         isLoading: false,
        //         error: false,
        //         location: countryCode,
        //         label: GENERAL_LABEL + locationFullName,
        //         locationFullName
        //     });

        //     saveDataToSessionStorage(VIDEOS_KEY, { videos: videoData, countryCode, locationFullName });
        // })).catch(errors => {
        //     this.setState({ isLoading: false, error: true, errorMessage: ERROR_MESSAGE_NO_COUNTRY_DATA });
        // });
    }

    setInitialVideoData = () => {
        //When already feteched data exists on session storage, set them as state.
        if (doesDataExistInSessionStorage(VIDEOS_KEY)) {
            const { videos, countryCode, locationFullName } = JSON.parse(sessionStorage.getItem(VIDEOS_KEY));
            this.setState({
                videos: videos,
                label: GENERAL_LABEL + locationFullName,
                location: countryCode,
                locationFullName,
                isLoading: false,
                error: false
            });

            //Fetch video data by making an api call.
        } else {
            this.fetchVideosBasedOnCountry();
        }
    }

    handleFormSubmission = (e) => {
        e.preventDefault();

        //Reference to input element in a search form.
        const input = this.inputRef.current.value;

        if (input === "") {

            this.setState({ error: true, errorMessage: ERROR_MESSAGE_NO_INPUT });

        } else {

            this.setState({ userInput: this.inputRef.current.value, isLoading: true }, () => {
                const userInput = this.state.userInput;
                const selectedCountry = this.state.countryData.find(country => country.Country.toLowerCase() === userInput.toLowerCase());

                if (selectedCountry === undefined) {
                    this.setState({ isLoading: false, error: true, errorMessage: ERROR_MESSAGE_NO_COUNTRY_DATA });
                } else {
                    this.fetchVideosBasedOnCountry(selectedCountry.ISO);
                }
            });

        }
    }

    render() {
        const { isLoading, error, errorMessage, videos, label, location, locationFullName } = this.state;
        const videosToDispaly = videos.slice(0, 6); //Dispaly only 6 videos on index page.

        return (
            <div className={styles.mainContainer}>
                <h1><Link to="/">{APP_TITLE}</Link></h1>
                <SearchForm ref={this.inputRef} clickHandler={this.handleFormSubmission} />
                {

                    //When loading.
                    isLoading ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={50}
                            width={50} /> :

                        //When error happens.
                        error ?
                            <p>{errorMessage}</p> :

                            //When successfully load data.
                            <React.Fragment>
                                <p>{label}
                                    <ReactCountryFlag
                                        countryCode={location}
                                        svg
                                        style={{
                                            width: '2em',
                                            height: '2em',
                                            margin: '0.3em'
                                        }}
                                        title={locationFullName}
                                    /></p>
                                <VideoContainer videos={videosToDispaly} />

                                {/* Link to /all route*/}
                                <Link to={{ pathname: '/all', state: { videos, location, locationFullName } }}>
                                    <span className={styles.linkToAllVideos}>See all popular videos...</span>
                                </Link>
                            </React.Fragment>
                }
            </div>


        )
    }
}

export default MainConatainer
