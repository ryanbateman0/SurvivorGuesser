import { useEffect, useState } from "react";
import { CastawayCatagories, colorLookup, arrowLookup, getRevealAnimationTimeInMilliseconds } from "../util/settings"

export default function GuessTable( {guesses} ) {
    const [spinningRowIndex, setSpinningRowIndex] = useState(0);
    const [spinningColumnIndex, setSpinningColumnIndex] = useState(6);
    const [revealAnimationTimeInMilliseconds, setRevealAnimationTime] = useState();

    useEffect(() => {
        setRevealAnimationTime(getRevealAnimationTimeInMilliseconds());
    }, [])

    
    function spinCurrentRow() {
        for (let i = 0; i < CastawayCatagories.length; i++) {
            setTimeout(() => {
                setSpinningColumnIndex(previous => previous + 1)
            }, revealAnimationTimeInMilliseconds * i);
        }
    }

    //Starts animation for row reveal, skips header row
    useEffect(() => {
        if (spinningRowIndex !== 0) {
            setSpinningColumnIndex(-1);
            setTimeout(() => {setSpinningRowIndex(previous => previous + 1)}, revealAnimationTimeInMilliseconds * CastawayCatagories.length);
            spinCurrentRow();
        }
        else {
            setSpinningRowIndex(previous => previous + 1)
        }
    }, [guesses.length])

    return (
        <ol class="relative inset-x-0 top-24 h-16">
            {guesses.map((guess, index) => (
                <li className="flex justify-center" key={guess[CastawayCatagories[0] + CastawayCatagories[1]]}>
                    <div className={`w-64 h-13 m-1 flex items-center justify-center bg-white text-black border ${index === spinningRowIndex && spinningColumnIndex === 0 ? "animate-reveal" : ""} ${index < spinningRowIndex || spinningColumnIndex >= 0 ? "" : "opacity-0"}`}>{guess[CastawayCatagories[0]]}</div>
                    <div className={`w-30 m-1 flex items-center justify-center text-black border ${colorLookup[guess[CastawayCatagories[6]][0]]} ${index === spinningRowIndex && spinningColumnIndex === 1 ? "animate-reveal" : ""} ${index < spinningRowIndex || spinningColumnIndex >= 1 ? "" : "opacity-0"}`}>{guess[CastawayCatagories[1]]}{arrowLookup[guess[CastawayCatagories[6]][0]]}</div>
                    <div className={`w-30 m-1 flex items-center justify-center text-black border ${colorLookup[guess[CastawayCatagories[6]][1]]} ${index === spinningRowIndex && spinningColumnIndex === 2 ? "animate-reveal" : ""} ${index < spinningRowIndex || spinningColumnIndex >= 2 ? "" : "opacity-0"}`}>{guess[CastawayCatagories[2]]}{arrowLookup[guess[CastawayCatagories[6]][1]]}</div>
                    <div className={`w-30 m-1 flex items-center justify-center text-black border ${colorLookup[guess[CastawayCatagories[6]][2]]} ${index === spinningRowIndex && spinningColumnIndex === 3 ? "animate-reveal" : ""} ${index < spinningRowIndex || spinningColumnIndex >= 3 ? "" : "opacity-0"}`}>{guess[CastawayCatagories[3]]}</div>
                    <div className={`w-30 m-1 flex items-center justify-center text-black border ${colorLookup[guess[CastawayCatagories[6]][3]]} ${index === spinningRowIndex && spinningColumnIndex === 4 ? "animate-reveal" : ""} ${index < spinningRowIndex || spinningColumnIndex >= 4 ? "" : "opacity-0"}`}>{guess[CastawayCatagories[4]]}{arrowLookup[guess[CastawayCatagories[6]][3]]}</div>
                    <div className={`w-30 m-1 flex items-center justify-center text-black border ${colorLookup[guess[CastawayCatagories[6]][4]]} ${index === spinningRowIndex && spinningColumnIndex === 5 ? "animate-reveal" : ""} ${index < spinningRowIndex || spinningColumnIndex >= 5 ? "" : "opacity-0"}`}>{guess[CastawayCatagories[5]]}{arrowLookup[guess[CastawayCatagories[6]][4]]}</div>
                </li>
            ))}
        </ol>
    )
}