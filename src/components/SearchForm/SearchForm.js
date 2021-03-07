import React from 'react';
import AutoComplete from '../AutoComplete/AutoComplete';

const SearchForm = React.forwardRef((props, ref) => {
    return (
        <React.Fragment>
            <form>
                <AutoComplete ref={ref}/>
                <button type="submit" onClick={props.clickHandler}>Search</button>
            </form>
        </React.Fragment>
    )
});

export default React.memo(SearchForm);
