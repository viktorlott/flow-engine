import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { PortWidget } from '@projectstorm/react-diagrams';
import styled, { css } from 'styled-components'
import chroma from 'chroma-js'
import Integration from '../../utils/IntegrationModel'
import TreeEvaluator from './TreeEvaluator'
import StoreContext from '../../components/StoreContext'

const spring = t => 
    -0.5 * 
    (2.71828 ** (-6 * t)) * (
        -2 * (2.71828 ** (6 * t)) + 
        Math.sin(12 * t) + 
        2 * Math.cos(12 * t)
    )
  
  const lerp = (a, b, p) => a + p * (b - a)
  
  const bounce = funcs => css`
    @keyframes move {
      ${props => {
        return [...Array(100).keys()].map(i => {
          let t = i / (funcs.duration || 100)
          let p = spring(t)
          return `${i + "%"} {`+
            `${(funcs.animation || props.animation)(p, i, lerp)}` +
          `}`
        }).join("\n")
      }}

      100% {
          ${funcs.rest()}
      }
    }
  `
  

const Header = styled.div`
    font-size: 12px;
    color: white;
    height: 20px;
    display: flex;
    white-space: nowrap;
    justify-items: center;
    align-items: center;
    padding: 3px 5px 3px 2px;
    border-radius: 5px 5px 0 0;
    background: ${props => props.color ? props.color : "#d88107"};
    margin-bottom: ${props => props.minimized ? "0px" : "5px"};
    justify-content: space-between;

    ${props => props.transparent && css`
        background: none;

    
    `}

    & svg {
        margin-left: 5px;
        margin-right: 5px;
        width: 15px;
        height: 15px;
    }
`

const ToolContainer = styled.div`
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: -25px;
    left: 0; 
    /* right: 0; */
    /* margin: auto; */
    padding: 1px;


    & > svg:nth-child(1) {
        width: 14px;
        height: 14px;
        padding: 5px;

        & > path:nth-child(2) {
            /* fill: #ff8686; */
            transition: fill 0.2s;
        }

        &:hover {
            & > path:nth-child(2) {
                /* fill: #ff4040; */
            }
        }
        
    }

    & > svg:nth-child(2) {
        width: 14px;
        height: 14px;
        padding: 5px;

        & > path:nth-child(2) {
            /* fill: #ff4040; */
            transition: fill 0.2s;
        }

        &:hover {
            & > path:nth-child(2) {
                /* fill: #ff4040; */
            }
        }
        
    }

`

const Container = styled.div`
    border-radius: 3px;

    background:${props => props.selected ? "#404040" : "#404040"};
    display: flex;
    flex-flow: column;
    position: relative;
    transition: box-shadow 0.1s, background 0.1s;
    cursor: pointer;

    
    box-shadow: 0 0 7px 12px rgb(0 0 0 / 1%)${props => props.selected ? ", inset 0px 0px 0px 1px " + ("transparent" || props.color || "#404040") : ", inset 0px 0px 0px 1px transparent"};
    min-width: 180px;
    padding-bottom: ${props => props.minimized ? "0px" : "5px"};
    /* transform: scale(1); */


    
    /* ${bounce({
        duration: 20,
        animation(p, i, lerp) {
            return `
                transform: scale(${lerp(0.6, 1, p)});
            `
        },
        rest() {
            return `transform: scale(1);`
        }
    })} */

    animation: 1s move linear;

    ${props => props.transparent && css`
        background: ${chroma(props.color).alpha(props.selected ? 0.2 : 0.1).hex()};
        border: 1px ${props.selected ? "solid" : "solid"} ${props.color || "#404040" };
        
        ${'' /* background: transparent; */}

        &:hover {
            background: ${chroma(props.color).alpha(0.2).hex()};


        }

        ${'' /* &:hover ${ToolContainer} {
            opacity: 1;
            visibility: visible;
        } */}

        & * {
            color: ${props => props.color ? props.color : "#404040"}!important;
        }
    
    


    `}
`



const Ports = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-bottom: ${props => props.minimized ? "0" : "5px"};
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`



const CirclePort = styled.div`
    width: 12px;
    height: 12px;
    

    /* transition: background 0.2s ease-out; */
    /* width: 15px;
    height: 14px; */
    background: ${props => props.color ? props.color : "darkgray"};
    border-radius: ${props => props.minimized || true ? "39%" : "50%"};
    cursor: pointer;
    transition: color 0.2s, transform 0.2s;

    

    &:hover {
        transform: scale(1.3);
        /* background: mediumpurple; */
    }

    border: 3px solid #242e3e;
    border: 3px solid #fbfafa;

    border: 2px solid #ffffff;
    
