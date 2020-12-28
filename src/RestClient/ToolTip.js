import React, { useState, useCallback, useEffect, useContext, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { createPopper } from '@popperjs/core';
const arrow = 7

export const HoverMenuItem = styled.div`


    text-align: center;
    /* background: black; */
    border-radius: 5px;
    
    /* transition-delay: 0.2s; */



    z-index: 10;
    user-select: none;
    font-size: 14px!important;

    padding: 6px 8px;


    text-decoration: none;
    

    white-space: nowrap;
    background-color: #f7f7f7;
    color: #1d1d1d!important;


    

    transition: opacity 0.3s, visibility 0.1s, transform 0.2s;
    text-decoration: none;
    font-size: 14px!important;
    white-space: nowrap;
    background-color: #f7f7f7;
    color: #1d1d1d!important;
    border-radius: 5px;
    font-weight: 600;
    /* box-shadow:  0 9px 28px 8px rgba(0,0,0,.01); */

    /* 0px -2px 9px 2px rgba(0,0,0,.01), */
    

    opacity: 0;
    visibility: hidden;

    &[data-show] {

        opacity: 1;
        visibility: visible;
    }

    &:after {
        content: "";
        border-left: ${arrow}px solid transparent;
        border-right: ${arrow}px solid transparent;
        border-bottom: ${arrow}px solid #f7f7f7;
        width:0;
        height: 0;
        position: absolute;
        top: -${arrow - 3}px;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 100;
    }

`


const ToolTip = props => {
    const stickerRef = useRef()
    const tooltipRef = useRef()

    useEffect(() => {
        function show() {
            tooltipRef.current.setAttribute('data-show', '');
        }
        
        function hide() {
            tooltipRef.current.removeAttribute('data-show');
        }
        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave', 'blur'];
        
        showEvents.forEach(event => {
            stickerRef.current.addEventListener(event, show);
        });
        
        hideEvents.forEach(event => {
            stickerRef.current.addEventListener(event, hide);
        });

        createPopper(stickerRef.current, tooltipRef.current, {
          placement: 'bottom',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
          ],
        })


    },[])


    const children = [<HoverMenuItem key={props.text} ref={tooltipRef} show={true}>{props.text}</HoverMenuItem>, React.cloneElement(props.children, { key: props.text + "_", ref: stickerRef})]

    return  children
}



export default ToolTip



// return React.cloneElement(props.children, { onMouseEnter:() => {
//     if(toRef.current) {
//         clearTimeout(toRef.current)
//     }
//     if(props.delay) {
//         toRef.current = setTimeout(() => {
//             setIsShown(true)
//         }, props.delay)
//     } else {
//         setIsShown(true)
//     }

// }, onMouseLeave:() => {
//     if(toRef.current) {
//         clearTimeout(toRef.current)
//     }
//     setIsShown(false)
// } 
// }, children)