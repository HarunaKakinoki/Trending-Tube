import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import ReactCountryFlag from 'react-country-flag';

import YoutubeApi, { baseParams } from '../api/youtube';
import { getUserLocation } from '../api/geoLocation';
import { doesDataExistInSessionStorage, saveDataToSessionStorage } from '../utils/util';
import SearchForm from '../components/SearchForm/SearchForm';
import VideoContainer from './VideoContainer';
import { countryData } from '../data/data';
import { APP_TITLE, BASE_URL_TO_FETCH_VIDEOS, GENERAL_LABEL, ERROR_MESSAGE_NO_COUNTRY_DATA, ERROR_MESSAGE_NO_INPUT, VIDEOS_KEY } from '../data/constants';

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
    fetchVideosBasedOnCountry = (countryCode) => {
        YoutubeApi.get(`${BASE_URL_TO_FETCH_VIDEOS}`, {
            params: {
                ...baseParams,
                regionCode: countryCode,
                hl: this.state.language
            }
        })
            .then(res => {
                let locationFullName = this.state.countryData.find(country => country.ISO === countryCode).Country || countryCode;
                this.setState({
                    videos: res.data.items,
                    isLoading: false,
                    error: false,
                    location: countryCode,
                    label: GENERAL_LABEL + locationFullName
                });

                saveDataToSessionStorage(VIDEOS_KEY, { videos: res.data.items, countryCode, locationFullName });
            })
            .catch(err => this.setState({ isLoading: false, error: true, errorMessage: ERROR_MESSAGE_NO_COUNTRY_DATA }));
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

            //Fetch video data by making api call.
        } else {
            this.fetchVideosBasedOnCountry(this.state.location);
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
        const { isLoading, error, errorMessage, videos, label } = this.state;
        const videosToDispaly = videos.slice(0, 5); //Dispaly only 5 videos on index page.

        return (
            <div>
                <h1><Link to="/">{APP_TITLE}</Link></h1>
                <SearchForm ref={this.inputRef} clickHandler={this.handleFormSubmission} />
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
                            {label}
                            <ReactCountryFlag
                                countryCode={this.state.location}
                                svg
                                style={{
                                    width: '2em',
                                    height: '2em',
                                }}
                                title="US"
                            />
                            <VideoContainer videos={videosToDispaly} />
                            <Link to={{
                                pathname: '/all',
                                state: { videos: videos }
                            }}> See all popular videos...</Link>
                        </React.Fragment>
                }
            </div>


        )
    }
}

export default MainConatainer
