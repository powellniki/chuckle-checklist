import { useEffect, useState } from "react"
import "./App.css"
import { getAllJokes, postNewJoke, putJoke } from "./services/jokeServices.js"



export const App = () => {
  const [inputValue, setInputValue] = useState([]) // store new joke input
  const [allJokes, setAllJokes] = useState([]) // store all jokes
  const [untoldJokes, setUntoldJoke] = useState([]) // store untold jokes
  const [toldJokes, setToldJoke] = useState([]) //store told jokes
  const [untoldJokeCount, setUntoldJokeCount] = useState(0) // store number untold jokes
  const [toldJokeCount, settoldJokeCount] = useState(0) // store number untold jokes



  // get and store all of our jokes from the database
  useEffect(() => {
    getAllJokes().then(jokeArray => {
      setAllJokes(jokeArray)
    })
  }, [inputValue])



  // sort jokes as told or untold
  useEffect(() => {
    const untold = allJokes.filter(joke => joke.told === false)
    setUntoldJoke(untold)
  }, [allJokes])

  useEffect(() => {
    const told = allJokes.filter(joke => joke.told === true)
    setToldJoke(told)
  }, [allJokes])



  // count the number of each untold and told jokes, those values need to update with each post or page refresh
  useEffect(() => {
    const untoldJokeCount = untoldJokes.length
    setUntoldJokeCount(untoldJokeCount)
  }, [allJokes, untoldJokes])

  useEffect(() => {
    const toldJokeCount = toldJokes.length
    settoldJokeCount(toldJokeCount)
  }, [allJokes, toldJokes])



    // post the new joke with the input value and then clear the input field afterwards
    const handleButtonClick = () => {
      postNewJoke(inputValue)
      setInputValue('')
      
    }



    // function for updated the database
    const updateDatabase = () => {
      getAllJokes().then((jokeArray) => {
        setAllJokes(jokeArray)
      })
    }



    // toggle joke boolean
    const toggleJoke = (clickEvent) => {
      let foundJoke = allJokes.find(
        (joke) => {
          return joke.id === parseInt(clickEvent.target.dataset.id)
        } 
      )
      foundJoke.told = !foundJoke.told
      putJoke(foundJoke)
      updateDatabase()
    }



    // delete joke from database
    const handleDeleteJoke = (clickEvent) => {
      // find the joke object to delete
      let jokeObject = allJokes.find(
        (joke) => {
          return joke.id === parseInt(clickEvent.target.dataset.id)
        }
      )

      // delete the joke object from the state
      let updatedJokes = allJokes.filter(joke => joke.id !== jokeObject.id)
      setAllJokes(updatedJokes)

      deleteJoke(jokeObject)
      updateDatabase()
    }





  return (
    <div>
      <header className="app-heading">
          <h1 className="app-heading-text">Dad Jokes</h1>
      </header>
      <div className="joke-add-form">
        <input
            className="joke-input"
            type="text"
            placeholder="New One Liner"
            value={inputValue}
            onChange={(event) => {setInputValue(event.target.value)}}/>
        <button className="joke-input-submit" onClick={handleButtonClick}>YAS</button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>Untold Jokes<span className="untold-count">{untoldJokeCount}</span></h2>
          {untoldJokes.map(joke => {
            return (
              <section key={joke.id}>
                  <div>
                    <li className="joke-list-item">
                      <p className="joke-list-item-text">{joke.text}</p>
                      <span>
                        <div><button data-id={joke.id} className="joke-list-action-toggle" onClick={(clickEvent) => {toggleJoke(clickEvent)}}></button></div>
                        <div><button data-id={joke.id} className="joke-list-action-delete" onClick={(clickEvent) => {handleDeleteJoke(clickEvent)}}></button></div>
                      </span>
                    </li>
                  </div>
              </section>
            )
            }
          )}
        </div>
        <div className="joke-list-container">
        <h2>Told Jokes<span className="told-count">{toldJokeCount}</span></h2>
          {toldJokes.map(joke => {
            return (
              <section key={joke.id}>
                <div>
                  <li className="joke-list-item">
                    <p className="joke-list-item-text">{joke.text}</p>
                    <span>
                      <div><button data-id={joke.id} className="joke-list-action-toggle" onClick={(clickEvent) => {toggleJoke(clickEvent)}}></button></div>
                      <div><button data-id={joke.id} className="joke-list-action-delete" onClick={(clickEvent) => {handleDeleteJoke(clickEvent)}}></button></div>
                    </span>
                  </li>
                </div>
              </section>
            )
            }
          )}
        </div>
      </div>
    </div>
  )
}