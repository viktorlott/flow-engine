import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import chroma from 'chroma-js'


const borderColor = "#f3ecec"


const InputWrapper = styled.input`
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ProximaNova, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
    text-rendering: optimizeLegibility;

    height: calc(100% - 4px);
    height: 34px;
    width: 600px;
    outline: none;
    background-color: #f9f9f9;
    background: #fdfdfd;
    /* border: 1px solid #f1f1f1; */
    border-color: #d4d4d4;
    border: none;
    padding: 2px 10px;
    position: relative;
    left: 0;

    /* border-left: 1px solid #cccccc; */
    /* border-right: 1px solid #cccccc; */
    border-color: ${borderColor};


    color: #81858e;
    color: #4c5058;
    cursor: pointer;
    display: inline-block;
    box-sizing: content-box;
    box-sizing: content-box;
    vertical-align: bottom;

    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    
    &:hover, &:focus {
        /* border-color: #4dacff; */
        /* color: #4dacff; */
        /* box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.05); */
        box-shadow: var(--box-shadow-1-arg) var(--box-shadow-2-arg) var(--box-shadow-3-arg) var(--box-shadow-4-arg) var(--box-shadow-5-arg);
    }


    &::placeholder {
        color: rgba(160, 160, 160, 0.6);
        color: #a9a9a9;
        font-weight: ${props => props.placeholderWeight ? props.placeholderWeight : 600};
    }

    border-radius: 4px;
    /* margin: 0 10px 0 14px; */
    background: #ececec;
    background: #f3f3f3;

    background: var(--element-color);
    border: 1px solid var(--element-border-color);
    padding: 2px 18px 2px 35px;



    /* border-bottom: 4px solid  #e5e5e5; */


    


`

const Container = styled.div`
    position: relative;
    & > svg {
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        margin: auto;
        position: absolute;
        z-index: 1;

        
    }

    & path:nth-child(2) {
        fill: #dedede;
    }

    & input:hover, input:focus {
        path:nth-child(2) {
            fill: ${chroma("#dedede").darken(0.2).hex()};
        }
    }
`



const DraftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0L24 0 24 24 0 24z"/><path d="M20 2c.552 0 1 .448 1 1v3.757l-2 2V4H5v16h14v-2.758l2-2V21c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V3c0-.552.448-1 1-1h16zm1.778 6.808l1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778zM13 12v2H8v-2h5zm3-4v2H8V8h8z"/></svg>)
const LinkIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"/></svg>)


const Icon = (props) => {
    switch(props.icon) {
        case "draft": return <DraftIcon/>
        case "link": return <LinkIcon/>
        default: return null
    }
}
export default props => {



    return (
        <div>
            <Container>
                <Icon icon={props.icon}/>
                
                <InputWrapper {...props} onChange={e => void props.setValue(props.name, e.target.value)} value={props.watch(props.name, "")} ref={props.register}/>
            </Container>
        </div>
    )
}

const recursive = (obj, path=[]) => {
    if(!obj) {
        return undefined
    }
    if(path.length >= 4) {
        return typeof obj 
    }
    if(obj instanceof Date) {
        return "date"
    }

    if(typeof obj === "string") {
        return "string"
    }

        if(typeof obj === "number") {
        return "number"
    }
    
    if(Array.isArray(obj)) {
        return obj.map((curr, i) => {
            return recursive(curr, path.concat(i))
        })
    }

    return  Object.keys(obj).reduce((acc, curr) => {
         const val = obj[curr]
        if(curr === "_id") {
          acc[curr] = "string"
        } else if(typeof val === "object" ) {
          acc[curr] = recursive(val, path.concat(curr))
        }   else {
          acc[curr] = typeof val
        }
        return acc
    },{})
}
