import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Database from './utils/DatabaseModel'

import QueryBuilder from './QueryBuilder'
import QueryClient from './QueryClient'

import { BrowserRouter as Router,  } from 'react-router-dom'

// import xmlData from './test.js'
// import parser from 'fast-xml-parser'
// import he from 'he'

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








// var options = {
//     attributeNamePrefix : "@_",
//     attrNodeName: "attr", //default is 'false'
//     textNodeName : "#text",
//     ignoreAttributes : true,
//     ignoreNameSpace : false,
//     allowBooleanAttributes : false,
//     parseNodeValue : true,
//     parseAttributeValue : false,
//     trimValues: true,
//     cdataTagName: "__cdata", //default is 'false'
//     cdataPositionChar: "\\c",
//     parseTrueNumberOnly: false,
//     arrayMode: false, //"strict"
//     attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
//     tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
//     stopNodes: ["parse-me-as-string"]
// };

// if( parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
//     var jsonObj = parser.parse(xmlData,options);
// }

// // Intermediate obj
// var tObj = parser.getTraversalObj(xmlData,options);
// var jsonObj = parser.convertToJson(tObj,options);

// var jsonObj2 = parser.parse(xmlData)
// console.log(tObj, jsonObj, jsonObj2)

ReactDOM.render(<Wrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
