/**
 * Created by zarko on 7/23/17.
 */

'use strict';

import React from 'react';

function Password(props) {
    return(
        <div className="js-password-block-show-hidden col-md-4" id={"password-block-" + props.password.id} onClick={() => {onToggleVisibility(props.password.id)}}>
            <div className='well password-block'>
                <div className='row'>
                    <FaviconBlock {...props}/>
                    <DataBlock {...props}/>
                    <ControlsBlock {...props}/>
                </div>
            </div>
        </div>
    );
}

function FaviconBlock(props) {
    const password = props.password.data;
    const favicon_URI = password.favicon && password.favicon.data;

    if(favicon_URI)
    {
        return(
            <div className="col-xs-2">
                <a target="_blank" href= {password.URL} >
                    <img className="favicon password-block-favicon" src={"data:image/gif;base64," + favicon_URI} alt="pwdlocker"/>
                </a>
            </div>
        );
    }
    else
    {
        return(
            <div className="col-xs-2">
                <a target="_blank" href= {password.URL} >
                    <img className="favicon password-block-favicon" src="assets/favicon.ico" alt="pwdlocker"/>
                </a>
            </div>
        );
    }
}

function DataBlock(props) {

    const password = props.password.data;
    let group_name = null;
    if("undefined" != typeof password.password_group)
        group_name = password.password_group.name;

    return(
        <div className="col-xs-8">
            <span className='label label-default pull-right' id={"password-data-group-" + password.id }>{group_name}</span>
            <a target="_blank" href={password.URL}>
                <span className="password-data" id={"password-data-title-" + password.id } > { toTitleCase(password.title) } </span>
            </a>
            <br />
            <span className="password-block-password-data" id={"password-data-username-" + password.id }>  <b>Username:</b> { password.username } </span>
            <br />
            <span className="password-data password-block-password-data" id={ "password-data-password-" + password.id }>  <b>Password:</b> { password.password } </span>
            <br />
            <span className="password-data password-block-password-data" id={ "password-data-password-changed-" + password.id }>  Last time changed  {time_ago_in_words_with_parsing(password.timestamp)}. </span>
        </div>
    );
}

function ControlsBlock(props) {
    const password = props.password.data;
    return(
        <div className="col-xs-2">
            <span className="glyphicon glyphicon-remove" id={"password-remove-" + password.id } onClick={() => props.onDeletePassword(password.id)}></span>
            <span className="glyphicon glyphicon-pencil" id={"password-edit-" + password.id } onClick={() => props.onStartEditPassword(password)}></span>
        </div>
    );
}

function onToggleVisibility(id) {
    $("#password-data-username-"+id.toString()).toggle();
    $("#password-data-password-"+id.toString()).toggle();
    $("#password-data-password-changed-"+id.toString()).toggle();
}

function time_ago_in_words_with_parsing(from) {
    var date = new Date;
    date.setTime(Date.parse(from));
    return time_ago_in_words(date);
}
// Takes a timestamp and converts it to a relative time
// DateHelper.time_ago_in_words(1331079503000)
function time_ago_in_words(from){
    return distance_of_time_in_words(new Date, from);
}

function distance_of_time_in_words(to, from) {
    var distance_in_seconds = ((to - from) / 1000);
    var distance_in_minutes = Math.floor(distance_in_seconds / 60);
    var tense = distance_in_seconds < 0 ? " from now" : " ago";
    distance_in_minutes = Math.abs(distance_in_minutes);
    if (distance_in_minutes == 0) { return 'less than a minute'+tense; }
    if (distance_in_minutes == 1) { return 'a minute'+tense; }
    if (distance_in_minutes < 45) { return distance_in_minutes + ' minutes'+tense; }
    if (distance_in_minutes < 90) { return 'about an hour'+tense; }
    if (distance_in_minutes < 1440) { return 'about ' + Math.floor(distance_in_minutes / 60) + ' hours'+tense; }
    if (distance_in_minutes < 2880) { return 'a day'+tense; }
    if (distance_in_minutes < 43200) { return Math.floor(distance_in_minutes / 1440) + ' days'+tense; }
    if (distance_in_minutes < 86400) { return 'about a month'+tense; }
    if (distance_in_minutes < 525960) { return Math.floor(distance_in_minutes / 43200) + ' months'+tense; }
    if (distance_in_minutes < 1051199) { return 'about a year'+tense; }

    return 'over ' + Math.floor(distance_in_minutes / 525960) + ' years';
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default Password;
