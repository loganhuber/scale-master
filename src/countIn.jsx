import { useState, useEffect } from 'react'
import './countIn.css'

function CountIn({ count, isPlaying, bpmRef }) {
    const [isShown, setIsShown] = useState(false)
    // const [isComplete, setIsComplete] = useState(true)

    useEffect(() => {
        if (count == 4) {
            setTimeout(() => {
                // setIsComplete(true)
                setIsShown(false)

            }, 60000 / bpmRef.current)
        }
    }, [count])


    useEffect(() => {
        if (isPlaying) {
            setIsShown(true)
            // setIsComplete(false)
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