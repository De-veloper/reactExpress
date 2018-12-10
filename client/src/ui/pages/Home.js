import React, { Component } from 'react';

import Header from '../Header';

class Home extends Component{
    render(){
        return (
            <div>
                <Header titleTxt="To Do List"/>
                <p>1. Write/Delete/Edit Json file</p>
                <p>2. List all pixel for each clients</p>
                <p>3. Make submit form to edit Json file (click <a rel="noopener noreferrer" href="https://www.npmjs.com/package/react-form" target="_blank">here</a>)</p>
                <p>4. List all my clients</p>
                <p>5. Redux for all nav </p>
                <p>6. Redux Saga</p>
                <p>7. Pixel CMS</p>
                <p>8. My races</p>
                <p>9. Added express server (<a rel="noopener noreferrer" href="https://www.codementor.io/kakarganpat/how-to-setup-react-and-node-js-in-a-project-koxwqbssl" target="_blank">Setup react with express</a>)</p>
            </div>
            
        )
    }
}
export default Home;