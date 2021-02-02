import styled, { css } from 'styled-components'



export const SideMenuTitle = styled.div`
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
    color: #808080;
    font-weight: 400;
    margin: 0 10px;
    /* color: white; */
    border-bottom: 1px solid #eff1f2;
    border: 1px solid var(--element-border-color);
    margin-bottom: 5px;
    
    border-top: none;
    border-left: none;
    border-right: none;
    /* border-bottom: 1px solid #2d3042; */
    /* box-shadow: 0 2px 5px 0 rgba(32,48,60,.05); */
    ${props => props.nobg && css`
      background: none;
      border: none;
      box-shadow: none;
    `}

    z-index: 2;
    font-size: 14px;
    /* border-radius: 2px; */
    /* opacity: 0.7; */

    & > div {
      justify-content: center;
      align-items: center;

      user-select: none;
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
      opacity: 0.8;
      & > svg {
        color: inherit;
      }

    }
    transition: color 0.2s;

    &:hover {
      color: #0089ff;
    }
`

export const SideMenuContent = styled.div`
    padding-top: 4px;
    transition: height 0.14s ease-in-out;
    will-change: height;
    ${props => props.hide ? "display: none;" : ""}
    margin: 0 11px;
    margin-bottom: 5px;

`

