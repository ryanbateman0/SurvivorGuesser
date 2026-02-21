import { useState } from "react"
import { castawayLookup } from "../util/castawayLookup";

export default function SearchBar({searchSurvivor, survivorList, children}) {
    const [currentSurvivorText, setCurrentSurvivorText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    let filteredSuggestions = survivorList.filter( survivorList => survivorList.toLowerCase().includes(currentSurvivorText.toLowerCase()))

    if (filteredSuggestions.length > 10) {
        filteredSuggestions = filteredSuggestions.slice(0, 10)
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedIndex(previous => {
                return previous > 0 ? previous - 1 : filteredSuggestions.length - 1;
            })
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedIndex(previous => {
                return previous < filteredSuggestions.length - 1 ? previous + 1 : 0;
            })
        }
    }

    function handleBlur(event) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
    }

    function handleFocus(event) {
        if (currentSurvivorText.length > 0) {
            setShowSuggestions(true);
        }
    }

    function handleSearch() {
        if (filteredSuggestions.length === 1) {
            searchSurvivor(filteredSuggestions[0]);
        }
        else if (selectedIndex >= 0) {
            searchSurvivor(filteredSuggestions[selectedIndex]);
        }
        else {
            if (!(currentSurvivorText in castawayLookup)) {
                  console.log("error: need valid castaway name");
                  return;
                }
            searchSurvivor(currentSurvivorText);
        }
        setCurrentSurvivorText("");
        setShowSuggestions(false);
    }

    function handleText(event) {
        setCurrentSurvivorText(event.target.value);
        setShowSuggestions(event.target.value.length > 0);
    }

    function handleSuggestionClick(event, text) {
        event.preventDefault();
        setCurrentSurvivorText(text);
        setShowSuggestions(false);
    }

    function handleMouseEnter(event, index) {
        setSelectedIndex(-1);
    }

    //useRef hook can be used to click out and close the autocomplete window
    return(
        <div class="flex-col relative z-10 inset-x-0 top-16 h-16">
            <div class="flex justify-center">
                <input class="w-2xl border  focus:border-gray-800 border-gray-600 p-4 text-left" 
                type="text" placeholder="Guess a Survivor Player"
                onChange={handleText} value={currentSurvivorText} onKeyDown={handleKeyDown}  onFocus={handleFocus} onBlur={handleBlur} ></input>
                <button onClick={() => handleSearch()}>Enter</button>
            </div>
            {(showSuggestions) && (
            <ul class="p-1 justify-center inline-block w-full md:w-3xl  bg-white border border-gray-100">
                {filteredSuggestions.map((filteredSuggestion, index) => (
                    <li key={filteredSuggestion} 
                    class={`m-0.5 p-2 text-black border ${index !== selectedIndex ? "bg-white" : "bg-gray-300"} hover:bg-gray-300`} 
                    onMouseDown={(event) => handleSuggestionClick(event, filteredSuggestion)} onMouseEnter={handleMouseEnter}>
                        {filteredSuggestion}
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}