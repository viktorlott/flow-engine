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
  SignalIcon,
  CodeIcon,
  DangerIcon,
  InfoIcon,
  RelayIcon,
  BoltIcon,
  CloudIcon,
  UserAddIcon,
  FileAddIcon,
  OrgIcon,
  CommentIcon,
  DatabaseIcon,
  TerminalIcon,
  ClapperBoard,
  BrowserIcon,
  MailIcon,
  CogIcon,
  FolderPlusIcon,
  ParserIcon,
  PathIcon,
  GitPullIcon,
  DatasetIcon,
} from './Icons'

import Database from './Database'
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
  ListItem
} from './styled'


import LogsContainer from './components/LogContainer'
import SuccessIcon from './components/SuccessIcon'
// import example from './example.json'

// import WindowSvg from './window.svg'
// import ToolTipPopupSvg from './ToolTipPopup.svg'
// import ServerSvg from './server.svg'
// import ServerBlockSvg from './serverblock.svg'
// import SpinnerSvg from './spinner.svg'

import SearchingSvg from './svg/searching.svg'
import LavaSvg from './svg/lava.svg'

import * as html2canvas from 'html2canvas'


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





const showOnURLQuery = (q) => new RegExp(q, "gi").test(window.location.search)

function LItem(props) {
  const { item } = props
  const [mouseDown, setMouseDown] = React.useState(false)
  const liRef = React.useRef()

  const portStyle = (position="right",item) => ({position: "absolute", [position]: -9, width: 12, height: 12, top: "50%", transform: "translateY(-50%)", background: item.color || "#616161", borderRadius: "39%", border: "2px solid #ffffff", fontSize: 8})
  return props.disabled ? null : (
    
    <ListItem
      ref={liRef}
      draggable={true}
      onMouseDown={e => void setMouseDown(true)}
      onMouseUp={e => void setMouseDown(false)}
      onMouseLeave={e => void setMouseDown(false)}
      onDragStart={(event) => {
        const dragElem = liRef.current.cloneNode(true)
        const { width, height } = liRef.current.getBoundingClientRect()
        dragElem.id = "drop-data"
        dragElem.style.position = "absolute"
        dragElem.style.top = "-1000px"
        dragElem.style.width = width+"px"
        dragElem.style.height = height+"px"
        document.body.appendChild(dragElem)
        event.dataTransfer.setDragImage(dragElem, 10, 3)
        
        dnd.setData("drop-data", item)
      }}
      bgcolor={chroma(item.theme).darken(0.2).hex()}
      style={{
        ...(item.theme ? {
          borderRadius: 5,
          color: "white",
          border: `1px ${showOnURLQuery("dashed") ? "dashed" : "solid"} ${chroma(item.theme).darken(0.2).alpha(showOnURLQuery("dashed") ? 1 : 1).hex()}`,
        } : {}),
      }}>
      <div style={{ display: "flex", flexFlow: "row", position: "relative"}}>
        <ListMainIcon
          style={{borderRadius: "50%", padding: 0}}
          theme={"transparent"||"#424353"||"#5a64ff"||"#2c3f77"||chroma(item.theme).darken(0.1).alpha(1).hex()}
          color={chroma(item.theme).darken(0.1).alpha(1).hex() || "#212429"}>
          {item.icon || <BoxIcon />}
        </ListMainIcon>
        <ToolTipPopup id={item.title+"_tooltip"} text={item.label} delay={500} bg={"#454165"} color={"white"} hide={mouseDown}>
          <ListItemTitle>
            <TitleUpper color={chroma(item.theme).darken(0.1).alpha(1).hex()}>{item.title}</TitleUpper>
          </ListItemTitle>
        </ToolTipPopup>
      </div>

      {item.ports.find(e => e.input) && (
        <Row jcenter acenter style={portStyle("left", item.ports.find(e => e.input).input)}>x{item.ports.filter(e => e.input).length}</Row>
      )}
      {item.ports.find(e => e.output) && (
        <Row jcenter acenter style={portStyle("right", item.ports.find(e => e.output).output)}>x{item.ports.filter(e => e.output).length}</Row>
        )}
      
    </ListItem>
    
  )

}




