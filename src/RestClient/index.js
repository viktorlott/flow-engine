import React, { useCallback, useState, useContext, useRef, useEffect } from 'react'
import {
    Container,
    Sidebar,
    DragSidebar,
    RequestBody,
    DragResReq,
    ResponseBody,
    RequestBodyHeader,
    RequestBodyContent,
    Tabs,
    Tab,
    Header,
    MainHeader,
    ResponseBodyHeader,
    ResponseBodyContent,
    SideMenu,
    SideMenuSection,
    SideMenuContainer
} from './styled'
import Dropdown from './Dropdown'
import Input from './Input'
import Button from './Button'
import { CodeIcon } from './icons'

import { useForm } from 'react-hook-form'

import Editor, { monaco } from '@monaco-editor/react';

import useResizeObserver from "use-resize-observer";
import schema from './schema_context'
import get from 'lodash/get'
import styled, { createGlobalStyle }  from 'styled-components'
import InputTable from './InputTable'
import FormDataTable from './FormDataTable'

import CodeEditor from './CodeEditor'
import ShowAutocompletion from './CodeEditor/showautocompletion'
import ToolTip from './ToolTip'
import ToolTipPopup from '../ToolTipPopup'

import IntegrationModel from '../utils/IntegrationModel'
import axios from 'axios'
import chroma from 'chroma-js'
import moment from 'moment'

import Modal from './Modal'
import * as SchemaJSON from 'json-schema-generator'

import MailIcon from '../components/Mail'
import SuccessIcon from './SuccessIcon'


let hasGlobalContext = false

function safeJsonParse(str) {
  try {
      return [null, JSON.parse(str)];
  } catch (err) {
      return [err];
  }
}

function monacoConfiguration({ monaco, lang, value }) {
    const [err, isJSON] = safeJsonParse(value)

    if(!hasGlobalContext) {
      ShowAutocompletion({ globals: schema }, monaco, lang)
      hasGlobalContext = true
    }

    import('monaco-themes/themes/Monokai.json')

    .then(data => {
        monaco.editor.defineTheme('monokai', data);
    })
    const properties = {
        value,
        language:  lang,
    }

    return properties


}


const methods = [
    { label: "GET", value: "get" },
    { label: "POST", value: "post" },
    { label: "PUT", value: "put" },
    { label: "PATCH", value: "patch" },
    { label: "DELETE", value: "delete" }
]

const typeList = [
    { label: "mall", value: "standard" },
    { label: "form-data", value: "formdata" },
    { label: "x-www-form-urlencoded", value: "formurlencoded" },
    { label: "binär", value: "binary" },
    { label: "inget", value: "none" },
]

const requestTabs = [
    { label: "Förskript", value: "prescript", icon: <CodeIcon width="15" height="15" />  },
    { label: "Authorization", value: "auth", icon: <KeyIcon width="15" height="15"/>  },
    { label: "Headers", value: "headers",  icon: <FileIcon width="15" height="15"/>  },
    { 
      label: "Body", 
      value: "body", 
      list: typeList, 
      listName: "type", 
      icon: <TemplateIcon width="15" height="15"/>
    },
]

const responseTabs = [
    { label: "Resultat", value: "result", icon: <CodeIcon width="15" height="15" /> },
    { label: "Headers", value: "headers", icon: <FileIcon width="15" height="15"/> },
    // { label: "Kakor", value: "cookie", icon: null },
    { label: "Loggar", value: "logs", icon: <LogIcon width="15" height="15"/> },
    { label: "Konsol", value: "console", icon: <CodeIcon width="15" height="15" /> },
    { label: "Schema", value: "schema", icon: <Schema width="15" height="15" /> },
]



const headersDefault = {
    cols: [{ name: "key", default: "", placeholder: "nyckel e.g. content-type" }, { name: "value", default: "", placeholder: "värde e.g. text/plain" }],
    rows: [
      {
          key: "",
          value: ""
      }
    ]
  }



  const formdataDefault = {
    cols: [{ name: "key", default: "", placeholder: "nyckel" }, { name: "value", default: "", placeholder: "värde" }],
    rows: [
      {
          type: "text",
          key: "",
          value: "",
          file: ""
      }
    ]
  }


