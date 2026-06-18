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
    const transposeIntervalRef = useRef(0) // scalePicker sets the interval, scaleDisplay transposes based on the interval

    // mix it up scheduler
    const [scaleSchedule, setScaleSchedule] = useState([])
    const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0)
    const [scheduleInProgress, setScheduleInProgress] = useState(false)
    const [scheduleComplete, setScheduleComplete] = useState(false)


    function startMixSchedule(schedule) {
        setScaleSchedule(schedule)
        setCurrentScheduleIndex(0)
        setScheduleInProgress(true)
        setScheduleComplete(false)
        currScoreRef.current = []
        setRoundComplete(false)
        setIsListening(false)
        setIsPlaying(false)
        setCount(null)
        setCurrCardIndex(0)
    }

    useEffect(() => {
        if (!scheduleInProgress || !scaleSchedule.length) return

        const { key, scale } = scaleSchedule[currentScheduleIndex]
        setSelectedKey(key)
        setSelectedScale(scale)
        setIsListening(false)
        setCount(null)
        setCurrCardIndex(0)
        setRoundComplete(false)
        setRestart(prev => !prev)
    }, [scheduleInProgress, currentScheduleIndex, scaleSchedule])

    useEffect(() => {
        if (!roundComplete) return

        setIsPlaying(false)

        if (scheduleInProgress) {
            if (currentScheduleIndex < scaleSchedule.length - 1) {
                setCurrentScheduleIndex(prev => prev + 1)
            } else {
                setScheduleInProgress(false)
                setScheduleComplete(true)
            }
        }

        setRoundComplete(false)
    }, [roundComplete, scheduleInProgress, currentScheduleIndex, scaleSchedule.length])

    useEffect(() => {
        if (!isPlaying) return
        if (scheduleInProgress) return

        setScheduleComplete(false)
        currScoreRef.current = []
    }, [isPlaying, scheduleInProgress])

    return (
        <>
        <Navbar 
        />
        <h1 className='text-center m-3' >Let's Practice Scales!</h1>
        <CountIn 
        count={count}
        isPlaying={isPlaying}
        bpmRef={bpmRef}
        setIsListening={setIsListening}
        selectedKey={selectedKey}
        selectedScale={selectedScale} />

        <Score 
        roundComplete={roundComplete}
        scheduleComplete={scheduleComplete}
        scheduleInProgress={scheduleInProgress}
        currScoreRef={currScoreRef}
        selectedKey={selectedKey}
        selectedScale={selectedScale}
        bpmRef={bpmRef}
        setRestart={setRestart}
        />

        <Microphone isListening={isListening}
        currNoteRef={currNoteRef}
            />

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
        transposeIntervalRef={transposeIntervalRef}
        />

        
        <div className="container p-3">
            <div className="row flex-column justify-content-center flex-md-row align-items-center">

                <div className="col-12 col-lg-3 p-1">
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
                    scheduleInProgress={scheduleInProgress}
                        />
                </div>
                <div className="col-12 col-lg-3 p-1 ">
                    <ScalePicker selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                        selectedScale={selectedScale}
                        setSelectedScale={setSelectedScale}
                        scales={scales}
                        isPlaying={isPlaying}
                        transposeIntervalRef={transposeIntervalRef}
                        />
                </div>
            </div>
        </div>

        { !isPlaying && !scheduleInProgress &&
        <MixItUp 
        startMixSchedule={startMixSchedule}
        scheduleInProgress={scheduleInProgress}
        />
        }
        </>
    )
}

export default App