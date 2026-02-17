import { CastawayCatagories, colorLookup, arrowLookup } from "../util/settings"

export default function GuessTable( {guesses} ) {

    return (
        <ol class="relative inset-x-0 top-24 h-16">
            {guesses.map(guess => (
                <li className="flex justify-center" key={guess[CastawayCatagories[0]]}>
                    <div className={`w-64 m-1 bg-white text-black border`}>{guess[CastawayCatagories[0]]}</div>
                    <div className={`w-30 m-1 ${colorLookup[guess[CastawayCatagories[6]][0]]} text-black border`}>{guess[CastawayCatagories[1]]}{arrowLookup[guess[CastawayCatagories[6]][0]]}</div>
                    <div className={`w-30 m-1 ${colorLookup[guess[CastawayCatagories[6]][1]]} text-black border`}>{guess[CastawayCatagories[2]]}{arrowLookup[guess[CastawayCatagories[6]][1]]}</div>
                    <div className={`w-30 m-1 ${colorLookup[guess[CastawayCatagories[6]][2]]} text-black border`}>{guess[CastawayCatagories[3]]}</div>
                    <div className={`w-30 m-1 ${colorLookup[guess[CastawayCatagories[6]][3]]} text-black border`}>{guess[CastawayCatagories[4]]}{arrowLookup[guess[CastawayCatagories[6]][3]]}</div>
                    <div className={`w-30 m-1 ${colorLookup[guess[CastawayCatagories[6]][4]]} text-black border`}>{guess[CastawayCatagories[5]]}{arrowLookup[guess[CastawayCatagories[6]][4]]}</div>
                </li>
            ))}
        </ol>
    )
}