const Diagram = observer(({ graph, toggler, toggleEditor, disabled }) => {
  const processRef = React.useRef()

  const [isOver, setIsOver] = React.useState(false)
  const [version, setVersion] = React.useState(0)

  const model = graph.tabs[graph.current].model


  const zoomIn = React.useCallback(() => {

    model.setZoomLevel(model.getZoomLevel() + 10);

    const zoomFactor = model.getZoomLevel() / 100;

    model.setOffset(
      model.getOffsetX() - 50 * zoomFactor,
      model.getOffsetY() - 50 * zoomFactor
    )

    forceUpdate()
  }, [])

  const zoomOut = React.useCallback(() => {

    model.setZoomLevel(model.getZoomLevel() - 10);

    const zoomFactor = model.getZoomLevel() / 100;

    model.setOffset(
      model.getOffsetX() + 50 * zoomFactor,
      model.getOffsetY() + 50 * zoomFactor
    )
    forceUpdate()
  }, [])

  const zoomFit = React.useCallback(() => {
    graph.engine.zoomToFit()
  }, [])

  const forceUpdate = React.useCallback(() => {
    setVersion(prev => prev + 1)
  }, [])



  return (
    <DropWrapper disabled={disabled}>
      <Process ref={processRef}
        className="background-dot"
        onDrop={(event) => {

          const extra = dnd.getData("drop-data")

          if(!Nodes.standard.some(e => e.title === extra.title)) return 

          const { ports, theme, title, ...options } = extra

          const node = new CustomNodeModel({
            ...options,
            name: title,
            color: theme,
            fields: ports,
            toggleEditor: toggleEditor,
            toggler: toggler,
          })

          const point = graph.engine.getRelativeMousePoint(event);
          node.setPosition(point)
          model.addAll(node);

          setIsOver(false)

        }}

        onDragOver={(event) => {
          event.preventDefault()

          if (!isOver) {
            setIsOver(true)
          }
        }}><CanvasWidget engine={graph.engine} /></Process>
      <ZoomTools zoomIn={zoomIn} zoomOut={zoomOut} zoomFit={zoomFit} />
    </DropWrapper>
  )

})



const BlockList = observer(props =>  {

  return (
    <>
      {props.items.map((item, i) => {
        return <LItem key={i} disabled={item.disabled || props.disabled} item={item} />
      })}
    </>
  )
})




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



function ZoomTools(props) {
  const { zoomIn, zoomOut, zoomFit } = props
  return (
    <div style={{ display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "center", width: 60, height: 125, position: "absolute", bottom: 20, right: 0, }}>
      
      <ZoomButton middle onClick={zoomIn}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zM10 10V7h2v3h3v2h-3v3h-2v-3H7v-2h3z"/></svg>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fillRule="evenodd" fill="currentColor" d="M11.75 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.5v5.75a.75.75 0 01-1.5 0V12.5H5.25a.75.75 0 010-1.5H11V5.25a.75.75 0 01.75-.75z"></path></svg> */}
      </ZoomButton>
      <ZoomButton  bottom onClick={zoomOut}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zM7 10h8v2H7v-2z"/></svg>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fillRule="evenodd" fill="currentColor" d="M4.5 12.75a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75z"></path></svg> */}
      </ZoomButton>
      <ZoomButton onClick={zoomFit}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M20 3h2v6h-2V5h-4V3h4zM4 3h4v2H4v4H2V3h2zm16 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"/></svg>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fillRule="evenodd" fill="currentColor" d="M4.75 4.5a.25.25 0 00-.25.25v3.5a.75.75 0 01-1.5 0v-3.5C3 3.784 3.784 3 4.75 3h3.5a.75.75 0 010 1.5h-3.5zM15 3.75a.75.75 0 01.75-.75h3.5c.966 0 1.75.784 1.75 1.75v3.5a.75.75 0 01-1.5 0v-3.5a.25.25 0 00-.25-.25h-3.5a.75.75 0 01-.75-.75zM3.75 15a.75.75 0 01.75.75v3.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 013 19.25v-3.5a.75.75 0 01.75-.75zm16.5 0a.75.75 0 01.75.75v3.5A1.75 1.75 0 0119.25 21h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25v-3.5a.75.75 0 01.75-.75z"></path></svg> */}
      </ZoomButton>
    </div>
  )
}


