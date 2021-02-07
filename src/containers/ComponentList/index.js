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
import chroma from 'chroma-js'
import Drawer from '../../components/Drawer'
import { observer } from "mobx-react"
import Database, { BodyGrid, Column, Row as DRow, SectionGridLeft, SectionGridLine,  SectionGridRight } from '../../Database'

import InputField from '../../components/Input'
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

const showOnURLQuery = (q) => new RegExp(q, "gi").test(window.location.search)

export function LItem(props) {
  const { item } = props
  const [mouseDown, setMouseDown] = React.useState(false)
  const liRef = React.useRef()


  const onDragStart = React.useCallback(event => {
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
  }, [])

  const onDragEnd = React.useCallback(() => void dnd.removeDragImg(), [])

  const portStyle = (position="right",item2) => ({position: "absolute", [position]: -9, width: 12, height: 12, top: "50%", transform: "translateY(-50%)", background: item.theme || "#525252" ||"#616161", borderRadius: "30%", border: "2px solid #ffffff", fontSize: 8, fontWeight: 600})
let m = true
  const listStyle = {
    ...(item.theme ? {
      borderRadius: 3,
      color: "white",
      border: `1px ${showOnURLQuery("dashed") ? "dashed" : "solid"} ${chroma(item.theme).darken(0.2).alpha(showOnURLQuery("dashed") ? 1 : 1).hex()}`,
    } : {}),
  }

  return props.disabled ? null : (
    <ListItem
      ref={liRef}
      draggable={true}
      onMouseDown={e => void setMouseDown(true)}
      onMouseUp={e => void setMouseDown(false)}
      onMouseLeave={e => void setMouseDown(false)}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      bgcolor={"#ffffff00" || chroma(item.theme).darken(0.2).hex()}
      style={listStyle}>

      <div style={{ width: "37px", height: "100%", background: chroma(item.theme).darken(0.2).alpha(0.5).hex(), borderRight: "1px dashed "+chroma(item.theme).darken(0.2).alpha(1).hex(), position: "absolute", left: 0, top: 0 }}></div>



      <div style={{ display: "flex", flexFlow: "row", position: "relative"}}>
        <ListMainIcon
          style={{borderRadius: "50%", padding: 0}}
          theme={"transparent"||"#424353"||"#5a64ff"||"#2c3f77"||chroma(item.theme).darken(0.1).alpha(1).hex()}
          color={chroma(item.theme).darken(0.1).alpha(1).hex() || "#212429"}>
          {item.icon || <BoxIcon />}
        </ListMainIcon>
        <ToolTipPopup id={item.title+"_tooltip"} text={item.label} delay={500} bg={"#454165"} color={"white"} hide={true}>
          <ListItemTitle>
            <TitleUpper color={chroma(item.theme).darken(0.1).alpha(1).hex()}>{item.title}</TitleUpper>
          </ListItemTitle>
        </ToolTipPopup>
      </div>
      {/* <div style={{ width: "1px", height: "100%", borderRight: "1px dashed "+chroma(item.theme).darken(0.2).alpha(1).hex(), position: "absolute", right: "15%", top: 0 }}></div> */}
      {/* <div style={{ width: "1px", height: "100%", background: chroma(item.theme).darken(0.6).alpha(0.9).hex(), position: "absolute", right: "13%", top: 0 }}></div> */}

      <div style={{ width: "1px", height: "100%", position: "absolute", right: "10px", top: 0 }}>
        {/* <div style={{position: "absolute", width: 7, height: 7, top: 0, transform: "translateY(-50%) rotate(0deg)", background: item.theme, borderRadius: "4px", border: "2px solid #ffffff", fontSize: 8, fontWeight: 600}}/> */}
        <div style={{position: "absolute",  width: 7, height: 7, top: 0, left: -15, transform: "translateY(-50%) rotate(45deg)", background: item.theme, borderRadius: "25%", border: "2px solid #ffffff", fontSize: 8, fontWeight: 600}}/>
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


const BlockList = observer(props =>  {

    return (
      <>
        {props.items.filter(item => {
            return !props.filter ? true : new RegExp(props.filter,"gi").test(item.title)
        }).map((item, i) => {
          return <LItem key={i + "_" + item.title} disabled={item.disabled || props.disabled} item={item} />
        })}
      </>
    )
  })
  


function ComponentList(props) {

    const [state, setState] = React.useState({filter: ""})


    return (
        <SidemenuContainer active={props.active} bg={"white" || "#23263c"} left nobg={showOnURLQuery("sidenone")} >
        
            <SideBarHeader borderColor={"#f1f1f1"} nobg={showOnURLQuery("sidenone")} left>
              <div></div>
              <h4 borderColorTop={"#e5e5e5"} style={{transform: "translateX(-10px)", width: 200}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M20.083 15.2l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332L5.887 7 12 10.668 18.113 7 12 3.332z"/></svg>
                Komponenter
              </h4>
              
              {/* <div style={{ position: "relative", margin: "0 5px", left: -24}}>
                <InputField style={{ height: 32}} placeholder="Sök" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zm-3.847-8.699a2 2 0 1 0 2.646 2.646 4 4 0 1 1-2.646-2.646z"/></svg>
                } />
              </div> */}
              
            
              <Expander visible={props.active} active={props.active}>
                <svg style={{borderLeft: "1px solid #e6e6e6", padding: "10px 15px"}} onClick={() => props.toggleSideMenu("left")}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm0-9h4v2h-4v3l-4-4 4-4v3z"/></svg>
              </Expander>
              <Expander left visible={!props.active} active={!props.active}>     
                <svg xmlns="http://www.w3.org/2000/svg" style={{
                  background: "white",
                  borderRadius: 4,
                  boxShadow: "0 2px 5px 0 rgb(32 48 60 / 11%)",
                  border: "1px solid #eff1f2"
                }}  onClick={() => props.toggleSideMenu("left")}   viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M20.083 15.2l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332L5.887 7 12 10.668 18.113 7 12 3.332z"/></svg>         
              </Expander>
            </SideBarHeader>

                <div style={{ position: "relative", margin: "0 10px" }}>
                  <InputField style={{ height: 32}} onChange={val => setState(prev => ({...prev, filter: val }))} placeholder="Sök" icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zm-3.847-8.699a2 2 0 1 0 2.646 2.646 4 4 0 1 1-2.646-2.646z"/></svg>
                  } />
                </div>
          
               <Drawer defaultOpen={true} title={"Standard"} nobg={showOnURLQuery("sidenone")}>
                <ComponentListContainer nobg={showOnURLQuery("sidenone")}>
                  <BlockList filter={state.filter} items={props.standard} />
                </ComponentListContainer>
              </Drawer>
              <Drawer defaultOpen={false} title={"API"} nobg={showOnURLQuery("sidenone")}>
                <ComponentListContainer nobg={showOnURLQuery("sidenone")}>
                  <BlockList filter={state.filter} items={props.api} />
                </ComponentListContainer>
              </Drawer>
          
          </SidemenuContainer>

    )
}


export default ComponentList