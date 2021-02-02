import styled from 'styled-components'


export const Row = styled.div`
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

export const SideMenuContent = styled.div`
    padding-top: 4px;
    transition: height 0.14s ease-in-out;
    will-change: height;
    ${props => props.hide ? "display: none;" : ""}
    margin: 0 11px;
    margin-bottom: 5px;

`


export const Table = styled.div`
  /* margin-top: -1px; */
  display: flex;

  width: 100%;

  flex-flow: column wrap;
  

  & > div {
    /* border: solid #eff1f2; */
    border-width: 0 0 1px 0;
  }

`


export const Tr = styled.div`
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
  color: #656565;
  /* color: #228c01; */


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
      color: #228c01;
      color: #268c06;
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
