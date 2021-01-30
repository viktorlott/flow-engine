import React, { useState, useEffect } from 'react'
import { Console, Hook, Unhook } from 'console-feed'
import JSONView from './JSONView'

import styled from 'styled-components'
import SuccessIcon from './SuccessIcon'
import ScrollToBottom from 'react-scroll-to-bottom'



// #334360

const Container = styled(ScrollToBottom)`
    height: 410px;
    overflow-y: scroll;
    padding: 15px 0;
    /* background:#f9f9f9;
    background:white; */
    width: 100%;

    & div[data-type=string] {
        font-weight: 500;
        font-size: 16px;

        /* background: #ff9800; */
        /* padding: 0px 0px 1px 8px; */
        border-radius: 3px;

    }
    
    & div[data-type=string] span {
        font-weight: 600;
        font-size: 14px;
        font-family: 'Exo 2','Oxygen',sans-serif!important;
        text-transform: uppercase;
    }

    & div[data-type=object] span {
        font-style: normal!important;
    }

    & div[data-method=info] {
        padding-left: 0;
        /* margin: 10px 0; */
        & > div:last-child {
            margin-left: 0!important;
        }
    }

    ol[role=tree] span {
        transition: transform 0.2s;
    }

    /* ol[role=group] {
        transition: height 0.2s;
    } */

    /* div[data-type=formatted] {
        width: 100%;

    }
    div[data-type=formatted] span {
        width: 100%;
        display: block;
    } */

        
    scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
    }

    scrollbar {
        width: 10px;
        background-color: #F5F5F5;
    }

    scrollbar-thumb {
        background-color: #000000;
        border: 2px solid #555555;
    }

   

`






const LogsContainer = (props) => {
    const [logs, setLogs] = useState([])
  
    // run once!
    useEffect(() => {
      Hook(window.console, log => {
          return log.method === "info" ? setLogs(currLogs => [...currLogs, log]) : null
      }, false)

      return () => Unhook(window.console)
    }, [])


    return (
        <Container>
          {!!logs.length && <Console 
                logs={logs} 
                variant="light"
                styles={{
                    LOG_INFO_COLOR: "#1c2b46" || "white" || "#005cc5",
                    LOG_INFO_ICON: "",
                    BASE_FONT_FAMILY: "", 
                    BASE_FONT_SIZE: 12,
                    ARROW_FONT_SIZE: 12,
                    BASE_BACKGROUND_COLOR: "white",
                }} />}
            {!logs.length && <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
                <h4 style={{textAlign: "center", opacity: 1}}>

                    {props.children}
                    <div style={{fontWeight: 400, opacity: 0.4}}>Här kommer dina loggar visas.</div>
                    <div style={{ fontSize: 12,fontWeight: 400, opacity: 0.3, padding: "5px 40px"}}>Just nu så är dina loggar tomma, testa gärna en nod för att fylla dem.</div>
                </h4>
                <h4></h4>
            </div>}
            {/* <JSONView  value={}/> */}
        </Container>
      )
  }


//   {type: "response", payload:   { wow: 123 } }
export default LogsContainer 