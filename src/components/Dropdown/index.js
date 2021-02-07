import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'




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
  

const Container = styled.div`
/* min-height: 25px; */
/* height: 100%; */

${props => props.relative && "position: relative;"}

  margin: 5px 0;

  & * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ProximaNova, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    text-rendering: optimizeLegibility;
  }
`;

const borderColor = "#f3ecec"


const Wrapper = styled.div`

display: inline-block;
width: 100%;
height: 100%;
box-sizing: border-box;
/* position: relative; */
display: flex;
justify-content: center;
align-items: center;




${(props) =>
  props.isOpen &&
  css`
    ${'' /* background: #fdfdfd; */}
  `}
${"" /* border: 1px solid #e8e8e8; box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);*/}
`;
const Select = styled.div`


display: flex;
justify-content: space-between;
padding: 6px 10px;
user-select: none;
align-items: center;
color: #a9a9a9;
color: #808080;

position: relative;
border-radius: 2px;
font-size: 12px;
font-weight: 400;
cursor: pointer;

& > span {
    padding: 2px 6px;
    border-radius: 3px;

    /* color: #808080; */
    color: #4c5058;
}

/* &:hover {
  box-shadow: ${props => !props.none ? "var(--box-shadow-1-arg) var(--box-shadow-2-arg) var(--box-shadow-3-arg) var(--box-shadow-4-arg) var(--box-shadow-5-arg)" : ""};
} */

&:hover {
  border-color: #0089ff;
}






& > svg {
  margin-left: 5px;
  
  /* #e5e5e5 */
  padding-left: 10px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}


& > label {
        position: absolute;
        z-index: 1;
        padding: 2px 6px;
        top: -18px;
        background: white;
        pointer-events: none;
        color: #808080;
        left: 0px;
        /* align-self: flex-start; */
        transition: font-size 0.2s, transform 0.2s;
        transform: ${props => `translate(${(props.isOpen || props.value) ? 10 : 10}px, ${(props.isOpen || props.value) ? 10 : 27}px)`};
        font-size: ${props => (props.isOpen || props.value) ? "12px" : "14px"};
    }
/* border-color: #4dacff; */
${(props) =>
  props.isOpen &&
  css`

  
    & > span {
      color: #a9a9a9;
      color: #808080;

    }
    color: #4dacff;
    ${'' /* border-color: #4dacff !important;
    border: none; */}
    & path {
      ${'' /* fill: #a9a9a9 !important; */}
    }

    & > svg {
      border-color: #0089ff!important;
    }


    box-shadow: ${props => !props.none ? "var(--box-shadow-1-arg) var(--box-shadow-2-arg) var(--box-shadow-3-arg) var(--box-shadow-4-arg) var(--box-shadow-5-arg)" : ""};
    
  `}




& path {
  transition: fill 0.2s;
}

/* border-left: 1px solid ${borderColor}; */


&:hover {
  /* color: #4dacff; */
}

${props => props.none ? "" : "border-bottom: 0px solid  #e5e5e5;"}

${props => props.default ? css`
    background: transparent!important;
    padding: 0;
    & > svg {
        width: unset!important;
        height: unset!important;
        margin-right: 0!important;
        padding: 0!important;
    }

    border: none!important;
`: css`
    background: #ececec;
    background: #f3f3f3;


    background: var(--element-color);
    border: 1px solid var(--element-border-color);

    width: 100%;
    min-width: 100px;
    height: 40px;
`} 



transition: background-color 0.2s, color 0.2s, border-color 0.2s;
box-sizing: border-box;

${props => props.isOpen && css`
  border-color: #0089ff;


`}
`;


const SelectList = styled.ul`
  position: absolute;
  min-width: 100%;
  width: fit-content;
  box-sizing: border-box;
  /* display: ${(props) => (props.isOpen ? "flex" : "none")}; */
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  justify-content: center;
  flex-flow: column;
  text-decoration: none;
  list-style: none;
  margin-top: 0px;
  z-index: 2000;
  background: white;
  padding-left: 0;

  visibility: hidden;
  opacity: 0;
  transform: scale(0.8);
  transition: visibility 0.2s, opacity 0.2s, transform 0.2s;


  /* overflow: hidden; */
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.05);
  box-shadow:0px 0px 0px 1px rgba(0,0,0,0.05);
  box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.05);
  border: 1px solid #e4e4e4;

  ${(props) =>
    props.isOpen &&
    css`
      background-color: white;
      visibility: visible;
      opacity: 1;
      transform: scale(1);
    `}

  & > li:first-child {
  }
  & > li:last-child {
    border-bottom: none;
  }
  border: solid #cccccc;
  border: none;
  /* border-width: 0 1px 1px 1px; */
  border-radius: 4px;
  & > li {
    border-bottom: 1px solid #ececec;

    font-size: 12px;
    font-weight: 400;
    text-align: right;

    color: #a2a2a2;
      border: none;
    padding: 7px 15px;
    cursor: pointer;
    margin: 0px 0;
    /* border-bottom: 1px solid #ececec; */
    &:hover {
      background: #f9f9f9;
    }
  }

  top: calc(100% + 4px);
  right: 0;

  color: var(--element-list-item-color);
  border: 1px solid var(--element-border-color);
`;

const Dropdown = (props) => {
    const [bind, isOpen] = useToggler();
    const [value, setValue] = useState(() => props.value)

  
    const { hide={} } = props
  
    const defaultValue = value
  
    const defaultOption = (props.options || []).find(e => e.value === (defaultValue || "get"))

  
  
    return (
      <Container relative={!props.borderNone} ref={bind.ref} style={{...hide}}>
        <Wrapper isOpen={isOpen}>
          <Select none={props.borderNone} isOpen={isOpen} value={defaultValue} style={props.style} default={props.default} >
            <label>{props.placeholder || "Välj.."}</label>
            {props.disableLabel ? null : <span>{ (defaultOption && defaultOption.label)}</span>}


            {props.icon 
              ? props.icon
              : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="27" height="18" style={{borderLeft: "1px solid #e0e0e0"}}><path fill-rule="evenodd" fill="currentColor" d="M5.22 8.72a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06L12 14.44 6.28 8.72a.75.75 0 00-1.06 0z"></path></svg>
              }
          </Select>
          <SelectList isOpen={isOpen}>
            {(props.options || []).map((e) => (
              <li key={e.value} style={{fontWeight: 500, color: e.color ? e.color : "currentColor"}} onClick={() => setValue(e.value)}>{e.label}</li>
            ))}
          </SelectList>
        </Wrapper>
      </Container>
    );
}
  
export default Dropdown