`
const CirclePortWrapper = styled.div`
    width: 12px;
	height: 12px;
    margin: 2px;
    transform: translateX(${props => props.in ? -12 : 12}px);

    &:hover ${CirclePort} {
        background: mediumpurple;
    }

`
const PortContainer = styled.div`
    position: relative;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-size: 12px;
    color: #171414;
    color: white;
`


const AlignCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    & > span {
        padding: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background 0.2s;
        cursor: pointer;
        border-radius: 4px;
        & > svg {
            margin: 0;
        }
    }

    ${props => props.iColor && css`
        & > svg > path {
            color: ${props.iColor}!important;
        }
    
    `}

    & > span:hover {
        background: ${props => props.transparent ? "none" : props.color};
    }
`

function BoltIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21.5L17.5 13L13 10L15 2.5L6.5 11L11 14L9 21.5Z" fill="currentColor" />
        </svg>
    )
}


function EditIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20ZM12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14ZM12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6C14 6.53043 13.7893 7.03914 13.4142 7.41421C13.0391 7.78929 12.5304 8 12 8Z" fill="currentColor"></path>
        </svg>


    )
}






const StyledSpinnerAlt = styled.i`
  @keyframes spinneralt {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  & {
    transform: scale(var(--ggs, .7));
  }
  &,
  &::before {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 20px;
    height: 20px;
  }
  &::before {
    content: '';
    position: absolute;
    border-radius: 100px;
    animation: spinneralt 1s cubic-bezier(0.6, 0, 0.4, 1) infinite;
    border: 3px solid transparent;
    border-top-color: currentColor;
  }
`

export const LoadIcon = React.forwardRef(
    (props, ref) => {
        return (
            <>
                <StyledSpinnerAlt {...props} ref={ref} icon-role="spinner-alt" />
            </>
        )
    },
)

function StartIcon() {
    return (

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="currentColor" d="M9.5 15.584V8.416a.5.5 0 01.77-.42l5.576 3.583a.5.5 0 010 .842l-5.576 3.584a.5.5 0 01-.77-.42z"></path><path fill-rule="evenodd" fill="currentColor" d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path></svg>

    )
}


/*
<svg width="15" height="15"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM10 16.5V7.5L16 12L10 16.5Z" fill="currentColor"></path>
      </svg>

*/
const wait = ms => new Promise(res => setTimeout(res, ms))



function useToggler() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const clickHandle = (e) => {

            const hasRef = ref.current && ref.current.contains;
            if (isOpen && hasRef && !ReactDOM.findDOMNode(ref.current).contains(e.target)) {
                setIsOpen(false);
            } else if (hasRef && ReactDOM.findDOMNode(ref.current).contains(e.target)) {
                setIsOpen((prev) => (prev ? false : true));
            }
        };
        document.addEventListener("click", clickHandle);

        return () => void document.removeEventListener("click", clickHandle);
    }, [isOpen]);

    return [{ ref }, isOpen];
}



const EditList = styled.div`
    position: absolute;
    width: ${props => props.open ? 75 : 0}px;
    left: calc(100% + 5px);
    top: 1px;
    border: 1px solid ${props => props.color};
    border-left: 1px;
    border-radius: 0 5px 5px 0;
    background: ${props => chroma(props.color).alpha(0.1).hex()};
    z-index: 1;
    overflow: hidden;
  
    display: flex;
    flex-flow: row;

    transition: width 0.1s;


    & > div {
        padding: 5px 0px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
  `

