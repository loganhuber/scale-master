import { useState } from 'react'

function ScalePicker({ selectedKey, setSelectedKey, selectedScale, setSelectedScale }) {

    const scales = [
        { id : 1, name : 'Major'},
        { id : 2, name : 'Minor'},
        { id : 3, name : 'Dorian'}
    ]
    const keys = [
        {id : 1 , name : 'C'},
        {id : 2 , name : 'D'},
        {id : 3 , name : 'E'},
        {id : 4 , name : 'F'},
        {id : 5 , name : 'G'},
        {id : 6 , name : 'A'},
        {id : 7 , name : 'B'}
    ]


    const handleKeys = (e) => {
        setSelectedKey(e.target.value)
    }

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
                    {scales.map((scale) => {
                        return (
                            <option key={scale.name} value={scale.name}>{scale.name}</option>
                        )
                    })}
                </select>

                </div>
            </form>
        </div>
    )
}

export default ScalePicker