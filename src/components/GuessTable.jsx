import { useEffect, useState } from "react";
<<<<<<< HEAD
import { CastawayCatagories, colorLookup, arrowLookup, getRevealAnimationTimeInMilliseconds } from "../util/settings"
=======
import { CastawayCatagories, colorLookup, arrowLookup, revealAnimationTimeInMilliseconds } from "../util/settings"
import { ColumnCategory } from "./ColumnCategory";
>>>>>>> d37eef4 (small text updates and took out pop out animations)

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

    const categoryStyling = "w-30 m-1 flex items-center justify-center text-black text-sm md:text-lg border"
    const nameStyling = "w-64 h-13 m-1 flex items-center justify-center bg-white text-sm md:text-lg text-black border"

    return (
        <ol class="relative inset-x-0 top-24 h-16">
            {guesses.map((guess, index) => (
                <li className="flex justify-center text" key={guess[CastawayCatagories[0] + CastawayCatagories[1]]}>
                    <ColumnCategory columnIndex={0} rowIndex={index} guess={guess} stylings={nameStyling} spinningRowIndex={spinningRowIndex} spinningColumnIndex={spinningColumnIndex}/>
                    {/* <div className={`w-30 m-1 flex items-center justify-center text-black border ${colorLookup[guess[CastawayCatagories[6]][0]]} ${index === spinningRowIndex && spinningColumnIndex === 1 ? "animate-reveal" : ""} ${index < spinningRowIndex || spinningColumnIndex >= 1 ? "" : "opacity-0"}`}>{guess[CastawayCatagories[1]]}{arrowLookup[guess[CastawayCatagories[6]][0]]}</div> */}
                    <ColumnCategory columnIndex={1} rowIndex={index} guess={guess} stylings={categoryStyling} spinningRowIndex={spinningRowIndex} spinningColumnIndex={spinningColumnIndex}/>
                    <ColumnCategory columnIndex={2} rowIndex={index} guess={guess} stylings={categoryStyling} spinningRowIndex={spinningRowIndex} spinningColumnIndex={spinningColumnIndex}/>
                    <ColumnCategory columnIndex={3} rowIndex={index} guess={guess} stylings={categoryStyling} spinningRowIndex={spinningRowIndex} spinningColumnIndex={spinningColumnIndex}/>
                    <ColumnCategory columnIndex={4} rowIndex={index} guess={guess} stylings={categoryStyling} spinningRowIndex={spinningRowIndex} spinningColumnIndex={spinningColumnIndex}/>
                    <ColumnCategory columnIndex={5} rowIndex={index} guess={guess} stylings={categoryStyling} spinningRowIndex={spinningRowIndex} spinningColumnIndex={spinningColumnIndex}/>
                </li>
            ))}
        </ol>
    )
}