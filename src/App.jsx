import { useState, useRef, useEffect } from 'react'
import Microphone from './Components/microphone.jsx'
import ScalePicker from './Components/scalePicker.jsx'
import Metronome from './Components/metronome.jsx'
import ScaleDisplay from './Components/scaleDisplay.jsx'
import CountIn from './Components/countIn.jsx'
import Score from './Components/score.jsx'
import Navbar from './Components/navbar.jsx'

import { getCurrentUser } from './api-utils/auth.jsx'
import { scales } from './globalVars.js'


function App() {
    const [selectedKey, setSelectedKey] = useState('C')
    const [selectedScale, setSelectedScale] = useState('major')
    const [isListening, setIsListening] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [count, setCount] = useState(null)
    const [currCardIndex, setCurrCardIndex] = useState(0)
    const [roundComplete, setRoundComplete] = useState(false)
    const [currUser, setCurrUser] = useState(null)
    
    const currNoteRef = useRef(null)
    const bpmRef = useRef(60)
    const currScoreRef = useRef([])

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        async function loadUser() {
            if (!token) {
                setCurrUser(null)
                return
            }
            try {
                const userData = await getCurrentUser()
                
                setCurrUser(userData["username"])
            }
            catch (error) {
                console.log("Error fetching current user", error)
                setCurrUser(null)
            }
        }
        loadUser()
    }, [])

    return (
        <>
        <Navbar 
        currUser={currUser} 
        setCurrUser={setCurrUser}
        />
        <CountIn 
        count={count}
        isPlaying={isPlaying}
        bpmRef={bpmRef}
        setIsListening={setIsListening} />

        <Score 
        roundComplete={roundComplete}
        currScoreRef={currScoreRef}
        />

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
        currScoreRef={currScoreRef}
        />

        </>
    )
}

export default App