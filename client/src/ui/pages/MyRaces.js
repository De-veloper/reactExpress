import React, { Component } from 'react';

import Header from '../Header';
import myRacesObj from './../../json/myraces.json'


class Races extends Component{
    state=myRacesObj;
    
    render(){
        return (
            <div className="container">
                <Header titleTxt="My Races"/>
                <h1>Upcoming</h1>
                {(this.state?this.state['list'].map((e)=>{
                    var today = new Date();
                    var raceDate = new Date(e.date)
                    if(today<raceDate){
                      return (
                        <div>
                            <h2>{e.name}</h2>
                            <ul>
                                <li>{e.date}</li>
                                <li>{e.distance}</li>
                            </ul>
                            <hr/>
                        </div>
                      )
                    } else {
                        return ''
                    }
                }):'')}
                <br/>
                <hr/>
                <br/>
                <h1>Past</h1>
                {(this.state?this.state['list'].map((e)=>{
                    var today = new Date();
                    var raceDate = new Date(e.date)
                    if(today>raceDate){
                      return (
                        <div>
                            <h2>{e.name}</h2>
                            <ul>
                                <li>{e.date}</li>
                                <li>{e.distance}</li>
                            </ul>
                            <hr/>
                        </div>
                      )
                    } else {
                        return ''
                    }
                }):'')}
            </div>
            
        )
    }
}
export default Races;