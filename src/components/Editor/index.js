import React, { useCallback, useState, useContext, useRef, useEffect } from 'react'
import Editor, { monaco } from '@monaco-editor/react';

import useResizeObserver from "use-resize-observer";
import schema from './schema_context'
import theme from './theme.json'

function useDebouncer(defaultValue, ms) {
    const cb = useRef()
    const destructValue = val => val === "function" ? val() : val
    const [value, setValue] = useState(() => destructValue(defaultValue))


    

    useEffect(() => () => cb.current && clearTimeout(cb.current), [])

    const debounce = useCallback((nval) => {
        const v = nval
        if(cb.current) clearTimeout(cb.current)
        cb.current = setTimeout(() => {
            setValue(destructValue(v))
        }, ms)
    }, [ms, value])

    return [value, debounce]
}




function CodeEditor(props) {
    const editor = React.useRef()
    const editorRef = React.useRef()
    const [isAttached, setIsAttached] = React.useState(false)
    const { watch, register, unregister, name, setValue } = props

    const defaultValue = watch(name, "")


    const [value, debounce] = useDebouncer(defaultValue, 500)


    useEffect(() => {
        register({ name })
        return () => { 
            unregister({ name })
            console.log("DISPOSE", editor)
            if(editor.current) {
                editor.current.dispose()
            }

        }
    },[])

    useEffect(() => {
        console.log("mount", editorRef, editor)
        if(editorRef.current) {
            monaco.init().then(monacoInstance => {
                if(!editor.current) {

                    monacoInstance.editor.defineTheme('Katzenmilch', theme)

                    const properties = {
                        theme: "Katzenmilch",
                        value,
                        language:  "javascript",
                        minimap: {
                            enabled: false
                        },
                        ...(props.monacoConfiguration ? props.monacoConfiguration({ monaco: monacoInstance, lang: props.lang, value }) : {})
                    }
                        
                    editor.current = monacoInstance.editor.create(editorRef.current,  properties)
                    setIsAttached(editor.current)
                }
            })
        }
    },[])

    useEffect(() =>  {
        setValue(name, value)
    },[value])


    const { ref } = useResizeObserver({ 
        onResize: ({width, height}) => {
            editor.current && editor.current.layout({ width, height });
        }
    })
 

    

    useEffect(() => {
        if(isAttached) {
            setIsAttached(false)
            const onkeypress = e => {
                if(editor.current) {
                    debounce(() => editor.current.getValue())
                }
                
            }
            isAttached.onKeyUp(onkeypress)
        }
    },[isAttached])
      
    return (
        <div ref={ref} style={{height: "calc(100%)", maxWidth: "calc(100%)", display: props.active ? "block" : "none" }} >
            <div key={name} style={{height: "calc(100%)"}} ref={editorRef}></div>
        </div>
    )
}




export default CodeEditor