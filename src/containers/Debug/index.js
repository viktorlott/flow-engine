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
import Database, { InputField, BodyGrid,Column, Row as DRow, SectionGridLeft, SectionGridLine,  SectionGridRight } from '../../Database'
import {Row, Table, Tr, SideMenuContent} from './styled'
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
import LogsContainer from '../../components/LogContainer'


const showOnURLQuery = (q) => new RegExp(q, "gi").test(window.location.search)



function Debug(props) {
    return (
        <SidemenuContainer active={props.active} bg={"white" || "#23263c"} right nobg={showOnURLQuery("sidenone")} >
        
        <SideBarHeader borderColor={"#f1f1f1"} style={{justifyContent: "flex-end"}} right>


          <Expander visible={!props.active}  active={!props.active}>
          <svg xmlns="http://www.w3.org/2000/svg" 
              onClick={() => props.toggleSideMenu("right")}  
              style={{
                    background: "white",
                    borderRadius: 4,
                    boxShadow: "0 2px 5px 0 rgb(32 48 60 / 11%)",
                    border: "1px solid #eff1f2"
                  }}  
              viewBox="0 0 24 24" 
              width="16" 
              height="16"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3c0 .953-.19 1.862-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.992 6.992 0 0 1 13 21.929V14h-2v7.93a6.992 6.992 0 0 1-4.438-2.522l-2.526 1.458-1-1.732 2.5-1.443A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3zM8 6a4 4 0 1 1 8 0H8z" /></svg>
            
          </Expander>

          <Expander visible={props.active} left active={!props.active}>
            <svg style={{borderRight: "1px solid #e6e6e6", padding: "10px 15px"}} onClick={() => props.toggleSideMenu("right")}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 11V8l4 4-4 4v-3H8v-2h4zm0-9c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z"/></svg>
          </Expander>
              
              <h4 borderColorTop={"#e5e5e5"} style={{position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", margin: "auto"}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3c0 .953-.19 1.862-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.992 6.992 0 0 1 13 21.929V14h-2v7.93a6.992 6.992 0 0 1-4.438-2.522l-2.526 1.458-1-1.732 2.5-1.443A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3zM8 6a4 4 0 1 1 8 0H8z" /></svg>
                  Felsökning
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path fill="none" d="M0 0h24v24H0z"/><path  fill="currentColor"  d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9 12v2h6v-2h-6zm-3.586-3l-2.828 2.828L7 16.243 11.243 12 7 7.757 5.586 9.172 8.414 12z"/></svg>
                  Konsol */}
              </h4>


              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: 10 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M4 18v-3.7a1.5 1.5 0 0 0-1.5-1.5H2v-1.6h.5A1.5 1.5 0 0 0 4 9.7V6a3 3 0 0 1 3-3h1v2H7a1 1 0 0 0-1 1v4.1A2 2 0 0 1 4.626 12 2 2 0 0 1 6 13.9V18a1 1 0 0 0 1 1h1v2H7a3 3 0 0 1-3-3zm16-3.7V18a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-4.1a2 2 0 0 1 1.374-1.9A2 2 0 0 1 18 10.1V6a1 1 0 0 0-1-1h-1V3h1a3 3 0 0 1 3 3v3.7a1.5 1.5 0 0 0 1.5 1.5h.5v1.6h-.5a1.5 1.5 0 0 0-1.5 1.5z" /></svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M13 19.9a5.002 5.002 0 0 0 4-4.9v-3a4.98 4.98 0 0 0-.415-2h-9.17A4.98 4.98 0 0 0 7 12v3a5.002 5.002 0 0 0 4 4.9V14h2v5.9zm-7.464-2.21A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3c0 .953-.19 1.862-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.986 6.986 0 0 1 12 22a6.986 6.986 0 0 1-5.438-2.592l-2.526 1.458-1-1.732 2.5-1.443zM8 6a4 4 0 1 1 8 0H8z"/></svg>   */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M8.586 8.858l-4.95 4.95 5.194 5.194H10V19h1.172l3.778-3.778-6.364-6.364zM10 7.444l6.364 6.364 2.828-2.829-6.364-6.364L10 7.444zM14 19h7v2h-9l-3.998.002-6.487-6.487a1 1 0 0 1 0-1.414L12.12 2.494a1 1 0 0 1 1.415 0l7.778 7.778a1 1 0 0 1 0 1.414L14 19z" /></svg>
              </div>
            </SideBarHeader>



              <SideMenuContent>
                {!props.showEditor && <LogsContainer>
                  <Row flex="1" w100 justify="center" align="center">
                    <img src={WindowSvg} className="icon-gray" width={"100px"} style={{marginBottom: 20}} alt=""/>
                  </Row>
                </LogsContainer>}
              </SideMenuContent>

              <Header borderColor={"#ffffff"} style={{marginBottom: 20}} >
                <h4  borderColorTop={"#e5e5e5"}>
              
                </h4>
              </Header>


              <Drawer defaultOpen={false} title={"Miljövariabler"}>
                <Row flex="1" w100>
                      <Table>
                        {props.api.map(row => (
                          <Tr>
                            <div>{row.title}</div>
                            <div><input type="text" defaultValue={"\""+row.label+"\""} disabled={true}/>
                            </div>
                            <div>
                              {/* <input type="checkbox" />  */}
                            </div>
                          </Tr>
                        ))}
                      </Table>
                    </Row>
              </Drawer>


              <Drawer title={"Egenskaper"}>
              </Drawer>


              <Expander left active={props.active}>
                <svg onClick={() => props.toggleSideMenu("right")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9H8v2h4v3l4-4-4-4v3z"/></svg>
                
              </Expander>
          
          </SidemenuContainer>

    )
}


export default Debug


// <SidemenuContainer active={state.rightSideMenu} borderColor="#f1f1f1" right style={{zIndex: "0!important"}}>

// {/* <Header borderColor={"#f1f1f1"}>

//   <h4  borderColorTop={"#e5e5e5"}>

//   </h4>


// </Header> */}

// <SideBarHeader borderColor={"#f1f1f1"} style={{justifyContent: "flex-end"}} right>


// <Expander visible={!state.rightSideMenu}  active={!state.rightSideMenu}>
// <svg xmlns="http://www.w3.org/2000/svg" onClick={() => toggleSideMenu("right")}  style={{
//       background: "white",
//       borderRadius: 4,
//       boxShadow: "0 2px 5px 0 rgb(32 48 60 / 11%)",
//       border: "1px solid #eff1f2"
//     }}  viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3c0 .953-.19 1.862-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.992 6.992 0 0 1 13 21.929V14h-2v7.93a6.992 6.992 0 0 1-4.438-2.522l-2.526 1.458-1-1.732 2.5-1.443A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3zM8 6a4 4 0 1 1 8 0H8z" /></svg>

// </Expander>

// <Expander visible={state.rightSideMenu} left active={!state.rightSideMenu}>
// <svg style={{borderRight: "1px solid #e6e6e6", padding: "10px 15px"}} onClick={() => toggleSideMenu("right")}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 11V8l4 4-4 4v-3H8v-2h4zm0-9c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z"/></svg>
// </Expander>

// <h4 borderColorTop={"#e5e5e5"} style={{position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", margin: "auto"}}>
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3c0 .953-.19 1.862-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.992 6.992 0 0 1 13 21.929V14h-2v7.93a6.992 6.992 0 0 1-4.438-2.522l-2.526 1.458-1-1.732 2.5-1.443A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3zM8 6a4 4 0 1 1 8 0H8z" /></svg>
//     Felsökning
//     {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path fill="none" d="M0 0h24v24H0z"/><path  fill="currentColor"  d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9 12v2h6v-2h-6zm-3.586-3l-2.828 2.828L7 16.243 11.243 12 7 7.757 5.586 9.172 8.414 12z"/></svg>
//     Konsol */}
// </h4>


// <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: 10 }}>
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M4 18v-3.7a1.5 1.5 0 0 0-1.5-1.5H2v-1.6h.5A1.5 1.5 0 0 0 4 9.7V6a3 3 0 0 1 3-3h1v2H7a1 1 0 0 0-1 1v4.1A2 2 0 0 1 4.626 12 2 2 0 0 1 6 13.9V18a1 1 0 0 0 1 1h1v2H7a3 3 0 0 1-3-3zm16-3.7V18a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-4.1a2 2 0 0 1 1.374-1.9A2 2 0 0 1 18 10.1V6a1 1 0 0 0-1-1h-1V3h1a3 3 0 0 1 3 3v3.7a1.5 1.5 0 0 0 1.5 1.5h.5v1.6h-.5a1.5 1.5 0 0 0-1.5 1.5z" /></svg>
//   {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M13 19.9a5.002 5.002 0 0 0 4-4.9v-3a4.98 4.98 0 0 0-.415-2h-9.17A4.98 4.98 0 0 0 7 12v3a5.002 5.002 0 0 0 4 4.9V14h2v5.9zm-7.464-2.21A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3c0 .953-.19 1.862-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.986 6.986 0 0 1 12 22a6.986 6.986 0 0 1-5.438-2.592l-2.526 1.458-1-1.732 2.5-1.443zM8 6a4 4 0 1 1 8 0H8z"/></svg>   */}
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M8.586 8.858l-4.95 4.95 5.194 5.194H10V19h1.172l3.778-3.778-6.364-6.364zM10 7.444l6.364 6.364 2.828-2.829-6.364-6.364L10 7.444zM14 19h7v2h-9l-3.998.002-6.487-6.487a1 1 0 0 1 0-1.414L12.12 2.494a1 1 0 0 1 1.415 0l7.778 7.778a1 1 0 0 1 0 1.414L14 19z" /></svg>
// </div>
// </SideBarHeader>



// <SideMenuContent>
//   {!state.showEditor && <LogsContainer>
//     <Row flex="1" w100 justify="center" align="center">
//       <img src={WindowSvg} className="icon-gray" width={"100px"} style={{marginBottom: 20}} alt=""/>
//     </Row>
//   </LogsContainer>}
// </SideMenuContent>

// <Header borderColor={"#ffffff"} style={{marginBottom: 20}} >
//   <h4  borderColorTop={"#e5e5e5"}>

//   </h4>
// </Header>


// <Drawer defaultOpen={false} title={"Miljövariabler"}>
//   <Row flex="1" w100>
//         <Table>
//           {Nodes.api.map(row => (
//             <Tr>
//               <div>{row.title}</div>
//               <div><input type="text" defaultValue={"\""+row.label+"\""} disabled={true}/>
//               </div>
//               <div>
//                 {/* <input type="checkbox" />  */}
//               </div>
//             </Tr>
//           ))}
//         </Table>
//       </Row>
// </Drawer>


// <Drawer title={"Egenskaper"}>
// </Drawer>


// <Expander left active={state.rightSideMenu}>
//   <svg onClick={() => toggleSideMenu("right")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9H8v2h4v3l4-4-4-4v3z"/></svg>
  
// </Expander>
// </SidemenuContainer>