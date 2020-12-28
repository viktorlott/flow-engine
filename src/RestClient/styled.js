import styled, { css } from 'styled-components'


const borderColor = "#f3ecec"

export const Container = styled.div`
    display: grid;
     outline: none;
     border: none;

     &:focus {
          outline: none;
          border: none;
     }


    grid-template-columns: 300px 0px minmax(0, 720px) 10px  minmax(0, 720px);
    grid-template-rows: 50px minmax(0px, 80px) 1px minmax(0, 720px);
     /* border: 1px solid ${borderColor}; */
    background-color: white;
    margin: 0;
    /* padding: 10px 20px 20px 20px; */
    border-radius: 5px;
    /* height: calc(100% - 200px); */
    box-shadow: 0 20px 40px 0 rgba(0,35,90,.1), 0 0 2px 0 rgba(0,35,90,.06);


    & * {
         /* color: #232b40; */
    }

    /* @media screen and (max-width: 1280px) {
          display: flex;
          flex-flow: column;
     } */
    /* border-bottom: #ececec solid 10px; */
`


export const Sidebar = styled.aside`
     grid-column-start: 1;
     grid-row-start: 1;
     grid-row-end: span 3;
     background-color: blue;
`
export const DragSidebar = styled.section`
     grid-column-start: 1;
     grid-row-start: 1;
     grid-row-end: span 3;
`

const vg = "#2e3250"

export const MainHeader = styled.section`
     display: flex;
     justify-content: space-between;
     /* 
     align-items: center; */
     grid-column: 1 / 6;
     grid-row: 1 / 2;

     width: 100%;


     /* background: #fbfbfb; */
     /* border-bottom: 1px solid ${borderColor};
     border-right: 1px solid ${borderColor};
     border-left: 1px solid ${borderColor}; */

     & > div {
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0;
          color:#676a79;
          border-radius: 4px 4px 0 0;
          font-size: 24px;
          /* height: 40px; */
          font-weight: 200;
          color: #c5c5c5;
          background: #f3f3f3;
          width: 100%;
          color: #c7c7c7;
          background: #f3f3f3;
          background: none;

          
          color: #ffffff;
          /* background: #272727; */

          border-bottom: 1px solid #f5f5f5;
          background: #fbfbfb;
          background: hsla(0,0%,100%,.96);
          /* border-bottom: 1px solid #191919;
          background: #23263c; */
          padding: 0;
          padding: 0 0 0 25px;

     }

     & h1 {
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;

          font-weight: 200;
          /* color: #ff7707; */
          height: 38px;
          padding: 0;
          color:#676a79;
          border-radius: 4px 4px 0 0;
          font-size: 16px;
          height: 100%;
          font-weight: 600;
          color: #c5c5c5;
          background: #f3f3f3;
          text-transform: uppercase;
          color: #c7c7c7;
          background: #f3f3f3;

          background: none;
          color: #162D3D;



          /* color: white; */
          
          /* color: #162a48; */



          & svg {
               padding: 0px 5px 0 0;

               /* .path_signal {
                    fill: #c7c7c7;
                    fill: #162D3D;
                    /* fill: white; 
               } 
               */
          }
          /* color: #ffffff;   */


          & path {
               /* fill: #ff7707; */
          }
          /* background: #ececec;
          background: #f3f3f3; */
          /* border-bottom: 4px solid  #e5e5e5; */
     }


`

// #23263c
export const SideMenu = styled.section`
     grid-column: 1 / 2;     
     grid-row: 2 / 5;
     background: #23263c;
     border-radius: 0 0 0 5px;
    
     color: white;


     font-weight: 600;
     
     padding: 15px 0;
     display: flex;
     justify-content: space-between;
     flex-direction: column;

     
    

`

export const SideMenuContainer = styled.section`
     display: grid;
     grid-auto-columns: auto;
     grid-template-rows: repeat(16, minmax(0, 1fr));
     height: 100%;
     grid-gap: 30px;

`


