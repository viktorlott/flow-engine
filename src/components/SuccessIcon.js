import React from 'react'
import styled, {css, keyframes} from 'styled-components'


const grow = props => keyframes`
        60% {
            transform: scale(.8);
            stroke-width: 4px;
            fill-opacity: 0;
            fill: ${props.color ? props.color : "var(--element-success-icon)"};
        }
        100% {
            transform: scale(.9);
            stroke-width: 8px;
            fill-opacity: 1;
            fill: #219a00;
            fill: #1e6faf;
            fill: ${props.color ? props.color : "var(--element-success-icon)"};
        }
`


const draw = keyframes`
   100% { stroke-dashoffset: 0; }
`

const Container = styled.div`
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        display: flex;
        justify-content: center;
        align-items: center;


    & path {
        stroke-dasharray: 29px;
        stroke-dashoffset: 29px;
        animation: ${draw} .5s cubic-bezier(.25, .25, .25, 1) forwards;
        animation-delay: ${props => props.speed ? 2*props.speed + "s": "1.2s"};
    }

    & circle {
        fill-opacity: 0;


        stroke: #219a00;

        stroke:#1e6faf;

        stroke: ${props => props.color ? props.color : "var(--element-success-icon)"};
        stroke-width: 16px;
        transform-origin: center;
        transform: scale(0);
        animation: ${props => grow(props)} 1s cubic-bezier(.25, .25, .25, 1.25) forwards;   
        animation-delay: ${props => props.speed ? props.speed + "s": "0.6s"};
    }

`



function SuccessIcon(props) {
    return (
        <Container color={props.color} speed={props.speed}>    
            <svg xmlns="http://www.w3.org/2000/svg" height={props.height || "100"} width={props.width || "100"} viewBox="0 0 48 48" aria-hidden="true">
                <circle   cx="24" cy="24" r="22"/>
                <path 
                    fill="none" 
                    stroke={props.fontColor || "#FFF"}
                    stroke-width="3" 
                    // stroke-linecap="round" 
                    // stroke-linejoin="round"
                    stroke-miterlimit="10" d="M14 27l5.917 4.917L34 17"/>
            </svg>
        </Container>
    )
}

export default SuccessIcon