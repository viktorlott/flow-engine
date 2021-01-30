import styled, { css } from 'styled-components'
import chroma from 'chroma-js'



export const Container = styled.div`
  display: flex;
  /* justify-content: center;  */
  /* align-items: center; */
  overflow: hidden;
  height: 100%;
  width: 100%;

  height: calc(100%);

  flex-direction: column;

  display: grid;
  transition: 0.5s;
  grid-template-columns: ${props => props.leftSideMenu ? "250px" : "100px"} 1fr ${props => props.rightSideMenu ? "340px" : "100px"};
  grid-template-rows: 60px 1fr;


`

export const FakeScene = styled.div`
    height: 100%;
    background: #242d3e;
    border-radius: 5px;
    /* background-size: 25px 25px; */
    /* background-image: linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent); */

    background-color: #ffffff;
    background-image:url("data:image/svg+xml;utf8,%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Ccircle%20cx%3D%220.5%22%20cy%3D%220.5%22%20r%3D%220.5%22%20fill%3D%22%2381818a%22%20%2F%3E%3C%2Fsvg%3E");background-position: 9px 10px;
`
/* #2e3959,#192038); */
export const Process = styled.div`
/* border-top: 1px solid #cccccc; */
    height: 100%;
    /* background-color: rgb(247 247 247);
    background-color: #131313; */
    /* background-color: #ffffff; */
    display: flex;
    /* background: #242d3e;

    background-color: #fbfafa; */
    
    /* background-size: 25px 25px; */
    /* background-image: linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent); */
    /* background-image: linear-gradient(0deg,transparent 24%,rgba(0,0,0,0.05) 25%,rgba(0,0,0,0.05) 26%,transparent 27%,transparent 74%,rgba(0,0,0,0.05) 75%,rgba(0,0,0,0.05) 76%,transparent 77%,transparent),linear-gradient(90deg,transparent 24%,rgba(0,0,0,0.05) 25%,rgba(0,0,0,0.05) 26%,transparent 27%,transparent 74%,rgba(0,0,0,0.05) 75%,rgba(0,0,0,0.05) 76%,transparent 77%,transparent); */
    /* background-color: #ffffff; */
    /* background-image:url("data:image/svg+xml;utf8,%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Ccircle%20cx%3D%220.5%22%20cy%3D%220.5%22%20r%3D%220.5%22%20fill%3D%22%2381818a%22%20%2F%3E%3C%2Fsvg%3E");background-position: 9px 10px; */
    

    /* 
      
    background-position: 50% 0,0 0;
    background-size: auto,auto;
    background-repeat: repeat-y,repeat;
    background-attachment: scroll,scroll; */

  &, & > div {
    width: calc(100% - 0px);
    height: calc(100% - 0px);
    border-radius: 0 0 3px 3px;
  }
`

// linear-gradient(0deg,transparent 24%,rgba(0,0,0,0.05) 25%,rgba(0,0,0,0.05) 26%,transparent 27%,transparent 74%,rgba(0,0,0,0.05) 75%,rgba(0,0,0,0.05) 76%,transparent 77%,transparent),linear-gradient(90deg,transparent 24%,rgba(0,0,0,0.05) 25%,rgba(0,0,0,0.05) 26%,transparent 27%,transparent 74%,rgba(0,0,0,0.05) 75%,rgba(0,0,0,0.05) 76%,transparent 77%,transparent)

export const ComponentListContainer = styled.ul`
  list-style: none;

  background-image: url("data:image/svg+xml;utf8,%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Ccircle%20cx%3D%220.5%22%20cy%3D%220.5%22%20r%3D%220.5%22%20fill%3D%22%2381818a%22%20%2F%3E%3C%2Fsvg%3E");

  /* position: absolute; */
  z-index: 100;
  left:0;
  /* border-right: 1px solid #f0f0f0; */
  padding: 0; 
  margin: 0;
  /* width: 66px; */
  display: flex;
  flex-flow: column;
  /* justify-content: center; */
  flex: 1;

  /* top: 50%; */
  /* transform: translateY(-50%); */

  /* overflow-y: hidden; */
  cursor: grab;

  padding: 10px 0px;
  ${props => props.nobg && css`
      background: transparent!important;
      background-image: none;
      border: none;
      box-shadow: none;
    `}

  & > h3 {
    color: #232b40;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-bottom: 1px solid #f0f0f0; */

    padding: 15px 0 ;
    margin: 0;
    margin-top: 20px;
    margin-bottom: 16px;
    transform: scale(1.2);    
  }



  & > li:hover {
    /* background: rgb(249, 252, 255)!important; */
    /* border-width: 0px 4px 0px 0px!important; */

  }
 

  & svg {
    width: 15px;
    height: 15px;
  }
`