function BoltIcon() {
    return (
      <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 21.5L17.5 13L13 10L15 2.5L6.5 11L11 14L9 21.5Z" fill="currentColor" />
  </svg>
    )
  }


  
  

  const AbsoluteCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `


function CloudIcon() {
    return (
        <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.738 19.9964C14.8186 19.9988 14.8994 20 14.9806 20C19.3989 20 22.9806 16.4183 22.9806 12C22.9806 7.58172 19.3989 4 14.9806 4C12.4542 4 10.2013 5.17108 8.73522 7H7.51941C3.92956 7 1.01941 9.91015 1.01941 13.5C1.01941 17.0899 3.92956 20 7.51941 20H14.5194C14.5926 20 14.6654 19.9988 14.738 19.9964ZM16.6913 17.721C19.0415 16.9522 20.9806 14.6815 20.9806 12C20.9806 8.68629 18.2943 6 14.9806 6C11.6669 6 8.98059 8.68629 8.98059 12H6.98059C6.98059 10.9391 7.1871 9.92643 7.56211 9H7.51941C5.03413 9 3.01941 11.0147 3.01941 13.5C3.01941 15.9853 5.03413 18 7.51941 18H14.5194C15.0691 18 15.9041 17.9014 16.6913 17.721Z"
          fill="currentColor"
        />
      </svg>
    )
}


function RewardIcon() {
    return (
        <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19 9C19 11.3787 17.8135 13.4804 16 14.7453V22H13.4142L12 20.5858L10.5858 22H8V14.7453C6.18652 13.4804 5 11.3787 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9ZM17 9C17 11.7614 14.7614 14 12 14C9.23858 14 7 11.7614 7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9ZM10 19.7573L12 17.7573L14 19.7574V15.7101C13.3663 15.8987 12.695 16 12 16C11.305 16 10.6337 15.8987 10 15.7101V19.7573Z"
          fill="currentColor"
        />
      </svg>
    )
}


function FileIcon(props) {
    return (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={props.width || "24"} height={props.height || "24"}><path fill="currentColor" fill-rule="evenodd" d="M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25H1.75z"></path><path fill="currentColor" fill-rule="evenodd" d="M5 8.75A.75.75 0 015.75 8h11.5a.75.75 0 010 1.5H5.75A.75.75 0 015 8.75zm0 4a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75z"></path></svg>
    )
}



function TemplateIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="currentColor" fill-rule="evenodd" d="M5.962 2.513a.75.75 0 01-.475.949l-.816.272a.25.25 0 00-.171.237V21.25c0 .138.112.25.25.25h14.5a.25.25 0 00.25-.25V3.97a.25.25 0 00-.17-.236l-.817-.272a.75.75 0 01.474-1.424l.816.273A1.75 1.75 0 0121 3.97v17.28A1.75 1.75 0 0119.25 23H4.75A1.75 1.75 0 013 21.25V3.97a1.75 1.75 0 011.197-1.66l.816-.272a.75.75 0 01.949.475z"></path><path fill-rule="evenodd" fill="currentColor"  d="M7 1.75C7 .784 7.784 0 8.75 0h6.5C16.216 0 17 .784 17 1.75v1.5A1.75 1.75 0 0115.25 5h-6.5A1.75 1.75 0 017 3.25v-1.5zm1.75-.25a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25h-6.5z"></path></svg>
  )
}

function LogIcon(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={props.height} height={props.height}><path fill="currentColor" fill-rule="evenodd" d="M4 7a1 1 0 100-2 1 1 0 000 2zm4.75-1.5a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zm0 6a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zm0 6a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zM5 12a1 1 0 11-2 0 1 1 0 012 0zm-1 7a1 1 0 100-2 1 1 0 000 2z"></path></svg>
    )


}

function CookieIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9837 21.9999C6.47237 21.9938 2.00605 17.5203 2 11.9999C2.39311 12.1112 2.79955 12.168 3.20803 12.1689C4.55933 12.1789 5.82888 11.5217 6.6025 10.412C7.29413 9.41154 7.44027 8.13091 6.99186 6.99997C7.27858 7.05119 7.5692 7.07729 7.86045 7.07797C9.1552 7.08764 10.3841 6.50698 11.2 5.49998C11.9984 4.52274 12.3106 3.2352 12.0486 2C17.5625 2.01795 22.0178 6.50963 21.9999 12.0324C21.982 17.5553 17.4976 22.0178 11.9837 21.9999ZM12.7455 18.5679C12.8991 18.634 13.0645 18.6681 13.2317 18.6679C13.7362 18.6674 14.1909 18.363 14.3842 17.8961C14.5775 17.4293 14.4714 16.8919 14.1152 16.5339C13.8805 16.2998 13.5629 16.1683 13.2317 16.1679C12.6392 16.1693 12.1294 16.5877 12.0115 17.1693C11.8937 17.7509 12.2004 18.3353 12.7455 18.5679ZM6.91199 16.8749C7.11205 16.9578 7.32647 17.0003 7.54296 16.9999C8.21842 16.9997 8.82678 16.5907 9.08272 15.9646C9.33867 15.3385 9.19143 14.6195 8.71006 14.1449C8.3989 13.838 7.97969 13.6659 7.54296 13.6659C6.62442 13.667 5.88022 14.4129 5.87967 15.3329C5.87984 16.0017 6.2781 16.606 6.89202 16.8689H6.89702H6.908L6.91199 16.8749ZM16.3276 14.3679C16.9987 14.6502 17.775 14.4627 18.2439 13.9051C18.7127 13.3475 18.7652 12.5493 18.3733 11.9349C18.2506 11.7436 18.0902 11.5793 17.9021 11.4519C17.3853 11.1024 16.7167 11.0716 16.17 11.3721C15.6233 11.6726 15.2902 12.254 15.307 12.8784C15.3238 13.5028 15.6877 14.0654 16.2498 14.3359H16.2378L16.2677 14.3489L16.2877 14.3569H16.2817C16.296 14.3615 16.31 14.3669 16.3236 14.3729L16.3276 14.3679ZM11.9837 10.333C11.5855 10.3323 11.2426 10.6141 11.1655 11.0054C11.0883 11.3967 11.2986 11.7879 11.6672 11.9389C12.0357 12.0899 12.4594 11.9583 12.6782 11.625C12.8969 11.2917 12.8493 10.8499 12.5648 10.571C12.4906 10.4978 12.4032 10.4394 12.3072 10.399L12.2892 10.391L12.2623 10.381C12.1729 10.349 12.0786 10.3328 11.9837 10.333ZM15.7276 6.16697C15.0888 6.16539 14.5526 6.64873 14.4871 7.28522C14.4216 7.92172 14.8481 8.50444 15.4738 8.63339C16.0995 8.76235 16.7211 8.39562 16.9118 7.78494C17.1025 7.17425 16.8004 6.51814 16.2128 6.26698H16.2028C16.0525 6.20267 15.8911 6.16869 15.7276 6.16697ZM4.49593 9.49996C4.03663 9.49996 3.66429 9.12701 3.66429 8.66696C3.66429 8.20691 4.03663 7.83397 4.49593 7.83397C4.95524 7.83397 5.32757 8.20691 5.32757 8.66696C5.32702 9.12679 4.95501 9.49941 4.49593 9.49996ZM3.24797 6.99997C2.55873 6.99997 2 6.44033 2 5.74998C2 5.05963 2.55873 4.49999 3.24797 4.49999C3.9372 4.49999 4.49593 5.05963 4.49593 5.74998C4.49483 6.43988 3.93674 6.99887 3.24797 6.99997ZM8.23983 5.33298C7.55059 5.33298 6.99186 4.77334 6.99186 4.08299C6.99186 3.39264 7.55059 2.833 8.23983 2.833C8.92906 2.833 9.48779 3.39264 9.48779 4.08299C9.48779 4.7735 8.92922 5.33343 8.23983 5.33398V5.33298ZM5.32857 3.66699C4.8694 3.66699 4.49711 3.29425 4.49693 2.83433C4.49675 2.37441 4.86873 2.00137 5.32791 2.001C5.78708 2.00063 6.15967 2.37308 6.16022 2.833C6.16022 3.29321 5.78804 3.66644 5.32857 3.66699Z" fill="currentColor"></path>
</svg>

    )
}


function KeyIcon(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="currentColor" d="M16.75 8.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"></path><path fill="currentColor" fill-rule="evenodd" d="M15.75 0a8.25 8.25 0 00-7.851 10.79L.513 18.178A1.75 1.75 0 000 19.414v2.836C0 23.217.784 24 1.75 24h1.5A1.75 1.75 0 005 22.25v-1a.25.25 0 01.25-.25h2.735a.75.75 0 00.545-.22l.214-.213A.875.875 0 009 19.948V18.5a.25.25 0 01.25-.25h1.086c.464 0 .91-.184 1.237-.513l1.636-1.636A8.25 8.25 0 1015.75 0zM9 8.25a6.75 6.75 0 114.288 6.287.75.75 0 00-.804.168l-1.971 1.972a.25.25 0 01-.177.073H9.25A1.75 1.75 0 007.5 18.5v1H5.25a1.75 1.75 0 00-1.75 1.75v1a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25v-2.836a.25.25 0 01.073-.177l7.722-7.721a.75.75 0 00.168-.804A6.73 6.73 0 019 8.25z"></path></svg>
    )
}

function Schema(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="currentColor" d="M16.53 9.78a.75.75 0 00-1.06-1.06L11 13.19l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5-5z"></path><path fill-rule="evenodd" fill="currentColor" d="M12.54.637a1.75 1.75 0 00-1.08 0L3.21 3.312A1.75 1.75 0 002 4.976V10c0 6.19 3.77 10.705 9.401 12.83.386.145.812.145 1.198 0C18.229 20.704 22 16.19 22 10V4.976c0-.759-.49-1.43-1.21-1.664L12.54.637zm-.617 1.426a.25.25 0 01.154 0l8.25 2.676a.25.25 0 01.173.237V10c0 5.461-3.28 9.483-8.43 11.426a.2.2 0 01-.14 0C6.78 19.483 3.5 15.46 3.5 10V4.976c0-.108.069-.203.173-.237l8.25-2.676z"></path></svg>
  )
}

//         <svg
//  width={props.width || "24"} height={props.height || "24"}
//   viewBox="0 0 24 24"
//   fill="none"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <path
//     fill-rule="evenodd"
//     clip-rule="evenodd"
//     d="M6 8C4.34315 8 3 9.34315 3 11V13C3 14.6569 4.34315 16 6 16C7.65685 16 9 14.6569 9 13H15V15H17V13H18V15H20V11H9C9 9.34315 7.65685 8 6 8ZM7 13V11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14C6.55228 14 7 13.5523 7 13Z"
//     fill="currentColor"
//   />
// </svg>

function CloseIcon() {
    return (
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
    fill="currentColor"
  />
</svg>
    )
}
 
function SaveIcon() {
  return (
    
    <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="save"><rect width="24" height="24" opacity="0"/><path fill="currentColor" d="M20.12 8.71l-4.83-4.83A3 3 0 0 0 13.17 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7.17a3 3 0 0 0-.88-2.12zM10 19v-2h4v2zm9-1a1 1 0 0 1-1 1h-2v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2v5a1 1 0 0 0 1 1h4a1 1 0 0 0 0-2h-3V5h3.17a1.05 1.05 0 0 1 .71.29l4.83 4.83a1 1 0 0 1 .29.71z"/></g></g></svg>
  )
}


function IntegrationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" fill="currentColor" d="M16.168 2.924L4.51 13.061a.25.25 0 00.164.439h5.45a.75.75 0 01.692 1.041l-2.559 6.066 11.215-9.668a.25.25 0 00-.164-.439H14a.75.75 0 01-.687-1.05l2.855-6.526zm-.452-1.595a1.341 1.341 0 012.109 1.55L15.147 9h4.161c1.623 0 2.372 2.016 1.143 3.075L8.102 22.721a1.149 1.149 0 01-1.81-1.317L8.996 15H4.674c-1.619 0-2.37-2.008-1.148-3.07l12.19-10.6z"></path></svg>
  )
}

function isHTML(str) {
  var a = document.createElement('div');
  a.innerHTML = str;

  for (var c = a.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true; 
  }

  return false;
}

function ReponseViewer(props) {
  const monacoRef = React.useRef()
  const editorRef = React.useRef()

  useEffect(() => {
    if(editorRef.current) {
        monaco.init().then(monacoInstance => {
                const [err, isJSON] = safeJsonParse(props.value)
                const isHtml = isHTML(props.value)

                const properties = {
                    theme: "Katzenmilch",
                    value: props.value,
                    language:  props.lang ? props.lang : isJSON ? "json" : isHtml ? "html" : "html",
                    minimap: {
                      enabled: false
                    },
                    readOnly: true,
                    lineNumbers: 'off',
                }
                    
                monacoRef.current = monacoInstance.editor.create(editorRef.current,  properties)
        })
    }
},[])

  useEffect(() => {
    if(monacoRef.current) {
      const [err, isJSON] = safeJsonParse(props.value)
      const isHtml = isHTML(props.value)

      // console.log(monacoRef.current.updateOptions({"language": isJSON ? "json" : isHtml ? "html" : "html"}))
      monacoRef.current.setValue(props.value)
    }
  }, [props.value])

  return (
    <div ref={editorRef} style={{height: "calc(100%)"}}/>
  )
}


function DropArrowIcon(props) {
  return (
    <svg {...props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill={props.color ? props.color : "currentColor"}></path>
    </svg>

  )
}

/* <h3 style={{color: "#afafaf"}}><i style={{ transform: "scale(2)", opacity: 0.1 }} className="gg-loadbar-doc"></i></h3> */

const defaultState = { requestTab: "body", responseTab: "result", url: "", method: "get", body: "", responseRaw: "", headers: headersDefault, type: "standard", formdata: formdataDefault, response: "", logs: "", schema: "", name: "" }

function RestClient(props) {

    const [state, setState] = React.useState(() => props.value || defaultState)
    const [history, setHistory] = React.useState(() => [])

    const [closeModal, setCloseModal] = React.useState(false)
    const [saveModal, setSaveModal] = React.useState(false)


    const triggerSaveModal = React.useCallback(() => {
      setSaveModal(true)
      setTimeout(() => {
        setSaveModal(false)
        props.toggle(null)
      }, 2000)
    },[])


    const register = () => {}
    const unregister = () => {}

    const setValue = useCallback((name, value) => {
      setState(prev => ({ ...prev, [name]: value }))
    },[])

    const watch = (name, defaultVal) => {
      return state[name] || defaultVal
    }

    const log = (status, statusMessage) => `[${moment().format("YY/MM/DD HH:mm:ss")}] ${state.method.toUpperCase()} ${state.url}\n    - Status: ${status}\n    - Message: ${statusMessage}\n`


    const onSubmit = async () => {

        if(!state.url) return 

        const integration = new IntegrationModel(state)
        




        try {
          const result = await integration.execute()
          const handleData = data => typeof data === "string" ? data : JSON.stringify(data, null, 2)
          const getSchema = value => JSON.stringify(typeof result === "object" ? SchemaJSON(value) : SchemaJSON(JSON.parse(value)), null, 2)
          
          if(result.isAxiosError) {
            if (result.response) {
              setState(prev => ({
                ...prev, 
                response: handleData(result.response.data), 
                responseRaw: handleData(result.response), 
                responseStatus: result.response.status, 
                reponseHeaders: result.response.headers,
                schema: "",
                logs: prev.logs + log(result.response.status, result.message) 
              }))
            } else if (result.request) {

              
              setState(prev => ({...prev, error: result.request, responseRaw: handleData(result.request), logs: prev.logs + log(result.status, result.message), schema: getSchema(result.request) }))
            } else {
              
              setState(prev => ({...prev, errorMessage: result.message, responseRaw: handleData(result),  logs: prev.logs + log(result.status, result.message), schema: getSchema(result) }))
            }
            setHistory(his => his.concat({...state, response: handleData(result.data), responseStatus: result.status, responseRaw: handleData(result), responseStatusText: result.responseStatusText, responseHeaders: result.headers, schema: getSchema(result.data) }))
            throw result
          } 
          // console.log(result)

          setState(prev => ({...prev, response: handleData(result.data), responseStatus: result.status, responseRaw: handleData(result), responseStatusText: result.responseStatusText, responseHeaders: result.headers, logs: prev.logs + log(result.status, result.responseStatusText || "OK"), schema: getSchema(result.data) }))
          setHistory(his => his.concat({...state, response: handleData(result.data), responseStatus: result.status, responseRaw: handleData(result), responseStatusText: result.responseStatusText, responseHeaders: result.headers, schema: getSchema(result.data) }))
          
        } catch(err) {
          // console.log(err)
        }

    }


    const setRequestTab = React.useCallback(value => void setState(prev => ({ ...prev, requestTab: value })))
    const setResponseTab = React.useCallback(value => void setState(prev => ({ ...prev, responseTab: value })))

    const type = watch("type", "standard")
    const statusColor = (state.responseStatus >= 200 && state.responseStatus < 300) ? "#339933" : (state.responseStatus >= 300 && state.responseStatus < 400) ? "#3466ff"  : (state.responseStatus >= 400 && state.responseStatus < 500) ? "#ff9800" : (state.responseStatus >= 500 && state.responseStatus < 600) ? "#660299" : "#339933"


    const showIcon = type => {
      switch(type) {
        case "body": return <CodeIcon/>
        case "prescript": return <CodeIcon/>
        case "headers": return <FileIcon/>
        default: return <FileIcon/>
      }
    }

    // #f4f8fc
    // console.log("--<", state.formdata, formdataDefault)

    return (
        <Container>
            <Modal isOpen={closeModal}>
              <AbsoluteCenter style={{flexFlow: "column", background: "white", justifyContent: "center", borderRadius: "3px",alignItems: "center", overflow: "hidden", borderTop: "2px solid #ff5250"}}>
                <div style={{padding: "25px 80px"}}>Är du säker?</div>
                <div style={{display: "flex", width: "100%", justifyContent: "space-evenly", alignItems: "center", padding: "20px 30px"}}>
                  <Button danger onClick={e => void (e.preventDefault(), props.toggle(null))}>Stäng</Button>
                  <Button right onClick={e => void setCloseModal(false)}>Avbryt</Button>
                </div>
              </AbsoluteCenter>
            </Modal>

            <Modal noshadow isOpen={saveModal}>
              <AbsoluteCenter style={{flexFlow: "column", justifyContent: "center", borderRadius: "3px",alignItems: "center", overflow: "hidden"}}>
                <div style={{padding: "20px 30px"}}>
                  <SuccessIcon color="rgb(3, 130, 244)"/>
                </div>
              </AbsoluteCenter>
            </Modal>


            <MainHeader>
              <div>

                <h1>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0L24 0 24 24 0 24z"/><path className="path_signal" d="M3.929 4.929l1.414 1.414C3.895 7.791 3 9.791 3 12c0 2.21.895 4.21 2.343 5.657L3.93 19.07C2.119 17.261 1 14.761 1 12s1.12-5.261 2.929-7.071zm16.142 0C21.881 6.739 23 9.239 23 12s-1.12 5.262-2.929 7.071l-1.414-1.414C20.105 16.209 21 14.209 21 12s-.895-4.208-2.342-5.656L20.07 4.93zM13 5v6h3l-5 8v-6H8l5-8zM6.757 7.757l1.415 1.415C7.448 9.895 7 10.895 7 12c0 1.105.448 2.105 1.172 2.828l-1.415 1.415C5.672 15.157 5 13.657 5 12c0-1.657.672-3.157 1.757-4.243zm10.487.001C18.329 8.844 19 10.344 19 12c0 1.657-.672 3.157-1.757 4.243l-1.415-1.415C16.552 14.105 17 13.105 17 12c0-1.104-.447-2.104-1.17-2.827l1.414-1.415z"/></svg> */}
                  {/* Integration */}
                </h1>

                <h1>

                </h1>

                <div>
                  <AbsoluteCenter style={{opacity: state.responseStatus ? 1 : 0}}>
                      <ToolTipPopup text="Detta är status-koden för kallelsen" delay={500}>
                        <div><p style={{padding: "5px 13px", fontSize:"13.3333px", opacity: state.responseStatus ? 1 : 0, borderRadius: 5, background: statusColor,  color: "white", marginRight: 10, fontWeight: 500}}>{state.responseStatus || 200}</p></div>
                      </ToolTipPopup>
                  </AbsoluteCenter>

          
                </div>
          
              </div>
            </MainHeader>

                <Header>
                 
                  <AbsoluteCenter>
                    <Input width={"100%"} name="name"  watch={watch}  unregister={unregister} style={{marginLeft: 0, fontWeight: "300!important", width: "inherit"}} placeholderWeight="400" setValue={setValue} placeholder={"Namn"} register={register}/>
                  </AbsoluteCenter>
                 
                  <AbsoluteCenter>
                      <AbsoluteCenter style={{marginRight: 10}}>
                        <Dropdown width={"100%"} name="method" placeholder={"Metod"} register={register} setValue={setValue} unregister={unregister} watch={watch}  options={methods}/>
                      </AbsoluteCenter>
                      <AbsoluteCenter style={{width: 400}}>
                        <Input width={"100%"} name="url" watch={watch} unregister={unregister} setValue={setValue} placeholder={"Ange URL"} placeholderWeight="400" register={register}/>
                      </AbsoluteCenter>

                      <AbsoluteCenter style={{marginLeft: 50}}>
                        <ToolTipPopup text="Klicka för att testa" delay={500}>
                            <Button right onClick={onSubmit} style={{color: "#323448", fontWeight: 500}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M3.741 1.408l18.462 10.154a.5.5 0 0 1 0 .876L3.741 22.592A.5.5 0 0 1 3 22.154V1.846a.5.5 0 0 1 .741-.438zM5 13v6.617L18.85 12 5 4.383V11h5v2H5z"/></svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" fill="currentColor" d="M1.513 1.96a1.374 1.374 0 011.499-.21l19.335 9.215a1.146 1.146 0 010 2.07L3.012 22.25a1.374 1.374 0 01-1.947-1.46L2.49 12 1.065 3.21a1.374 1.374 0 01.448-1.25zm2.375 10.79l-1.304 8.042L21.031 12 2.584 3.208l1.304 8.042h7.362a.75.75 0 010 1.5H3.888z"></path></svg> */}
                              </Button>
                        </ToolTipPopup>
                      </AbsoluteCenter>
                  </AbsoluteCenter>


                  <AbsoluteCenter>
                    <AbsoluteCenter>
                    <ToolTipPopup text="Klicka här för att spara" delay={500}>
                        <Button right onClick={e => void (props.onSave ? props.onSave(state) : null, triggerSaveModal())}  style={{color: "#323448", fontWeight: 400}} borderNone>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"></path><path fill="currentColor"  d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"></path></svg> */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path  fill="currentColor" d="M7 19v-6h10v6h2V7.828L16.172 5H5v14h2zM4 3h13l4 4v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm5 12v4h6v-4H9z"/></svg>
                        Spara</Button>
                    </ToolTipPopup>

                    <AbsoluteCenter>
                        <ToolTipPopup text="Klicka här för att stänga" delay={500}>
                            <Button danger style={{color: "#323448", fontWeight: 400}} onClick={e => void (e.preventDefault(), setCloseModal(true))}>Stäng</Button>
                        </ToolTipPopup>
                      </AbsoluteCenter>
                    </AbsoluteCenter>
                   </AbsoluteCenter>
               

                </Header>


                <SideMenu>  
                  <SideMenuContainer>
                    <div style={{gridRow: "span 1 / auto"}}>
                      <SideMenuSection>
                          <h4>
                            HISTORIA 
                          </h4>
                          <h5>Tidigare kallelser</h5>
                      </SideMenuSection>
                    </div>
                    <div style={{gridRow: "span 13 / auto", overflowY: "auto", paddingTop: 6, borderBottom: "1px solid #ececec", borderTop: "1px solid #ececec", marginTop: 30, marginLeft: 30, marginRight: 30 }}>
                      <SideMenuSection style={{  height: "100%"}}>
                          {!history.length && <>
                            <span style={{padding: "50px 5px 10px 5px", fontSize: 16, color: "#1c2b46"}}>

                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45"><path fill="none" d="M0 0H24V24H0z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12h2c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8C9.25 4 6.824 5.387 5.385 7.5H8v2H2v-6h2V6c1.824-2.43 4.729-4 8-4zm1 5v4.585l3.243 3.243-1.415 1.415L11 12.413V7h2z"/></svg>
                            </span>
                            <span style={{padding: "0px 5px 10px 5px", fontSize: 14, color: "#1c2b46"}}>
                              Du har inte skickat några kallalser
                            </span>
                            <span style={{fontSize: 12, paddingTop: 0}}>
                              Varje kallelse du skickar kommer dyka upp här
                            </span>
                          </>
                        }

                        {history.map(e => <div>
                          <span style={{color: "#1c2b46", fontSize: 10, fontWeight: 300}}>{e.method.toUpperCase()} </span>
                          <span style={{
                            width: 200,
                            fontWeight: 400,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all"
                          }}>{e.url}</span>
                        </div>)}
                      </SideMenuSection>

                    </div>
                    <div style={{gridRow: "span 1 / auto"}}>
                      <SideMenuSection >
                        <h4>INFORMATION</h4>
                        <h5>Skapad: 2020-08-30</h5>
                      </SideMenuSection>
                    </div>
                  </SideMenuContainer>
                  
                </SideMenu>


                <RequestBody>
                    <RequestBodyHeader>
                        <Tabs>
                            {requestTabs.map((data, i) => 
                            <Tab key={i} invert onClick={setRequestTab.bind(null, data.value)} num={i} active={data.value === state.requestTab}> 
                              {data.list 
                                  ? <> 
                                      {data.icon}
                                      {data.label}: {data.list.find(e => e.value === type).label}
                                      <Dropdown borderNone old icon={<DropArrowIcon size={{width: 15, height: 15}} color="#d0d0d0"/>} name={data.listName} disableLabel register={register} setValue={setValue} unregister={unregister} watch={watch} default options={data.list}/> 
                                    </>
                                  : <>
                                      {data.icon}
                                      {data.label}
                                    </>
                                  }     
                            </Tab>)
                            }
                        </Tabs>
                    </RequestBodyHeader>
                    <RequestBodyContent>
                        <AbsoluteCenter style={{flexDirection: "column",display: state.requestTab === "auth" || state.requestTab === "body" && type === "binary" || state.requestTab === "body" && type === "formurlencoded"  ? "flex" : "none",  color: "#afafaf", position: "absolute", top: 0, width: "100%"}}>
                            <MailIcon key={type} active={state.requestTab === "auth" || state.requestTab === "body" && type === "binary" || state.requestTab === "body" && type === "formurlencoded"}/>
                            <h3 style={{color: "#e0e0e0"}}></h3>
                        </AbsoluteCenter>

                        <AbsoluteCenter style={{flexDirection: "column",display: state.requestTab === "body" && type === "none"  ? "flex" : "none",  color: "#afafaf", position: "absolute", top: 0, width: "100%"}}>
                            <MailIcon active={state.requestTab === "body" && type === "none"}/>
                            <h3 style={{color: "#e0e0e0"}}>Den här kallelsen använder ingen mall</h3>
                        </AbsoluteCenter>

                 
                        
                        <CodeEditor key={"body"} name="body" active={state.requestTab === "body" && type === "standard"} lang="handlebars" register={register} setValue={setValue} unregister={unregister} watch={watch} monacoConfiguration={monacoConfiguration}/>
                        <FormDataTable key={"formdata"} name="formdata" setValue={setValue} active={state.requestTab === "body" && type === "formdata"} defaultValue={state.formdata} register={register} unregister={unregister} watch={watch} />
                        <CodeEditor key={"prescript"} name="prescript"  active={state.requestTab === "prescript"} lang="javascript" register={register} setValue={setValue} unregister={unregister} watch={watch} />
                        <InputTable name="headers" setValue={setValue} active={state.requestTab === "headers"} defaultValue={state.headers} register={register} unregister={unregister} watch={watch} />


                    </RequestBodyContent>
                </RequestBody>

                <ResponseBody>
                    <ResponseBodyHeader>
                        <Tabs>
                            {responseTabs.map((data, i) => <Tab key={i+"res"} invert onClick={setResponseTab.bind(null, data.value)} num={i} active={data.value === state.responseTab}>
                                {data.list ? <Dropdown borderNone name={data.listName} register={register} setValue={setValue} unregister={unregister} default watch={watch}  options={data.list}/> :
                                <>
                                {data.icon}{data.label}
                                </>
                                }
                            </Tab>)}
                        </Tabs>
                    </ResponseBodyHeader>
                    <ResponseBodyContent>
                        <div style={{height: "100%"}}>
                          {state.responseTab === "result" && <ReponseViewer key={"result"} value={state.response} />}
                          {state.responseTab === "headers" && <ReponseViewer key={"headers"} lang="json" value={JSON.stringify(state.responseHeaders, null, 2)} />}
                          {state.responseTab === "logs" && <ReponseViewer key={"logs"}  value={state.logs} />}
                          {state.responseTab === "console" && <ReponseViewer key={"Konsol"} lang="json" value={state.responseRaw} />}
                          {state.responseTab === "schema" && <ReponseViewer key={"Schema"} lang="json" value={state.schema} />}
                        </div>
                    </ResponseBodyContent>
                </ResponseBody>
        </Container>
    )
} 

// e.method === "get" ? "#38e600" : e.method === "post" ? "#ff9800" : 

// {/* <BoltIcon/> */}
                              //{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0L24 0 24 24 0 24z"/><path fill="#c7c7c7" d="M20 2c.552 0 1 .448 1 1v3.757l-2 2V4H5v16h14v-2.758l2-2V21c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V3c0-.552.448-1 1-1h16zm1.778 6.808l1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778zM13 12v2H8v-2h5zm3-4v2H8V8h8z"/></svg> */}
                              //{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M22 20.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2-10-9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16.007zM4.434 5L12 11.81 19.566 5H4.434zM0 15h8v2H0v-2zm0-5h5v2H0v-2z"/></svg> */}



                                    /* <AbsoluteCenter>
                   <AbsoluteCenter>
                     <ToolTipPopup text="Klicka här för att stänga" delay={500}>
                     

                         <Button
                          transparent
                          // style={{color: "#323448", fontWeight: 400}}
                           onClick={e => void (e.preventDefault(), setCloseModal(true))}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="#2E3A59"></path>
                              </svg>
                         </Button>
                     </ToolTipPopup>
                   </AbsoluteCenter>
               </AbsoluteCenter> */


                /* <AbsoluteCenter>
                   
                    <AbsoluteCenter>
                    <ToolTipPopup text="Klicka här för att spara" delay={500}>
                        <Button right onClick={e => void (props.onSave ? props.onSave(state) : null, triggerSaveModal())}  style={{color: "#323448", fontWeight: 400}} borderNone>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"></path><path d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"></path></svg>
                        Spara</Button>
                    </ToolTipPopup>
                    </AbsoluteCenter>

                    <AbsoluteCenter>
                      <ToolTipPopup text="Klicka här för att stänga" delay={500}>
                          <Button danger style={{color: "#323448", fontWeight: 400}} onClick={e => void (e.preventDefault(), setCloseModal(true))}>Stäng</Button>
                      </ToolTipPopup>
                    </AbsoluteCenter>
                </AbsoluteCenter> */


/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 11h-3.416a5.001 5.001 0 0 1-9.168 0H4v5h16v-5zm0-2V5H4v7h5a3 3 0 0 0 6 0h5z"/></svg> */
/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44"><path fill="none" d="M0 0h24v24H0z"/><path  d="M3 10H2V4.003C2 3.449 2.455 3 2.992 3h18.016A.99.99 0 0 1 22 4.003V10h-1v10.001a.996.996 0 0 1-.993.999H3.993A.996.996 0 0 1 3 20.001V10zm16 0H5v9h14v-9zM4 5v3h16V5H4zm5 7h6v2H9v-2z"/></svg> */



// {/* <SideMenuSection>
                    // <h4>
                    //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12h2c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8C9.25 4 6.824 5.387 5.385 7.5H8v2H2v-6h2V6c1.824-2.43 4.729-4 8-4zm1 5v4.585l3.243 3.243-1.415 1.415L11 12.413V7h2z"/></svg>
                    //   HISTORIA 
                    // </h4>
                    // <h5>Tidigare kallelser</h5>
                    // {!history.length &&
                    //   <span>
                    //     Du har inte skickat några kallalser
                    //   </span>
                    // }

                    // {history.map(e => <div>
                    //   <span style={{color: e.method === "get" ? "#38e600" : e.method === "post" ? "#ff9800" : "white"}}>{e.method.toUpperCase()} </span>
                    //   <span style={{
                    //     width: 200,
                    //     whiteSpace: "pre-wrap",
                    //     wordBreak: "break-all"
                    //   }}>{e.url}</span>
                    // </div>)}
//                     {/* <div>GET</div>

//                     <div>GET</div>

//                     <div>GET</div>

//                     <div>GET</div> */}

//                   </SideMenuSection>

//                   <SideMenuSection>
                    // <h4>INFORMATION</h4>
                    // <h5>Skapad: 2020-08-30</h5>
//                   </SideMenuSection> 

//*/}
export default RestClient