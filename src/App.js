import React from 'react';
import ReactDOM from 'react-dom'
import RestClient from './RestClient'
import styled, { css } from 'styled-components'
// import dotsvg from './dotsvg.svg'

// import Modal from 'react-modal';

// import { DndProvider, useDrag, useDrop } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'

import { CustomNodeFactory } from './Diagram/node/CustomNodeFactory';
import { CustomNodeModel } from './Diagram/node/CustomNodeModel';
import { CustomPortModel } from './Diagram/port/CustomPortModel';
import { CustomPortFactory } from './Diagram/port/CustomPortFactory'
import { CustomLabelFactory } from './Diagram/label/CustomLabelFactory'
import { CustomLinkFactory } from './Diagram/link/CustomLinkFactory'

// import TooTip from './RestClient/ToolTip'
import ToolTipPopup from './ToolTipPopup'
import Modal from './RestClient/Modal'
import dnd from './utils/DnD'
import chroma from 'chroma-js'
import StoreContext from './components/StoreContext'
import {
  BackspaceIcon,
  InfoBoxIcon,
  TrashcanIcon,
  SaveIcon,
  InfiniteIcon,
  DragIcon,
  BoxIcon,
} from './Icons'

import Database, { InputField, BodyGrid,Column, Row as DRow, SectionGridLeft, SectionGridLine,  SectionGridRight } from './Database'
import DropdownField from './Database/Dropdown'
import Transformer from './Transformer'

import { observer } from "mobx-react"

import Nodes from './store/Nodes'
import Graph from './store/Graph'

import {
  Container,
  FakeScene,
  Process,
  ComponentListContainer,
  SpecialButton,
  ListItemTitle,
  TitleUpper,
  TitleSub,
  ListItemRightIcon,
  ListMainIcon,
  MainContainer,
  HeaderContainer,
  HeaderContainerTitle,
  NavBar,
  NavButton,
  Content,
  DropWrapper,
  DropTag,
  HeaderWrapper,
  ContentWrapper,
  Editor,
  Button,
  ZoomButton,
  Header,
  SidemenuContainer,
  Main,
  HeaderTabs,
  HeaderTab,
  ListItem,
  SideBarHeader,
  Settings,
  SettingsWrapper
} from './styled'

import Diagram from './containers/Diagram'
import LogsContainer from './components/LogContainer'
import SuccessIcon from './components/SuccessIcon'
// import example from './example.json'

// import ToolTipPopupSvg from './ToolTipPopup.svg'
// import ServerBlockSvg from './serverblock.svg'
// import SpinnerSvg from './spinner.svg'

import WindowSvg from './svg/window.svg'
import ServerSvg from './svg/server.svg'
import SearchingSvg from './svg/searching.svg'
import LavaSvg from './svg/lava.svg'
import CometSpinner from './svg/cometspinner.svg'
import CloudComp from './svg/cloudcomp.svg'
import dbdrive from './svg/dbdrive.svg'
import servercloud from './svg/servercloud.svg'
import Folder from './svg/folder.svg'

import * as html2canvas from 'html2canvas'

import ComponentList from './containers/ComponentList'
import Debug from './containers/Debug'


import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DefaultPortModel,
  DiagramModel,
  PathFindingLinkFactory,
  PortModelAlignment
} from '@projectstorm/react-diagrams';

import {
  CanvasWidget,
  DeleteItemsAction
} from '@projectstorm/react-canvas-core';



// const pathfinding = engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME)







function EditorModal(props) {


  const onSave = value => {
    props.diagram.node.extra = value
  }

  return (
    <Editor>
      <RestClient toggle={props.toggleEditor} value={props.diagram.node.extra} onSave={onSave} />
    </Editor>
  )
}