function EditButton(props) {
    const [bind, isOpen] = useToggler()

    return (
        <AlignCenter transparent={true} color={chroma(props.color).darken(0.4).hex()}>

            <span {...bind}>
                <EditIcon />
            </span>


            <EditList open={isOpen} color={props.color}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M14.78 3.653a3.936 3.936 0 115.567 5.567l-3.627 3.627a3.936 3.936 0 01-5.88-.353.75.75 0 00-1.18.928 5.436 5.436 0 008.12.486l3.628-3.628a5.436 5.436 0 10-7.688-7.688l-3 3a.75.75 0 001.06 1.061l3-3z"></path><path d="M7.28 11.153a3.936 3.936 0 015.88.353.75.75 0 001.18-.928 5.436 5.436 0 00-8.12-.486L2.592 13.72a5.436 5.436 0 107.688 7.688l3-3a.75.75 0 10-1.06-1.06l-3 3a3.936 3.936 0 01-5.567-5.568l3.627-3.627z"></path></svg>
                </div>
           
                <div onClick={props.onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" fill="currentColor" d="M7.875 2.292a.125.125 0 00-.032.018A7.24 7.24 0 004.75 8.25a7.247 7.247 0 003.654 6.297c.57.327.982.955.941 1.682v.002l-.317 6.058a.75.75 0 11-1.498-.078l.317-6.062v-.004c.006-.09-.047-.215-.188-.296A8.747 8.747 0 013.25 8.25a8.74 8.74 0 013.732-7.169 1.547 1.547 0 011.709-.064c.484.292.809.835.809 1.46v4.714a.25.25 0 00.119.213l2.25 1.385c.08.05.182.05.262 0l2.25-1.385a.25.25 0 00.119-.213V2.478c0-.626.325-1.169.81-1.461a1.547 1.547 0 011.708.064 8.74 8.74 0 013.732 7.17 8.747 8.747 0 01-4.41 7.598c-.14.081-.193.206-.188.296v.004l.318 6.062a.75.75 0 11-1.498.078l-.317-6.058v-.002c-.041-.727.37-1.355.94-1.682A7.247 7.247 0 0019.25 8.25a7.24 7.24 0 00-3.093-5.94.125.125 0 00-.032-.018l-.01-.001c-.003 0-.014 0-.031.01-.036.022-.084.079-.084.177V7.19a1.75 1.75 0 01-.833 1.49l-2.25 1.385a1.75 1.75 0 01-1.834 0l-2.25-1.384A1.75 1.75 0 018 7.192V2.477c0-.098-.048-.155-.084-.176a.062.062 0 00-.031-.011l-.01.001z"></path></svg>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" fill="currentColor" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path><path fill="currentColor" d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path><path fill="currentColor" d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path></svg>
                </div>
            </EditList>


        </AlignCenter>
    )
}


const listItems = [
    {
      title: "Integration",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor"  d="M13 9h8L11 24v-9H4l9-15v9zm-2 2V7.22L7.532 13H13v4.394L17.263 11H11z"/></svg>
      // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" fillRule="evenodd" d="M16.168 2.924L4.51 13.061a.25.25 0 00.164.439h5.45a.75.75 0 01.692 1.041l-2.559 6.066 11.215-9.668a.25.25 0 00-.164-.439H14a.75.75 0 01-.687-1.05l2.855-6.526zm-.452-1.595a1.341 1.341 0 012.109 1.55L15.147 9h4.161c1.623 0 2.372 2.016 1.143 3.075L8.102 22.721a1.149 1.149 0 01-1.81-1.317L8.996 15H4.674c-1.619 0-2.37-2.008-1.148-3.07l12.19-10.6z"></path></svg>
      ),
   
    },
  
    {
      title: "Konjunktion", 

      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path  fill="currentColor" d="M7.105 8.79A3.001 3.001 0 0 0 10 11h4a5.001 5.001 0 0 1 4.927 4.146A3.001 3.001 0 0 1 18 21a3 3 0 0 1-1.105-5.79A3.001 3.001 0 0 0 14 13h-4a4.978 4.978 0 0 1-3-1v3.17a3.001 3.001 0 1 1-2 0V8.83a3.001 3.001 0 1 1 2.105-.04zM6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm12 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>
      /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fillRule="evenodd" fill="currentColor" d="M20 5.5a3.5 3.5 0 01-6.062 2.385l-5.112 3.021a3.497 3.497 0 010 2.188l5.112 3.021a3.5 3.5 0 11-.764 1.29l-5.112-3.02a3.5 3.5 0 110-4.77l5.112-3.021v.001A3.5 3.5 0 1120 5.5zm-1.5 0a2 2 0 11-4 0 2 2 0 014 0zM5.5 14a2 2 0 100-4 2 2 0 000 4zm13 4.5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> */
      ),

    },
    {
      title: "Omvandlare", 

      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor"  d="M8 20v1.932a.5.5 0 0 1-.82.385l-4.12-3.433A.5.5 0 0 1 3.382 18H18a2 2 0 0 0 2-2V8h2v8a4 4 0 0 1-4 4H8zm8-16V2.068a.5.5 0 0 1 .82-.385l4.12 3.433a.5.5 0 0 1-.321.884H6a2 2 0 0 0-2 2v8H2V8a4 4 0 0 1 4-4h10z"/></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" fillRule="evenodd" d="M19.75 17.5a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm-3.25 1.75a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0z"></path><path fill="currentColor" fillRule="evenodd" d="M13.905 1.72a.75.75 0 010 1.06L12.685 4h4.065a3.75 3.75 0 013.75 3.75v8.75a.75.75 0 01-1.5 0V7.75a2.25 2.25 0 00-2.25-2.25h-4.064l1.22 1.22a.75.75 0 01-1.061 1.06l-2.5-2.5a.75.75 0 010-1.06l2.5-2.5a.75.75 0 011.06 0zM4.25 6.5a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM7.5 4.75a3.25 3.25 0 11-6.5 0 3.25 3.25 0 016.5 0z"></path><path fill="currentColor" fillRule="evenodd" d="M10.095 22.28a.75.75 0 010-1.06l1.22-1.22H7.25a3.75 3.75 0 01-3.75-3.75V7.5a.75.75 0 011.5 0v8.75a2.25 2.25 0 002.25 2.25h4.064l-1.22-1.22a.75.75 0 111.061-1.06l2.5 2.5a.75.75 0 010 1.06l-2.5 2.5a.75.75 0 01-1.06 0z"></path></svg>
      ),

    },
    { 
      title: "Variabel", 

      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-.866-.23-1.697-.5-2.47-1.667 1.647-2.933 2.47-3.8 2.47 3.995-7 1.8-10-4.2-14 .5 5-2.796 7.274-4.138 8.537A7.5 7.5 0 0 0 12 23zm.71-17.765c3.241 2.75 3.257 4.887.753 9.274-.761 1.333.202 2.991 1.737 2.991.688 0 1.384-.2 2.119-.595a5.5 5.5 0 1 1-9.087-5.412c.126-.118.765-.685.793-.71.424-.38.773-.717 1.118-1.086 1.23-1.318 2.114-2.78 2.566-4.462z"/></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fillRule="evenodd" fill="currentColor" d="M12.185 21.5c4.059 0 7.065-2.84 7.065-6.75 0-2.337-1.093-3.489-2.678-5.158l-.021-.023c-1.44-1.517-3.139-3.351-3.649-6.557a6.14 6.14 0 00-1.911 1.76c-.787 1.144-1.147 2.633-.216 4.495.603 1.205.777 2.74-.277 3.794-.657.657-1.762 1.1-2.956.586-.752-.324-1.353-.955-1.838-1.79-.567.706-.954 1.74-.954 2.893 0 3.847 3.288 6.75 7.435 6.75zm2.08-19.873c-.017-.345-.296-.625-.632-.543-2.337.575-6.605 4.042-4.2 8.854.474.946.392 1.675.004 2.062-.64.64-1.874.684-2.875-1.815-.131-.327-.498-.509-.803-.334-1.547.888-2.509 2.86-2.509 4.899 0 4.829 4.122 8.25 8.935 8.25 4.812 0 8.565-3.438 8.565-8.25 0-2.939-1.466-4.482-3.006-6.102-1.61-1.694-3.479-3.476-3.479-7.021z"></path></svg> 
      ), 

    },
    
    { 
      title: "Databas", 

      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M5 12.5c0 .313.461.858 1.53 1.393C7.914 14.585 9.877 15 12 15c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171C17.35 11.349 14.827 12 12 12s-5.35-.652-7-1.671V12.5zm14 2.829C17.35 16.349 14.827 17 12 17s-5.35-.652-7-1.671V17.5c0 .313.461.858 1.53 1.393C7.914 19.585 9.877 20 12 20c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171zM3 17.5v-10C3 5.015 7.03 3 12 3s9 2.015 9 4.5v10c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5zm9-7.5c2.123 0 4.086-.415 5.47-1.107C18.539 8.358 19 7.813 19 7.5c0-.313-.461-.858-1.53-1.393C16.086 5.415 14.123 5 12 5c-2.123 0-4.086.415-5.47 1.107C5.461 6.642 5 7.187 5 7.5c0 .313.461.858 1.53 1.393C7.914 9.585 9.877 10 12 10z"/></svg>
      ), 

    },
    {
      title: "Vänta", 

      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill={"currentColor"} d="M17.618 5.968l1.453-1.453 1.414 1.414-1.453 1.453a9 9 0 1 1-1.414-1.414zM12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM11 8h2v6h-2V8zM8 1h8v2H8V1z"/></svg>
      ),

    },
    {
      title: "Script", 

      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill={"currentColor"} d="M4 18v-3.7a1.5 1.5 0 0 0-1.5-1.5H2v-1.6h.5A1.5 1.5 0 0 0 4 9.7V6a3 3 0 0 1 3-3h1v2H7a1 1 0 0 0-1 1v4.1A2 2 0 0 1 4.626 12 2 2 0 0 1 6 13.9V18a1 1 0 0 0 1 1h1v2H7a3 3 0 0 1-3-3zm16-3.7V18a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-4.1a2 2 0 0 1 1.374-1.9A2 2 0 0 1 18 10.1V6a1 1 0 0 0-1-1h-1V3h1a3 3 0 0 1 3 3v3.7a1.5 1.5 0 0 0 1.5 1.5h.5v1.6h-.5a1.5 1.5 0 0 0-1.5 1.5z"/></svg>
      ),

    },
    {
      title: "Intervall", 

      icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path fill={"currentColor"} d="M9 7.539L15 21.539 18.659 13 23 13 23 11 17.341 11 15 16.461 9 2.461 5.341 11 1 11 1 13 6.659 13z"/></svg>),

    },
    {
      title: "Felhantering", 

      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zm-8.66 16h15.588L12 5.5 4.206 19zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>
      // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M13 15.5a1 1 0 11-2 0 1 1 0 012 0zm-.25-8.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z"></path><path fill="currentColor" fillRule="evenodd" d="M11.46.637a1.75 1.75 0 011.08 0l8.25 2.675A1.75 1.75 0 0122 4.976V10c0 6.19-3.77 10.705-9.401 12.83a1.699 1.699 0 01-1.198 0C5.771 20.704 2 16.19 2 10V4.976c0-.76.49-1.43 1.21-1.664L11.46.637zm.617 1.426a.25.25 0 00-.154 0L3.673 4.74a.249.249 0 00-.173.237V10c0 5.461 3.28 9.483 8.43 11.426a.2.2 0 00.14 0C17.22 19.483 20.5 15.46 20.5 10V4.976a.25.25 0 00-.173-.237l-8.25-2.676z"></path></svg>
      ),

    }
  
  ]


