import { useState, useRef, useEffect, useContext } from 'react'
import { getCurrentUser } from './context/auth.jsx'
import { scales } from './globalVars.js'
import { AuthContext } from './context/AuthContext.jsx'

import Microphone from './Components/microphone.jsx'
import ScalePicker from './Components/scalePicker.jsx'
import Metronome from './Components/metronome.jsx'
import ScaleDisplay from './Components/scaleDisplay.jsx'
import CountIn from './Components/countIn.jsx'
import Score from './Components/score.jsx'
import Navbar from './Components/navbar.jsx'
import MixItUp from './Components/mixItUp.jsx'

function App() {
    const [selectedKey, setSelectedKey] = useState('C')
    const [selectedScale, setSelectedScale] = useState('major')
    const [isListening, setIsListening] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [count, setCount] = useState(null)
    const [currCardIndex, setCurrCardIndex] = useState(0)
    const [roundComplete, setRoundComplete] = useState(false)
    const [restart, setRestart] = useState(false) // Use to call start() function in metronome from the score component
    
    const currNoteRef = useRef(null)
    const bpmRef = useRef(60)
    const currScoreRef = useRef([])


    return (
        <>
        <Navbar 
        />
        <CountIn 
        count={count}
        isPlaying={isPlaying}
        bpmRef={bpmRef}
        setIsListening={setIsListening}
        selectedKey={selectedKey}
        selectedScale={selectedScale} />

        <Score 
        roundComplete={roundComplete}
        currScoreRef={currScoreRef}
        selectedKey={selectedKey}
        selectedScale={selectedScale}
        bpmRef={bpmRef}
        setRestart={setRestart}
        />

        <Microphone isListening={isListening}
        currNoteRef={currNoteRef}
            />

        <div className="container w-50">
            <div className="row">

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
                    restart={restart}
                    setRestart={setRestart}
                        />
                </div>
                <div className="col-6">
                    <ScalePicker selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                        selectedScale={selectedScale}
                        setSelectedScale={setSelectedScale}
                        scales={scales}
                        isPlaying={isPlaying}
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
        currScoreRef={currScoreRef}
        />
        { !isPlaying && 
        <MixItUp 
        setSelectedKey={setSelectedKey}
        setSelectedScale={setSelectedScale}
        />
        }
        </>
    )
}

export default App