export const SpecialButton = styled.button`
    display: flex;
    justify-content: space-between;
    border-radius: 4px;
    opacity: 1;
    margin: 4px 4px 4px 4px;

    transition: box-shadow 0.2s, margin 0.2s, border 0.2s, opacity 0.14s, width 0.3s ease-in-out;
    /* border-width: 0 0px 0px 0!important; */
    /* box-shadow: 1px 1px 9px 0px rgba(0,0,0,0.05); */
    /* width: 60px; */
    /* height: 50px; */
    padding: 5px 3px;
    overflow: hidden;
    background: ${props => chroma(props.theme).darken(0.2).hex()};
    color: white;
    outline: none;
    cursor: pointer;

    & svg {
      margin-right: 7px;
    }
    &:hover {
      width: unset;
      color: rgb(63, 131, 255);


    }

    & > span.first {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      white-space: nowrap;
      height: 100%;
      background: ${props => chroma(props.theme).darken(0.2).hex()};
      /* background: #ffffff; */
      background:transparent;
    }
    
    & span.second {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      background: ${props => chroma(props.theme).darken(0.3).hex()};
      /* background: #ffffff; */
      background:transparent;
      height: 100%;
      padding: 0 10px;
    }


    /* background: #ffffff; */
    background:transparent;
    color: white;
    outline: none;
    cursor: pointer;
    border: none;
    font-weight: 500;
    /* border: 1px solid #404040!important; */
    color: #404040;
    /* color: white; */



`


const spring = t => 
    -0.5 * 
    (2.71828 ** (-6 * t)) * (
        -2 * (2.71828 ** (6 * t)) + 
        Math.sin(12 * t) + 
        2 * Math.cos(12 * t)
    )
  
  const lerp = (a, b, p) => a + p * (b - a)
  
  const bounce = funcs => css`
    @keyframes move {
      ${props => {
        return [...Array(100).keys()].map(i => {
          let t = i / (funcs.duration || 100)
          let p = spring(t)
          return `${i + "%"} {`+
            `${(funcs.animation || props.animation)(p, i, lerp)}` +
          `}`
        }).join("\n")
      }}

      100% {
          ${funcs.rest()}
      }
    }
  `
  
export const ListItem = styled.li`
      display: flex;

    justify-content: space-between;
    position: relative;

    margin: 10px 18px;
    padding-left: 5px;

    cursor: grab;

    transition: background 0.1s, margin 0.1s;
    will-change: background;
    background: ${props => props.bgcolor};

    /* transition: transform 0.08s; */

    /* ${bounce({
        duration: 25,
        animation(p, i, lerp) {
            return `
                transform: scale(${lerp(1, 1.04, p)});
            `
        },
        rest() {
            return `transform: scale(1);`
        }
    })} */
    &:hover {
      /* animation: move 2s ease-in-out; */
      /* transform: scale(1.04); */
      /* background: ${props => chroma(props.bgcolor).alpha(0).hex()}; */
      margin: 10px 15px;
      
    }
    will-change: background;

`

export const ListItemTitle = styled.div`
    display: flex;
    justify-content: center;
    padding: 6px 0px;
    flex-flow: column;
    margin-left: 0px;
    padding-left: 0px;
    white-space: nowrap;
`

export const TitleUpper = styled.span`
    font-size: 12px;
    color: #232b40;
    color: currentColor;
    font-weight: 400;
    white-space: nowrap;
    color: ${props => props.color ? props.color : "#212429"};
    /* text-shadow: 0 -1px 0 rgba(0,0,0,.12); */

`