const CoverBackground = styled.div`
    width: 100%;
    height: 100%;
    filter: blur(2px);
`

export class CustomNodeWidget extends React.Component {

    state = {
        active: false,
        version: 0
    }

    static contextType = StoreContext

    constructor(props) {
        super(props)

        if (props.node) {
            props.node.widget = this
        }

        // setTimeout(() => void this.setState({version: 1}), 1000)
    }

    setActive = val => void this.setState({ active: val })


    generatePort(port, input) {
        if (!port) return <div></div>

        const { name, label, color } = port
        const portStyle = !input ? { 
            marginLeft: 10, 
            paddingLeft: 10, 
            background: "translate", 
            borderRadius: "4px 0 0 4px" 
        } : { 
            marginRight: 10, 
            paddingRight: 10, 
            background: "translate", 
            borderRadius: "0 4px 4px 0" 
        }
        const portAlign = !input ? { 
            transform: (this.props.node.options.minimized ? "translate(7px, 1px)" : "translateX(9px)") 
        } : { 
            transform: (this.props.node.options.minimized ? "translate(-11px, 1px)" : "translateX(-9px)") 
        }

        // console.log("yoo port", this.props.node.getPort(name))
        return (
            <PortContainer style={portStyle}>
                {!input && !this.props.node.options.minimized && label}
                <PortWidget style={portAlign}  engine={this.props.engine} port={this.props.node.getPort(name)}>
                    <CirclePort minimized={this.props.node.options.minimized } out color={input && this.state.active ? this.props.node.getPort(name).options.color : color} />
                </PortWidget>
                {input && !this.props.node.options.minimized && label}
            </PortContainer>
        )
    }

