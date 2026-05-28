import { useState, useEffect, useRe} from 'react'
import './index.css'

function Score({ roundComplete, currScoreRef }) {
    const [scoreDisplayed, setScoreDisplayed] = useState(false)
    const [score, setScore] = useState(0)
    const [critique, setCritique] = useState(null)

    function calculateScore(notes) {
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


    useEffect(() => {
        if (!roundComplete) return;

        const scorePercentage = calculateScore(currScoreRef.current)
        const critique = getCritique(scorePercentage)

        setScore(scorePercentage)
        setCritique(critique)
        currScoreRef.current = []
        setScoreDisplayed(true)
    }, [roundComplete])

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
                    <button className="btn btn-light col-1">Go Again</button>
                    <button className="btn btn-light col-1"
                    onClick={
                        () => {setScoreDisplayed(false)}
                    }
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