import React, { Component } from 'react';

import Header from '../Header';
import myClientObj from './../../json/clients.json'
import {HyperLink} from '../component/common/global';

class ClientList extends Component{
    state = myClientObj;

    render(){
        return (
            <div>
                <Header titleTxt="Client List"/>
                {(this.state?this.state['list'].map((e)=>
                <div>
                    <h2>{e.client}</h2>
                    <ul>
                        <li><HyperLink href={e.desktop} text="Desktop"/></li>
                        <li><HyperLink href={e.desktop} text="mobile"/></li>
                        <li>{e.version}</li>
                    </ul>
                    <hr/>
                </div>):'')}
            </div>
            
        )
    }
}
export default ClientList;