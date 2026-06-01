import { useState, useRef, useEffect } from 'react'
import { PitchDetector } from 'pitchy'

function Microphone({ isListening, currNoteRef }) {
    const [pitch, setPitch] = useState(null)
    const [clarity, setClarity] = useState(null)
    const [notePlayed, setNotePlayed] = useState(null)

    const audioContextRef = useRef(null)
    const analyserRef = useRef(null)
    const detectorRef = useRef(null)
    const inputRef = useRef(null)
    const timeoutRef = useRef(null)
    const streamRef = useRef(null)

    function frequencyToMidi(freq) {
        return Math.round(
            69 + 12 * Math.log2(freq / 440)
        )
    }

    const notes =
    ['C','C#','D','D#','E','F',
     'F#','G','G#','A','A#','B']

    function midiToNote(midi) {
        const note = notes[midi % 12]
        const octave = Math.floor(midi / 12) - 1

        return note ? `${note}` : null
    }

    async function startListening() {
        audioContextRef.current = new AudioContext()
        const analyser = audioContextRef.current.createAnalyser()
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        })
        streamRef.current = stream
        
        const source = audioContextRef.current.createMediaStreamSource(stream)

        source.connect(analyser)

        const detector =
            PitchDetector.forFloat32Array(
                analyser.fftSize
            )

        detector.minVolumeDecibels = -30

        const input = new Float32Array(detector.inputLength)

        analyserRef.current = analyser
        detectorRef.current = detector
        inputRef.current = input

        updatePitch()
    }

    function updatePitch() {

        const analyser = analyserRef.current
        const detector = detectorRef.current
        const input = inputRef.current
        const sampleRate = audioContextRef.current.sampleRate
        
        analyser.getFloatTimeDomainData(input)
        
        const [pitch, clarity] = detector.findPitch(input, sampleRate)
        const midi = frequencyToMidi(pitch)
        const note = midiToNote(midi)
        // console.log(`$NOTE: ${note}`)

        currNoteRef.current = note
        // note includes the octave number at the end
        // make sure filter out when comparing against intended note

        setPitch(Math.round(pitch * 10) / 10)
        setClarity(Math.round(clarity * 100))
        setNotePlayed(note)

        timeoutRef.current = setTimeout(updatePitch, 300)
    }

    function stopListening() {
        clearTimeout(timeoutRef.current)
        audioContextRef.current?.close()
        audioContextRef.current = null
        streamRef.current?.getTracks().forEach((track) => track.stop())
        setPitch(null)
        setClarity(null)
        
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
            audioContextRef.current?.close()
            audioContextRef.current = null
        }
    }, [])

    useEffect(() => {
        if (isListening) startListening();
        if (!isListening) stopListening();

    }, [isListening])

    return (
        <div className='container-12 m-5'>
            <div className="row justify-content-center text-center m-5">
                    <p className='w-25'>
                        Pitch: {pitch ?? '--'} Hz
                    </p>
                    <p className='w-25'>
                        Note: {notePlayed ?? '--'}
                    </p>
                    <p className='w-25'>
                        Clarity: {clarity ?? '--'}%
                    </p>
            </div>
        </div>
    )
}

export default Microphone