    openModal = () => {
        switch(this.props.node.options.name) {
            case "Integration": return this.context.toggleEditor(this.props)
            case "Databas": return this.context.toggler("showDatabase")(this.props)
            case "Omvandlare": return this.context.toggler("showTransformer")(this.props)
            default: return this.context.toggleEditor(this.props)
        }
        
    }

    async runNode() {
        if (this.state.active) return

        // console.info("%c"+Date.now(), "color: transparent;")
        console.info("%cStart", "color: #c4c4c4; font-weight: 500; font-size: 10px; font-family: 'Exo 2','Oxygen',sans-serif!important; text-transform: uppercase;")
        console.info()
        const tree = new TreeEvaluator(this.props.node)
        const data = await tree.evaluate()
        console.info("%cSlut", "color: #c4c4c4; font-weight: 500; font-size: 10px; font-family: 'Exo 2','Oxygen',sans-serif!important; text-transform: uppercase; padding-bottom: 10px;")
        // console.info("%c__________________________________________", "color: transparent; border-bottom: 1px solid #ececec;")
        console.info()
        // console.info({ type: "result", payload: tree })
    }

    render() {

        return (
            <Container  minimized={this.props.node.options.minimized } transparent={true} selected={this.props.node.isSelected()} color={this.props.node.options.color} onDoubleClick={this.openModal}>
                <ToolContainer style={{ opacity: this.props.node.isSelected() ? 1 : 0, visibility: this.props.node.isSelected() ? "visible" : "none"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M17 13v1c0 2.77-.664 5.445-1.915 7.846l-.227.42-1.747-.974c1.16-2.08 1.81-4.41 1.882-6.836L15 14v-1h2zm-6-3h2v4l-.005.379a12.941 12.941 0 0 1-2.691 7.549l-.231.29-1.55-1.264a10.944 10.944 0 0 0 2.471-6.588L11 14v-4zm1-4a5 5 0 0 1 5 5h-2a3 3 0 0 0-6 0v3c0 2.235-.82 4.344-2.271 5.977l-.212.23-1.448-1.38a6.969 6.969 0 0 0 1.925-4.524L7 14v-3a5 5 0 0 1 5-5zm0-4a9 9 0 0 1 9 9v3c0 1.698-.202 3.37-.597 4.99l-.139.539-1.93-.526c.392-1.437.613-2.922.658-4.435L19 14v-3A7 7 0 0 0 7.808 5.394L6.383 3.968A8.962 8.962 0 0 1 12 2zM4.968 5.383l1.426 1.425a6.966 6.966 0 0 0-1.39 3.951L5 11 5.004 13c0 1.12-.264 2.203-.762 3.177l-.156.29-1.737-.992c.38-.665.602-1.407.646-2.183L3.004 13v-2a8.94 8.94 0 0 1 1.964-5.617z"/></svg>
                    <svg onClick={e => {
                        this.props.node.remove()
                        this.props.engine.repaintCanvas()
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z"/></svg>
                </ToolContainer>


                <Header minimized={this.props.node.options.minimized } transparent={true} color={this.props.node.options.color}>
                    <AlignCenter style={{paddingLeft: this.props.node.options.minimized ? "5px" : "0"}} iColor={true && this.props.node.options.color}>
                        {listItems.find(e => e.title === this.props.node.options.name).icon}
                        {(this.props.node.options && this.props.node.options.name) || this.props.node.options.name}
                    </AlignCenter>
                   {this.props.node.options.tools && 
                        this.props.node.options.tools.play && 
                            <AlignCenter 
                                style={{
                                    position: "absolute", 
                                    right: 5, 
                                    display: this.props.node.options.minimized ? "none" : "flex"
                                }} 
                                transparent={true} 
                                onClick={() => void this.runNode()} color={chroma(this.props.node.options.color).darken(0.4).hex()}>
                        <span>
                            {this.state.active ? <LoadIcon /> : <StartIcon />}
                        </span>
                    </AlignCenter>}

                

                    {this.props.node.options.minimized && 
                        <AlignCenter style={{position: "absolute", width: "100%", top: 5}}>
                            {this.props.node.options.fields.map((field, i) => (
                                <Ports minimized={this.props.node.options.minimized} transparent={true} key={i +"-"+ this.state.version}>
                                    {this.generatePort(field.input, true)}
                                    {this.generatePort(field.output, false)}
                                </Ports>))}
                        </AlignCenter>}
                </Header>


               {!this.props.node.options.minimized && 
                    <div>
                        {this.props.node.options.fields.map((field, i) => (
                            <Ports transparent={true} key={i +"-"+ this.state.version + Math.random().toString(36).substring(2)}>
                                {this.generatePort(field.input, true)}
                                {this.generatePort(field.output, false)}
                            </Ports>))}
                    </div>}
            </Container>
        );
    }
}

// 
// #48b72e


 /* <EditButton transparent={true} onClick={() => {
                        switch(this.props.node.name) {
                            case "Integration": return this.props.node.toggleEditor(this.props)
                            case "Databas": return this.props.node.toggler("showDatabase")(this.props)
                            case "Omvandlare": return this.props.node.toggler("showTransformer")(this.props)
                            default: return this.props.node.toggleEditor(this.props)
                        }
                        
                    }} color={chroma(this.props.node.options.color).darken(0.4).hex()} /> */