// #323442
function RestClientButton(props) {
  return (
    <div style={{}}>
      <SpecialButton onClick={props.toggleClient} theme={"#484848"} style={{ marginRight: 10 }}>
        <span className="first">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M9.25 12a.75.75 0 01-.22.53l-2.75 2.75a.75.75 0 01-1.06-1.06L7.44 12 5.22 9.78a.75.75 0 111.06-1.06l2.75 2.75c.141.14.22.331.22.53zm2 2a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z"></path><path fillRule="evenodd" fill="currentColor" d="M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25H1.75z"></path></svg> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 8H4v8h16v-8zm0-2V5H4v4h16zM9 6h2v2H9V6zM5 6h2v2H5V6z"/></svg> */}
           Klient
        </span>
        {/* <span className="second">
        </span> */}
      </SpecialButton>

    </div>
  )
}


function SettingsButton(props) {
  return (
    <div style={{}}>
      <SpecialButton theme={"#c221e1"} style={{
        marginRight: 20,
        marginLeft: 15,
        background: "#ff3fcd",
        // background: "#5637ff",


        borderRadius: "20px"
      }}>
        <span className="first" style={{ color: "white", margin: "3px 2px" }}>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"></path><path fill="currentColor" d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"></path></svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M12 12.586l4.243 4.242-1.415 1.415L13 16.415V22h-2v-5.587l-1.828 1.83-1.415-1.415L12 12.586zM12 2a7.001 7.001 0 0 1 6.954 6.194 5.5 5.5 0 0 1-.953 10.784v-2.014a3.5 3.5 0 1 0-1.112-6.91 5 5 0 1 0-9.777 0 3.5 3.5 0 0 0-1.292 6.88l.18.03v2.014a5.5 5.5 0 0 1-.954-10.784A7 7 0 0 1 12 2z" /></svg>
        Publicera
      </span>

      </SpecialButton>

    </div>
  )
}


// #323442
function BButton(props) {
  return (
    <div style={{}}>
      <SpecialButton onClick={props.toggleClient} theme={"#484848"} style={{ marginRight: 10 }}>
        <span className="first">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M9.25 12a.75.75 0 01-.22.53l-2.75 2.75a.75.75 0 01-1.06-1.06L7.44 12 5.22 9.78a.75.75 0 111.06-1.06l2.75 2.75c.141.14.22.331.22.53zm2 2a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z"></path><path fillRule="evenodd" fill="currentColor" d="M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25H1.75z"></path></svg> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 8H4v8h16v-8zm0-2V5H4v4h16zM9 6h2v2H9V6zM5 6h2v2H5V6z"/></svg> */}
          {props.children}
        </span>
        {/* <span className="second">
        </span> */}
      </SpecialButton>

    </div>
  )
}

function HeaderButton(props) {
  return (
    <div style={{ position: "relative" }}>
      <SpecialButton theme={"#c221e1"} style={{
        color: "#404040",
        ...props.style,
        position: "absolute",
        right: "30px",
        top: "-22px"

      }}>
        <span className="first" style={{ color: "#404040", margin: "3px 2px" }}>
          {props.children}
        </span>
        {/* <span className="second">
        Spara
      </span> */}
      </SpecialButton>

    </div>
  )
}






const Title = styled.h3`
  /* position: absolute; */
  font-family: 'Exo 2', PT Sans, sans-serif;
  /* text-transform: uppercase; */
  left: 0px;
  top: 0px;
  padding:0;
  margin: 0;
  width: 200px;
  font-weight: 200;
  font-size: 18px;
  user-select: none;
  /* pointer-events: none; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1c2b46;
  z-index: 1;
  padding: 13px 15px 13px 0px;
  background: #ffff70;
  background: transparent;
  border-radius: 5px;
  

  & svg {
    color: #1f313c;
    margin-right: 5px;
    /* cursor: pointer; */
  }

  & > span > span > svg:hover {
    color: rgb(63,131,255)!important;
  }


`

