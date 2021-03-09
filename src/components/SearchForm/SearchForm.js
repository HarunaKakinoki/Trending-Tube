import React from 'react';
import { Button } from 'react-bootstrap';
import AutoComplete from '../AutoComplete/AutoComplete';
import styles from '../../style/style.module.css';

const SearchForm = React.forwardRef((props, ref) => {
    return (
        <React.Fragment>
            <form className={styles.searchForm}>
                <AutoComplete ref={ref}/>
                <Button variant="info" size="sm" onClick={props.clickHandler}>Search</Button>
            </form>
        </React.Fragment>
    )
});

export default React.memo(SearchForm);
