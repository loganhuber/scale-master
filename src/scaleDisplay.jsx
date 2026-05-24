import { useState, useEffect } from 'react'
import './scaleDisplay.css'

function ScaleDisplay({ selectedScale, scales, selectedKey }) {
    const [notes, setNotes] = useState([getNotes('C', [0, 2, 4, 5, 7, 9, 11])])

    function getNotes(key, intervals) {
        const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        const index = chromatic.indexOf(key);
        const arranged = [...chromatic.slice(index), ...chromatic.slice(0, index)]
        const scale = intervals.map((interval) => {
            return arranged[interval]
        })
        return [...scale, chromatic[index]]
    }

    useEffect(() => {
        const interval = scales[selectedScale].intervals
        setNotes(() => {
            return getNotes(selectedKey, interval)
        })
    }, [selectedScale, selectedKey])

    return (
        <div className="d-flex justify-content-center my-5">
            <div className="d-flex gap-5">
                { notes.map((note, index) => {
                    return (
                        <div key={note + index} className="note-card d-flex align-items-center justify-content-center bg-primary">
                            <div className="">{note}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ScaleDisplay