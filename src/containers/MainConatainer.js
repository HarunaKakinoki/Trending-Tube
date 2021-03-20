import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import ReactCountryFlag from 'react-country-flag';
import axios from 'axios';
import { countryData } from '../data/data';
import { getUserLocation } from '../api/geoLocation';
import { doesDataExistInSessionStorage, saveDataToSessionStorage } from '../utils/util';
import { APP_TITLE, HEADER_LABEL, ERROR_MESSAGE_NO_COUNTRY_DATA, ERROR_MESSAGE_NO_INPUT, VIDEOS_KEY } from '../data/constants';
import SearchForm from '../components/SearchForm/SearchForm';
import VideoContainer from './VideoContainer';
import styles from '../style/style.module.css';

class MainConatainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationCode: "", //Initally user's locationCode.
            locationName: "",
            language: "",
            countryData: countryData,
            videos: [],
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
            locationCode: userLocation,
            language: userLanguage,
            locationName: userLocationFullName
        }, () => this.setInitialVideoData());
    }

    //Fetch vidoe data thorugh youtube data api & set response as state & session storage.
    fetchVideosBasedOnCountry = () => {
        const { locationCode, locationName, language } = this.state;

        axios.get(`/api/videos`, {
            params: {
                regionCode: locationCode,
                hl: language
            }

        }).then((res) => {
            this.setState({
                videos: res.data.videos,
                isLoading: false,
                error: false,
                label: HEADER_LABEL + locationName,
            });
            saveDataToSessionStorage(VIDEOS_KEY, { videos: res.data.videos, locationCode: this.state.locationCode, locationName: this.state.locationName });
        
        }).catch(err => {
            this.setState({ isLoading: false, error: true, errorMessage: ERROR_MESSAGE_NO_COUNTRY_DATA });
        });
    }

    setInitialVideoData = () => {
        //When already feteched data exists on session storage, set them as state.
        if (doesDataExistInSessionStorage(VIDEOS_KEY)) {
            const { videos, locationCode, locationName } = JSON.parse(sessionStorage.getItem(VIDEOS_KEY));
            this.setState({
                videos: videos,
                label: HEADER_LABEL + locationName,
                locationCode,
                locationName,
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
            const selectedCountry = this.state.countryData.find(country => country.Country.toLowerCase() === input.toLowerCase());
            if (selectedCountry === undefined) {
                this.setState({ isLoading: false, error: true, errorMessage: ERROR_MESSAGE_NO_COUNTRY_DATA });
            } else {
                const locationName = this.state.countryData.find(country => country.ISO === selectedCountry.ISO).Country || selectedCountry.ISO;
                this.setState({ isLoading: true, locationCode: selectedCountry.ISO, locationName: locationName }, () => this.fetchVideosBasedOnCountry());
            }
        }
    }

    render() {
        const { isLoading, error, errorMessage, videos, label, locationCode, locationName } = this.state;
        const videosToDisplay = videos.slice(0, 6); //Display only 6 videos.
       
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
                                        locationCode={locationCode}
                                        svg
                                        style={{
                                            width: '2em',
                                            height: '2em',
                                            margin: '0.3em'
                                        }}
                                        title={locationName}
                                    /></p>
                                <VideoContainer videos={videosToDisplay} />

                                {/* Link to /all route*/}
                                <Link to={{ pathname: '/all', state: { videos, locationCode, locationName } }}>
                                    <span className={styles.linkToAllVideos}>See all popular videos...</span>
                                </Link>
                            </React.Fragment>
                }
            </div>


        )
    }
}

export default MainConatainer
