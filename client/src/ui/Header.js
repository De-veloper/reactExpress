import React, { Component } from 'react';

import Nav from './Nav'
export default class Header extends Component {
    render () {
        return (
            <div className="header">
                <h1>{(this.props.titleTxt?this.props.titleTxt:'No title')}</h1><Nav/>
            </div>
        )
    }
}