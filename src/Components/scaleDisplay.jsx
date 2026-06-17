import { useState, useEffect, useRef } from 'react'
import './scaleDisplay.css'

function ScaleDisplay({ selectedScale,
                        scales,
                        selectedKey,
                        count,
                        currNoteRef,
                        isListening,
                        currCardIndex,
                        setCurrCardIndex,
                        roundComplete,
                        setRoundComplete, 
                        currScoreRef,
                        transposeIntervalRef }) {
    const [notes, setNotes] = useState([getNotes('C', [0, 2, 4, 5, 7, 9, 11])])
    const [cardResults, setCardResults] = useState(Array(notes.length).fill(null))
    const [totalRoundBeats, setTotalRoundBeats] = useState(8) 
    
    const roundIndexRef = useRef(0)

    // get arr of notes based on the selected key and scale
    function getNotes(key, intervals) {
        const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        const index = chromatic.indexOf(key);
        const arranged = [...chromatic.slice(index), ...chromatic.slice(0, index)]
        const scale = intervals.map((interval) => {
            return arranged[interval]
        })
        return [...scale, chromatic[index]]
    }

    // transpose the note played to the note the microphone expects to hear
    function transposeNote(notePlayed) {
        if (transposeIntervalRef.current === 0) return notePlayed
  
        const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        const noteIndex = chromatic.indexOf(notePlayed)
        const transposedIndex = (noteIndex + transposeIntervalRef.current + chromatic.length) % chromatic.length;
        return chromatic[transposedIndex]
    }

    // checks if the note played matches the intended note -> bool
    function checkNote(intendedNote, notePlayed) {
        if (notePlayed) notePlayed = notePlayed.replace(/\d+/g, '') // filter out the octave number

        // transpose note if needed
        intendedNote = transposeNote(intendedNote)

        if (intendedNote == notePlayed) return true;
        else return false;
    }

    // update results array, keeping track of which card is accurate/inaccurate
    function updateCardResults(index, isAccurate) {
        let currResults = [...cardResults]
        isAccurate ? currResults[index] = 'correct' : currResults[index] = 'incorrect'

        setCardResults(currResults)
    }

    function checkRoundComplete() {
        if (roundIndexRef.current >= totalRoundBeats) {
            setRoundComplete(true)
        }
    }

    // update notes when key or scale input is updated
    useEffect(() => {
        const interval = scales[selectedScale].intervals
        setNotes(() => {
            return getNotes(selectedKey, interval)
        })
    }, [selectedScale, selectedKey])

    // set total round beats to be in 4/4 regardless of note length
    useEffect(() => {
        const totalNotes = notes.length;
        const remainder = totalNotes % 4;
        const extraBeats = remainder === 0 ? 0 : 4 - remainder
        setTotalRoundBeats(totalNotes + extraBeats)
        setCurrCardIndex(0)
        roundIndexRef.current = 0
    }, [notes])


    // each count check accuracy and adjust the dom as needed
    useEffect(() => {
        if (!isListening) return;

        const totalNotes = notes.length;
        roundIndexRef.current = roundIndexRef.current + 1
   
        if (currCardIndex < totalNotes) {
            setCurrCardIndex(prev => prev + 1)
            const isAccurate = checkNote(notes[currCardIndex], currNoteRef.current)
            currScoreRef.current.push(isAccurate)
            updateCardResults(currCardIndex, isAccurate)
        }

        checkRoundComplete()
    }, [count])

    // make sure roundIndexRef always resets to 0 when listening stops
    useEffect(() => {
        if (isListening) return;
        roundIndexRef.current = 0;
    }, [isListening])

    useEffect(() => {
        if (!roundComplete) return;

        // reset cards, card index, and round index
        setCardResults(Array(notes.length).fill(null));
        setCurrCardIndex(0);
        roundIndexRef.current = 0;
        
    }, [roundComplete, notes.length, isListening])



    return (
        <>
        <div className='card m-auto w-25'>
            <h2 className='text-center m-1'>{selectedKey} {scales[selectedScale].name}</h2>
        </div>
        <div className="d-flex justify-content-center my-5">
            <div className="d-flex gap-3">
                { notes.map((note, index) => {
                    const result = cardResults[index]
                    const currentClass = index == currCardIndex && isListening ? 'current' : ''
                    // color based on accuracy
                    const cardClass = result === 'correct' ? 'bg-success-subtle' :
                    result === 'incorrect' ? 'bg-danger-subtle' :
                    'bg-primary'
                    return (
                        <div key={index} className={`note-card d-flex align-items-center justify-content-center ${cardClass} ${currentClass}`}>
                            <div className="note-text">{note}</div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default ScaleDisplay