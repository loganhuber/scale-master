import { useState, useRef } from 'react'
import Microphone from './microphone.jsx'
import ScalePicker from './scalePicker.jsx'
import Metronome from './metronome.jsx'
import ScaleDisplay from './scaleDisplay.jsx'
import CountIn from './countIn.jsx'

const scales = {
    major: { 
        id : 1,
        name : 'Major', 
        intervals : [0, 2, 4, 5, 7, 9, 11]
    },
    dorian: {
        id : 2,
        name : 'Dorian',
        intervals : [0, 2, 3, 5, 7, 9, 10]
    },
    phrygian: {
        id : 3,
        name: 'Phrygian',
        intervals : [0, 1, 3, 5, 7, 8, 10]
    },
    lydian: {
        id : 4,
        name : 'Lydian',
        intervals : [0, 2, 4, 6, 7, 9, 11]
    },
    mixolydian: {
        id : 5,
        name : 'Mixolydian',
        intervals : [0, 2, 4, 5, 7, 9, 10]
    },
    minor: {
        id : 6,
        name : 'Minor',
        intervals : [0, 2, 3, 5, 7, 8, 10]
    },
    locrian: {
        id : 7,
        name : 'Locrian',
        intervals : [0, 1, 3, 5, 6, 8, 10]
    },

    harmonicMinor: {
        id : 8,
        name : 'Harmonic Minor',
        intervals : [0, 2, 3, 5, 7, 8, 11]
    },
    melodicMinor: {
        id : 9,
        name : 'Melodic Minor',
        intervals : [0, 2, 3, 5, 7, 9, 11]
    },

    majorPentatonic: {
        id : 10,
        name : 'Major Pentatonic',
        intervals : [0, 2, 4, 7, 9]
    },
    minorPentatonic: {
        id : 11,
        name : 'Minor Pentatonic',
        intervals : [0, 3, 5, 7, 10]
    },

    blues: {
        id : 12,
        name : 'Blues',
        intervals :[0, 3, 5, 6, 7, 10]
    }
}

function App() {
    const [selectedKey, setSelectedKey] = useState('C')
    const [selectedScale, setSelectedScale] = useState('major')
    const [isListening, setIsListening] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [count, setCount] = useState(null)
    const [currCardIndex, setCurrCardIndex] = useState(0)
    const [roundComplete, setRoundComplete] = useState(false)
    
    const currNoteRef = useRef(null)
    const bpmRef = useRef(60)

    return (
        <>
        <CountIn 
        count={count}
        isPlaying={isPlaying}
        bpmRef={bpmRef}
        setIsListening={setIsListening} />
        <Microphone isListening={isListening}
        currNoteRef={currNoteRef}
            />
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <ScalePicker selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                        selectedScale={selectedScale}
                        setSelectedScale={setSelectedScale}
                        scales={scales}
                        isPlaying={isPlaying}
                        />
                </div>
                <div className="col-6">
                    <Metronome
                    setIsListening={setIsListening}
                    count={count}
                    setCount={setCount}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    bpmRef={bpmRef}
                    roundComplete={roundComplete}
                    setRoundComplete={setRoundComplete}
                        />
                </div>
            </div>
        </div>

        <ScaleDisplay
        selectedScale={selectedScale}
        scales={scales}
        selectedKey={selectedKey}
        count={count}
        currNoteRef={currNoteRef}
        isListening={isListening}
        currCardIndex={currCardIndex}
        setCurrCardIndex={setCurrCardIndex}
        roundComplete={roundComplete}
        setRoundComplete={setRoundComplete}
        />

        </>
    )
}

export default App