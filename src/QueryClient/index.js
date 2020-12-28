import React from 'react'

import styled from 'styled-components'
import Dropdown from './Dropdown'

const Container = styled.div`
padding: 20px;
    & {
        ul.tree, ul.tree ul {
        list-style: none;
         margin: 0;
         padding: 0;
       } 
       ul.tree ul {
         margin-left: 10px;
       }
       ul.tree li {
         margin: 0;
         padding: 0 7px;
         line-height: 20px;
         /* color: #369; */
         /* font-weight: bold; */
         border-left: 1px solid #dadada;

         position: relative;
    
       }
       ul.tree li:last-child {
           border-left:none;
       }
       ul.tree li:before {
          position:relative;
          top:-0.3em;
          height:3em;
          width:40px;
          color:white;
          border-bottom: 1px solid #dadada;
          content:"";
          display:inline-block;
          left:-7px;
       }
       ul.tree li:last-child:before {
          border-left: 1px solid #dadada;   
       }
    }
`


const Tree = styled.ul.attrs({className: "tree"})`
    border: none!important;
    
    &:before {
        border: none!important;
    }

    &:after {
        border: none!important;
    }
`




const tree = {
    and: [
        {
            "==": [
                { var: "user.name"},
                "viktor"
            ]
        },
        {
            "<=": [
                { var: 123},
                299
            ]
        },
    ]
}


function TreeGenerator(props) {
    if(!props.tree) return null
    const keys = Object.keys(props.tree)

    if(keys) {
        const [key] = keys

        const data = props.tree[key]

        if(key === "==") {
            return data.map(tree => (
                <div> </div>
            ))
        }

        return data.map(tree => (
            <TreeGenerator tree={tree} />
        ))
    }
}

const Operator = styled.div`
    position: absolute;
    left: -15px;
    padding: 1px 5px;
    font-size: 12px;
    border-radius: 4px;
    background-color: #ffa500;
    color: white;
    z-index: 10;
    top: 56%;
`


const InputWrapper = styled.input`
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ProximaNova, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
    text-rendering: optimizeLegibility;
    

    height: 34px;
    max-width: 150px;
    outline: none;
    background-color: #f9f9f9;
    background: #fdfdfd;
    /* border: 1px solid #f1f1f1; */
    border-color: #d4d4d4;
    border: none;
    padding: 2px 10px;
    position: relative;
    left: 0;
    width: 300px;

    color: #81858e;
    color: #4c5058;
    cursor: pointer;
    display: inline-block;
    box-sizing: content-box;
    vertical-align: bottom;

    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    /* &:hover,
    &:focus {
    /* border-color: #4dacff; */
    /* color: #4dacff; */
    /* box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.05); */
    /* } */


    &::placeholder {
        color: rgba(160, 160, 160, 0.6);
        color: #a9a9a9;
        font-weight: ${props => props.placeholderWeight ? props.placeholderWeight : 400};
    }

    transform: translate(-12px,37%);

    border-radius: 4px;
    margin: 5px 0px 5px 0px;
    background: #ececec;
    background: #f3f3f3;
    padding: 2px 18px;

 
`




function QueryClient() {
    return (
        <Container>
            <Tree>
                <span style={{fontWeight: 600}}>When </span> result returns
                
                <ul>
                    <li><Operator>AND</Operator>   <InputWrapper/> <InputWrapper/> </li>
                    <li><Operator>AND</Operator>  <InputWrapper/> <InputWrapper/> <InputWrapper/></li>
                    <li> Hello this is a group
                        <ul>
                            <li><Operator>AND</Operator>  <InputWrapper/> <InputWrapper/> <InputWrapper/></li>
                            <li><Operator>AND</Operator>  <InputWrapper/> <InputWrapper/> <InputWrapper/></li>
                            <li><Operator>AND</Operator>  <InputWrapper/> <InputWrapper/> <InputWrapper/></li>
                        </ul>
                    </li>

                </ul>


            </Tree>

        </Container>
    )
}


/* {/* <ul>
<li>Elephant</li>
<li>Mouse</li>
</ul> } 
*/
export default QueryClient