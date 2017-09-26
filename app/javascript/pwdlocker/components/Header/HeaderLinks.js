import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

import SearchForm from 'pwdlocker/views/SearchForm';

import { withRouter } from 'react-router'


class HeaderLinks extends Component{
    render(){
        const iconStyle = {fontSize: '1.2em', verticalAlign: 'middle'};
        const props = this.props;
        return (
            <div>
                <Nav>
                    {this.props.location.pathname === '/passwords' ? (<SearchForm {...props} />) : null}
                </Nav>
                <Nav pullRight>
                    <NavItem title='You should wipe your clipboard after use, so no passwords are left unprotected!'><i className='pe-7s-junk' style={iconStyle} />&nbsp;Wipe Clipboard</NavItem>
                    <NavItem eventKey={3} href="#"><i className='pe-7s-less' style={iconStyle} />&nbsp;Log out</NavItem>
                </Nav>
            </div>
        );
    }
}

export default withRouter(HeaderLinks);
