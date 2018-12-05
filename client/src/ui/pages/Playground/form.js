import React, { Component } from 'react';

import Header from '../../Header';

class FormTest extends Component{
    state = {
        defaultVal:'Please enter',
        currentVal:''
    }
    handleChange (e){
        this.setState({
            currentVal:e.target.value
        });
    }
    render(){
        return (
            <div>
                <Header titleTxt="Form Test"/>
                Input: <input type="text" placeholder={this.state.defaultVal} onChange={(e)=>this.handleChange(e)}/>
            </div>
            
        )
    }
}
export default FormTest;