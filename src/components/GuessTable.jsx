const CastawayCatagories = [
  "Castaway Name", //0
  "Season Number", //1
  "Age", //2
  "Gender", //3
  "Placement", //4
  "Votes Cast Against", //5
  "Hot Cold"
]

const colorLookup = {
    ["H"]: "bg-red-400",
    ["L"]: "bg-blue-400",
    ["O"]: "bg-gray-100",
    ["X"]: "bg-green-400",
    ["N"]: "bg-white"
}

export default function GuessTable( {guesses} ) {

    return (
        <ol class="relative inset-x-0 top-24 h-16">
            {guesses.map(guess => (
                <li className="flex justify-center" key={guess[CastawayCatagories[0]]}>
                    <div className={`w-64 m-1 border`}>{guess[CastawayCatagories[0]]}</div>
                    <div className={`w-24 m-1 ${colorLookup[guess[CastawayCatagories[6]][0]]} border`}>{guess[CastawayCatagories[1]]}</div>
                    <div className={`w-24 m-1 ${colorLookup[guess[CastawayCatagories[6]][1]]} text-center border`}>{guess[CastawayCatagories[2]]}</div>
                    <div className={`w-24 m-1 ${colorLookup[guess[CastawayCatagories[6]][2]]} border`}>{guess[CastawayCatagories[3]]}</div>
                    <div className={`w-24 m-1 ${colorLookup[guess[CastawayCatagories[6]][3]]} border`}>{guess[CastawayCatagories[4]]}</div>
                    <div className={`w-24 m-1 ${colorLookup[guess[CastawayCatagories[6]][4]]} border`}>{guess[CastawayCatagories[5]]}</div>
                </li>
            ))}
        </ol>
    )
}