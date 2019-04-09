import React, { Component } from 'react';

import Header from '../Header';

class Home extends Component{

    state = {
        todoList:[
            {status:'',task:'Write/Delete/Edit Json file'},
            {status:'',task:'List all pixel for each clients'},
            {status:'',task:'Make submit form to edit Json file (click <a rel="noopener noreferrer" href="https://www.npmjs.com/package/react-form" target="_blank">here</a>)'},
            {status:'Done',task:'List all my clients'},
            {status:'',task:'Redux for all nav '},
            {status:'',task:'Redux Saga'},
            {status:'',task:'Pixel CMS'},
            {status:'',task:'My races'},
            {status:'',task:'Added express server (<a rel="noopener noreferrer" href="https://www.codementor.io/kakarganpat/how-to-setup-react-and-node-js-in-a-project-koxwqbssl" target="_blank">Setup react with express</a>)'},
            {status:'',task:'connect to AWS'},
            {status:'',task:'count pixels for each client'},
            {status:'',task:'Get active accounts (<a rel="noopener noreferrer" href="http://172.16.100.189/bigip/In_Play_Status_Page/index.html" target="_blank">In Play Status</a>)'}
        ]
    }

    render(){
        return (
            <div className="container">
                <Header titleTxt="To Do List"/>
                {
                    this.state.todoList.map((e,i)=><p>{(i+1)}. <span key={i} dangerouslySetInnerHTML={{__html: e.task}}/> {(e.status!==''?' - '+e.status:'')}</p>)
                }
                <p>
                    Plan:<br/>
                    - Show all client ->  select client -> show live pixels -> Edit/Delete/Add<br/>
                    - Search live pixel by clients -- Done
                </p>
            </div>
            
        )
    }
}
export default Home;