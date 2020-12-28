import React, { useEffect, useCallback, useRef, useMemo } from 'react'
import * as JSONEditor from 'jsoneditor'

import './jsoneditor.css'

function JSONEditorComponent() {
    const editorRef = useRef()
    const jsonEditor = useRef()

    useEffect(() => {
        if(editorRef.current) {
            const container = editorRef.current
            const options = {
                enableSort: false,
                enableTransform: false
            }
            jsonEditor.current = new JSONEditor(container, options)
    
            // set json
            const initialJson = {
                "Array": [1, 2, 3],
                "Boolean": true,
                "Null": null,
                "Number": 123,
                "Object": {"a": "b", "c": "d"},
                "String": "Hello World"
            }
            jsonEditor.current.set(null)
    
            // get json
            const updatedJson = jsonEditor.current.get()
        }
    },[])


    return (
        <div ref={editorRef} style={{width: "100%", height: "100%"}}/>
    )
}


export default JSONEditorComponent