import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import clipboard from 'clipboard-js';

export class ConfigVarCard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            configVarValueRevealed: false,
            dataRevealed: false
        };
    }

    revealConfigVarValue(e) {
        e.stopPropagation();
        this.setState({configVarValueRevealed: !this.state.configVarValueRevealed});
        return false;
    }

    revealData(e) {
        e.preventDefault()
        this.setState({dataRevealed: !this.state.dataRevealed});
        return false;
    }

    configVar() {
        return this.props.configVar.data;
    }

    maskedConfigVar() {
        return this.plainConfigVar().split("").map(()=>{return '*'}).join('')
    }

    plainConfigVar() {
        return this.configVar().value;
    }

    displayedConfigVarValue() {
        if(this.state.configVarValueRevealed) {
            return this.plainConfigVar();
        } else {
            return this.maskedConfigVar();
        }
    }

    render(){
        const   configVar = this.configVar(),
                props = this.props;

        return (
            <div className="col-lg-4 col-sm-6">
                <div className="card card-password pointer">
                    <div className="content">
                        <div className="row">
                            <div className="col-xs-9">
                                <div className='label label-default pull-left' onClick={this.revealData.bind(this)}>
                                    {configVar.name}
                                </div>
                                {getConfigVarStatus(props)}
                            </div>
                        </div>
                        <ControlsBlock
                            dataRevealed={this.state.dataRevealed}
                            revealConfigVar={this.revealConfigVarValue.bind(this)}
                            plainConfigVar={this.plainConfigVar.bind(this)}
                            displayedConfigVarValue={this.displayedConfigVarValue.bind(this)}
                            revealData={this.revealData.bind(this)}
                            {...props} />
                    </div>
                </div>
            </div>
        );
    }
}

function ControlsBlock(props) {
    const configVar = props.configVar;

    let dataStyle = {
        display: (props.dataRevealed ? 'block' : 'none')
    }

    return(
        <div className="footer">
            <div className="actions">
                <hr />

                <div style={dataStyle} className='pointer-reset'>
                    <DataBlock
                        revealConfigVar={props.revealConfigVar}
                        {...props}
                    />
                </div>

                <a className='btn btn-link btn-xs' onClick={(e) => props.revealData(e)}>
                    <i className='pe-7s-look' /> Show
                </a>

                <a className='btn btn-link btn-xs btn-primary' onClick={(e)=> {e.stopPropagation(); clipboard.copy(props.plainConfigVar());}}>
                    <i className='pe-7s-copy-file' /> Copy ConfigVar
                </a>

                <Link to={`/user/${configVar.data.user_id}/configVar/${configVar.id}/edit`} className='btn btn-link btn-default btn-xs'>
                    <i className='pe-7s-pen' /> Edit
                </Link>

                <a className='btn btn-link btn-xs btn-danger' onClick={() => props.onDeleteConfigVar(configVar)}>
                    <i className='pe-7s-junk' /> Delete
                </a>

            </div>
        </div>
    );
}

function DataBlock(props) {

    const configVar = props.configVar;
    const id = configVar.id;

    let applications = null;
    if(configVar.data.applications != null){
        applications = configVar.data.applications.map(application => {
            return( <span key={application.id} className='label label-warning pull-left'>
                        <a href={application.url} target='_blank' onClick={(e)=> e.stopPropagation()}>{application.name}</a>
                    </span>);
        });
    }

    return(
        <div>
            <ul className="list-group">
                {applications}
            </ul>
            <ul className='list-unstyled' >
                <li><b><i className='icon pe-7s-id'></i>&nbsp;</b><span>{configVar.data.name}</span></li>
                <li onClick={(e) => props.revealConfigVar(e)}  >
                    <b><i className='icon pe-7s-key'></i>&nbsp;</b>
                    <span>{props.displayedConfigVarValue()}</span>
                </li>
            </ul>
            <hr />
        </div>
    );
}

function getConfigVarStatus(props){

    if(props.configVar.isCreated === true){
        return(
            <div>
                <i className='pe-7s-plus pull-right' onClick={() => props.onDisableSyncConfigVar(props.configVar)}/>
                <i className='pe-7s-refresh pull-right' onClick={() => props.onSyncConfigVar(props.configVar)}/>
            </div>
        );
    }
    else if(props.configVar.isUpdated === true){
        debugger;

        return(
            <div>
                <i className='pe-7s-pen pull-right' onClick={() => props.onDisableSyncConfigVar(props.configVar)}/>
                <i className='pe-7s-refresh pull-right' onClick={() => props.onSyncConfigVar(props.configVar)}/>
            </div>
        );
    }
    else if(props.configVar.isDeleted === true){
        return(
            <div>
                <i className='pe-7s-junk pull-right' onClick={() => props.onDisableSyncConfigVar(props.configVar)}/>
                <i className='pe-7s-refresh pull-right' onClick={() => props.onSyncConfigVar(props.configVar)}/>
            </div>
        );
    }
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

export default ConfigVarCard;