function MainIcon(props) {
  return (
    <svg id="Component_4_1" data-name="Component 4 – 1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 43 46" {...props} >
      <defs>
        <style dangerouslySetInnerHTML={{
          __html: `
          .circle-1 {
            stroke: white;
            strokeWidth: 2px;
          }
      ` }} />
      </defs>
      <path id="Path_20" data-name="Path 20" d="M483.5,351l18.075,10.89L483.5,372.626,464.782,361.89Z" transform="translate(-462 -349)" fill="none" stroke="#1c2b46" strokeWidth="1" />
      <path id="Path_21" data-name="Path 21" d="M483.5,372.626v-21.6" transform="translate(-462 -349)" fill="none" stroke="#1c2b46" strokeWidth="1" />
      <path id="Path_22" data-name="Path 22" d="M464.782,361.829v21.208L483.7,372.667l18.439,10.371V361.829" transform="translate(-462 -349)" fill="none" stroke="#1c2b46" strokeWidth="1" />
      <path id="Path_23" data-name="Path 23" d="M464.782,383.037l18.65,10.67,18.819-10.67" transform="translate(-462 -349)" fill="none" stroke="#1c2b46" strokeWidth="1" />
      <path id="Path_24" data-name="Path 24" d="M483.517,393.707v-21.16" transform="translate(-462 -349)" fill="none" stroke="#1c2b46" strokeWidth="1" />
      <circle className="circle-1" id="Ellipse_57" data-name="Ellipse 57" cx="3" cy="3" r="3" transform="translate(37 31)" fill="#1c2b46" />
      <circle className="circle-1" id="Ellipse_58" data-name="Ellipse 58" cx="3" cy="3" r="3" transform="translate(37 10)" fill="#1c2b46" />
      <circle className="circle-1" id="Ellipse_59" data-name="Ellipse 59" cx="3" cy="3" r="3" transform="translate(18 21)" fill="#1c2b46" />
      <circle className="circle-1" id="Ellipse_60" data-name="Ellipse 60" cx="3" cy="3" r="3" transform="translate(18)" fill="#1c2b46" />
      <circle className="circle-1" id="Ellipse_61" data-name="Ellipse 61" cx="3" cy="3" r="3" transform="translate(0 10)" fill="#1c2b46" />
      <circle className="circle-1" id="Ellipse_62" data-name="Ellipse 62" cx="3" cy="3" r="3" transform="translate(18 40)" fill="#1c2b46" />
      <circle className="circle-1" id="Ellipse_63" data-name="Ellipse 63" cx="3" cy="3" r="3" transform="translate(0 31)" fill="#1c2b46" />
    </svg>
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

  & > span > svg:hover {
    color: rgb(63,131,255)!important;
  }


`

const Table = styled.div`
  /* margin-top: -1px; */
  display: flex;

  width: 100%;

  flex-flow: column wrap;
  

  & > div {
    border: solid #eff1f2;
    border-width: 0 0 1px 0;
  }

`


const Tr = styled.div`
  /* margin-top: -1px; */
  display: grid;
  width: 100%;

  grid-template-columns: 2fr 5fr 1fr;
  grid-template-rows: auto;
  align-items: stretch;
  display: grid;

  font-size: 12px;
  font-weight: 300;
  color: #9c9c9c;

  & > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    padding: 4px 10px;

    align-items: center;
    border: solid #eff1f2!important;
    border-width: 0 1px 0 0!important;
    /* background: #fbfbfb; */
    & > svg {
      width: 12px;
      height: 12px;
      margin-right: 5px;
    }

    & > input {
      border: none;
      outline: none;
      margin: 0;
      padding: 0;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      opacity: 0.1;

      &:hover, &:focus {
        outline: none;
        border: none;
        
      }
    }
  
    
  }
  & > div:nth-child(2) {
    border: solid #eff1f2!important;
    border-width: 0 1px 0 0!important;
    justify-content: space-between;
    position: relative;
    
    & > input {
      border: none;
      outline: none;
      margin: 0;
      padding: 0;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      width: 100%;
      padding: 3px;

      color: #b72828;
      color: #2bb300;
      background: white;

  
      &:hover, &:focus {
        outline: none;
        border: none;
        background: #f4f4f4;
        
      }
    }

    & > span > svg {
      width: 10px;
      height: 10px;
    }
  
  }



  & > div:nth-child(3) {
    justify-content: center;
    align-items: center;

    & > svg {
      width: 12px;
      height: 12px;
    }

    & > input {
      border: none;
      outline: none;

      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      opacity: 0.6;

      filter: grayscale(100%);

      &:hover, &:focus {
        outline: none;
        border: none;
        
      }
    }
  
  }

  & > div {
    display: flex;
    flex-direction: row;
    padding: 4px 4px;
  }


`


const SideMenuTitle = styled.div`
    /* background: #fbfbfb; */
    /* background: #272a3c; */
    display: flex;
    padding-left: 20px;
    padding: 10px 10px;
    align-items: center;
    justify-content: space-between;
    color: #d0d0d0;
    color: #757484;
    color: #383f48;
    font-weight: 400;
    margin: 0 5px;
    /* color: white; */
    border-bottom: 1px solid #eff1f2;
    /* border-bottom: 1px solid #2d3042; */
    /* box-shadow: 0 2px 5px 0 rgba(32,48,60,.05); */
    z-index: 2;
    font-size: 12px;
    /* border-radius: 2px; */

    & > div {
      justify-content: center;
      align-items: center;
    }

    & > div > button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      background: none;
      padding: 0;
      margin: 0;
      color: inherit;
      & > svg {
        color: inherit;
      }

    }
