import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Database from './utils/DatabaseModel'

import QueryBuilder from './QueryBuilder'
import QueryClient from './QueryClient'

import { BrowserRouter as Router,  } from 'react-router-dom'


window.addEventListener('wheel', e => {
    e.preventDefault()
}, {passive: false})

function Wrapper() {
    return (
        <Router>
            <App/>
        </Router>
    )
}



ReactDOM.render(<Wrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
