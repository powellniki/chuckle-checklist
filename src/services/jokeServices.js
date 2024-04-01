
export const getAllJokes = () => {
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



export const deleteJoke = async (jokeObject) => {

    const postOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeObject)
    }
    await fetch(`http://localhost:8088/jokes/${jokeObject}`, postOptions)
    
}