import React, { Component } from 'react';

//Import custom Json for intial state
import myDefaultState from './../../json/defaultState'

import Header from '../Header';

class Bikes extends Component {
    /*constructor(props){
      super(props)
      this.state = myDefaultState
    }*/
    state = myDefaultState
    //Two ways to initialize state
    //https://daveceddia.com/where-initialize-state-react/
    
  
    render(){
      return (
        <div className="container" >
          <Header titleTxt="Bikes"/>
        
        <p>
          {(this.state?this.state['bike'][0].brand:'')}
        </p>
        <img alt="BMC" src="/img/bikes/BMC_Alr01_1.jpg" width="400"/>
      
    </div>)
    }
  }
  
  export default Bikes;
  