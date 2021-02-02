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