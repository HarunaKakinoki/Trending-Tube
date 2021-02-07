import React from 'react'

const SearchForm = React.forwardRef((props, ref) => {
    return (
      <React.Fragment>
        <form>
            <input type="search" ref={ref}/>
            <button type="submit" onClick={props.clickHandler}>Search</button>
        </form>
        </React.Fragment>
    )
});

export default SearchForm
