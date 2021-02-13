import React from 'react'
import ReactDOM from 'react-dom'

import styled, { keyframes, css } from 'styled-components'


const animationScale = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.65);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }

`

const dashArray = 200

const animationDash = keyframes`
    to {
    stroke-dashoffset: 0;
  }

`

const animationOpacity = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;

    }
`





const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99999999;

    transition: visibility 0.2s, opacity 0.2s, background 0.6s;
    
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    visibility: ${props => props.isOpen ? "visible" : "hidden"};
    background:${props => props.isOpen ? "rgba(0,0,0,0)" || "#121b2f9c" : "rgba(0,0,0,0)"};
    opacity: ${props => props.isOpen ? "1" : "0"};


    
    
`
// #0304049c


const Content = styled.div`
    opacity: 0;
    position: relative;
        /* transition: opacity 0.6s; */
    ${props => !props.noshadow && "box-shadow: 0px 0 10px 0px rgb(81 86 105 / 10%);"}
    ${props => !props.isOpen && css`
    `}

    ${props => props.isOpen && css`
        ${'' /* animation: 0.2s ${animationScale} cubic-bezier(0.6,0,0.4,1) 0.2s forwards; */}

        animation: ${animationScale} cubic-bezier(0.6,0,0.4,1) 0.3s forwards;
    ` }


`



const aniDelay = 0.1
const AnimationWrapper = styled.div`
    position: relative;

    @keyframes hide {
        to {
            opacity: 0;
        }
    }
    @keyframes widthGrow {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    @keyframes heightGrow {
        from {
            height: 0;
        }
        to {
            height: 100%;
        }
    }



    /* div.top, div.right, div.bottom, div.left {
        position: absolute;
        background: white;

        z-index: -1;
    }

    div.top, div.bottom {
        width: 0;
        height: 4px;
    }

    div.right, div.left {
        height: 0;
        width: 4px;
    } */
/* 

    ${props => props.isOpen && css`
            .top {
                top: 0;
                left: 0;
                animation: 0.1s widthGrow ${0+aniDelay}s linear forwards, 0.2s hide ${0.5+aniDelay}s linear forwards;
            }

            .right {
                right: 0;
                top: 0;
                animation: 0.1s heightGrow ${0.1+aniDelay}s linear forwards, 0.2s hide ${0.5+aniDelay}s linear forwards;
            }

            .bottom {
                bottom: 0;
                right: 0;
                direction: rtl;
                animation: 0.1s widthGrow ${0.2+aniDelay}s linear forwards, 0.2s hide ${0.5+aniDelay}s linear forwards;
            }

            .left {
                left: 0;
                bottom: 0;
                animation: 0.1s heightGrow ${0.3+aniDelay}s linear forwards, 0.2s hide ${0.5+aniDelay}s linear forwards;
            }




    ` } */





`
// cubic-bezier(0.97, 0.31, 0.7, 0.87)
const Wrapper = document.createElement("div")

// Wrapper.style = "width: 100%; height: 100%;"

document.body.prepend(Wrapper)



const Portal = (props) => ReactDOM.createPortal(props.children, Wrapper)


function Modal(props) {


    React.useEffect(() => {

    }, [])


    return (
        <Portal>
           <Container isOpen={props.isOpen}>
                    <AnimationWrapper  isOpen={props.isOpen}>
                        <Content noshadow={props.noshadow} isOpen={props.isOpen}>
                            {props.isOpen && props.children}
                        </Content>
                        {/* <div>
                            <div className="top"></div>
                            <div className="right"></div>
                            <div className="bottom"></div>
                            <div className="left"></div>
                        </div> */}
                    </AnimationWrapper>
            </Container>
        </Portal>
    )
}


export default Modal

