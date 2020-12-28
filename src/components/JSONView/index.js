
import React, { useState, useEffect } from 'react'
import ReactJson from 'react-json-view'




function JSONView(props) {
    return (
        <ReactJson 
            src={props.value} 
            name={false}
            iconStyle={"square"}
            indentWidth={4}
            collapsed={1}
            collapseStringsAfterLength={30}
            displayObjectSize={false}
            displayDataTypes={false}
            defaultValue={props.defaultValue}
            />
    )
}


export default JSONView