const Row = styled.div`
  display: flex;
  ${props => props.jcenter && `justify-content: center;`}
  ${props => props.justify && `justify-content: ${props.justify};`}
  ${props => props.align && `align-items: ${props.align};`}
  ${props => props.acenter && `align-items: center;`}
  ${props => props.flow && `flex-direction: ${props.flow};`}
  ${props => props.row && `flex-direction: row;`}
  ${props => props.column && `flex-direction: column;`}
  ${props => props.w100 && `width: 100%;`}
  ${props => props.h100 && `height: 100%;`}
  ${props => props.wrap && `flex-wrap: wrap;`}
  ${props => props.flex && `flex: ${props.flex};`}
  ${props => props.bg && `background-image: url("data:image/svg+xml;utf8,%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Ccircle%20cx%3D%220.5%22%20cy%3D%220.5%22%20r%3D%220.5%22%20fill%3D%22%2381818a%22%20%2F%3E%3C%2Fsvg%3E");`}

`


const HButton = styled.div`
  color: #459fed; 
  background: #d3edff; 
  padding: 9px 20px; 
  border-radius: 20px;
  font-size: 12px;  
  margin-left: 20px; 
  cursor: pointer;
`


// 2E3A59
function App() {
  
  const [state, setState] = React.useState({ showClient: false, showEditor: false, version: 0, saved: false, leftSideMenu: true, rightSideMenu: true, settings: false })
  const modalRef = React.useRef()
  const [loading, setLoading] = React.useState(true)

  const toggleClient = () => setState(prev => ({ ...prev, showClient: !prev.showClient }))
  const toggleEditor = (editor = null) => setState(prev => ({ ...prev, showEditor: !prev.showEditor, editor: editor }))

  const toggleDiagram = React.useCallback(() => {
      setState(prev => ({...prev, settings: false }))
  },[])

  const toggleSettings = React.useCallback(() => void setState(prev => ({...prev, settings: true })),[])

  const toggler = (name) => (editor = null) => setState(prev => ({ ...prev, [name]: !prev[name] }))
  const saved = () => setState(prev => ({ ...prev, saved: !prev.saved }))

  const toggleSideMenu = React.useCallback((side) => {
    const key = (side || "left")+"SideMenu"
    setState(prev => ({...prev, [key]: !prev[key] }))
  }, [])

  React.useEffect(() => {
    if(showOnURLQuery("noloading")) {
      setLoading(false)
    } else if(showOnURLQuery("loading")) {

    } else {
      setTimeout(() => setLoading(false), 2000)
    }
  }, [])

  React.useEffect(() => {
    if (state.saved) {
      setTimeout(() => void saved(), 1500)
    }
  }, [state.saved])

  React.useEffect(() => {
    if (modalRef.current) {
      modalRef.current.show()
    }
  }, [])

  




  const showDiagram = (state.showClient === false && state.showEditor === false)
  const showOnURLQuery = (q) => new RegExp(q, "gi").test(window.location.search)

  


  return (
    <StoreContext.Provider value={{ toggleClient, toggleEditor, toggler }}>
      <Container leftSideMenu={state.leftSideMenu} rightSideMenu={state.rightSideMenu}>

      
        {loading && <Row h100 w100 acenter jcenter style={{position: "fixed", zIndex: 200, background: "rgba(255,255,255, 1)"}} column>
          <img src={CometSpinner} width={"100px"} style={{marginBottom: 20}} alt=""/>
          <div style={{fontSize: 20,opacity: 0.7, color: "#20303c"}}>Hämtar diagram</div>
        </Row>}


        <HeaderWrapper hide={showOnURLQuery("header") ? false : true}>

          <Row justify="center" align="center">
            <HButton >Dokumentation</HButton>
          </Row>


          <Title style={{position: "absolute", top: "50%", transform: "translateY(-50%)", left: 0, right: 0, margin: "auto" }}>
            <span style={{ fontWeight: 700, fontSize: 20, transform: "translateY(-2px)" }}>Flouw</span>
            <span style={{height:18,margin: "0 12px", width: 1, background: "rgba(0, 0, 0, 0.1)"}}/>
            <span >
            <ToolTipPopup id={"undo"+"_tooltip"} text={"Ångra"} delay={700} bg={"#454165"} color={"white"}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"/></svg>
              </span>
            </ToolTipPopup>
              <span style={{margin: "0 5px"}}/>
              <ToolTipPopup id={"undo"+"_tooltip"} text={"Framåt"} delay={700} bg={"#454165"} color={"white"}>
                <span >
                  <svg xmlns="http://www.w3.org/2000/svg" style={{opacity: 0.5}} viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z"/></svg>
                </span>
              </ToolTipPopup>
            </span>
          </Title>

          <HeaderContainer>
            <HeaderContainerTitle />

            <NavBar>
              <HeaderButton style={{ width: state.saved ? 85 : 40 }}>
              </HeaderButton>

              <div style={{ background: "rgba(0,0,0,0.1)", height: 20, width: 1, marginRight: 20 }} />

              <ToolTipPopup arrow={12} id={"database"+"_tooltip"} hardHide={state.showDatabase} box text={(
                  <Row flex="1" style={{}} justify="center" align="center">
                      <Row justify="center" align="center" column>
                        <img src={dbdrive} className="icon-gray" width={"100px"} style={{margin: "35px 0 20px 0"}} alt=""/>
                        <div style={{fontWeight: 400, fontSize: 18, color: "white" || "#162d3d"}}>Öppna databas</div>
                        <div style={{ fontSize: 13,fontWeight: 400, color: "white" || "#162d3d", opacity: 0.9, width: 185, whiteSpace: "pre-line", padding: "5px 40px", marginBottom: 25}}>Här kan du testa att kommunicera med en databas.</div>
                      </Row>
                    </Row>
              )} delay={300} bg={"#454165"||"#ffffff"||"#454165"} color={"white"||"#808080"}>
                <div>
                  <BButton>
                    Databas
                  </BButton>
                </div>
              </ToolTipPopup>

            

              <ToolTipPopup arrow={12} id={"RestClient"+"_tooltip"} hardHide={state.showClient} box text={(
                  <Row flex="1" style={{}} justify="center" align="center">
                      <Row justify="center" align="center" column>
                        <img src={servercloud} className="icon-gray" width={"100px"} style={{margin: "35px 0 20px 0"}} alt=""/>
                        <div style={{fontWeight: 400, fontSize: 18, color: "white" || "#162d3d"}}>Öppna REST-Klient</div>
                        <div style={{ fontSize: 13,fontWeight: 400, color: "white" || "#162d3d", opacity: 0.9, width: 185, whiteSpace: "pre-line", padding: "5px 40px", marginBottom: 25}}>Här kan du testa att kommunicera med ett API.</div>
                      </Row>
                    </Row>
              )} delay={300} bg={"#454165"||"#ffffff"||"#454165"} color={"white"||"#808080"}>
                <div>
                  <RestClientButton toggleClient={toggleClient} />
                </div>
              </ToolTipPopup>
              <SettingsButton />

            </NavBar>
          </HeaderContainer>

        </HeaderWrapper>


        <ComponentList toggleSideMenu={toggleSideMenu} active={state.leftSideMenu} standard={Nodes.standard} api={Nodes.api} />
       
        <Diagram showClient={state.showClient} showDiagram={showDiagram} toggler={toggler} toggleDiagram={toggleDiagram} toggleSettings={toggleSettings} settings={state.settings}  graph={Graph} nodes={Nodes}/>

        <Debug active={state.rightSideMenu} showEditor={state.showEditor} api={Nodes.api} toggleSideMenu={toggleSideMenu} />
    




                        
        <Modal isOpen={state.showClient || showOnURLQuery("rest")}>
          <RestClient toggle={toggleClient} />
        </Modal>

        <Modal isOpen={state.showEditor || showOnURLQuery("editor")}>
          <EditorModal toggleEditor={toggleEditor} diagram={state.editor} />
        </Modal>

        <Modal isOpen={state.showDatabase || showOnURLQuery("db")}>
          <Database toggleDatabase={toggler("showDatabase")} />
        </Modal>

        <Modal isOpen={state.showTransformer || showOnURLQuery("tf")}>
          <Transformer toggleTransformer={toggler("showTransformer")} />
        </Modal>

      </Container>
    </StoreContext.Provider>

  )
}



export default App;

