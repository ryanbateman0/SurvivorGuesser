import { useState } from "react"

export default function SearchBar({searchSurvivor, survivorList, children}) {
    const [currentSurvivorText, setCurrentSurvivorText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    let filteredSuggestions = survivorList.filter( survivorList => survivorList.toLowerCase().includes(currentSurvivorText.toLowerCase()))
    if (filteredSuggestions.length > 10) {
        filteredSuggestions = filteredSuggestions.slice(0, 10)
    }

    function handleSearch() {
        searchSurvivor(currentSurvivorText)
        setCurrentSurvivorText("")
    }

    function handleText(event) {
        setCurrentSurvivorText(event.target.value);
        setShowSuggestions(event.target.value.length > 0);
    }

    function handleSuggestionClick(text) {
        setCurrentSurvivorText(text);
        setShowSuggestions(false);
    }

    //useRef hook can be used to click out and close the autocomplete window
    return(
        <div class="flex-col relative z-10 inset-x-0 top-16 h-16">
            <div class="flex justify-center">
                <input class="w-xl flex-initial border focus:bg-gray-100 border-gray-600 p-4 text-left" 
                type="text" placeholder="Guess a Survivor Player"
                onChange={handleText} value={currentSurvivorText}></input>
                <button onClick={() => handleSearch(currentSurvivorText)}>Enter</button>
            </div>
            {(showSuggestions) && (
            <ul class="p-1 justify-center inline-block w-2xl bg-white border border-gray-100">
                {filteredSuggestions.map(filteredSuggestion => (
                    <li class="m-0.5 p-2 border bg-white hover:bg-gray-100" key={filteredSuggestion} onClick={() => handleSuggestionClick(filteredSuggestion)}>{filteredSuggestion}</li>
                ))}
            </ul>
            )}
        </div>
    );
}