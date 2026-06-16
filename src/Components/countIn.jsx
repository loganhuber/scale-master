import { useState, useEffect, useRef } from 'react'
import '../index.css'
import { scales } from '../globalVars'

function CountIn({ count, isPlaying, setIsListening, selectedKey, selectedScale }) {
    const [isShown, setIsShown] = useState(false)
    const [countInComplete, setCountInComplete] = useState(false)
    const prevCountRef = useRef(null)

    useEffect(() => {
        if (countInComplete) return
        if (prevCountRef.current === 4 && count === 1) {
            setCountInComplete(true)
            setIsShown(false)
            setIsListening(true)
        }
        prevCountRef.current = count
    }, [count, countInComplete, setIsListening])

    useEffect(() => {
        if (isPlaying) {
            setIsShown(true)
            setCountInComplete(false)
            prevCountRef.current = null
        }
    }, [isPlaying])



    
    return (
        <>
            {isShown ?
                (
                <div className="message-overlay">
                    <div className='d-flex flex-column align-items-center' style={{margin: 'auto auto'}}>
                        <h1>{selectedKey} {scales[selectedScale]["name"]}</h1>
                        <h2 className="Display-1">Ready in...</h2>
                        <div className="count-number">{count}</div>

                    </div>
                </div>
                ) :
                ''
            }
        </>
    )
    
}


export default CountIn