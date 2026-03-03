import { colorLookup, CastawayCatagories, arrowLookup } from "../util/settings"

export function ColumnCategory({columnIndex, rowIndex, stylings, guess, spinningRowIndex, spinningColumnIndex, props}) {
    return (
        <div className={`${stylings} ${colorLookup[guess[CastawayCatagories[6]][columnIndex - 1]]} ${rowIndex === spinningRowIndex && spinningColumnIndex === columnIndex ? "animate-reveal" : ""} ${rowIndex < spinningRowIndex || spinningColumnIndex >= columnIndex ? "" : "opacity-0"}`}>{guess[CastawayCatagories[columnIndex]]}{arrowLookup[guess[CastawayCatagories[6]][columnIndex - 1]]}</div>
    )
}