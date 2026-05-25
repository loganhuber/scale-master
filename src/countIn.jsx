import { useState, useEffect } from 'react'
import './countIn.css'

function CountIn({ count, isPlaying, bpmRef, setIsListening }) {
    const [isShown, setIsShown] = useState(false)

    useEffect(() => {
        if (count == 4) {
            setTimeout(() => {
                setIsShown(false)
                setIsListening(true)
            }, 60000 / bpmRef.current)
        }
    }, [count])


    useEffect(() => {
        if (isPlaying) {
            setIsShown(true)
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