export const TitleSub = styled.span`
    color: #565656;
    font-size: 9px;
    color: #404040;
    color: currentColor;
    padding: 2px 0px;
    margin-top: 3px;
    border-radius: 15px;
    font-weight: 600;
    /* background: aliceblue; */
    display: flex;
    /* justify-content: center; */
    align-items: center;

    /* text-shadow: 0 -1px 0 rgba(0,0,0,.12); */
    & > svg {
      margin-left: 4px;
    }
`





export const ListItemRightIcon = styled.div`
    display: flex;

    align-items: center;


    color: #2E3A59;

    color: white;

    padding-right: 15px;
    color: black;
    opacity: 0.2;
`


export const ListMainIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* border-right: 1px solid ${props => props.theme}; */
  /* padding-left: 10px;
  padding-right: 10px; */

  margin: 4px;
  border-radius: 3px;
  
  /* background: #fbfbfb; */
  /* border-radius: 4px 0 0 4px; */
  margin-right: 18px;
  margin-left: 8px;
  color: ${props => props.color};
  background: ${props => props.theme};


  & > svg {
    /* opacity: 0.8; */
  }

`


export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex-flow: column;
  width: calc(100% - 15px);
  height: calc(100% - 25px);

  ${props => props.borderNone ? "" : css`
    border: 1px solid #e5e5e5;
  `}

  /* box-shadow: 0 5px 20px 0 rgba(32,48,60,.11);
  box-shadow: -13px 15px 20px 0 rgba(32,48,60,.11); */

  box-shadow: -13px 15px 20px 0 rgba(32,48,60,.01);
  /* box-shadow: 0 5px 20px 0 rgba(32,48,60,.11); */
  /* border-radius: 5px; */
  background: transparent;

  /* border-radius: 5px; */
`

export const HeaderContainer = styled.div`
  /* width: 370px;
  height: 100px; */
  display: flex;
  flex-flow: row;
  justify-content: space-between;

  /* right: 0;
  position: absolute; 
  top: 0; */
  z-index: 100;
`

export const HeaderContainerTitle = styled.div`
  color: #232b40;

  display: flex;
  justify-content: center;
  align-items: center;
  /* border-bottom: 1px solid #f0f0f0; */
  padding: 20px 0 ;
  margin: 0;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 30px;



  & > h1 {
    display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  }

  /* & svg {
    margin-right: 10px;
    width: 35px;
    height: 35px;
  } */





`

export const NavBar = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  /* margin-right: 40px; */


`

export const NavButton = styled.button`
  outline: none;
  border: none;
  padding: 10px 15px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f0f0f0;
  background: #f0f0f0;
  color: #232b40;
  font-weight: 400;
  border-radius: 4px; 
  font-size: 15px;
  background: transparent;
  transition: background 0.05s, box-shadow 0.05s;
  cursor: pointer;
  margin: 0 20px;
  border-color: #242c3f;

  
  will-change: background box-shadow;


  
  /* background: #242c3f; */
  
  border-bottom: 3px solid #1b222f;
  
  ${props => props.invert
    ? css`
    color: white;
    background: #304169;
    background: #3a3a3a;
    text-shadow: 0 -1px 0 rgba(0,0,0,.12);
    border-width: 0 4px 3px 0;
    border-color: #2b2b2b;

  ` : props.danger 
      ? css`

        color: #ff3b3b;
        border-color: #ff3b3b;

        & svg {
          width: 24px;
          height: 24px;
          margin: 0!important;
        }

        background: #ff3b3b;
        color: white;
        border-color: #ff3b3b;
        
        background: #ff6262;
        border-color: #ff6262;

        border-color: #3555ff;
        background: #3555ff;
        cursor: auto;
        padding: 7px 15px;
        margin: 0;


        border: none;
        border-bottom: 3px solid #061563;

        background: #0a64cc;
    cursor: auto;
    padding: 7px 15px;
    margin: 0;
    border: none;
    border-bottom: 3px solid #074ea0;
      `
      : css`
        color: #232b40;
        background: #f0f0f0;
        background: transparent;
        text-shadow: none;
  `}
 
  &:hover {
    
    box-shadow: 1px 1px 9px 0px rgba(0,0,0,0.05);
    
    ${props => props.invert
    ? css`
  
      ${'' /* color: #232b40;
      background: #f0f0f0; */}
      ${'' /* background: transparent;
      text-shadow: none; */}

      border-width: 0 4px 3px 0;
  ` : props.danger 
      ? css`
        background: #ff3b3b;
        color: white;
        border-color: #ff3b3b;

        background: #ff6262;
        border-color: #ff6262;

        border-color: #3555ff;
        background: #3555ff;

        cursor: auto;
        margin: 0;
        padding: 7px 15px;
        & svg {
          width: 24px;
          height: 24px;
          margin: 0!important;
        }

        border: none;
        border-bottom: 3px solid #061563;


        background: #0a64cc;
    cursor: auto;
    padding: 7px 15px;
    margin: 0;
    border: none;
    border-bottom: 3px solid #074ea0;

      `
      : css`
        color: white;
        background: #304169;
        text-shadow: 0 -1px 0 rgba(0,0,0,.12);
    `}
  

  }

  & > svg {
    /* margin-right: 6px; */
  }

