/**
 * Created by zarko on 7/26/17.
 */

import React from 'react';

import HotKey from 'react-shortcut';

function SearchForm(props) {
    const searchKeys = ['ctrl', 'f'];

    return (
        <form className="navbar-form navbar-left">
          <HotKey
            keys={searchKeys}
            simultaneous
            onKeysCoincide={(e)=>{ e.preventDefault(); console.log('search pressed<<--'); return false;}} />
          <input value={props.searchString}
               onChange={(e) => props.onChangeSearchString(e.target.value)}
               placeholder="Search passwords..."
               className='form-control password-search' />
        </form>
    );
}

export default SearchForm;
