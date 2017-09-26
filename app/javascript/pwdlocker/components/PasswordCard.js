import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import clipboard from 'clipboard-js';

export class PasswordCard extends Component{
    constructor(props) {
      super(props);

      this.state = {
        passwordRevealed: false,
        dataRevealed: false
      };
    }

    revealPassword(e) {
      e.stopPropagation();
      this.setState({passwordRevealed: !this.state.passwordRevealed});
      return false;
    }

    revealData(e) {
      e.preventDefault()
      this.setState({dataRevealed: !this.state.dataRevealed});
      return false;
    }

    password() {
      return this.props.password;
    }

    maskedPassword() {
      return this.password().password.split("").map(()=>{return '*'}).join('')
    }

    plainPassword() {
      return this.password().password;
    }

    displayedPassword() {
      if(this.state.passwordRevealed) {
        return this.plainPassword();
      } else {
        return this.maskedPassword();
      }
    }

    render(){
        const password = this.password(),
              props = this.props, id = password.id;

        return (
            <div className="col-lg-4 col-sm-6">
              <div className="card card-password pointer" onClick={this.revealData.bind(this)} id={`password-block-${password.id}`}>
                  <div className="content">
                      <div className="row">
                          <div className="col-xs-3">
                              <div className="icon-big text-left icon-warning">
                                {this.props.bigIcon}
                              </div>
                          </div>
                          <div className="col-xs-9">
                              <div className="text"  id={`password-data-title-${id}`}>
                                {password.title}
                              </div>
                          </div>
                      </div>
                      <ControlsBlock
                        dataRevealed={this.state.dataRevealed}
                        revealPassword={this.revealPassword.bind(this)}
                        plainPassword={this.plainPassword.bind(this)}
                        displayedPassword={this.displayedPassword.bind(this)}
                        {...props} />
                  </div>
              </div>
            </div>
        );
    }
}

function ControlsBlock(props) {
    const password = props.password;

    let dataStyle = {
      display: (props.dataRevealed ? 'block' : 'none')
    }

    return(
        <div className="footer">
            <div className="actions">
                <hr />

                <div style={dataStyle} className='pointer-reset'>
                  <DataBlock {...props} />
                </div>

                <a className='btn btn-link btn-xs'>
                  <i className='pe-7s-look' /> Show
                </a>
                <a className='btn btn-link btn-xs btn-primary' onClick={(e)=> {e.stopPropagation(); clipboard.copy(props.plainPassword());}}>
                  <i className='pe-7s-copy-file' /> Copy Password
                </a>
                <Link to={`/passwords/${password.id}/edit`} className='btn btn-link btn-default btn-xs' id={`password-edit-${password.id}`}>
                  <i className='pe-7s-pen' /> Edit
                </Link>
                <a className='btn btn-link btn-xs btn-danger' onClick={(e)=> {e.stopPropagation(); if(confirm('Are you sure?')) props.onDeletePassword(password.id)} } id={`password-remove-${password.id}`}>
                  <i className='pe-7s-trash' /> Delete
                </a>
            </div>
        </div>
    );
}

function DataBlock(props) {

    const password = props.password;
    let group_name = null;
    if("undefined" != typeof password.password_group)
        group_name = password.password_group.name;

    const id = password.id;

    return(
        <div>
          <span className='label label-default pull-right' id={`password-data-group-${id}` }>{group_name}</span>

          <ul className='list-unstyled' >
            <li className='url'><b><i className='icon pe-7s-home'></i>&nbsp;</b><a href={password.URL} target='_blank' title={password.URL} onClick={(e)=> e.stopPropagation()}>{password.URL}</a></li>
            <li className='username'><b><i className='icon pe-7s-id'></i>&nbsp;</b><span id={`password-data-username-${id}`}>{password.username}</span></li>
            <li className='password pointer' onClick={props.revealPassword}  >
              <b><i className='icon pe-7s-key'></i>&nbsp;</b>
              <span id={`password-data-password-${id}`}>{props.displayedPassword()}</span>
            </li>
            <li id={`password-data-password-changed-${id}`}><em><small>Last time changed  {time_ago_in_words_with_parsing(password.timestamp)}.</small></em></li>
          </ul>
          <hr />
        </div>
    );
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

export default PasswordCard;
