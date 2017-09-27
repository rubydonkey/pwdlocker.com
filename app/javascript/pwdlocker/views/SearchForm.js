/**
 * Created by zarko on 7/26/17.
 */

import React from 'react';

function SearchForm(props) {
    return (
        <form className="navbar-form navbar-left">
          <input value={props.searchString}
               onChange={(e) => props.onChangeSearchString(e.target.value)}
               placeholder="Search passwords..."
               className='form-control password-search' />
        </form>
    );
}

export default SearchForm;
