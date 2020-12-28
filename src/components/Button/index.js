import styled, { css } from 'styled-components'
import chroma from 'chroma-js'
const borderColor = "#f3ecec"

const ButtonWrapper = styled.button`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: ProximaNova, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  text-rendering: optimizeLegibility;


  

  outline: none;
  /* background: white; */
  border: none;
  /* border: 1px solid #f1f1f1; */

  border-right: ${props => props.borderNone ? "none" : "1px solid #f3ecec"};
  border-color: #cccccc;
  border-color: ${borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px 10px 10px;
  user-select: none;
  align-items: center;
  color: #a0a0a0;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  border-width: 1px 1px 1px 1px;
  border: 1px solid #f3ecec;


  ${props => props.left && css`
    border-radius: 4px 0 0 4px;
    border-radius: 4px;
    padding: 9px 15px ;
    color: white!important;
    color: rgb(255 255 255);
    font-weight: 500;
    background: #5d5d5d;
    background: #2196f3;

    ${'' /* background: #486cbf; */}
    margin-right: 15px;
    margin-left: 0px;

    
    
    & > svg {
      width: 15px;
      height: 15px;
      margin-right: 4px;
  }

  ${'' /* border-bottom: 4px solid ${chroma("#2196f3").darken(0.6).hex()}; */}

   &:hover {
     background: ${chroma("#2196f3").darken(0.2).hex()};
   }

  `}


  border-radius: 4px;

  ${props => props.right && css`
    ${'' /* border-radius: 0 4px 4px 0; */}
    border-left: 0px;

    color: rgb(255 255 255);
    color: white!important;
    font-weight: 500;
    background: #217fa5;
    background: #ff7070;
    background: #ffc107;
    background: #03a9f4;

    padding: 10px 15px 10px 10px;


    font-weight: 400;
    background: #efefef;
    color: #888888;

    padding: 10px 12px;
    margin-right: 10px;


    background: var(--element-color);
    border: 1px solid var(--element-border-color);

    &:hover {
     background: var(--element-hover-color);
     box-shadow: var(--box-shadow-1-arg) var(--box-shadow-2-arg) var(--box-shadow-3-arg) var(--box-shadow-4-arg) var(--box-shadow-5-arg);
     ${'' /* ${chroma("#efefef").darken(0.2).hex()} */}
   }


    &:focus {
        /* border-color: #4dacff; */
        /* color: #4dacff; */
        /* box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.05); */
        box-shadow: var(--box-shadow-1-arg) var(--box-shadow-2-arg) var(--box-shadow-3-arg) var(--box-shadow-4-arg) var(--box-shadow-5-arg);
    }


   ${'' /* border-bottom: 4px solid ${chroma("#efefef").darken(0.2).hex()}; */}

    & > svg {

      width: 20px;
      height: 17px;


      path {

      }
  }
  `}

  ${props => props.danger && css`
    border-radius: 4px;
    border-left: 0px;
    margin: 0 0px;

    color: rgb(255 255 255);
    color: white!important;
    font-weight: 500;
 
    background: #ff5050;

    padding: 10px 15px 10px 15px;
    ${'' /* border-bottom: 4px solid ${chroma("#ff5050").darken(0.2).hex()}; */}
  
  border: none;
    
    & > svg {
      width: 15px;
      height: 15px;
      ${'' /* margin-left: 2px; */}
  }
  `}



  

  /* border-width: 0 0 0px 0!important; */

  ${props => props.transparent &&  css`background: transparent!important; path { fill: #989898; }`}
  &:hover {
    /* border-color: #4dacff; */
    /* background: #f3f3f3; */
    color: #4dacff;
    ${props => props.transparent &&  css`background: transparent!important; path { fill: ${chroma("#989898").darken(0.2).hex()}; }`}
    /* box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.05); */
  }

  & > svg, & > svg > path {
      color: white!important;
  }
`;


export default ButtonWrapper