import { useState, useEffect, useRef } from 'react'
import './countIn.css'

function CountIn({ count, isPlaying, bpmRef, setIsListening }) {
    const [isShown, setIsShown] = useState(false)
    const [countInComplete, setCountInComplete] = useState(false)

    useEffect(() => {
        if (countInComplete) return;
        if (count == 4) {
            setTimeout(() => {
                setCountInComplete(true)
                setIsShown(false)
                setIsListening(true)
            }, 60000 / bpmRef.current)
        }

    }, [count])


    useEffect(() => {
        if (isPlaying) {
            setIsShown(true);
            setCountInComplete(false)
        }
    }, [isPlaying])

    
    return (
        <>
            {isShown ?
                (
                <div className="count-in-overlay">
                    <h2 className="Display-1">Ready in...</h2>
                    <div className="count-number">{count}</div>
                </div>
                ) :
                ''
            }
        </>
    )
    
}


export default CountIn