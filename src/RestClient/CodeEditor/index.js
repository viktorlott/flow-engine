import React, { useCallback, useState, useContext, useRef, useEffect } from 'react'
import Editor, { monaco } from '@monaco-editor/react';

import useResizeObserver from "use-resize-observer";
import schema from './schema_context'
// import theme from 'monaco-themes/themes/Katzenmilch.json'

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


const theme2 = {
    "base": "vs",
    "inherit": true,
    "rules": [
      {
        "foreground": "949494e8",
        "background": "dcdcdc8f",
        "token": "comment"
      },
      {
        "foreground": "a54776",
        "background": "e9d6dc85",
        "token": "comment.line.region"
      },
      {
        "foreground": "668d68",
        "background": "e9e4be",
        "token": "comment.line.marker.php"
      },
      {
        "foreground": "456e48",
        "background": "d9eab8",
        "token": "comment.line.todo.php"
      },
      {
        "foreground": "880006",
        "background": "e1d0ca",
        "token": "comment.line.fixme.php"
      },
      {
        "foreground": "cd6839",
        "token": "constant"
      },
      {
        "foreground": "8b4726",
        "background": "e8e9e8",
        "token": "entity"
      },
      {
        "foreground": "a52a2a",
        "token": "storage"
      },
      {
        "foreground": "cd3700",
        "token": "keyword.control"
      },
      {
        "foreground": "b03060",
        "token": "support.function - variable"
      },
      {
        "foreground": "b03060",
        "token": "keyword.other.special-method.ruby"
      },
      {
        "foreground": "b83126",
        "token": "keyword.operator.comparison"
      },
      {
        "foreground": "b83126",
        "token": "keyword.operator.logical"
      },
      {
        "foreground": "639300",
        "token": "string"
      },
      {
        "foreground": "007e69",
        "token": "string.quoted.double.ruby source.ruby.embedded.source"
      },
      {
        "foreground": "104e8b",
        "token": "support"
      },

      {
        "foreground": "009acd",
        "token": "variable"
      },
      {
        "foreground": "fd1732",
        "background": "e8e9e8",
        "fontStyle": "italic underline",
        "token": "invalid.deprecated"
      },
      {
        "foreground": "fd1224",
        "background": "ff060026",
        "token": "invalid.illegal"
      },
      {
        "foreground": "7b211a",
        "background": "77ade900",
        "token": "text source"
      },
      {
        "foreground": "005273",
        "fontStyle": "italic",
        "token": "entity.other.inherited-class"
      },
      {
        "foreground": "417e00",
        "background": "c9d4be",
        "token": "string.regexp"
      },
      {
        "foreground": "005273",
        "token": "support.function"
      },
      {
        "foreground": "cf6a4c",
        "token": "support.constant"
      },
      {
        "fontStyle": "underline",
        "token": "entity.name.type"
      },
      {
        "foreground": "676767",
        "fontStyle": "italic",
        "token": "meta.cast"
      },
      {
        "foreground": "494949",
        "token": "meta.sgml.html meta.doctype"
      },
      {
        "foreground": "494949",
        "token": "meta.sgml.html meta.doctype entity"
      },
      {
        "foreground": "494949",
        "token": "meta.sgml.html meta.doctype string"
      },
      {
        "foreground": "494949",
        "token": "meta.xml-processing"
      },
      {
        "foreground": "494949",
        "token": "meta.xml-processing entity"
      },
      {
        "foreground": "494949",
        "token": "meta.xml-processing string"
      },
      {
        "foreground": "005273",
        "token": "meta.tag"
      },
      {
        "foreground": "005273",
        "token": "meta.tag entity"
      },
      {
        "foreground": "005273",
        "token": "source entity.name.tag"
      },
      {
        "foreground": "005273",
        "token": "source entity.other.attribute-name"
      },
      {
        "foreground": "005273",
        "token": "meta.tag.inline"
      },
      {
        "foreground": "005273",
        "token": "meta.tag.inline entity"
      },
      {
        "foreground": "b85423",
        "token": "entity.name.tag.namespace"
      },
      {
        "foreground": "b85423",
        "token": "entity.other.attribute-name.namespace"
      },
      {
        "foreground": "b83126",
        "token": "entity.name.tag.css"
      },
      {
        "foreground": "b12e25",
        "token": "meta.selector.css entity.other.attribute-name.tag.pseudo-class"
      },
      {
        "foreground": "b8002d",
        "token": "meta.selector.css entity.other.attribute-name.id"
      },
      {
        "foreground": "b8002d",
        "token": "entity.other.attribute-name.id.css"
      },
      {
        "foreground": "b8012d",
        "token": "meta.selector.css entity.other.attribute-name.class"
      },
      {
        "foreground": "b8012d",
        "token": "entity.other.attribute-name.class.css"
      },
      {
        "foreground": "005273",
        "token": "support.type.property-name.css"
      },
      {
        "foreground": "005273",
        "token": "meta.property-name"
      },
      {
        "foreground": "8693a5",
        "token": "meta.preprocessor.at-rule keyword.control.at-rule"
      },
      {
        "foreground": "417e00",
        "token": "meta.property-value"
      },
      {
        "foreground": "b8860b",
        "token": "constant.other.color"
      },
      {
        "foreground": "ee3a8c",
        "token": "keyword.other.important"
      },
      {
        "foreground": "ee3a8c",
        "token": "keyword.other.default"
      },
      {
        "foreground": "417e00",
        "token": "meta.property-value support.constant.named-color.css"
      },
      {
        "foreground": "417e00",
        "token": "meta.property-value constant"
      },
      {
        "foreground": "417e00",
        "token": "meta.constructor.argument.css"
      },
      {
        "foreground": "9a5925",
        "token": "constant.numeric"
      },
      {
        "foreground": "9f5e3d",
        "token": "keyword.other"
      },
      {
        "foreground": "1b76b0",
        "token": "source.scss support.function.misc"
      },
      {
        "foreground": "f8bebe",
        "background": "82000e",
        "fontStyle": "italic",
        "token": "meta.diff"
      },
      {
        "foreground": "f8bebe",
        "background": "82000e",
        "fontStyle": "italic",
        "token": "meta.diff.header"
      },
      {
        "foreground": "f8f8f8",
        "background": "420e09",
        "token": "markup.deleted"
      },
      {
        "foreground": "f8f8f8",
        "background": "4a410d",
        "token": "markup.changed"
      },
      {
        "foreground": "f8f8f8",
        "background": "253b22",
        "token": "markup.inserted"
      },
      {
        "foreground": "cd2626",
        "fontStyle": "italic",
        "token": "markup.italic"
      },
      {
        "foreground": "8b1a1a",
        "fontStyle": "bold",
        "token": "markup.bold"
      },
      {
        "foreground": "e18964",
        "fontStyle": "underline",
        "token": "markup.underline"
      },
      {
        "foreground": "8b7765",
        "background": "fee09c12",
        "fontStyle": "italic",
        "token": "markup.quote"
      },
      {
        "foreground": "b8012d",
        "background": "bf61330d",
        "token": "markup.heading"
      },
      {
        "foreground": "b8012d",
        "background": "bf61330d",
        "token": "markup.heading entity"
      },
      {
        "foreground": "8f5b26",
        "token": "markup.list"
      },
      {
        "foreground": "578bb3",
        "background": "b1b3ba08",
        "token": "markup.raw"
      },
      {
        "foreground": "f67b37",
        "fontStyle": "italic",
        "token": "markup comment"
      },
      {
        "foreground": "60a633",
        "background": "242424",
        "token": "meta.separator"
      },
      {
        "foreground": "578bb3",
        "background": "b1b3ba08",
        "token": "markup.other"
      },
      {
        "background": "eeeeee29",
        "token": "meta.line.entry.logfile"
      },
      {
        "background": "eeeeee29",
        "token": "meta.line.exit.logfile"
      },
      {
        "background": "751012",
        "token": "meta.line.error.logfile"
      },
      {
        "background": "dcdcdc8f",
        "token": "punctuation.definition.end"
      },
      {
        "foreground": "629f9e",
        "token": "entity.other.attribute-name.html"
      },
      {
        "foreground": "79a316",
        "token": "string.quoted.double.js"
      },
      {
        "foreground": "79a316",
        "token": "string.quoted.single.js"
      },
      {
        "foreground": "488c45",
        "fontStyle": "italic",
        "token": "entity.name.function.js"
      },
      {
        "foreground": "666666",
        "token": "source.js.embedded.html"
      },
      {
        "foreground": "bb3182",
        "token": "storage.type.js"
      },
      {
        "foreground": "338fd5",
        "token": "support.class.js"
      },
      {
        "foreground": "a99904",
        "fontStyle": "italic",
        "token": "keyword.control.js"
      },
      {
        "foreground": "a99904",
        "fontStyle": "italic",
        "token": "keyword.operator.js"
      },
      {
        "foreground": "616838",
        "background": "d7d7a7",
        "token": "entity.name.class"
      },
      {
        "background": "968f96",
        "token": "active_guide"
      },
      {
        "background": "cbdc2f38",
        "token": "highlight_matching_word"
      }
    ],
  
    "colors": {
      "editor.foreground": "#363636",
      // "editor.background": "#f3f3f3",
      "editor.background": "#f9f9f9",
      "editor.background": "#fdfdfd",
      "editor.background": "#ffffff",

      "editor.selectionBackground": "#F5AA0091",
      "editor.lineHighlightBackground": "#CBDC2F38",
      "editorCursor.foreground": "#202020",
      "editorWhitespace.foreground": "#0000004A",
      "editorIndentGuide.background": "#8F8F8F",
      "editorIndentGuide.activeBackground": "#FA2828",
      
    },
   
    "editor.scrollbar.horizontal": "hidden",
    "editor.scrollbar.vertical": "hidden"
  }




let hasGlobalContext = false

function CodeEditor(props) {
    const editor = React.useRef()
    const editorRef = React.useRef()
    const [isAttached, setIsAttached] = React.useState(false)
    const { watch, register, unregister, name, setValue } = props

    const defaultValue = watch(name, "")


    const [value, debounce] = useDebouncer(defaultValue, 10)


    useEffect(() => {
        register({ name })
        return () => { 
            unregister({ name })
            if(editor.current) {
              editor.current.dispose()
              editor.current = null
              editorRef.current = null
              console.log("Dispose", editor, editorRef)
            }

        }
    },[])

    useEffect(() => {
      console.log("Mount", editor, editorRef)
        if(editorRef.current) {
            monaco.init().then(monacoInstance => {
                if(!editor.current) {

                    monacoInstance.editor.defineTheme('Katzenmilch', theme2)
                    // monacoInstance.editor.defineTheme('myTheme', theme)


                    // monacoInstance.editor.defineTheme('MyTheme', theme)

                    const properties = {
                        theme: "Katzenmilch",
                        value,
                        language:  props.lang,
                        minimap: {
                            enabled: false,
                        },
                     
                        ...(props.monacoConfiguration ? props.monacoConfiguration({ monaco: monacoInstance, lang: props.lang, value }) : {}),
                        scrollbar: {
                          vertical: 'hidden',
                          horizontal: 'hidden',
                        },
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
        <div ref={ref} style={{height: "calc(100%)", width: "calc(100% )", display: props.active ? "block" : "none" }} >
            <div key={name} style={{height: "calc(100%)"}} ref={editorRef}></div>
        </div>
    )
}




export default CodeEditor