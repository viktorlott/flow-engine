import React from 'react'
import styled, {css} from 'styled-components'


const Container = styled.div`
        display: table-cell;
        text-align: center;
        vertical-align: middle;

    .tick {
        stroke-dasharray: 29px;
        stroke-dashoffset: 29px;
        animation: draw .5s cubic-bezier(.25, .25, .25, 1) forwards;
        animation-delay: 1.2s
    }

    .circle {
        fill-opacity: 0;


        stroke: #219a00;

        stroke:#1e6faf;

        stroke: var(--element-success-icon);
        stroke-width: 16px;
        transform-origin: center;
        transform: scale(0);
        animation: grow 1s cubic-bezier(.25, .25, .25, 1.25) forwards;   
        animation-delay: .6s
    }

    @keyframes grow {
        60% {
            transform: scale(.8);
            stroke-width: 4px;
            fill-opacity: 0;
        }
        100% {
            transform: scale(.9);
            stroke-width: 8px;
            fill-opacity: 1;
            fill: #219a00;
            fill: #1e6faf;
            fill: var(--element-success-icon);
        }
    }

    @keyframes draw {
        100% { stroke-dashoffset: 0; }
    }
`



function SuccessIcon() {
    return (
        <Container class="svg-container">    
            <svg class="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 48 48" aria-hidden="true">
                <circle class="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
                <path 
                    class="tick" 
                    fill="none" 
                    stroke="#FFF" 
                    stroke-width="3" 
                    // stroke-linecap="round" 
                    // stroke-linejoin="round"
                    stroke-miterlimit="10" d="M14 27l5.917 4.917L34 17"/>
            </svg>
        </Container>
    )
}

export default SuccessIcon