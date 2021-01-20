import React, { useState, useCallback, useEffect, useContext, useRef, useMemo } from 'react'
import styled, { css } from 'styled-components'

const arrow = 5

const arrowUnder = props => css`
    border-left: ${arrow}px solid transparent;
    border-right: ${arrow}px solid transparent;
    border-bottom: ${arrow}px solid ${props.bg ? props.bg : "#f7f7f7"};
    top: -${arrow}px;
`

const arrowOver = props => css`
    border-left: ${arrow}px solid transparent;
    border-right: ${arrow}px solid transparent;
    border-top: ${arrow}px solid ${props.bg ? props.bg : "#f7f7f7"};
    bottom: -${arrow}px;
`

const boxUnder = css`
    top: calc(100% + 10px);
`

const boxOver = css`
    bottom: calc(100% + 10px);
`

const arrowPosition = props => props.over ? arrowOver(props) : props.under ? arrowUnder(props) : arrowUnder(props)
const boxPosition = props => props.over ? boxOver : props.under ? boxUnder : boxUnder

const HoverMenuItem = styled.div`
    position: absolute;
    text-align: center;
    display: ${props => props.hide ? "none" : props.show ? "block" : "none"};
    opacity: ${props => props.show ? "1" : "0"};
    visibility: ${props => props.show ? "visible" : "hidden"};
    left: 50%;
    z-index: 1000;
    
    ${boxPosition}
    transform: translateX(-50%);
    user-select: none;
    padding: 6px 8px;


    transition: opacity 0.3s, visibility 0.1s, transform 0.2s;
    text-decoration: none;
    font-size: 12px;
    white-space: nowrap;
    background-color: ${props => props.bg ? props.bg : "#f7f7f7"};
    /* color: #1d1d1d!important; */
    

    color: ${props => props.color ? props.color : "#5f5f5f"};
    border-radius: 5px;
    /* box-shadow: 0px -2px 9px 2px rgba(0,0,0,.03), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05); */
    text-shadow: none!important;
    font-weight: 400;
    /* box-shadow: var(--box-shadow-1-arg) var(--box-shadow-2-arg) var(--box-shadow-3-arg) var(--box-shadow-4-arg) var(--box-shadow-5-arg); */

    &:after {
        content: "";
        width:0;
        height: 0;
        left: 0;
        right: 0;
        margin: auto;
        position: absolute;
        ${arrowPosition}
        z-index: 100;
    }

`

const ToolTip = props => {
    const [isShown, setIsShown] = useState(props.isOver || false)
    const toRef = useRef()

    const showOnURLQuery = (q) => new RegExp(q, "gi").test(window.location.search)

    const children = [<HoverMenuItem id={props.id} bg={props.bg} hide={props.hide} color={props.color} show={isShown || showOnURLQuery("tooltips")} >{props.text}</HoverMenuItem>, ...React.Children.toArray(props.children.props.children)]


    const onMouseEnter = () => {
        if(toRef.current) {
            clearTimeout(toRef.current)
        }
        if(props.delay) {
            toRef.current = setTimeout(() => {
                setIsShown(true)
            }, props.delay)
        } else {
            setIsShown(true)
        }
}

    const onMouseLeave = () => {
        if(toRef.current) {
            clearTimeout(toRef.current)
        }
       !props.isOver && setIsShown(false)
    } 

    console.log(props)

    return React.cloneElement(props.children, { 
        key: props.id + "_wrapper",
        onMouseEnter, 
        onMouseLeave,
        style: { ...props.style, ...props.children.props.style, position: "relative"}
    }, children)
}



export default ToolTip