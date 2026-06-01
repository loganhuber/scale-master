import { getErrorMessage, getToken } from "./utils"

const userUrlBase = 'http://127.0.0.1:8000/api/users'
const scoresUrlBase = 'http://127.0.0.1:8000/api/scores'
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
    if (response.ok) {
        const data = await response.json()
        localStorage.setItem('access_token', data.access_token)
        // console.log("Successful Login", data.access_token)
        return data.access_token
    }
    else {
        const error = await response.json();
        console.log(`Error: ${getErrorMessage(error)}`)
        }
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

// pass in regular object containing user data 
// example:
    // const userData = {
    //     'username' : 'spreadward',
    //     'email' : 'spreadward@gmail.com',
    //     'pw_hash' : 'password'
    // }
export async function createNewUser(userData) {
    const url = userUrlBase

    const response = await fetch(url, {
        method: 'POST', 
        headers : {'Content-Type' : 'application/json'}, 
        body : JSON.stringify(userData)
    })

    if (!response.ok) {
        const error = await response.json()
        console.log(`Error: ${error}`)
        return
    }

    const newUser = await response.json()
    console.log("New User:", newUser)
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
        console.log("Added Score", response)
    }
}
