import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//React route
//import {Router, Route} from 'react-router';
//V3 Route Ref: https://scotch.io/tutorials/routing-react-apps-the-complete-guide
import { BrowserRouter } from 'react-router-dom'
//V4 Ref https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

//Import Component
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
        //<Router>
       //     <Route path="/" component={App}/>
       // </Router>,
        //<App/>,
        <BrowserRouter>
        <App />
      </BrowserRouter>,
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
