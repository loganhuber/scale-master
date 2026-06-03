import { scales } from "../globalVars"
import { useEffect } from "react"
function MixItUp({ setSelectedScale, setSelectedKey, scaleSchedule, setScaleSchedule }) {

    function randomIndex(max) {
        return Math.floor(Math.random() * max)
    }

    function setRandomScales() {
        
        let schedule = []
        for (let i = 0; i < 4; i++) {
            const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
            const keyIndex = randomIndex(chromatic.length)
            const scaleNames = Object.keys(scales).map((scale) => {
                return scale
            })
            const scaleIndex = randomIndex(scaleNames.length)
            const newScale = scaleNames[scaleIndex]
            schedule.push({
                key : chromatic[keyIndex],
                scale : newScale
            })
        }
        setScaleSchedule(schedule)
        // setSelectedKey(chromatic[keyIndex])
        // setSelectedScale(newScale)
    }

    useEffect(() => {
        console.log(scaleSchedule)
    }, [scaleSchedule])

    return (
        <div className="d-flex justify-content-center">
            <button className="btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="top" title=""
            onClick={setRandomScales}>
                Want to mix it up?
            </button>
        </div>
    )
}

export default MixItUp