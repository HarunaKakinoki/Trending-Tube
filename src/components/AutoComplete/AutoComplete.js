import React, { useState } from 'react';
import { countryData } from '../../data/data';

const AutoComplete = React.forwardRef((props, ref) => { {
    const countryOptions = countryData.map(country => country.Country);
    const [userInput, setUserInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    
    const handleInputChange = (e) => {
        const term = e.target.value;
        setUserInput(term);
        setSuggestions(filterInput(term));
    }

    const handleSuggestionClick = (e) => {
        setUserInput(e.target.innerText);
        setSuggestions([]);
    }

    const filterInput = input => {
        if(input === "") {
            return [];
        }

        const suggestions = countryOptions.filter(country => {
            return country.toLowerCase().includes(input.toLowerCase());
        });
        return suggestions;
    }

    return (
        <div>
            <input type="search" ref={ref} onChange={handleInputChange} value={userInput}/>
            {suggestions.map(suggest => {
                return <div key={suggest} onClick={(e) => handleSuggestionClick(e)}>{suggest}</div>
            })}
        </div>
    )
}});

export default AutoComplete