export const SideMenuSection = styled.section`
     margin: 10px 0;
     & > h4 {
          display: flex;
          /* justify-content: center; */
          align-items: center;
          margin: 0;
          margin-left: 25px;
          /* margin-top: 15px; */
          position: relative;
          font-size: 20px;


          & > svg {
               margin-right: 5px;
          }
     }
     /* #aa4dc8 */
     & > h5 {

          margin: 0;
          margin-top: 4px;
          margin-left: 25px;
          /* margin-bottom: 20px; */
          font-size: 12px;
          font-weight: 400;

     }

     & > div {
          font-size: 10px;
          color: #00c108;
          display: flex;
          /* justify-content: center; */
          flex-flow: row;
          align-items: center;
          padding: 10px 30px 10px 20px;

          
          /* background: #1d2033;
          background: #20243a; */
          /* border-bottom: 1px solid #71717112; */

          margin: 2px 0px;
          color: white;
          /* border-radius: 5px; */

          cursor: pointer;
          & > span {
               margin-left: 10px;

               font-size: 14px;
               /* width: 220px; */

               
          }

          &:hover {
               background: #272a42;
               border-right: 5px solid #dac006;
          }
     }

     & > span {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 40px;
          /* opacity: 0.2; */
          text-align: center;
          font-weight: 400;


          color: #7a92a554;
          font-weight: 500;

          
          /* color: #3e4369; */

        
     }
     
`
export const Header = styled.section`
     display: flex;
     justify-content: space-between;
     /* 
     align-items: center; */
     grid-column: 2 / 6;
     grid-row: 2 / 3;
     /* background: #fbfbfb; */
     /* border-bottom: 1px solid ${borderColor};
     border-right: 1px solid ${borderColor};
     border-left: 1px solid ${borderColor}; */
     padding: 0 20px;


     & h3 {
          margin: 0 14px 0 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 300;
          color: #ff7707;
          height: 38px;
          padding: 0 20px;
          border-radius: 4px;

          & path {
               /* fill: #ff7707; */

          }
          /* background: #ececec;
          background: #f3f3f3; */
          /* border-bottom: 4px solid  #e5e5e5; */
     }

     /* @media screen and (max-width: 1280px) {
          display: flex;
          flex-flow: column;
     } */

`
export const RequestBody = styled.section`
     display: grid;
     grid-column: 2 / 4;
     grid-row: 4 / 5;
     background: white;
/* 
     border-left: 1px solid ${borderColor};
     border-right: 1px solid ${borderColor}; */

     grid-template-columns: 1fr;
     grid-template-rows: 60px 1fr;

     padding: 10px 20px 20px;
     

     border-radius: 4px;
`

export const RequestBodyHeader = styled.section`
     grid-column: 1 / 2;
     grid-row: 1 / 2;
     /* border-bottom: 1px solid ${borderColor}; */

     /* padding: 5px 0; */
     background: var(--element-color);
    border: 1px solid transparent;
    /* var(--element-border-color); */
    border-width: 1px 1px 0 1px;
    border-radius: 3px 3px 0 0;
    padding: 0 0px;

`

export const RequestBodyContent = styled.section`
     position: relative;
     grid-column: 1 / 2;
     grid-row: 2 / 3;
     /* padding-top: 10px; */
     padding-bottom: 10px;
     padding: 10px;
     /* height: calc(100% - 11px); */
     background: #e8e9e8;
     background: #f3f3f3;
     /* background: #ececec; */
     /* padding: 10px; */
     /* margin-top: 10px; */
     border-radius: 0 0 5px 5px;
     /* border-bottom: 7px solid  #e5e5e5; */

     background: #f3f3f3;

     background: var(--element-color);
    border: 1px solid var(--element-border-color);

`


export const ResponseBody = styled(RequestBody)
`
     display: grid;
     grid-column: 5 / 6;
     grid-row: 4 / 5;
     padding: 10px 20px 20px;

     
     grid-template-columns: 1fr;
     grid-template-rows: minmax(0px, 60px) 1fr;
     /* border: solid #f3ecec;
     border-width: 0px 0px 1px 1px; */
     

     /* border-right: 1px solid ${borderColor}; */
`


export const ResponseBodyHeader = styled(RequestBodyHeader)``
// `
//      grid-column: 1 / 2;
//      grid-row: 1 / 2;
//      /* border-bottom: 1px solid ${borderColor}; */
//      /* padding: 5px 0; */

    
// `

