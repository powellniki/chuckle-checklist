
export const getAllJokes = async () => {
    return fetch('http://localhost:8088/jokes').then((res) => res.json())
}


export const postNewJoke = async (inputValue) => {

    const newJokeObject = {
        text: inputValue,
        told: false
    }

    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJokeObject)
    }
    await fetch('http://localhost:8088/jokes', postOptions)
    
}



export const putJoke = async (foundJoke) => {

    const postOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(foundJoke)
    }
    await fetch(`http://localhost:8088/jokes/${foundJoke.id}`, postOptions)
    
}



export const deleteJoke = async (joke) => {
    const postOptions = {method: "DELETE"}
    await fetch(`http://localhost:8088/jokes/${joke.id}`, postOptions)
}