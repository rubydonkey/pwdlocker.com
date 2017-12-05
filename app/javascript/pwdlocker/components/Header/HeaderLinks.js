import React, {Component} from 'react';
import { NavItem, Nav} from 'react-bootstrap';

import SearchForm from 'pwdlocker/views/SearchForm';

import { withRouter } from 'react-router'

import clipboard from 'clipboard-js';

class HeaderLinks extends Component{
    render(){
        const iconStyle = {fontSize: '1.2em', verticalAlign: 'middle'};
        const props = this.props;

        const linkLogIn = "/sign_out";
        return (
            <div>
                <Nav>
                    {this.props.location.pathname === '/passwords' ? (<SearchForm {...props} />) : null}
                </Nav>
                <Nav pullRight>
                    <NavItem title='Remember to wipe your clipboard after use, so no passwords are left there unprotected!' onClick={(e)=> {e.stopPropagation(); clipboard.copy(" ");}}><i className='pe-7s-attention' style={iconStyle} />&nbsp;Wipe Clipboard</NavItem>
                    <NavItem eventKey={3} href={this.getLink().href}><i className='pe-7s-less' style={iconStyle} />&nbsp;{this.getLink().label}</NavItem>
                </Nav>
            </div>
        );
    }

    getLink(){
        var link = {href: this.props.user === null ? "/users/auth/heroku" : "/sign_out",
            label: this.props.user === null ? "Log in" : "Log out"}

        return link;
    }
}
export default withRouter(HeaderLinks);
