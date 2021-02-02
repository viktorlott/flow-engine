
import React from 'react'
import {
  SideMenuTitle,
  SideMenuContent
} from './styled'

export default function Drawer(props) {
    const [state, setState] = React.useState(() => ({ isOpen: !!props.defaultOpen || false }))
  
  
    const onClick = () => props.children && setState(prev => ({...prev, isOpen: !prev.isOpen}))
  
  
    return (
      <>
        <SideMenuTitle nobg={props.nobg} onClick={onClick} isOpen={state.isOpen}>
          <div>{props.title}</div>
          <div>
            <button><svg style={{transform: state.isOpen ? "rotate(0deg)" : "rotate(-90deg)"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/></svg></button>
          </div>
        </SideMenuTitle>
        <SideMenuContent hide={!state.isOpen}>
          {props.children}
        </SideMenuContent>
      </>
    )
  }