export const ResponseBodyContent = styled(RequestBodyContent)``
// `
//      grid-column: 1 / 3;
//      grid-row: 2 / 3;

//      background-color: #ececec;
//      background: #f3f3f3;
     
//      border-radius: 5px;
//      padding: 10px;
     
//      margin-top: 10px;
//      /* border-bottom: 7px solid  #e5e5e5; */
//      background: #f3f3f3;
//      background: var(--element-color);
//     border: 1px solid var(--element-border-color);


// `








export const DragResReq = styled.section`
     grid-column-start: 1;
     grid-row-start: 1;
     grid-row-end: span 3;
`






export const Tabs = styled.div`
     height: 100%;
     display: flex;
     list-style: none;
     padding: 0;
     margin: 0;
     flex-direction: row;
     text-decoration: none;
     margin-top: 9px;
     margin-left: -1px;
     height: 50px;
     
     &::after {
          /* width: 100%;
          height: 100%;
          content: ''; */
          /* background: #f9f9f9; */
          /* border-bottom: 1px solid ${borderColor}; */
     }
`

export const Tab = styled.div`

     /* height: 100%; */
     font-size: 12px;

     /* margin: 0 10px 0 0; */
     border: none;
     text-decoration: none;
     padding: 0px 15px;
     

     /* border-radius: 5px 5px 5px 5px; */

     white-space: nowrap;
     display: flex;
     position: relative;
     justify-content: center;
     align-items: center;

     font-size: 12px;
     /* font-weight: 600; */
  


     /* background: ${props => props.invert ? "#f9f9f9" : "#ececec"}; */
     cursor: pointer;


     color: #777779;

     & span {
          color: #777779;
     }

     & svg path {
          /* fill: #777779!important; */
     }



     /* border: 1px solid transparent; */

     /* border-bottom: 0px solid transparent; */
     font-weight: 400;

     transition: background 0.2s, border-color 0.2s, opacity 0.2s;
     opacity: 0.5;
     border: solid transparent;
     border-top-color: #f5f5f5;
     border-top-color: #e2e2e2;
     border-left-color: #f5f5f5;
     border-width: 3px 1px 1px 1px;
     background:  #f5f5f5; /* #f9f9f9 */
     border-radius: 4px 4px 0 0;
     margin-right: 4px;

     transform: translateY(1px);
     
     ${props => props.active && css`
          z-index: 10;
          opacity: 1;
          ${'' /* border-bottom: 4px solid #e5e5e5; */}

          background: ${props => props.invert ? "#f3f3f3" : "transparent"};
          ${'' /* box-shadow: 1px 0px 0px 0px ${borderColor}, -1px 0px 0px 0px ${borderColor};
          ${props.num !== 0 && css`box-shadow: 1px 0px 0px 0px ${borderColor}, -1px 0px 0px 0px ${borderColor};`} */}
          ${'' /* box-shadow: none!important; */}

          ${'' /* box-shadow: ${props.invert ? "none" : "0px -3px 5px 0px rgb(107 107 107 / 5%)!important"}; */}

          background: var(--element-color);

          ${'' /* border: 1px solid var(--element-border-color); */}

          border-bottom: 1px solid #1890ff;
          border-bottom: 1px solid #e4e4e4;
          border-bottom: 1px solid #24273b;
          border-bottom: 1px solid #24273b2b;
          

          border: 1px solid #ececec;
          border-bottom: 1px solid white;
          border-width: 3px 1px 1px 1px;
          transform: translateY(1px);
          ${'' /* height: 49px; */}

          color: #1890ff;
          color: #24273b;

          border-radius: 4px 4px 0 0;

          & span {
               color: #1890ff;
               color: #24273b;
          }
      
          ${'' /* color:#28344a!important; */}

          &:hover {
               ${'' /* box-shadow: var(--box-shadow-1-arg) var(--box-shadow-2-arg) var(--box-shadow-3-arg) var(--box-shadow-4-arg) var(--box-shadow-5-arg); */}
          }
     `}
     /* margin-right: 4px; */

     /* &:after {
          content: "";
          height: 50%;
          width: 1px;
          background: #e5e5e5;
          position: absolute;
          right: 0;
     } */


     & svg {
          /* position: absolute;
          left: 12px; */
          margin-right: 5px;
     }

     
`