/**
 * Created by zarko on 7/23/17.
 */

'use strict';

import React,  { Component }  from 'react';
import * as jQuery from 'jquery';

import PasswordCard from 'pwdlocker/components/PasswordCard';
import favico from 'pwdlocker/assets/images/favico.png'

export class Password extends Component {
  render() {
    const props = this.props;

    return(
        <PasswordCard
            bigIcon={<FaviconBlock {...props}/>}
            password={props.password.data}
            onDeletePassword={props.onDeletePassword}
        />
    );
  }
}

function FaviconBlock(props) {
    const password = props.password.data;
    const favicon_URI = password.favicon && password.favicon.data;

    if(favicon_URI)
    {
        return(
            <a target="_blank" href= {password.URL} onClick={(e)=>{e.stopPropagation()}} >
                <img className="favicon password-block-favicon" src={"data:image/gif;base64," + favicon_URI} alt="pwdlocker"/>
            </a>
        );
    }
    else
    {
        return(
            <a target="_blank" href= {password.URL} onClick={(e)=>{e.stopPropagation()}}>
                <img className="favicon password-block-favicon" src={favico} alt="pwdlocker" width='32' />
            </a>
        );
    }
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default Password;
