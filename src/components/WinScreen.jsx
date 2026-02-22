import { useState, useRef, useEffect } from "react";
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'


const symbolLookup = [
    "X",
    "+"
];

export default function WinScreen({castawayName, numberOfGuesses}) {
    const [topRightSymbol, setTopRightSymbol] = useState(symbolLookup[0]);


    function handleClickX() {
        setTopRightSymbol((previous) => {
            if (previous === symbolLookup[0]) {
                return symbolLookup[1]
            } else {
                return symbolLookup[0]
            }
        })
    }

    const { width, height } = useWindowSize();

    return (
        <>
            <div class = "absolute text-xl inset-x-30/32 inset-y-1/64 z-20 bg-white" onClick={handleClickX}>
                {topRightSymbol}
            </div>
            <Confetti width={width} height={height} numberOfPieces={width / 5} style={{ zIndex: 20 }}/>
            {symbolLookup[0] === topRightSymbol ?
            <>
                <div class={`absolute bg-gray-700 opacity-98 z-10 inset-x-0 inset-y-0 w-screen h-screen flex flex-col justify-center items-center`}>
                    <div class="flex-1 p-16 text-7xl">
                        YOU WIN!!!
                    </div>
                    <div class="flex-1 text-3xl">
                        You guessed {castawayName}<br/><br/> in {numberOfGuesses} guess{numberOfGuesses > 1 ? "es" : "!"}
                    </div>
                    <div class="flex-1 text-xl">
                        Refresh the page to try again.
                    </div>
                </div>
                
            </>
            : ""}
        </>
    )
}