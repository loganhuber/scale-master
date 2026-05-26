import { useState, useEffect } from 'react'

function ScalePicker({ selectedKey, setSelectedKey, selectedScale, setSelectedScale, scales }) {

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


    const handleKeys = (e) => {
        setSelectedKey(e.target.value)
    }

    useEffect(() => {

        console.log(selectedScale)
    }, [selectedScale])

    return (
        <div className="container">

            <form className="d-flex flex-column align-items-center gap-1" action=''>
                <div className="w-25">
                <label className="mx-2" htmlFor="keys">Key: </label>
                    <select className='' name="keys" id="keys" value={selectedKey} onChange={handleKeys}>
                    {keys.map((key) => {
                        return (
                            <option key={key.name} id={key.id} value={key.name}>{key.name}</option>
                        )
                    })}
                    </select>
                </div>

                <div className="w-25">
                <label className="mx-2" htmlFor="scale">Scale
                </label>
                <select className="" name="scale" id="scale" value={selectedScale} onChange={(e) => setSelectedScale(e.target.value)}>
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