`

export const Sec = styled.div`

`


export const Header = styled.div`
  /* width: 350px; */
  position: relative;
  /* min-height: 49px; */
  /* border-radius: 5px 5px 0 0; */
  background: ${props => props.tabs ? "transparent" || "#f0f4f7" : "white"};
  border-bottom: 1px solid ${props => props.borderColor ? props.borderColor : "rgba(0,0,0,0.1)"};
  /* background: ${props => props.blank ? "#f0f4f7" : "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzZweCIgaGVpZ2h0PSI4cHgiIHZpZXdCb3g9IjAgMCAzNiA4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1Mi4yICg2NzE0NSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+VGl0bGViYXItaWNvbnMyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlRpdGxlYmFyLWljb25zMiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0MyQzdDQiIgY3g9IjQiIGN5PSI0IiByPSI0Ij48L2NpcmNsZT4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLUNvcHkiIGZpbGw9IiNDMkM3Q0IiIGN4PSIxOCIgY3k9IjQiIHI9IjQiPjwvY2lyY2xlPgogICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtQ29weS0yIiBmaWxsPSIjQzJDN0NCIiBjeD0iMzIiIGN5PSI0IiByPSI0Ij48L2NpcmNsZT4KICAgIDwvZz4KPC9zdmc+) #fff 12px no-repeat"}; */
  display: flex;
  justify-content: center;
  border-radius: 1px 1px 0 0;
  
  align-items: center;
  /* border-top: 1px solid #e4e4e4; */
  /* background: #fbfbfb; */

  /* background: #f0f4f7; */
  ${props => props.tabs && props.blank && css`
    border-radius: 0;
  `}
  & > div {
    display: flex; 
    justify-content: center;
    align-items: center;


    /* margin-right: 20px; */
    &  svg {
      color: #1c2b46;
      cursor: pointer;
      padding: 10px;
      color: #717171;
      /* color: #303135; */

        
      ${props => props.tabs && props.buttons && css`
        ${'' /* border: 1px solid #e5e5e5; */}
        border-radius: 4px;
        margin: 0 4px;
        padding: 5px;
        background: white;
      `}
    }

    & svg:hover {
      color: rgb(63,131,255);
    }


  }


  


  



  & > h4 {
    padding: 0;
    margin: 0;
    text-align: center;
    color: #1c2b46;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    font-size: 12px;
    font-weight: 500;
    font-family: 'Exo 2','Oxygen',sans-serif!important;


    width: 250px;
    padding: 7px 10px;
    border-radius: 10px;
    font-size: 12px;
    /* background: #f9f9f9; */
    font-weight: 500;
    color: #717171;
    color: #383f48;


    & > svg {
      margin-right: 5px!important;
      height: 14px!important;
      width: 14px!important;
    }

    ${props => props.tabs && css`
        border-bottom: 1px solid white;
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        height:100%;
        border-radius: 0px;
        position: relative;
        padding: 0 10px;
        border-bottom: 1px solid white;
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        border-top: 1px solid #e5e5e5;
        border-color:  ${props => props.borderColor ? props.borderColor : "#e5e5e5"};
        height: 40px;
        border-radius: 0px;
        padding: 0px 10px;
        /* margin-top: 24px; */
        border-radius: 3px 3px 0 0;
        ${'' /* margin-left: 5px; */}
        transform: translateY(2px);
        width: ${props => props.width ? props.width : "120px"};
        
        background: white;
        ${'' /* margin-top: 4px; */}

     
        ${'' /* border-top: 3px solid ${props => props.borderColorTop ? props.borderColorTop : "#ffd876"}; */}
${'' /* 
        &:before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          border-radius: 0 0 4px 0;
          display: block;
          border-right: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          left: -11px;
          bottom: -1px;
          z-index: 0;
        }

        &:after {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          border-radius: 0 0 0 4px;
          display: block;
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          right: -11px;
          bottom: -1px;
          z-index: 0;
        } */}

        ${'' /* &:before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          border-radius: 4px 0 2px 4px;
          display: block;
          left: -10px;
          bottom: -3px;
          z-index: 0;
          background: #f1f1f1;
        }

        &:after {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          border-radius: 0 0 4px 0;
          display: block;
          left: -11px;
          bottom: -3px;
          z-index: 0;
          background: white;
        } */}


        &  svg {
        

            
          ${props => props.tabs && props.buttons && css`
            color: #1c2b46;
            cursor: pointer;
            padding: 10px;
            color: #717171;
            ${'' /* border: 1px solid #e5e5e5; */}
            border-radius: 4px;
            margin: 0 4px;
            padding: 5px;
            background: white;

            &:hover {
              color: rgb(63,131,255);
            }

          `}
        }

    }
    
    `}

    & > svg {
      margin-right: 5px;
    }
  }




