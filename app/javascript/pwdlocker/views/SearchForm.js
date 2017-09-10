/**
 * Created by zarko on 7/26/17.
 */

import React from 'react';

function SearchForm(props) {

    return (
        <div>
            <input value={props.searchString}
                   onChange={(e) => props.onChangeSearchString(e.target.value)}
                   placeholder="Search..." />
        </div>
    );
}

export default SearchForm;