`

const SideMenuContent = styled.div`
    padding-top: 4px;
    transition: height 0.14s ease-in-out;
    will-change: height;
    ${props => props.hide ? "display: none;" : ""}
    margin: 0 5px;

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


const Expander = styled.div`
  height: 100px; 
  width: 15px; 
  ${props => props.left ? "left" : "right"}: 0; 
  position: absolute; 
  display: flex;  
  /* top: 50%;  */
  bottom: 10px;
  /* transform: translateY(-50%);  */
  position: absolute; 
  color: #bbbbbb;

  
  &:hover svg {
    opacity: 1;

    visibility: visible
  }

  & > svg {
    cursor: pointer;
    transition: opacity 0.2s, visibility 0.2s;
    opacity: 0.2;
    visibility: hidden;
    /* background: white; */
    padding: 4px;
    border-radius: 0 5px 5px 0;
    /* border: 1px solid #eff1f2; */
    border-left: 0;
    position: absolute;
    display: flex;
    transform: translateY(-50%);
    top: 50%;
    ${props => props.left ? "right" : "left"}: -30px;

    ${props => props.visible && "visibility: visible;"}
    visibility: visible;

  }

  display: ${props => props.active ? "flex" : "none"};

`

// !!props.children

// {/* <SettingsButton/> */}
  // importModel
  // const importModel = () => {
    // model.deserializeModel(example, engine);
    // const data = window.localStorage.getItem("graph")
    // // console.log(data)
    // if (data) {
    //   try {
    //     const model = getCurrentModel()
    //     const parsed = JSON.parse(data)

    //     model.deserializeModel(parsed, engine)
    //     engine.setModel(model);

    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  // }
 
  // #aa4dc8


