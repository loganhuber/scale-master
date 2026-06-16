import { useState, useEffect } from 'react'

function ScalePicker({ selectedKey, setSelectedKey, selectedScale, setSelectedScale, scales, isPlaying, transposeIntervalRef }) {
    const [transposeName, setTransposeName] = useState('None')
    const keys = [
        {id : 1 , name : 'C'},
        {id : 2 , name : 'C#'},
        {id : 3 , name : 'D'},
        {id : 4 , name : 'D#'},
        {id : 5 , name : 'E'},
        {id : 6 , name : 'F'},
        {id : 7 , name : 'F#'},
        {id : 8 , name : 'G'},
        {id : 9 , name : 'G#'},
        {id : 10 , name : 'A'},
        {id : 11 , name : 'A#'},
        {id : 12 , name : 'B'},
    ]

    const transpositions = [
        {id : 1 , name : 'None', note : null},
        {id : 2 , name : 'Db', note : 'C#'},
        {id : 3 , name : 'D', note : 'D'},
        {id : 4 , name : 'Eb', note : 'D#'},
        {id : 5 , name : 'E', note : 'E'},
        {id : 6 , name : 'F', note : 'F'},
        {id : 7 , name : 'Gb', note : 'F#'},
        {id : 8 , name : 'G', note : 'G'},
        {id : 9 , name : 'Ab', note : "G#"},
        {id : 10 , name : 'A', note : 'A'},
        {id : 11 , name : 'Bb', note : 'A#'},
        {id : 12 , name : 'B', note : 'B'},
    ]

    const handleTranspose = (e) => {
        setTransposeName(e.target.value)
    }
    const handleKeys = (e) => {
        setSelectedKey(e.target.value)
    }

    function getInterval(transposition, key) {
        if (transposition === null) return 0;

        const notes = keys.map((key) => key.name)
        const transposedIndex = notes.indexOf(transposition)
        const keyIndex = notes.indexOf(key)

        let interval = (transposedIndex - keyIndex + notes.length) % notes.length

        if (interval > notes.length / 2) {
            interval -= notes.length
        }

        return interval
    }
    useEffect(() => {
        const selectedTransposition = transpositions.find((trans) => {
            return trans.name === transposeName
        })

        const interval = getInterval(selectedTransposition.note, selectedKey)
        transposeIntervalRef.current = interval

    }, [transposeName])


    return (
        <div className="container ">
            <h2 className='text-end'>Pick a Scale</h2>
            <form className="d-flex flex-column align-items-end gap-1" action=''>
                <div className="">
                <label className="mx-2" htmlFor="keys">Need to transpose? </label>
                    <select className='' disabled={isPlaying} name="keys" id="keys" value={transposeName} onChange={handleTranspose}>
                    {transpositions.map((key) => {
                        return (
                            <option key={key.name} id={key.id} value={key.name}>{key.name}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="">
                <label className="mx-2" htmlFor="keys">Key: </label>
                    <select className='' disabled={isPlaying} name="keys" id="keys" value={selectedKey} onChange={handleKeys}>
                    {keys.map((key) => {
                        return (
                            <option key={key.name} id={key.id} value={key.name}>{key.name}</option>
                        )
                    })}
                    </select>
                </div>

                <div className="">
                <label className="mx-2" htmlFor="scale">Scale
                </label>
                <select className="" disabled={isPlaying} name="scale" id="scale" value={selectedScale} onChange={(e) => setSelectedScale(e.target.value)}>
                    {Object.entries(scales).map(([key, scale]) => {
                        return (
                            <option key={scale.name} value={key}>{scale.name}</option>
                        )
                    })}
                </select>

                </div>
            </form>
        </div>
    )
}

export default ScalePicker