`
// transform: translateX(-12px)

export const SideBarHeader = styled(Header)`
  /* border-top: 1px solid #e4e4e4; */

  height: 60px;

  ${props => props.nobg && css`
      background: transparent!important;
      border: none;
      box-shadow: none;
    `}

  border-bottom: none;
  > h4 {
    color: #585858; 
    color: #303135;
    /*#686c71;*/
    font-weight: 400;
    font-size: 14px;

    font-weight: 300;
    font-size: 14px;
    padding: 5px;
    width: 130px;
    /* background: #f3f3f3; */
    /* color: #5d5d5d; */
    border-radius: 3px;
    /* border: 1px solid #ececec; */


    ${props => props.nobg && css`
      background: transparent!important;
      border: none;
      box-shadow: none;
    `}

    > svg {
      margin-top: 2px;
    }
  }
`


// ${props => props.tabs && css`
// border-bottom: 1px solid white;
// border-left: 1px solid #e5e5e5;
// border-right: 1px solid #e5e5e5;
// height:100%;
// border-radius: 0px;
// position: relative;
// padding: 0 10px;
// border-bottom: 1px solid white;
// border-left: 1px solid #e5e5e5;
// border-right: 1px solid #e5e5e5;
// border-top: 1px solid #e5e5e5;
// border-color:  ${props => props.borderColor ? props.borderColor : "#e5e5e5"};
// height: 40px;
// border-radius: 0px;
// padding: 0px 10px;
// /* margin-top: 24px; */
// border-radius: 3px 3px 0 0;
// ${'' /* margin-left: 5px; */}
// transform: translateY(2px);
// width: ${props => props.width ? props.width : "120px"};

// background: white;
// margin-top: 4px;
// border-top: 3px solid ${props => props.borderColorTop ? props.borderColorTop : "#ffd876"};

// & > svg {
//   margin-right: 5px!important;
//   height: 16px;
//   width: 16px;
// }


// &  svg {

    
//   ${props => props.tabs && props.buttons && css`
//     color: #1c2b46;
//     cursor: pointer;
//     padding: 10px;
//     color: #717171;
//     ${'' /* border: 1px solid #e5e5e5; */}
//     border-radius: 4px;
//     margin: 0 4px;
//     padding: 5px;
//     background: white;

//     &:hover {
//       color: rgb(63,131,255);
//     }

//   `}
// }


// `}



