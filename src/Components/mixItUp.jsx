import { scales } from "../globalVars"

function MixItUp({ setSelectedScale, setSelectedKey }) {

    function randomIndex(max) {
        return Math.floor(Math.random() * max)
    }

    function setRandomScale() {
        const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        const keyIndex = randomIndex(chromatic.length)
        
        const scaleNames = Object.keys(scales).map((scale) => {
            return scale
        })
        const scaleIndex = randomIndex(scaleNames.length)
        const newScale = scaleNames[scaleIndex]

        setSelectedKey(chromatic[keyIndex])
        setSelectedScale(newScale)
        console.log(chromatic[keyIndex])
        console.log(newScale)

    }

    return (
        <div className="d-flex justify-content-center">
            <button className="btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="top" title=""
            onClick={() => {
                setRandomScale()
            }}>
                Want to mix it up?
            </button>
        </div>
    )
}

export default MixItUp