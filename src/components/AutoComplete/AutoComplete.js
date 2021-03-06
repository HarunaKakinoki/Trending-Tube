import React, { useState } from 'react';
import { countryData } from '../../data/data';

const AutoComplete = React.forwardRef((props, ref) => { {
    console.log("AUTOCOMPLNET RENDEr")
    const countryOptions = countryData.map(country => country.Country);
    const [userInput, setUserInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    
    const handleInputChange = (e) => {
        const term = e.target.value;
        setUserInput(term);
        setSuggestions(getSuggestionsFromInput(term));
    }

    const handleSuggestionClick = (e) => {
        setUserInput(e.target.innerText);
        setSuggestions([]);
    }

    const getSuggestionsFromInput = input => {
        if(input === "") {
            return [];
        }
        return countryOptions.filter(country => country.toLowerCase().includes(input.toLowerCase()));
    }

    return (
        <div>
            <input type="search" ref={ref} onChange={handleInputChange} value={userInput} required/>
            {suggestions.map(suggest => {
                return <div key={suggest} onClick={(e) => handleSuggestionClick(e)}>{suggest}</div>
            })}
        </div>
    )
}});

export default React.memo(AutoComplete);
