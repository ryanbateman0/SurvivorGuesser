
export default function RadioButtonGroup({currentGameMode, handleRadioButtonClick}){

    const buttonClass = `p-1 z-20`
    const labelClass = `p-1 z-20`

    return (
        <div className="flex justify-center p-4">
          <input className={`${buttonClass}`} type="radio" id="HighLow" name="GameMode" value="Higher or Lower" onClick={(event) => (handleRadioButtonClick(event.target.id))} checked={currentGameMode === "HighLow"}></input>
          <label className={`${labelClass}`} for="HighLow">High or Low</label>
          <div className="p-4"></div>
          <input className={`${buttonClass}`} type="radio" id="HotCold" name="GameMode" value="Hot or Cold" onClick={(event) => (handleRadioButtonClick(event.target.id))} checked={currentGameMode === "HotCold"}></input>
          <label className={`${labelClass}`} for="HotCold">Hot or Cold</label>
        </div>
    )
}
        