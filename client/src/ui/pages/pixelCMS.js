import React, { Component } from 'react';

import Header from '../Header';


class Races extends Component{

    testAPI (){
        //http://localhost:3001/api/submit/552168
        fetch('/api/submit/552168')
        .then(results=>{
            return results.json();
        }).then(data=>{
            console.log(data)
        })
    }
    render(){
        return (
            <div>
                <Header titleTxt="Pixel CMS"/>
                <button onClick={this.testAPI}>Test</button>
            </div>
            
        )
    }
}
export default Races;