function Drawer(props) {
  const [state, setState] = React.useState({ isOpen: false })



  return (
    <>
      <SideMenuTitle>
        <div>{props.title}</div>
        <div>
          <button onClick={() => props.children && setState(prev => ({...prev, isOpen: !prev.isOpen}))}><svg style={{transform: state.isOpen ? "rotate(0deg)" : "rotate(-90deg)"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/></svg></button>
        </div>
      </SideMenuTitle>
      <SideMenuContent hide={!state.isOpen}>
        {props.children}
      </SideMenuContent>
    </>
  )
}




const Tabs = observer(({ graph }) => {
  const addModel = () => {
    if (graph.tabs.length > 6) return
    graph.addTab("Ny graf")
  }

  const removeModel = (index, e) => {
    e.stopPropagation()
    e.preventDefault()

    graph.removeTab(index)
  }

  const selectTab = (index) => {
    graph.selectTab(index)
  }

  return graph.tabs.map((tab, i) => {
    return (
      <>
      <HeaderTab selected={graph.current === i} onClick={(e) => selectTab(i, e)} borderColorTop={"#009688" || "#ffc967" || "#47a8d85e" || "#eff1f2" || "white" || "#ffe863" || "#d3edff" || "#00ca51"}>
        {tab.name}

        <div onClick={(e) => removeModel(i, e)} style={{ display: i > 0 ? "block" : "none", position: "absolute", top: "57%", transform: "translateY(-50%)", right: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="#e2e1e1" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /></svg>
        </div>
      </HeaderTab>
      <div onClick={addModel} style={{ display: graph.tabs.length < 5 ? "block" : "none", position: "absolute", right: -35, top: "62%", transform: "translateY(-50%)", margin: "auto" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z" /><path fill="#e2e1e1" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" /></svg>
      </div>
      </>
    )
  })
})

// 2E3A59
function App() {
  
  const [state, setState] = React.useState({ showClient: false, showEditor: false, version: 0, saved: false, leftSideMenu: true, rightSideMenu: false })
  const modalRef = React.useRef()
  const [loading, setLoading] = React.useState(true)

  const toggleClient = () => setState(prev => ({ ...prev, showClient: !prev.showClient }))
  const toggleEditor = (editor = null) => setState(prev => ({ ...prev, showEditor: !prev.showEditor, editor: editor }))

  const toggler = (name) => (editor = null) => setState(prev => ({ ...prev, [name]: !prev[name] }))
  const saved = () => setState(prev => ({ ...prev, saved: !prev.saved }))

  const toggleSideMenu = React.useCallback((side) => {
    const key = (side || "left")+"SideMenu"
    setState(prev => ({...prev, [key]: !prev[key] }))
  }, [])

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
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
          <img src={LavaSvg} width={"100px"} style={{marginBottom: 20}} alt=""/>
          {/* <div style={{fontSize: 20}}>Hämtar diagram</div> */}
        </Row>}

        {/* <div style={{gridColumn: "1/2", gridRow: "1/2", background: "white"}}></div> */}

        <HeaderWrapper hide={showOnURLQuery("blank")}>

          <Row justify="center" align="center">
            <HButton >Dokumentation</HButton>
          </Row>


          <Title style={{position: "absolute", top: "50%", transform: "translateY(-50%)", left: 0, right: 0, margin: "auto" }}>
            <span style={{ fontWeight: 700, fontSize: 20, transform: "translateY(-2px)" }}>Flouw</span>
            <span style={{height:18,margin: "0 12px", width: 1, background: "rgba(0, 0, 0, 0.1)"}}/>
            <span >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"/></svg>
              <span style={{margin: "0 5px"}}/>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z"/></svg>
            </span>
          </Title>

          <HeaderContainer>
            <HeaderContainerTitle />

            <NavBar>
              <HeaderButton style={{ width: state.saved ? 85 : 40 }}>
                {/* <span style={{ color: "#b3b3b3", transition: "opacity 0.5s ease-in-out", opacity: state.saved ? 1 : 0, marginRight: 5 }}>
                  {state.saved && "Sparat!"}
                </span>
                {state.saved && <SuccessIcon key="save" speed={0.1} width={20} height={20} color="#b3b3b3" />}
                {!state.saved && (
                  <svg key="save" xmlns="http://www.w3.org/2000/svg" onClick={saveModel} viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z" /><path fill="#b3b3b3" d="M4 3h14l2.707 2.707a1 1 0 0 1 .293.707V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 1v5h9V4H7zm-1 8v7h12v-7H6zm7-7h2v3h-2V5z" /></svg>
                )} */}
              </HeaderButton>

              <div style={{ background: "rgba(0,0,0,0.1)", height: 20, width: 1, marginRight: 20 }} />
              <BButton>Databas</BButton>
              <RestClientButton toggleClient={toggleClient} />
              <SettingsButton />

            </NavBar>
          </HeaderContainer>

        </HeaderWrapper>

        <Expander left visible active={!state.leftSideMenu}>
          <svg onClick={() => toggleSideMenu("left")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9H8v2h4v3l4-4-4-4v3z"/></svg>
        </Expander>

        <SidemenuContainer active={state.leftSideMenu} bg={"white" || "#23263c"} left >
        
            {/* <Header borderColor={"#f1f1f1"}>
              <h4 borderColorTop={"#e5e5e5"}>
                
              </h4>
            </Header> */}
              <Drawer title={"Standard"}>
                <ComponentListContainer>
                  <BlockList items={Nodes.standard} />
                </ComponentListContainer>
              </Drawer>
              <Drawer title={"API"}>
                <ComponentListContainer>
                  <BlockList items={Nodes.api} />
                </ComponentListContainer>
              </Drawer>
              <Drawer title={"Extra"}>
              </Drawer>
              <Expander active={state.leftSideMenu}>
                <svg onClick={() => toggleSideMenu("left")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9V8l-4 4 4 4v-3h4v-2h-4z"/></svg>
              </Expander>
          </SidemenuContainer>


        <ContentWrapper>
          <Main key="a">
            <MainContainer borderNone>

              <HeaderTabs
                buttons
                blank
                borderColor={"#f1f1f1"}>


                <div style={{ position: "relative", maxWidth: "60%" }}>
                  <Tabs graph={Graph}  />
                </div>

                <div>
                  
                </div>

                <div>
                  <HeaderTab selected={true} borderColorTop={"#767aff" || "#6730ff45" || "#71ff3045" || "#eff1f2" || "white" || "#607d8b" || "#cecece" || "#888888" || "#007ce6" || "#e5e5e5"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path fill="none" d="M0 0H24V24H0z" /><path fill="currentColor" d="M15 3c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1h-2v2h4c.552 0 1 .448 1 1v3h2c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1h-6c-.552 0-1-.448-1-1v-4c0-.552.448-1 1-1h2v-2H8v2h2c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1v-4c0-.552.448-1 1-1h2v-3c0-.552.448-1 1-1h4V9H9c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h6zM9 17H5v2h4v-2zm10 0h-4v2h4v-2zM14 5h-4v2h4V5z" /></svg>
                      Diagram
                    </HeaderTab>
                  <HeaderTab>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M13 19.9a5.002 5.002 0 0 0 4-4.9v-3a4.98 4.98 0 0 0-.415-2h-9.17A4.98 4.98 0 0 0 7 12v3a5.002 5.002 0 0 0 4 4.9V14h2v5.9zm-7.464-2.21A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3c0 .953-.19 1.862-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.986 6.986 0 0 1 12 22a6.986 6.986 0 0 1-5.438-2.592l-2.526 1.458-1-1.732 2.5-1.443zM8 6a4 4 0 1 1 8 0H8z"/></svg>   */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path fill="none" d="M0 0h24v24H0z" /><path fill="#cccbcb" d="M2.132 13.63a9.942 9.942 0 0 1 0-3.26c1.102.026 2.092-.502 2.477-1.431.385-.93.058-2.004-.74-2.763a9.942 9.942 0 0 1 2.306-2.307c.76.798 1.834 1.125 2.764.74.93-.385 1.457-1.376 1.43-2.477a9.942 9.942 0 0 1 3.262 0c-.027 1.102.501 2.092 1.43 2.477.93.385 2.004.058 2.763-.74a9.942 9.942 0 0 1 2.307 2.306c-.798.76-1.125 1.834-.74 2.764.385.93 1.376 1.457 2.477 1.43a9.942 9.942 0 0 1 0 3.262c-1.102-.027-2.092.501-2.477 1.43-.385.93-.058 2.004.74 2.763a9.942 9.942 0 0 1-2.306 2.307c-.76-.798-1.834-1.125-2.764-.74-.93.385-1.457 1.376-1.43 2.477a9.942 9.942 0 0 1-3.262 0c.027-1.102-.501-2.092-1.43-2.477-.93-.385-2.004-.058-2.763.74a9.942 9.942 0 0 1-2.307-2.306c.798-.76 1.125-1.834.74-2.764-.385-.93-1.376-1.457-2.477-1.43zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>
                      Inställningar
                  </HeaderTab>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", transform: "translateY(5px)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {}} viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M13 13v5.585l1.828-1.828 1.415 1.415L12 22.414l-4.243-4.242 1.415-1.415L11 18.585V13h2zM12 2a7.001 7.001 0 0 1 6.954 6.194 5.5 5.5 0 0 1-.953 10.784v-2.014a3.5 3.5 0 1 0-1.112-6.91 5 5 0 1 0-9.777 0 3.5 3.5 0 0 0-1.292 6.88l.18.03v2.014a5.5 5.5 0 0 1-.954-10.784A7 7 0 0 1 12 2z" /></svg>
                  </div>

                </div>
              </HeaderTabs>

              <Content>
                {showDiagram ? <Diagram toggleEditor={toggleEditor} toggler={toggler} graph={Graph} /> : <FakeScene />}
              </Content>

            

            
            </MainContainer>
          </Main>

      
        </ContentWrapper>


        <Expander visible right active={!state.rightSideMenu}>
          <svg onClick={() => toggleSideMenu("right")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9V8l-4 4 4 4v-3h4v-2h-4z"/></svg>    
        </Expander>
        <SidemenuContainer active={state.rightSideMenu} borderColor="#f1f1f1" right>

            {/* <Header borderColor={"#f1f1f1"}>

              <h4  borderColorTop={"#e5e5e5"}>
           
              </h4>


            </Header> */}

            <Header borderColor={"#f1f1f1"} style={{justifyContent: "flex-end"}}>
            
            <h4 borderColorTop={"#e5e5e5"} style={{position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", margin: "auto"}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3c0 .953-.19 1.862-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.992 6.992 0 0 1 13 21.929V14h-2v7.93a6.992 6.992 0 0 1-4.438-2.522l-2.526 1.458-1-1.732 2.5-1.443A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3zM8 6a4 4 0 1 1 8 0H8z" /></svg>
                Felsökning
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path fill="none" d="M0 0h24v24H0z"/><path  fill="currentColor"  d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9 12v2h6v-2h-6zm-3.586-3l-2.828 2.828L7 16.243 11.243 12 7 7.757 5.586 9.172 8.414 12z"/></svg>
                Konsol */}
            </h4>


            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M4 18v-3.7a1.5 1.5 0 0 0-1.5-1.5H2v-1.6h.5A1.5 1.5 0 0 0 4 9.7V6a3 3 0 0 1 3-3h1v2H7a1 1 0 0 0-1 1v4.1A2 2 0 0 1 4.626 12 2 2 0 0 1 6 13.9V18a1 1 0 0 0 1 1h1v2H7a3 3 0 0 1-3-3zm16-3.7V18a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-4.1a2 2 0 0 1 1.374-1.9A2 2 0 0 1 18 10.1V6a1 1 0 0 0-1-1h-1V3h1a3 3 0 0 1 3 3v3.7a1.5 1.5 0 0 0 1.5 1.5h.5v1.6h-.5a1.5 1.5 0 0 0-1.5 1.5z" /></svg>
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M13 19.9a5.002 5.002 0 0 0 4-4.9v-3a4.98 4.98 0 0 0-.415-2h-9.17A4.98 4.98 0 0 0 7 12v3a5.002 5.002 0 0 0 4 4.9V14h2v5.9zm-7.464-2.21A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3c0 .953-.19 1.862-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.986 6.986 0 0 1 12 22a6.986 6.986 0 0 1-5.438-2.592l-2.526 1.458-1-1.732 2.5-1.443zM8 6a4 4 0 1 1 8 0H8z"/></svg>   */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M8.586 8.858l-4.95 4.95 5.194 5.194H10V19h1.172l3.778-3.778-6.364-6.364zM10 7.444l6.364 6.364 2.828-2.829-6.364-6.364L10 7.444zM14 19h7v2h-9l-3.998.002-6.487-6.487a1 1 0 0 1 0-1.414L12.12 2.494a1 1 0 0 1 1.415 0l7.778 7.778a1 1 0 0 1 0 1.414L14 19z" /></svg>
            </div>
          </Header>



            <SideMenuContent>
              {!state.showEditor && <LogsContainer>
                <Row flex="1" w100 justify="center" align="center">
                  <img src={SearchingSvg} width={"100px"} style={{marginBottom: 20}} alt=""/>
                </Row>
              </LogsContainer>}
            </SideMenuContent>

            <Header borderColor={"#f1f1f1"} >
              <h4  borderColorTop={"#e5e5e5"}>
            
              </h4>
            </Header>

            <Drawer title={"Egenskaper"}>
            </Drawer>

            <Drawer title={"Miljövariabler"}>
              <Row flex="1" w100>
                    <Table>
                      {Nodes.api.map(row => (
                        <Tr>
                          <div>{row.title}</div>
                          <div><input type="text" defaultValue={"\""+row.label+"\""} disabled={true}/>
                          </div>
                          <div>
                            <input type="checkbox" /> 
                          </div>
                        </Tr>
                      ))}
                    </Table>
                  </Row>
            </Drawer>


            <Expander left active={state.rightSideMenu}>
              <svg onClick={() => toggleSideMenu("right")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9H8v2h4v3l4-4-4-4v3z"/></svg>
              
            </Expander>
            </SidemenuContainer>





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



  /* {Graph.tabs.map((tab, i) => {
                    return (
                      <HeaderTab selected={models.current === i} onClick={(e) => selectTab(i, e)} borderColorTop={"#ffc967" || "#47a8d85e" || "#eff1f2" || "white" || "#ffe863" || "#d3edff" || "#00ca51"}>
                        {tab.name}

                        <div onClick={(e) => removeModel(i, e)} style={{ display: i > 0 ? "block" : "none", position: "absolute", top: "57%", transform: "translateY(-50%)", right: 0 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="#e2e1e1" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /></svg>
                        </div>
                      </HeaderTab>
                    )
                  })} */

/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg> */
/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M13 19.9a5.002 5.002 0 0 0 4-4.9v-3a4.98 4.98 0 0 0-.415-2h-9.17A4.98 4.98 0 0 0 7 12v3a5.002 5.002 0 0 0 4 4.9V14h2v5.9zm-7.464-2.21A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3c0 .953-.19 1.862-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.986 6.986 0 0 1 12 22a6.986 6.986 0 0 1-5.438-2.592l-2.526 1.458-1-1.732 2.5-1.443zM8 6a4 4 0 1 1 8 0H8z"/></svg> */
                  //<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0H24V24H0z"/><path fill="currentColor" d="M6 21.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5c1.585 0 2.924 1.054 3.355 2.5H15v-2h2V9.242L14.757 7H9V9H3V3h6v2h5.757L18 1.756 22.243 6 19 9.241V15L21 15v6h-6v-2H9.355c-.43 1.446-1.77 2.5-3.355 2.5zm0-5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm13 .5h-2v2h2v-2zM18 4.586L16.586 6 18 7.414 19.414 6 18 4.586zM7 5H5v2h2V5z"/></svg>

/* <TooTip key="info" text={<span style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Tryck på tangenten <BackspaceIcon width="17px" height="17px" style={{margin: "2px 4px 0 4px"}}/> för att ta bort</span>}>
                     <NavButton style={{display: "hidden"}} danger><InfoBoxIcon /></NavButton>
                 </TooTip> */