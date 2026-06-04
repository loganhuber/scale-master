import { useState, useEffect, useContext, useRef} from 'react'
import { addNewScore } from '../context/auth'
import '../index.css'
import { AuthContext } from '../context/AuthContext'

function Score({ roundComplete, scheduleComplete, scheduleInProgress, currScoreRef, selectedKey, selectedScale, bpmRef, setRestart }) {
    const [scoreDisplayed, setScoreDisplayed] = useState(false)
    const [score, setScore] = useState(0)
    const [critique, setCritique] = useState(null)

    const { currUser } = useContext(AuthContext)

    const batchScoresRef = useRef([])

    function averageBatchScores(scoreData) {
        let total = 0
        for (let data of scoreData) {
            total += data['score']
        }
        return Math.floor(total / scoreData.length)
    }

    function calculateScore(notes) {
        if (!notes.length) return 0
        let correctNotes = 0;
        notes.forEach((note) => {
            if (note === true) correctNotes++
        })
        console.log("NOTES: " + notes)
        return Math.floor((correctNotes / notes.length) * 100)
    }

    function getCritique(score) {
        const sucked = ["uhhh, needs some work", 'brother, you suck', 'peeeyhoo, you gotta work on that']
        const ok = ["Not terrible, keep it up", "Not too bad, you can do better"]
        const good = ["Nice job, rockster", "Prrrrretty pretty good"]
        const great = ["Wow! My socks flew off", "What a shredder!"]

        const pickMsg = (arr) => {
            const randomIndex = Math.floor(Math.random() * arr.length);
            return arr[randomIndex]
        }

        if (score === 100) return pickMsg(great)
        if (score > 75) return pickMsg(good)
        if (score > 50) return pickMsg(ok)
        return pickMsg(sucked)
    }

    async function pushScore(scoreData) {
        const token = localStorage.getItem('access_token')
        if (!token) return;

        try {
            // TODO take addNewScore response and use it to update the UI
            await addNewScore(token, scoreData)
            // console.log("New Score", newScore)
        } catch (error) {
            console.log("Error pushing new score", error)
        }
    }

    function buildScoreData(scorePercentage) {
        return {
            "score" : scorePercentage,
            "scale" : selectedScale,
            "scale_key" : selectedKey,
            "bpm" : bpmRef.current
        }
    }


    useEffect(() => {
        if (!roundComplete && !scheduleComplete) return;

        if (scheduleInProgress && roundComplete) {
            const scorePercentage = calculateScore(currScoreRef.current)
            const scoreData = buildScoreData(scorePercentage)
            batchScoresRef.current.push(scoreData)
            currScoreRef.current = []
            return;
        }

        const scorePercentage = calculateScore(currScoreRef.current)
        const critique = getCritique(scorePercentage)

        setScore(scorePercentage)
        setCritique(critique)
        currScoreRef.current = []
        setScoreDisplayed(true)
        // if (currUser) pushScore(scorePercentage) 
        if (currUser && batchScoresRef.current.length === 0) {
            const scoreData = buildScoreData(scorePercentage)
            pushScore(scoreData)
        }
        if (currUser && batchScoresRef.current.length > 0) {
            const overallScore = averageBatchScores(batchScoresRef.current)
            setScore(overallScore)
            // TODO IN API 
            // set up a batch scores endpoint to recieve multiple scores in one request
            for (let data of batchScoresRef.current) {
                pushScore(data)
            }
            batchScoresRef.current = []
        }
    }, [roundComplete, scheduleComplete, scheduleInProgress])

    return (
        <>
        { scoreDisplayed ? 
        (
            <div className='message-overlay'>
                <div className="container m-5">
                    <div className="row text-center">
                        <h2>{critique}</h2>
                    </div>
                    <div className="row text-center">
                        <h2>Score: {score}%</h2>
                    </div>
                    <div className="row d-flex justify-content-center gap-2">
                    <button className="btn btn-light col-1" onClick={
                        () => {
                            setRestart(true)
                            setScoreDisplayed(false)
                        }}
                    >Go Again</button>
                    <button className="btn btn-light col-1"
                    onClick={() => {
                        setScoreDisplayed(false)
                    }}
                    
                    >Close</button>
                    </div>

                </div>
            </div>
        ) : 
        ''
        }
        </>
        
    )
}

export default Score