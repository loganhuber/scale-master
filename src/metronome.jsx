
import { useState, useRef, useEffect } from 'react'

function Metronome( { setIsListening, count, setCount, isPlaying, setIsPlaying, bpmRef, roundComplete }) {
    const [bpm, setBpm] = useState(60)
    const audioRef = useRef(null)
    const startTimeRef = useRef(null)
    const beatRef = useRef(0)
    const frameRef = useRef(null)

    
    function adjustBpm(e) {
        const newBpm = Number(e.target.value)

        if (isPlaying) {

        const now = audioRef.current.currentTime

        // current beat position using old bpm
        const elapsed = now - startTimeRef.current
        const currentBeat = elapsed / (60 / bpmRef.current)

        // re-anchor start time for new tempo
        startTimeRef.current = now - currentBeat * (60 / newBpm)
        }

        bpmRef.current = newBpm
        setBpm(newBpm)
    }
    
    const secondsPerBeat = 60 / bpmRef.current
    function start() {
        setIsPlaying(prev => !prev)
        if (!audioRef.current) {
            audioRef.current = new AudioContext()
        }

        startTimeRef.current = audioRef.current.currentTime
        beatRef.current = -1

        tick()
    }

    function stop() {
        setIsListening(false)
        setIsPlaying(false)
        setCount(null)
        cancelAnimationFrame(frameRef.current)
    }

    function tick() {

        const now = audioRef.current.currentTime
        const elapsed = now - startTimeRef.current

        const beat = Math.floor(
            elapsed / (60 / bpmRef.current)
        )

        if (beat !== beatRef.current) {
            beatRef.current = beat
            setCount((beat % 4) + 1)
            createClickSound()
        }
        frameRef.current = requestAnimationFrame(tick)
    }

    function createClickSound(frequency = 800, duration = 0.1, volume = 0.5) {
        const oscillator = audioRef.current.createOscillator();
        const gainNode = audioRef.current.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioRef.current.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioRef.current.currentTime);
        oscillator.type = 'triangle';
        
        gainNode.gain.setValueAtTime(volume, audioRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioRef.current.currentTime + duration);
        
        oscillator.start(audioRef.current.currentTime);
        oscillator.stop(audioRef.current.currentTime + duration);
    
    }

    useEffect(() => {
        if (roundComplete) stop();
        console.log("STOPPED")
    }, [roundComplete])


    return (
        <div className="container text-center">
            <label htmlFor="bpm">BPM: {bpm}</label>
            <input type="range" id="bpm" name="bpm" min="50" max="200" value={bpm} step="1" onChange={adjustBpm}></input>
            <div>COUNT: {count ?? '-'}</div>
            <button className="btn btn-light" onClick={isPlaying ? stop : start} >{isPlaying ? 'Stop' : 'Start'}</button>
        </div>
    )
}

export default Metronome