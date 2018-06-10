/**
 * Created by zarko on 7/26/17.
 */

import React from 'react';
import { Navbar } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';



function SearchForm(props) {
    return (
        <Navbar.Form pullLeft>
            <FormGroup>
                <FormControl
                    type='text'
                    placeholder='Search Config Var'
                    onChange={ (e) => props.onChangeSearchString(e.target.value)}
                    defaultVaule={props.searchString}
                />
            </FormGroup>
        </Navbar.Form>
    );
}

export default SearchForm;
