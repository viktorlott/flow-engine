import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin: auto;
    width: 41.6rem;
    padding: 20px 30px 25px;
    border-radius: 2px;
    border-top: 2px solid rgb(0, 126, 255);
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(227, 233, 243) 0px 2px 4px 0px;
`



function Box(props) {
    return (
        <Container>
            {props.children}
        </Container>
    )
}



export default Box