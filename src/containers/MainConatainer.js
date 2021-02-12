import React, { Component } from 'react';
import YoutubeApi from '../utils/api/Youtube';
import { getUserLocation } from '../utils/api/GeoLocation';
import { getLanguageDataByCountry } from '../utils/util'; 
import SearchForm from '../components/SearchForm/SearchForm';
import VideoContainer from './VideoContainer';

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
        
        //Fetch Youtube Video Data for the first render.
        // YoutubeApi.get("/search", { params: { q: 'japan' }}).then(res => {
        //     console.log(res)
        // })
        
    }

    setInitialData = async () => {
        const languageData = await getLanguageDataByCountry();
        const userLocation = await getUserLocation();
        const userLanguage = window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage;

        this.setState({
            countryLanguages: languageData,
            location: userLocation,
            language: userLanguage
        });
    }

    // setCountryLaunguageData = async() => {
    //     const data = await getLanguageDataByCountry();s
    //     this.setState({ countryLanguages: data});
    // }

    // setUserLocation = async() => {
       
    //     this.setState({ location: countryCode });
    // }

    // setUserLanguage = () => {
     
    //     this.setState({ language: lang });
    // }

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
