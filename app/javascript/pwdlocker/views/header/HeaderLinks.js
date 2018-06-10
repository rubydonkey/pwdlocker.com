import React, {Component} from 'react';
import { NavItem, Nav} from 'react-bootstrap';

import SearchForm from 'pwdlocker/views/SearchForm';

import { withRouter } from 'react-router'

import clipboard from 'clipboard-js';
import { Link } from 'react-router-dom';

class HeaderLinks extends Component{

    static iconStyle = {
        fontSize: '1.2em',
        verticalAlign: 'middle'
    };

    render(){
        if(this.props.user != null){
            return (
                <div>
                    {this.getToggleView()}
                    {this.getSearchForm()}
                    {this.getUserLinks()}
                </div>
            );
        }
        else{
            return (
                <div>
                    {this.getUserLinks()}
                </div>
            );
        }
    }

    getLink(){
        let isCurrentUser = this.props.user != null;
        var link = {href: isCurrentUser ? "/sign_out" : "/users/auth/heroku",
            label: isCurrentUser ? "Log out" : "Log in"}

        return link;
    }

    getToggleView(){
        return (
            <Nav pullLeft>
                <NavItem eventKey={3}>
                    <Link to={`/user/${this.props.user.id}/applications`}>
                        <i className='pe-7s-menu' style={HeaderLinks.iconStyle}/>
                    </Link>
                </NavItem>
            </Nav>
        );
    }
    getSearchForm(){
        if (this.props.location.pathname === '/user/:userID/configVars'.replace(":userID", this.props.user.id) ||
            this.props.location.pathname === '/user/:userID/applications'.replace(":userID", this.props.user.id))
            return(<SearchForm {...this.props} />);
    }

    getSyncStatus(){
        if(this.props.syncStatus.get('isPullingUserData') === true) {
            return(
                <NavItem eventKey={3}><i className='pe-7s-cloud-download' style={HeaderLinks.iconStyle}/>&nbsp;Syncing</NavItem>
            );
        }
        else if(this.props.syncStatus.get('isPushingConfigVars') === true) {
            return(
                <NavItem eventKey={3}><i className='pe-7s-cloud-upload' style={HeaderLinks.iconStyle}/>&nbsp;Syncing</NavItem>
            );
        }
        else {
            return(
                <NavItem eventKey={3} onClick={(e) => {
                    e.preventDefault();
                    this.props.onPushConfigVars(this.props.user.configVars)
                }}><i className='pe-7s-refresh' style={HeaderLinks.iconStyle}/>&nbsp;Sync</NavItem>
            );
        }
    }

    getUserLinks(){
        let logInOutLink = <NavItem eventKey={3} href={this.getLink().href}><i className='pe-7s-less' style={HeaderLinks.iconStyle} />&nbsp;{this.getLink().label}</NavItem>

        if(this.props.user != null){
            return(
                <Nav pullRight>
                    {this.getSyncStatus()}
                    <NavItem title='Remember to wipe your clipboard after use, so no passwords are left there unprotected!' onClick={(e)=> {e.stopPropagation(); clipboard.copy(" ");}}><i className='pe-7s-attention' style={HeaderLinks.iconStyle} />&nbsp;Wipe Clipboard</NavItem>
                    {logInOutLink}
                </Nav>
            );
        }
        else{
            return(
                <Nav pullRight>
                    {logInOutLink}
                </Nav>
            );
        }
    }
}
export default withRouter(HeaderLinks);
