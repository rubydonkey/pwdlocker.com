import React, {Component} from 'react';
import { } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import HeaderLinks from './header/HeaderLinks.js';

import { withRouter } from 'react-router'

import imagine from 'pwdlocker/assets/images/sidebar4.jpg';
import logo from 'pwdlocker/assets/images/logo.png';

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth
        }
    }

    activeRoute(routeName) {
        return this.props.location.pathname === routeName ? 'active' : '';
    }

    updateDimensions(){
        this.setState({width:window.innerWidth});
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    render(){
        const props = this.props;
        const sidebarBackground = {
            backgroundImage: 'url(' + imagine + ')'
        };
        // anything modified during the sync will be overwritten with new data
        // while sync is in progress disable modifiying configVars
        let newConfigVar = null;
        if( props.syncStatus != null &&
            props.syncStatus.get('isPullingUserData') === false &&
            props.syncStatus.get('isPushingConfigVars') === false)
        {
            const newConfigVarRoute = `/user/${this.props.user.id}/configVar/new`;
            newConfigVar = (
                <li className={this.activeRoute(newConfigVarRoute)}>
                    <NavLink to={newConfigVarRoute} className="nav-link" activeClassName="active">
                        <i className="pe-7s-plus"></i>
                        <p>New ConfigVar</p>
                    </NavLink>
                </li>
            )
        }

        const configVarsRoute = `/user/${this.props.user.id}/configVars`;
        return (
            <div id="sidebar" className="sidebar" data-color="black" data-image={imagine}>
                <div className="sidebar-background" style={sidebarBackground}></div>
                <div className="logo">
                    <a href="#" className="simple-text logo-normal">
                        <div className="logo-img">
                            <img src={logo} alt="logo image" width='200'/>
                        </div>
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        { this.state.width <= 991 ? (<HeaderLinks />):null }
                        <li className={this.activeRoute(configVarsRoute)}>
                            <NavLink to={configVarsRoute} className="nav-link" activeClassName="active">
                                <i className="pe-7s-lock"></i>
                                <p>My ConfigVars</p>
                            </NavLink>
                        </li>
                        {newConfigVar}
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(Sidebar);
