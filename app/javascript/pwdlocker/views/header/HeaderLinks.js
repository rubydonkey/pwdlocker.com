import React, {Component} from 'react';
import { NavItem, Nav} from 'react-bootstrap';

import SearchForm from 'pwdlocker/views/SearchForm';

import { withRouter } from 'react-router'

import clipboard from 'clipboard-js';
import { Link } from 'react-router-dom';

class HeaderLinks extends Component{
    render(){
        const iconStyle = {fontSize: '1.2em', verticalAlign: 'middle'};
        const props = this.props;

        let syncStatus = null;
        if(props.syncStatus != null){
            if(props.syncStatus.get('isPullingUserData') === true) {

                syncStatus = (
                    <NavItem eventKey={3}><i className='pe-7s-cloud-download' style={iconStyle}/>&nbsp;Syncing</NavItem>
                )
            }
            else if(props.syncStatus.get('isPushingConfigVars') === true) {
                syncStatus = (
                    <NavItem eventKey={3}><i className='pe-7s-cloud-upload' style={iconStyle}/>&nbsp;Syncing</NavItem>
                )
            }
            else {
                syncStatus = (
                    <NavItem eventKey={3} onClick={(e) => {
                        e.preventDefault();
                        props.onPushConfigVars(props.user.configVars)
                    }}><i className='pe-7s-refresh' style={iconStyle}/>&nbsp;Sync</NavItem>
                )
            }
        }

        let userLinks = null;
        // if user logged in add this links as well
        if(props.user != null){
            userLinks = (
                <Nav pullRight>
                    {syncStatus}
                    <NavItem title='Remember to wipe your clipboard after use, so no passwords are left there unprotected!' onClick={(e)=> {e.stopPropagation(); clipboard.copy(" ");}}><i className='pe-7s-attention' style={iconStyle} />&nbsp;Wipe Clipboard</NavItem>
                    <NavItem eventKey={3} href={this.getLink().href}><i className='pe-7s-less' style={iconStyle} />&nbsp;{this.getLink().label}</NavItem>
                </Nav>
            )
        }
        else{
            userLinks = (
                <Nav pullRight>
                    <NavItem eventKey={3} href={this.getLink().href}><i className='pe-7s-less' style={iconStyle} />&nbsp;{this.getLink().label}</NavItem>
                </Nav>
            )
        }

        let searchFrom = null;
        if(props.user != null){
            if (this.props.location.pathname === '/user/:userID/configVars'.replace(":userID", props.user.id) ||
                this.props.location.pathname === '/user/:userID/applications'.replace(":userID", props.user.id))
                searchFrom = (
                <Nav pullLeft>
                    <SearchForm {...props} />
                </Nav>
            )
        }

        let toggleView = null;
        if(props.user != null){
            toggleView = (
                <Nav pullLeft>
                <NavItem eventKey={3}>
                    <Link to={`/user/${props.user.id}/applications`}>
                        <i className='pe-7s-menu' style={iconStyle}/>
                    </Link>
                </NavItem>
                </Nav>
            )
        }

        return (
            <div>
                {toggleView}
                {searchFrom}
                {userLinks}
            </div>
        );
    }

    getLink(){
        let isCurrentUser = this.props.user != null;
        var link = {href: isCurrentUser ? "/sign_out" : "/users/auth/heroku",
            label: isCurrentUser ? "Log out" : "Log in"}

        return link;
    }
}
export default withRouter(HeaderLinks);
