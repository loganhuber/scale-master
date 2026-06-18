import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"


function Stats({ viewingStats, setViewingStats}) {

    const { currUser, setCurrUser, userStats, setUserStats } = useContext(AuthContext)

    const [offset, setOffset] = useState(0)
    const [totalPerPage, setTotalPerPage] = useState(5)
    const [statCount, setStatCount] = useState(totalPerPage)

    const [currPage, setCurrPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    function formatDate(data) {
        const date = new Date(data).toLocaleDateString()
        return date
    }

    function switchPage(direction) {
        setOffset(prev => prev + direction)
        setStatCount(prev => prev + direction)
        direction > 0 ? setCurrPage(prev => prev + 1) : setCurrPage(prev => prev - 1)
    }

    useEffect(() => {
        const pages = Math.ceil(userStats.length / totalPerPage)
        setTotalPages(pages)
    }, [userStats])



    return (
        <div className="message-overlay">
            <div className="container">
                <div className="row d-flex justify-content-center">

                    <div className='col-12 col-md-8 d-flex flex-column align-items-center justify-content-center'>
                        <h2>Stats</h2>
                        <p>{currUser}</p>
                        <table className='table table-striped border border-2'>
                            <thead>
                                <tr>
                                    <th>Score</th>
                                    <th>Scale</th>
                                    <th>BPM</th>
                                    <th>Date</th>
                                </tr>

                            </thead>
                            <tbody>

                                { 
                                userStats?.length ?
                                userStats.slice(offset, statCount).map((stat, index) => {
                                    return (
                                        <tr key={index}>
                                            <td >{stat['score']}%</td>
                                            <td>{stat['scale_key']} {stat['scale']}</td>
                                            <td>{stat['bpm']} BPM</td>
                                            <td>{formatDate(stat['date'])}</td>
                                        </tr>
                                    )
                                })
                                :
                                <li>No Stats Yet</li>
                            }
                            </tbody>
                        
                        </table>
                        <p>Page {currPage}/{totalPages}</p>
                        <ul className="pagination">
                            <li className='page-item'>
                                <button className={`page-link ${offset === 0 && 'disabled'}`} disabled={offset === 0} onClick={() => switchPage(-totalPerPage)}>Previous</button>
                            </li>
                            <li className='page-item'>
                                <button className={`page-link ${(statCount) > userStats.length && 'disabled'} `} disabled={(statCount) > userStats.length} onClick={() => switchPage(totalPerPage)}>Next</button>
                            </li>
                        </ul>
                        <button className='btn btn-light' onClick={() => {
                            setViewingStats(false)
                            setOffset(0)
                            setStatCount(totalPerPage)
                        }}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats