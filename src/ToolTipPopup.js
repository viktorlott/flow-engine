import React, { useState, useCallback, useEffect, useContext, useRef, useMemo } from 'react'
import styled, { css } from 'styled-components'

const arrow = 5

const arrowUnder = props => css`
    border-left: ${props.arrow || arrow}px solid transparent;
    border-right: ${props.arrow || arrow}px solid transparent;
    border-bottom: ${props.arrow || arrow}px solid ${props.bg ? props.bg : "#f7f7f7"};
    top: -${props.arrow - 1 || arrow}px;
`

const arrowOver = props => css`
    border-left: ${props.arrow || arrow}px solid transparent;
    border-right: ${props.arrow || arrow}px solid transparent;
    border-top: ${props.arrow || arrow}px solid ${props.bg ? props.bg : "#f7f7f7"};
    bottom: -${props.arrow  || arrow}px;
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
    /* display: ${props => props.hide ? "none" : props.show ? "block" : "none"}; */

    display: ${props => props.hardHide ? "none" : "flex"};
    visibility: ${props => props.hide ? "hidden" : props.show ? "visible" : "hidden" };
    opacity: ${props => props.show ? "1" : "0"};

    left: 50%;


    /* &:hover {
        display: ${props => true ? "none" : "flex"};
        visibility: ${props => true ? "hidden" : props.show ? "visible" : "hidden" };
        opacity: ${props => true ? "1" : "0"};
    } */
    
    
    ${boxPosition}
    transform: translateX(-50%) ${props => props.show ? "scale(0.95)" : "scale(0.85)"};
    user-select: none;
    padding: 6px 8px;

    transition: opacity 0.1s, visibility 0.1s, transform 0.1s;
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

    z-index: 10000000000;

    ${props  => props.box && css`
        ${'' /* box-shadow: 0 0 11px -1px rgb(210 210 210 / 48%); */}
        ${'' /* border: 1px solid #eff1f2; */}
        box-shadow: 0 2px 5px 0 rgb(32 48 60 / 5%);
    `}

`

const ToolTip = props => {
    const [isShown, setIsShown] = useState(props.isOver || false)
    const toRef = useRef()

    const showOnURLQuery = (q) => new RegExp(q, "gi").test(window.location.search)

    const children = [
        <HoverMenuItem 
            hardHide={props.hardHide} 
            arrow={props.arrow} 
            id={props.id} 
            box={props.box} 
            bg={props.bg} 
            hide={props.hide} 
            color={props.color} 
            show={isShown || showOnURLQuery("tooltips")} >
                {props.text}
            </HoverMenuItem>, ...React.Children.toArray(props.children.props.children)]


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



    return React.cloneElement(props.children, { 
        key: props.id + "_wrapper",
        onMouseEnter, 
        onMouseLeave,
        style: { ...props.style, ...props.children.props.style, position: "relative"}
    }, children)
}



export default ToolTip