export const HeaderTabs = styled(Header)`
  background: transparent;
  justify-content: space-between;
  width: calc(100%);
  
  & > div:first-child {
    /* margin-left: 65px; */
  }

  & > div > h4 {
    padding: 0;
    margin: 0;
    text-align: center;
    color: #1c2b46;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Exo 2','Oxygen',sans-serif!important;
    margin-right: 3px;

    width: 250px;
    padding: 7px 10px;
    border-radius: 10px;
    font-size: 12px;
    /* background: #f9f9f9; */
    font-weight: 500;
    color: #717171;

   

  
    & > svg {
      margin-right: 5px;
    }
  }
 
`

export const HeaderTab = styled.h5`
    padding: 0;
    margin: 0;
    text-align: center;
    color: #1c2b46;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    font-size: 14px;

    font-family: 'Exo 2','Oxygen',sans-serif!important;
    margin-right: 3px;
    position: relative;
    /* width: 250px; */
    /* padding: 7px 10px; */
    /* border-radius: 10px; */
    /* border-radius: 3px 3px 0 0; */
    font-size: 12px;
    /* background: #f9f9f9; */
    font-weight: 500;
    color: #717171;
    padding: 0 10px;
    color: #e4e4e4;
    width: ${props => props.width ? props.width : "120px"};

    
    height: 40px;

    /* &:after {
      content: "";
      position: absolute;
      right: 0;
      display: none;
      top: 50%;
      transform: translateY(-50%);
      width:1px;
      background: #e4e4e4;
      height: 18px;
    } */
    margin-top: 0px;
    /* transition: margin 0.05s; */
    cursor: pointer;

    border: solid transparent;
    border-width: 2px 1px 1px 1px;
    /* transform: translateY(0px);   */
    background: #f9f9f9;
    color: #cccbcb;
    
    &:hover {
      background: #f6f6f6;
      /* color: #e4e4e4; */
    }


    /* border-top: 4px solid #f3f3f3; */
    border: none;
    border-top: 2px solid #f9f9f9;
    /* ${props => props.green ? "#d6ead6" : "#eff1f2"||"#f9f9f9" || "#ececec" || "#f4f4f4"} */
    margin-right: 5px;
    transition: color 0.1s;
    will-change: color, background;
    border-radius: 2px 2px 0 0;
    border-bottom: 1px solid transparent;

    /* border-bottom: 1px solid #e5e5e5; */
    /* || props.borderColorTop : "#ffd876" */

    ${props => props.selected && css`
        border-bottom: 1px solid white;
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        height:100%;

        position: relative;
        padding: 0 10px;
        
        border-bottom: 1px solid white;
        ${'' /* border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5; */}
        
        border-color:  ${props => props.borderColor ? "#e5e5e5" || props.borderColor : "#e5e5e5"};
        height: 40px;

        padding: 0px 10px;
        color: #717171;
        /* margin-top: 24px; */


        ${'' /* margin-left: 5px; */}
        ${'' /* transform: translateY(0px); */}
        width: ${props => props.width ? props.width : "120px"};
        
        background: white;
        border: none;
        border-bottom: 1px solid white;
        border-top: 4px solid #383350;

        ${'' /* margin-top: 4px; */}
        margin-right: 5px;
        border-top: 2px solid ${props => props.borderColorTop ? props.borderColorTop : "#e5e5e5"};

        ${'' /* box-shadow: 1px -2px 7px 3px rgb(31 31 31 / 0.03); */}

        &:hover {
          background: white;
          /* color: #e4e4e4; */
        }
        

        & > svg {
          margin-right: 5px!important;
          ${'' /* height: 16px;
          width: 16px; */}
        }

        &:after {
          display: block;
          content: "";
          position: absolute;
          width: 100%;
          height:1px;
          background: white;
          bottom: -2px;
        }
        
        &  svg {
      
            
          ${props => props.tabs && props.buttons && css`
            color: #1c2b46;
            cursor: pointer;
            padding: 10px;
            color: #717171;
            ${'' /* border: 1px solid #e5e5e5; */}

            margin: 0 4px;
            padding: 5px;
            background: white;

            &:hover {
              color: rgb(63,131,255);
            }

          `}
        }

        & > svg {
          margin-right: 5px!important;
          width: unset;
          height: unset;
          padding: 0!important;
        }

        & > svg:hover {
          color: currentColor;
        }


    
    `}

    & > svg {
      margin-right: 5px;
      margin-top: 2px;
    }
    & > svg {
      margin-right: 5px!important;
      width: unset;
      height: unset;
      padding: 0!important;
    }

    & > svg > path {
      transition: fill 0.1s;
    }

    & > svg:hover {
      color: currentColor;
    }
`


