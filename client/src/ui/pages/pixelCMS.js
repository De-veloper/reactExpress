import React, { Component } from 'react';

import Header from '../Header';

class PixelCMS extends Component{
    state = {
        pixelObj:{}
    }
    testAPI (){
        //http://localhost:3001/api/submit/552168
        fetch('/api/submit/')
        .then(results=>{
            return results.json();
        }).then(data=>{
            //console.log(data)
            this.setState({
                pixelObj:data
            });

            this.buildPixelForm(data)
            
            
        })
    }

    buildPixelForm (obj){
        let thisHTML = '';
        if(typeof obj['FB']!='undefined') {
            thisHTML +='<h2>Face Book</h2>';
            for(var f=0; f<obj['FB'].length;f++){
                thisHTML +='<div>case number: '+obj['FB'][f].case+'</div>';
                thisHTML +='<hr/>';
            }
            
        }
        if(typeof obj['GA']!='undefined') {
            thisHTML +='<h2>Google Adwords</h2>';
        }
        if(typeof obj['DC']!='undefined') {
            thisHTML +='<h2>Double Click</h2>';
        }
        //thisHTML +='<div>case number: '+obj.case+'</div>';
        //thisHTML +='<div>data time: '+obj.datetime+'</div>';
        //thisHTML +='<div>id: '+obj.id+'</div>';

        document.getElementById('pixelForm').innerHTML = thisHTML
    }

    render(){
        return (
            <div>
                <Header titleTxt="Pixel CMS"/>
                <button onClick={this.testAPI.bind(this)}>Test</button>
                <div id="pixelForm"></div>
            </div>
            
        )
    }
}
export default PixelCMS;