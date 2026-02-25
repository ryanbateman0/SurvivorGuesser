import { useRef, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import { castawayLookup } from './util/castawayLookup'
import GuessTable from './components/GuessTable'
import { CastawayCatagories, popOutAnimationTimeInMilliseconds, revealAnimationTimeInMilliseconds } from './util/settings'
import RadioButtonGroup from './components/RadioButtonGroup'
import Cookies from 'js-cookie'
import PopOutAnimation from './components/PopOutAnimation'
import WinScreen from './components/WinScreen'

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
  const APIURL = `https://rpfuy7m019.execute-api.us-east-1.amazonaws.com/v1/CompareSurvivorIDsHighLow?target=${targetID}&guess=${guessID}`;
  return apiCall(APIURL)
}

function guessCastawayHotCold(guessID, targetID) {
  const APIURL = `https://rpfuy7m019.execute-api.us-east-1.amazonaws.com/v1/CompareSurvivorIDsWarmCold?target=${targetID}&guess=${guessID}`;
  return apiCall(APIURL)
}

function grabRandomEntryFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const feedback = {
  [0]: ["Not even close", "You're trash", "Why would you guess that???"],
  [1]: ["Okay...", "I mean I guess that's good", "Not the worst"],
  [2]: ["So close", "Come onnnnnn", "Dig deep"],
  [3]: ["YOU WIN!!!"]
};

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
  const [guessCount, setGuessCount] = useState(0);
  const [gameMode, setGameMode] = useState(() => {return Cookies.get("gameMode") || "HighLow"});
  const [feedbackText, setFeedbackText] = useState("");
  const [waitForAnimation, setWaitForAnimation] = useState(false);
  const [winner, setWinner] = useState(false);
  const [lastGuessName, setLastGuessName] = useState("");

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

 function guessResultAnimation(results) {
  let correctGuesses = 0;
    for (let i = 0; i < results.length; i++){
      if (results[i] === "X") {
        correctGuesses += 1;
    }
  }
  switch (correctGuesses) {
    case 5:
      animateGuessResult(grabRandomEntryFromList(feedback[3]), true);
      break;
    case 4:
      animateGuessResult(grabRandomEntryFromList(feedback[2]), false);
      break;
    case 3: case 2:
      animateGuessResult(grabRandomEntryFromList(feedback[1]), false);
      break;
    case 1: case 0:
      animateGuessResult(grabRandomEntryFromList(feedback[0]), false);
      break;
  }
 }


 function animateGuessResult(resultText, isGameWon) {

  if (isGameWon) {
    setTimeout(() => {
      setWinner(true);
    }, (revealAnimationTimeInMilliseconds * CastawayCatagories.length));
  }
  else {
      setWaitForAnimation(true);
    setTimeout(() => {
      setFeedbackText(resultText);
    }, revealAnimationTimeInMilliseconds * CastawayCatagories.length);
    setTimeout(() => {
      setFeedbackText("")
    }, (revealAnimationTimeInMilliseconds * CastawayCatagories.length) + popOutAnimationTimeInMilliseconds - 1);
    setTimeout(() => {
      setWaitForAnimation(false);
    }, (revealAnimationTimeInMilliseconds * CastawayCatagories.length) + popOutAnimationTimeInMilliseconds - 1);
  }
 }

  function handleSearchSurvivor(currentSurvivorText){
    setGuessCount(previous => previous + 1)
    setLastGuessName(currentSurvivorText)
    guessCastaway(castawayLookup[currentSurvivorText], currentCastawayID, gameMode).then(result => {
      const nextGuess = {};
      nextGuess[CastawayCatagories[6]] = [result.hotColdIndicator.seasonnumber, result.hotColdIndicator.age, result.hotColdIndicator.gender, result.hotColdIndicator.placement, result.hotColdIndicator.votesAgainst];
      nextGuess[CastawayCatagories[0]] = result.guessInfo.fullname;
      nextGuess[CastawayCatagories[1]] = result.guessInfo.seasonnumber;
      nextGuess[CastawayCatagories[2]] = result.guessInfo.age;
      nextGuess[CastawayCatagories[3]] = result.guessInfo.gender;
      nextGuess[CastawayCatagories[4]] = result.guessInfo.placement;
      nextGuess[CastawayCatagories[5]] = result.guessInfo.votescastagainst;
      guessResultAnimation(Object.values(nextGuess[CastawayCatagories[6]]));
      setGuessHistory((previousGuesses) => {return [...previousGuesses, nextGuess]});
    });
  }

  

  return (
    <>
    <div class="absolute inset-x-0 top-4 h-16">
        <div>
          <h1 class="text-purple-700">
            Survivor Guesser
          </h1>
        </div>
        <RadioButtonGroup currentGameMode={gameMode} handleRadioButtonClick={changeGameMode} />
        <SearchBar disableSearch={guessCount + 1 !== guessHistory.length || waitForAnimation || winner} survivorList={Object.keys(castawayLookup)} searchSurvivor={handleSearchSurvivor} />
        <GuessTable guesses={guessHistory}/>
        

        {guessCount + 1 !== guessHistory.length ? <div class="fixed z-10 inset-0 bg-black opacity-75 flex items-center justify-center h-full">
          <svg class="mr-3 size-10 animate-spin" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="100" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div> : <></>}
        
    </div>

    <PopOutAnimation popOutText={feedbackText}/>

    {winner ? 
    <WinScreen castawayName={lastGuessName} numberOfGuesses={guessCount}/>
    : ""}
    
      
    </>
    
  )
}

export default App
