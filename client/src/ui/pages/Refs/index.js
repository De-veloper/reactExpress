import React, { Component } from 'react';

import Header from '../../Header';
import {HyperLink} from '../../component/common/global';

class Refs extends Component{
    render(){
        return (
            <div>
                <Header titleTxt="References"/>
                <ul>
                    <li><HyperLink href="https://daveceddia.com/where-initialize-state-react/" target="_blank" text="Two ways to initialize state"/></li>
                    <li><HyperLink href="https://hackernoon.com/making-of-a-component-library-for-react-e6421ea4e6c7" target="_blank" text="Making of a component library for React"></HyperLink></li>
                    <li><HyperLink href="https://reactjs.org/docs/create-a-new-react-app.html" target="_blank" text="How to create a new react app"></HyperLink></li>
                    <li><HyperLink href="https://expressjs.com/en/starter/installing.html" target="_blank" text="How to install express"></HyperLink></li>

                </ul>
            </div>
            
        )
    }
}
export default Refs;