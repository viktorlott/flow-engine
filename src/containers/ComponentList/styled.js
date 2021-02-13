import styled, { css } from 'styled-components'
import chroma from 'chroma-js'



const showOnURLQuery = (q) => new RegExp(q, "gi").test(window.location.search)


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
  


export const ComponentListItemBG = styled.div`
          width: 37px; 
          height: 100%; 
          background: ${props => props.bg};
          border-right: 1px dashed ${props => props.borderColor}; 
          position: absolute; 
          left: 0; 
          top: 0;
          overflow: hidden;
          will-change: width;
          /* transition: width 0.1s ease-in; */
          z-index: 2;
          ${_ => showOnURLQuery("filled") ? "width: 100%;" : ""}
`

export const ListItem = styled.li`
      display: flex;

    justify-content: space-between;
    position: relative;

    margin: 8px 18px;
    padding-left: 5px;

    cursor: grab;
    /* transform: scale(0.); */
    will-change: background margin transform;
    transition: background 0.1s, margin 0.1s ease-in, transform 0.1s ease-in;
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

    &:hover ${ComponentListItemBG} {
        width: 100%;
    }


    &:hover {
      /* animation: move 2s ease-in-out; */
      /* transform: scale(1.04); */
      /* background: ${props => chroma(props.bgcolor).alpha(0).hex()}; */
      margin: 8px 13px;
      /* transform: scale(1.1); */

      
    }
    will-change: background;

`

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
  ${props => props.zIndex && `z-index: ${props.zIndex};`}
  ${props => props.bg && `background-image: url("data:image/svg+xml;utf8,%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Ccircle%20cx%3D%220.5%22%20cy%3D%220.5%22%20r%3D%220.5%22%20fill%3D%22%2381818a%22%20%2F%3E%3C%2Fsvg%3E");`}

`