export const Main = styled.div`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width: 100%; 
  height: 100%;
  background: transparent;


`

export const Content = styled.div`
  width: calc(100%);
  height: calc(100% - 30px);
  /* background: white; */
  /* border-radius: 0 5px 5px 5px; */
  /* margin-top: 50px; */
  overflow: hidden;
  position: relative;
  /* padding: 1px; */
  /* background: white; */
  border-radius: 0 3px 2px 2px;
  
  ${props => props.border && css`
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
  
  `}
`
export const SettingsRow = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  gap: 30px;
  /* grid-template-rows: auto; */
  grid-auto-rows: auto;
  grid-template-columns: repeat(12,minmax(0,1fr));

  
  color: #162d3d;
`


export const SettingsWrapper = styled.div`
  background: transparent;

  will-change: background;

  @keyframes bgtrans {
    0% {
      background: rgba(0,0,0,0);
    }
    100% {
      background: #ffffffc4;
    }
  }

  animation: 0.2s bgtrans forwards;

`


export const Settings = styled.div`

  /* display: grid;
  gap: 30px; */
  /* grid-template-rows: auto; */
  /* grid-auto-rows: auto; */
  /* grid-template-columns: repeat(12,minmax(0,1fr)); */

  /* padding: 10px 20px; */
  color: #20303c;
  /* #162d3d  */
  position: absolute;
  z-index: 1;
  right: 0;
  background: white;
  height: calc(100% );
  box-shadow: 0 2px 5px 0 rgba(32,48,60,.05);
  border-left: 1px solid #eff1f2;

  will-change: transform;


  @keyframes settingright {
    0% {
      transform: translateX(1000px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  animation: 0.2s settingright forwards;

  




  & h1 {
    font-weight: 200;
    color: #686c71;
    font-size: 24px;
  }

  & bold {
    font-weight: 300;
  }
`

export const DropWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: ${props => props.disabled ? "none" : "block"};


`

export const DropTag = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    opacity: 0.15;
    transition: background-color 0.2s;
    /* background-color: rgb(205, 220, 57); */
    background-color: #efefef;
`



export const HeaderWrapper = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  position: relative;
  /* height: 50px; */
  /* height: 55px; */
  justify-content: space-between;
  /* border-bottom: 1px solid #eff1f2; */
  /* border-bottom: 1px solid #e5e5e5; */
  /* box-shadow: 0 2px 5px 0 rgba(32,48,60,.05); */
  background: #f0f4f7;

  z-index: 1;


  grid-column: 1/4;
  grid-row: 1/2;

  background: #f0f4f7;
  background: rgb(255 255 255);
  border-bottom: 1px solid #eff1f2;
  box-shadow: 0 2px 5px 0 rgba(32,48,60,.05);

  /* background: rgb(26, 26, 43); */


  /* & * {
    color: white!important;
  } */

  ${props => props.hide && css`
      margin-bottom: 2px;
      border-bottom: none;
      box-shadow: none;

      background: #f0f4f7;
      ${'' /* background: rgb(26, 26, 43); */}
      ${'' /* height: ${(/blank\=([0-9]+)/gi).exec(window.location.search) ? (/blank\=([0-9]+)/gi).exec(window.location.search)[1]+"px;" : "55px;"}; */}
  `}
  
  /* background: #2b304c; */
`


export const SidemenuContainer = styled.div`
    display: flex;
    position: relative;

    /* width: ${props => props.width ? props.width : "350px"}; */
    
    /* height: calc(100% ${props => props.maximized ? "" : "- 50px"}); */
    width: calc(100% - 0px);
    /* width: ${props => props.width ? props.width : "435px"}; */
    /* width: calc(100% - 20px); */

    /* width: calc(100% - 50px); */
    
    height: calc(100% - ${props => props.mini? "150px" : "25px"});
    /* ${props => props.maximized ? "border: 1px solid #e5e5e5;" : ""} */

    /* justify-content: center; */
    /* align-items: center; */
    /* background: #f0f4f7;
    background: #f9f9f9; */
    /* background: ${props => props.bg ? props.bg : "white"}; */
    background: ${props => props.nobg ? "transparent" : "white"};
    /* border-radius: 4px; */
    /* overflow: scroll; */
    flex-direction: column;

    align-self: center;
    justify-self: center;
    /* border-radius: 4px 0 0 4px; */

    /* margin-top: 14px; */
    border-radius: 3px;
    overflow: hidden;
    /* box-shadow: 0 5px 20px 0 rgba(32,48,60,.11); */
    
    /* box-shadow: -13px 15px 20px 0 rgba(32,48,60,.01);  */

    /* ${props => props.left ? "border-right: 1px solid #eff1f2;" : "border-left: 1px solid #eff1f2;"} */

    ${props => props.left ? "box-shadow: 0px 0 5px 0 rgba(32,48,60,.05);" : "box-shadow: 0px 0 5px 0 rgba(32,48,60,.05);"}
    border: 1px solid #eff1f2;

    ${props => props.nobg && css`
      background: none;
      border: none;
      box-shadow: none;
    `}

    ${props => props.left && css`
      grid-column: 1/2;
      grid-row: 2/3;
      ${'' /* background: #242427; */}
    `}

    ${props => props.right && css`
      grid-column: 3/4;
      grid-row: 2/3;
      ${'' /* background: #272a3c; */}
    `}

    

    & > div:nth-child(2) {
      /* border-left: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4; */
      /* border-radius: 0 5px 5px 5px; */
      overflow: hidden;
      border-color: ${props => props.borderColor ? props.borderColor : "#e4e4e4"};
    }
    /* z-index: 10; */

    visibility: ${props => props.active ? "visible" : "hidden"};
`


export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  /* height: calc(100% - 100px); */
  height: calc(100%);
  justify-content: space-between;
  align-items: center;
  background: #f0f4f7;



  grid-column: 2/3;
  grid-row: 2/3;


`


export const Editor = styled.div`
  display: flex;
  justify-content: space-between;

`


export const Button = styled.button`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: ProximaNova, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  text-rendering: optimizeLegibility;


  

  outline: none;
  background: white;
  border: none;
  /* border: 1px solid #f1f1f1; */
  border-color: #cccccc;
  display: flex;
  justify-content: center;
  padding: 10px 15px 10px 10px;
  user-select: none;
  align-items: center;
  color: #a0a0a0;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    border-width: 1px 1px 1px 1px;
    border: 1px solid #f3ecec;
 

  border-radius: 4px;
    border-left: 0px;
    margin: 0 5px;

    color: rgb(255 255 255);
    color: white!important;
    font-weight: 500;
 
    background: #ff5050;

    padding: 10px 15px 10px 15px;
    border-bottom: 4px solid ${chroma("#ff5050").darken(0.2).hex()};
  
    
    & > svg {
      width: 15px;
      height: 15px;
  }
  

  border-width: 0 0 4px 0!important;

  
  &:hover {
    color: #4dacff;
  }

  & > svg, & > svg > path {
      color: white!important;
  }
`;




export const ZoomButton = styled.button`
  /* border: 1px solid #e2e2e2; */
  border: none;
  /* box-shadow: 0 0 8px 1px rgba(0,0,0,0.1); */
  /* box-shadow: 0 0 3px 1px rgba(0,0,0,0.1); */

  outline: none;
  /* background: #f7f7f7; */
  /* background: white; */
  padding: 5px 5px;
  /* color: #565656; */
  color: #686c71;
  opacity: 0.6;
  cursor: pointer;
  border-radius: 3px;
  display: flex;

  background: none;

  margin: 3px;

  background: white;
  border-radius: 4px;
  box-shadow: rgba(32, 48, 60, 0.11) 0px 2px 5px 0px;
  border: 1px solid rgb(239, 241, 242);


  

  ${props => props.middle && css`
    margin-top: 10px;
    border-width: 1px 1px 0 1px;
    border-radius: 4px 4px 0 0;
  `}

  ${props => props.bottom && css`

    border-radius: 0 0 4px 4px;
  `}

  &:hover {
    /* background: ${chroma("#f7f7f7").darken(0.1).hex()}; */
  }

`