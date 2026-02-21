import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import { castawayLookup } from './util/castawayLookup'
import GuessTable from './components/GuessTable'
import { CastawayCatagories } from './util/settings'
import RadioButtonGroup from './components/RadioButtonGroup'
import Cookies from 'js-cookie'

async function apiCall(APIURL) {
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

function getRandomCastawayID() {
  const APIURL = `https://rpfuy7m019.execute-api.us-east-1.amazonaws.com/v1/GetRandomSurvivorID`;
  return apiCall(APIURL)
}

async function guessCastaway(guessID, targetID, gameMode) {
  if (gameMode === "HighLow") {
    return guessCastawayHighLow(guessID, targetID)
  }
  else if (gameMode === "HotCold") {
    return guessCastawayHotCold(guessID, targetID)
  }
}

function guessCastawayHighLow(guessID, targetID) {
  console.log('called')
  const APIURL = `https://rpfuy7m019.execute-api.us-east-1.amazonaws.com/v1/CompareSurvivorIDsHighLow?target=${targetID}&guess=${guessID}`;
  return apiCall(APIURL)
}

function guessCastawayHotCold(guessID, targetID) {
  const APIURL = `https://rpfuy7m019.execute-api.us-east-1.amazonaws.com/v1/CompareSurvivorIDsWarmCold?target=${targetID}&guess=${guessID}`;
  return apiCall(APIURL)
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
  const [guessCount, setGuessCount] = useState(1);
  const [gameMode, setGameMode] = useState(() => {return Cookies.get("gameMode") || "HighLow"});

  useEffect(() => {
    getNextCastaway()
  }, []);

  function getNextCastaway() {
  getRandomCastawayID().then(result => {setCurrentCastawayID(result.id)});
 }

 function changeGameMode(name) {
  setGameMode(name);
  Cookies.set("gameMode", name, { expires: 1 })
 }

  function handleSearchSurvivor(currentSurvivorText){
    setGuessCount(previous => previous + 1)
    guessCastaway(castawayLookup[currentSurvivorText], currentCastawayID, gameMode).then(result => {
      const nextGuess = {}
      nextGuess[CastawayCatagories[6]] = [result.hotColdIndicator.seasonnumber, result.hotColdIndicator.age, result.hotColdIndicator.gender, result.hotColdIndicator.placement, result.hotColdIndicator.votesAgainst]
      nextGuess[CastawayCatagories[0]] = result.guessInfo.fullname
      nextGuess[CastawayCatagories[1]] = result.guessInfo.seasonnumber
      nextGuess[CastawayCatagories[2]] = result.guessInfo.age
      nextGuess[CastawayCatagories[3]] = result.guessInfo.gender
      nextGuess[CastawayCatagories[4]] = result.guessInfo.placement
      nextGuess[CastawayCatagories[5]] = result.guessInfo.votescastagainst
      setGuessHistory((previousGuesses) => {return [...previousGuesses, nextGuess]})
    });
  }

  return (
    <div class="absolute inset-x-0 top-4 h-16">
        <div>
          <h1 class="text-purple-700">
            Survivor Guesser
          </h1>
        </div>
        <RadioButtonGroup currentGameMode={gameMode} handleRadioButtonClick={changeGameMode} />
        <SearchBar disabled={guessCount !== guessHistory.length} survivorList={Object.keys(castawayLookup)} searchSurvivor={handleSearchSurvivor} />
        <GuessTable guesses={guessHistory}/>

        {guessCount !== guessHistory.length ? <div class="fixed z-10 inset-0 bg-black opacity-75 flex items-center justify-center h-full">
          <svg class="mr-3 size-10 animate-spin" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="100" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div> : <></>}
        
    </div>
    
  )
}

export default App
