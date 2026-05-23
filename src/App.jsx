import { useState } from 'react'
import Microphone from './microphone.jsx'
import ScalePicker from './scalePicker.jsx'
import Metronome from './metronome.jsx'
function App() {
    const [selectedKey, setSelectedKey] = useState('C')
    const [selectedScale, setSelectedScale] = useState('Major')
    const [isListening, setIsListening] = useState(false)
    return (
        <>

        <Microphone isListening={isListening}
            // setIsListening={setIsListening}
            />
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <ScalePicker selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                        selectedScale={selectedScale}
                        setSelectedScale={setSelectedScale}
                        />
                </div>
                <div className="col-6">
                    <Metronome
                    setIsListening={setIsListening}
                        />

                </div>

            </div>
        </div>

        </>
    )
}

export default App