import React, { Component } from 'react';

class HyperLink extends Component{
    render(){
        return (
            <a href={this.props.href} target={this.props.target} rel="noopener noreferrer">
                {this.props.text}
            </a>
            
        )
    }
}
export {HyperLink};