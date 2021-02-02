import React from 'react'
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
    SettingsWrapper,
    Expander
  } from '../../styled'
import {useTransition, animated} from 'react-spring'
import chroma from 'chroma-js'
import Drawer from '../../components/Drawer'
import { observer } from "mobx-react"
import Database, { InputField, BodyGrid,Column, Row as DRow, SectionGridLeft, SectionGridLine,  SectionGridRight } from '../../Database'
import DropdownField from '../../Database/Dropdown'
import {Row} from './styled'
import dnd from '../../utils/DnD'
import ToolTipPopup from '../../ToolTipPopup'
import {
    BackspaceIcon,
    InfoBoxIcon,
    TrashcanIcon,
    SaveIcon,
    InfiniteIcon,
    DragIcon,
    BoxIcon,
  } from '../../Icons'
import WindowSvg from '../../svg/window.svg'
import diagramperson from '../../svg/diagramperson.svg'
import ServerSvg from '../../svg/server.svg'

import LogsContainer from '../../components/LogContainer'
import { CustomNodeModel } from '../../Diagram/node/CustomNodeModel';



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

  import {LItem} from '../ComponentList'



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
        <HeaderTab selected={graph.current === i} onClick={(e) => selectTab(i, e)} borderColorTop={"#00bf86"||"#6d94d4"||"#009688" || "#ffc967" || "#47a8d85e" || "#eff1f2" || "white" || "#ffe863" || "#d3edff" || "#00ca51"}>
          {i === 0 && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path fill="none" d="M0 0h24v24H0z"/><path fill={graph.current === i ? "currentColor" : "#d1d0d0"} d="M2 19h20v2H2v-2zM2 5l5 3.5L12 2l5 6.5L22 5v12H2V5zm2 3.841V15h16V8.841l-3.42 2.394L12 5.28l-4.58 5.955L4 8.84z"/></svg>
          )}
          <span>
            {tab.name}
          </span>
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







  function useDisablePinchZoom(ref) {
    React.useEffect(() => {
      const stopScroll = (e) => e.preventDefault()
      const scrollEl = ref.current
      scrollEl.addEventListener('wheel', stopScroll)
      return () => scrollEl.removeEventListener('wheel', stopScroll)
    }, [])
  }



  function TransitionComponent(props) {
      console.log(props.active)
    const transitions = useTransition(props.active, null, {
        from: {  opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        })
        return transitions.map(({ item, key, props }) =>
        item && <animated.div key={key} style={props}>{props.children}</animated.div>
        )
    
  }
  
  
  const Diagram = observer(({ graph, nodes, toggler, toggleEditor, disabled }) => {
    const processRef = React.useRef()
  
    const [isOver, setIsOver] = React.useState(false)
    const [version, setVersion] = React.useState(0)
  
    const model = graph.tabs[graph.current].model
  
  
    useDisablePinchZoom(processRef)
  

   
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
  
    const onDrop = React.useCallback((event) => {
  
      const extra = dnd.getData("drop-data")
  
      if(!nodes.standard.some(e => e.title === extra.title)) return 
  
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
  
    })
  
    const onDragOver = React.useCallback((event) => {
      event.preventDefault()
  
      if (!isOver) {
        setIsOver(true)
      }
    })
  
  
  
  
  
    return (
      <DropWrapper disabled={disabled}>
        <Process ref={processRef}
          className="background-dot"
          onDrop={onDrop}
          onDragOver={onDragOver}>
            <CanvasWidget engine={graph.engine} />
          </Process>
        <ZoomTools zoomIn={zoomIn} zoomOut={zoomOut} zoomFit={zoomFit} />
      </DropWrapper>
    )
  
  })


export default function DiagramContainer(props) {
    return (

        <ContentWrapper>
          <Main key="a">
            <MainContainer borderNone>

              <HeaderTabs
                buttons
                blank
                borderColor={"#f1f1f1"}>


                <div style={{ position: "relative", maxWidth: "60%" }}>
                  <Tabs graph={props.graph}  />
                </div>

                <div></div>

                <div>
                  <HeaderTab selected={!props.settings} onClick={props.toggleDiagram} borderColorTop={"#0096c3"||"#007eff"||"#767aff" || "#6730ff45" || "#71ff3045" || "#eff1f2" || "white" || "#607d8b" || "#cecece" || "#888888" || "#007ce6" || "#e5e5e5"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path fill="none" d="M0 0H24V24H0z" /><path fill={!props.settings ? "currentColor" : "#cccbcb"} d="M15 3c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1h-2v2h4c.552 0 1 .448 1 1v3h2c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1h-6c-.552 0-1-.448-1-1v-4c0-.552.448-1 1-1h2v-2H8v2h2c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1v-4c0-.552.448-1 1-1h2v-3c0-.552.448-1 1-1h4V9H9c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h6zM9 17H5v2h4v-2zm10 0h-4v2h4v-2zM14 5h-4v2h4V5z" /></svg>
                      <span>
                        Diagram
                      </span>
                    </HeaderTab>
                  <HeaderTab selected={props.settings} onClick={props.toggleSettings} borderColorTop={"#767aff"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path fill="none" d="M0 0h24v24H0z" /><path fill={props.settings ? "currentColor" : "#cccbcb"} d="M2.132 13.63a9.942 9.942 0 0 1 0-3.26c1.102.026 2.092-.502 2.477-1.431.385-.93.058-2.004-.74-2.763a9.942 9.942 0 0 1 2.306-2.307c.76.798 1.834 1.125 2.764.74.93-.385 1.457-1.376 1.43-2.477a9.942 9.942 0 0 1 3.262 0c-.027 1.102.501 2.092 1.43 2.477.93.385 2.004.058 2.763-.74a9.942 9.942 0 0 1 2.307 2.306c-.798.76-1.125 1.834-.74 2.764.385.93 1.376 1.457 2.477 1.43a9.942 9.942 0 0 1 0 3.262c-1.102-.027-2.092.501-2.477 1.43-.385.93-.058 2.004.74 2.763a9.942 9.942 0 0 1-2.306 2.307c-.76-.798-1.834-1.125-2.764-.74-.93.385-1.457 1.376-1.43 2.477a9.942 9.942 0 0 1-3.262 0c.027-1.102-.501-2.092-1.43-2.477-.93-.385-2.004-.058-2.763.74a9.942 9.942 0 0 1-2.307-2.306c.798-.76 1.125-1.834.74-2.764-.385-.93-1.376-1.457-2.477-1.43zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>
                      <span>
                        Inställningar
                      </span>
                  </HeaderTab>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", transform: "translateY(5px)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {

                    }} viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M13 13v5.585l1.828-1.828 1.415 1.415L12 22.414l-4.243-4.242 1.415-1.415L11 18.585V13h2zM12 2a7.001 7.001 0 0 1 6.954 6.194 5.5 5.5 0 0 1-.953 10.784v-2.014a3.5 3.5 0 1 0-1.112-6.91 5 5 0 1 0-9.777 0 3.5 3.5 0 0 0-1.292 6.88l.18.03v2.014a5.5 5.5 0 0 1-.954-10.784A7 7 0 0 1 12 2z" /></svg>
                  </div>
                </div>
              </HeaderTabs>

              {/* #454165 */}

                  <Content>
                  {props.showDiagram ? <Diagram toggleEditor={props.toggleEditor} toggler={props.toggler} graph={props.graph} nodes={props.nodes}/> : <FakeScene />}


                  {/* <TransitionComponent active={props.settings}> */}
                    
                  {/* </TransitionComponent> */}
                  {!props.settings 
                ? null
                : (
                    <SettingsWrapper style={{
                            width: "100%", 
                            height: "100%", 
                            position: "absolute", 
                            left: 0, 
                            top: 0, 
                            zIndex: 0
                        }}>
                        <Settings>
                                <div style={{padding: "15px 30px", height: "100%"}}>
                                    <DRow center>
                                
                                    </DRow>
                                    <DRow>
                                    <div style={{height: 50}}/>
                                    </DRow>

                                    <Row flex="1" w100 style={{height: 400}} justify="center" align="center">
                                    <Row justify="center" align="center" column>
                                        <img src={diagramperson} className="icon-gray" width={"100px"} style={{marginBottom: 20}} alt=""/>
                                        <div style={{fontWeight: 400, opacity: 0.4}} style={{fontWeight: 400, opacity: 0.4, color: "#1c2b46", opacity: 0.7}}>Inställningar för diagram.</div>
                                        <div style={{ fontSize: 12,fontWeight: 400, opacity: 0.3, padding: "5px 40px"}} style={{ fontSize: 12,fontWeight: 400, opacity: 0.3, opacity: 0.5, color: "#1c2b46", padding: "5px 40px"}}>Här kan du konfigurera ditt diagram.</div>
                                    </Row>
                                    </Row>



                                    <DRow>
                                    <div style={{height: 1, margin: "15px 0", width: "100%", background: "rgba(0,0,0,0.06)"}}/>
                                    </DRow>

                                
                                    <InputField placeholder="Namn"/>
                                    <InputField placeholder="Typ"/>
                                    <InputField placeholder="Fördröjning"/>
                                    <DropdownField placeholder="Typer" options={[{label: "hello", value: "hello1"}, {label: "hell2", value: "hello2"}]}/>

                                    <DRow>
                                    <div style={{height: 20}}/>
                                    </DRow>

                                



                                </div>
                        </Settings>
                        </SettingsWrapper>

                )}
                    
                  </Content>

             

            

            
            </MainContainer>
          </Main>

      
        </ContentWrapper>
    )
}