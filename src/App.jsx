import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import { castawayLookup } from './util/castawayLookup'
import GuessTable from './components/GuessTable'
import { CastawayCatagories } from './util/settings'

async function getRandomCastawayID() {
  const APIURL = `https://rpfuy7m019.execute-api.us-east-1.amazonaws.com/v1/GetRandomSurvivorID`;
  try {
    const response = await fetch(APIURL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function guessCastaway(guessID, targetID) {
  const APIURL = `https://rpfuy7m019.execute-api.us-east-1.amazonaws.com/v1/CompareSurvivorIDs?target=${targetID}&guess=${guessID}`;
  try {
    const response = await fetch(APIURL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

function App() {
  const tableHeaders = {}
  tableHeaders[CastawayCatagories[0]] = CastawayCatagories[0]
  tableHeaders[CastawayCatagories[1]] = CastawayCatagories[1]
  tableHeaders[CastawayCatagories[2]] = CastawayCatagories[2]
  tableHeaders[CastawayCatagories[3]] = CastawayCatagories[3]
  tableHeaders[CastawayCatagories[4]] = CastawayCatagories[4]
  tableHeaders[CastawayCatagories[5]] = CastawayCatagories[5]
  tableHeaders[CastawayCatagories[6]] = ["N", "N", "N", "N", "N"]
  

  const [guessHistory, setGuessHistory] = useState([tableHeaders]);
  const [currentCastawayID, setCurrentCastawayID] = useState();

  useEffect(() => {
    getNextCastaway()
  }, []);

  function getNextCastaway() {
  getRandomCastawayID().then(result => {setCurrentCastawayID(result.id)})
 }
  function handleSearchSurvivor(currentSurvivorText){
    if (!(currentSurvivorText in castawayLookup)) {
      console.log("error: need valid castaway name")
    }
    guessCastaway(castawayLookup[currentSurvivorText], currentCastawayID).then(result => {
      const nextGuess = {}
      nextGuess[CastawayCatagories[6]] = [result.hotColdIndicator.seasonnumber, result.hotColdIndicator.age, result.hotColdIndicator.gender, result.hotColdIndicator.placement, result.hotColdIndicator.votesAgainst]
      nextGuess[CastawayCatagories[0]] = result.guessInfo.fullname
      nextGuess[CastawayCatagories[1]] = result.guessInfo.seasonnumber
      nextGuess[CastawayCatagories[2]] = result.guessInfo.age
      nextGuess[CastawayCatagories[3]] = result.guessInfo.gender
      nextGuess[CastawayCatagories[4]] = result.guessInfo.placement
      nextGuess[CastawayCatagories[5]] = result.guessInfo.votescastagainst
      setGuessHistory((previousGuesses) => {return [...previousGuesses, nextGuess]})
    })
  }

  return (
    <div class="absolute inset-x-0 top-4 h-16">
        <div>
          <h1 class="text-purple-700">
            Survivor Guesser
          </h1>
        </div>
        <SearchBar survivorList={Object.keys(castawayLookup)} searchSurvivor={handleSearchSurvivor} />
        <GuessTable guesses={guessHistory}/>
    </div>
    
  )
}

export default App
