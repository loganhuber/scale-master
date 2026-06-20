import { getErrorMessage, getToken } from "./utils"

// Local Urls for development
// const userUrlBase = 'http://127.0.0.1:8000/api/users'
// const scoresUrlBase = 'http://127.0.0.1:8000/api/scores'

// Production Urls
const userUrlBase = 'https://api.scale-master.xyz/api/users'
const scoresUrlBase = 'https://api.scale-master.xyz/api/scores'

let fetchPromise = null

// check if state first to see if there is a current user
export async function getCurrentUser() {
    if (fetchPromise) return fetchPromise

    const token = localStorage.getItem('access_token')
    
    if (!token) return null
    
    fetchPromise = (async () => {
    try {
        const response = await fetch(`${userUrlBase}/me`, { headers : { "Authorization": `Bearer ${token}` }})
    
        if (response.ok) {
            return await response.json()
        }

        localStorage.removeItem('access_token')
        return null
    } catch (error) {
        console.error("Error fetching data", error)
        return null
    } finally {
        fetchPromise = null
    }
    })();
    return fetchPromise
}

// pass in converted formData() object
export async function loginUser(formData) {
    const url = `${userUrlBase}/token`

    const response = await fetch(url, {method: 'POST', body : formData})
    if (!response.ok) {
        const error = await response.json()
        console.log("Error", error.detail)
        throw new Error(error.detail)
        
    }

    const data = await response.json()
    localStorage.setItem('access_token', data.access_token)
    console.log("Successful Login")
    return data.access_token
}

export async function fetchUserData(id) {
  const url = `${userUrlBase}/${id}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Failed to fetch:', error.message);
  }

}

export async function createNewUser(userData) {
    const url = userUrlBase

    const response = await fetch(url, {
        method: 'POST', 
        headers : {'Content-Type' : 'application/json'}, 
        body : JSON.stringify(userData)
    })

    if (!response.ok) {
        let message = "There was an error creating an account. Please try again"
        const error = await response.json()

        if (typeof error.detail === 'string') {
            message = error.detail  
        }
        else if (Array.isArray(error.detail)) {
            // console.log("HERE", error.detail)
            
            message = error.detail.map((e) => e.msg).join(', ')
        }
        throw new Error(message)
        // console.log(`Error: ${error}`)
        return
    }


    const newUser = await response.json()
    // console.log("New User:", newUser)
    return newUser
}

// Remember to get data.access_token and not the entire token object
export async function addNewScore(token, scoreData) {
    const url = scoresUrlBase

    const response = await fetch(url, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify(scoreData)
            })
    
    if (!response.ok) {
        const error = await response.json()
        console.log("Error", error)
    }
    else {
        const data = response.json()
        console.log("Added Score", data)
        return data
    }
}

export async function addBatchScores(token, scores) {
    const url = `${scoresUrlBase}/batch`
    const response = await fetch(url, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify(scores)
            })
    if (!response.ok) {
        const error = await response.json()
        console.log("Error adding scores", error)
        return response
    }
    else {
        const data = response.json()
        console.log("Added scores", data)
        return data
    }
}

export async function getUserScores(userId) {
    const url = `${scoresUrlBase}/${userId}/scores`

    const response = await fetch(url, {method : "GET"})

    if (!response.ok) {
        const error = await response.json()
        console.log("Error", error)
    }
    else {
        const scoreData = response.json()
        return scoreData
    }
}