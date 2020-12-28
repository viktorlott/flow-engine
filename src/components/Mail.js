import React, {useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import gsap from "gsap";



console.log(module)
/* 
.st0{fill:#5CA4A9;}
.st1{fill:#E6EBE0;}
.st2{fill:#CBCCCA;}
.st3{fill:#ED6A5A;}
.st4{fill:#F4F1BB;}
*/
const Container = styled.div`
	.st0{fill:#ececec;}
	.st1{fill:#fbfbfb;}
	.st2{fill:#CBCCCA;}
	.st4{fill:#e4e4e4;}
    .st3{fill:#f1f1f1;}
    opacity: 0.5;
    /* .st0{fill:#5CA4A9;}
    .st1{fill:#E6EBE0;}
    .st2{fill:#CBCCCA;}
    .st3{fill:#ED6A5A;}
    .st4{fill:#F4F1BB;} */

    #mail-icon {
        width:120px;
        cursor: pointer;
    }

`


function Mail(props) {
    const line1 = useRef() //$('#env-line-1');
    const line2 = useRef() // $('#env-line-2');
    const line3 = useRef() // $('#env-line-3');
    const mailIcon = useRef() // $('#mail-icon');
    const envLid = useRef() // $('#env-lid');
    const envPaper = useRef() // $('#env-paper');
    const [toggled, setToggled] = useState(false)
    const tl = useRef()

    useEffect(() => {

        tl.current = gsap.timeline({
            paused: true
        });

        tl.current
        .to(envLid.current, 0.3, {
            scaleY:-1,
            y: 1.5,
            }
        )
        .fromTo(envPaper.current, 0.4, {
            transformOrigin: "50% 100%",
            scaleY:0,
        },{
            scaleY: 1,
        }, "=-0.25")
        .staggerFromTo([line1.current, line2.current, line3.current], 0.3, {
            transformOrigin: "50% 50%",
            scaleX: 0
        },{
            scaleX: 1,
        },	-0.09)
    
    }, [])

    useEffect(() => {
        if(typeof props.active === "boolean") {
            if(props.active) {
                tl.current.play()
            } else {
                tl.current.reverse()
            }
        }

    }, [props.active])


    return (
        <Container onClick={() => {
            if(toggled) {
                tl.current.reverse()
            } else {
                tl.current.play()
            }

            setToggled(prev => !prev)
        }}>
            <svg version="1.1" id="mail-icon" ref={mailIcon} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="96.3 -4.7 45.1 46.2" style={{"enable-background": "new 96.3 -4.7 45.1 46.2;"}} space="preserve">

            <path className="st0" d="M138.2,10.5H99.5c-1.7,0-3.1,1.4-3.1,3.1v24.8c0,1.7,1.4,3.1,3.1,3.1h38.7c1.7,0,3.1-1.4,3.1-3.1V13.6
                C141.3,11.9,139.9,10.5,138.2,10.5z"/>
            <path className="st0" d="M125.6,30.7c-3.7-2.6-6.6-4.6-6.8-4.7l0,0L125.6,30.7z"/>
            <path id="env-lid"  ref={envLid} className="st0" d="M118.9,26L118.9,26c0,0,16-11.1,21.4-14.8c-0.5-0.5-1.2-0.8-2-0.8H99.5c-0.8,0-1.5,0.3-2,0.8
                L118.9,26L118.9,26z"/>
            <path id="env-paper" ref={envPaper} className="st1" d="M135.8,34.2h-33.9c-1.3,0-2.4-1.1-2.4-2.4V0.7c0-1.3,1.1-2.4,2.4-2.4h33.9
                c1.3,0,2.4,1.1,2.4,2.4v31.1C138.1,33.1,137.1,34.2,135.8,34.2z"/>
            <path id="env-line-3" ref={line3} className="st2" d="M131.2,6.5h-24.7c-0.9,0-1.6-0.7-1.6-1.6l0,0c0-0.9,0.7-1.6,1.6-1.6h24.6
                c0.9,0,1.6,0.7,1.6,1.6l0,0C132.8,5.7,132.1,6.5,131.2,6.5z"/>
            <path id="env-line-2" ref={line2} className="st2" d="M131.2,14.1h-24.7c-0.9,0-1.6-0.7-1.6-1.6l0,0c0-0.9,0.7-1.6,1.6-1.6h24.6
                c0.9,0,1.6,0.7,1.6,1.6l0,0C132.8,13.4,132.1,14.1,131.2,14.1z"/>
            <path id="env-line-1" ref={line1} className="st2" d="M131.2,21.5h-24.7c-0.9,0-1.6-0.7-1.6-1.6l0,0c0-0.9,0.7-1.6,1.6-1.6h24.6
                c0.9,0,1.6,0.7,1.6,1.6l0,0C132.8,20.8,132.1,21.5,131.2,21.5z"/>
            <path className="st3" d="M97.6,11.1c-0.6,0.5-1.3,1.5-1.3,2.4v24.9c0,1.7,1.4,3.1,3.1,3.1h38.8c0.8,0,1.4-0.3,2-0.7
                C137.1,38.7,97.6,11.1,97.6,11.1z"/>
            <path className="st4" d="M140.3,11.2c-5.4,3.7-21.4,14.8-21.4,14.8l0,0c0.2,0.1,18.2,12.7,21.3,14.8c0.7-0.6,1.2-1.4,1.2-2.3v-25
                C141.3,12.6,140.9,11.8,140.3,11.2z"/>
            </svg>

        </Container>
    )
}

export default Mail