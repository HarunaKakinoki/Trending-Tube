import React, { useState } from 'react';
import { countryData } from '../../data/data';
import styles from '../../style/style.module.css';

const AutoComplete = React.forwardRef((props, ref) => { {
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
        <div className={styles.autocomplete}>
            <input type="search" ref={ref} onChange={handleInputChange} value={userInput} required/>
            <div className={styles.autocompleteList} onClick={(e) => handleSuggestionClick(e)}>
                {suggestions.map(suggest => {
                    return <div className={styles.suggestions} key={suggest} >{suggest}</div>
                })}
            </div>
        </div>
    )
}});

export default React.memo(AutoComplete);
