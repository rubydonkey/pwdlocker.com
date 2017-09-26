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
        const password = this.password();

        let dataStyle = {
          display: (this.state.dataRevealed ? 'block' : 'none')
        }

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
                              <div className="text">
                                {password.title}
                              </div>
                          </div>
                      </div>
                      <div className="footer">
                          <hr />
                          <div className="actions">
                              <div style={dataStyle} className='pointer-reset'>
                                <ul className='list-unstyled' >
                                  <li className='url'><b><i className='icon pe-7s-home'></i>&nbsp;</b><a href={password.URL} target='_blank' title={password.URL} onClick={(e)=> e.stopPropagation()}>{password.URL}</a></li>
                                  <li className='username'><b><i className='icon pe-7s-id'></i>&nbsp;</b>{password.username}</li>
                                  <li className='password pointer' onClick={this.revealPassword.bind(this)}>
                                    <b><i className='icon pe-7s-key'></i>&nbsp;</b>
                                    {this.displayedPassword()}
                                  </li>
                                </ul>
                                <hr />
                              </div>

                              <a className='btn btn-link btn-xs'>
                                <i className='pe-7s-look' /> Show
                              </a>
                              <a className='btn btn-link btn-xs btn-primary' onClick={(e)=> {e.stopPropagation(); clipboard.copy(this.plainPassword());}}>
                                <i className='pe-7s-copy-file' /> Copy Password
                              </a>
                              <Link to={`/passwords/${password.id}/edit`} className='btn btn-link btn-default btn-xs'>
                                <i className='pe-7s-pen' /> Edit
                              </Link>
                              <a className='btn btn-link btn-xs btn-danger' onClick={(e)=> {e.stopPropagation(); if(confirm('Are you sure?')) this.props.onDeletePassword(password.id)} }>
                                <i className='pe-7s-trash' /> Delete
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        );
    }
}

export default PasswordCard;
