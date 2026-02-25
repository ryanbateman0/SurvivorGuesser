export const CastawayCatagories = [
  "Castaway Name", //0
  "Season", //1
  "Age", //2
  "Gender", //3
  "Place", //4
  "Votes", //5
  "Hot Cold"
]

// const revealAnimationTimeString = getComputedStyle(document.documentElement).getPropertyValue("--animate-reveal").trim().split(" ")[1];
export const getRevealAnimationTimeInMilliseconds = () => {
    const animationTimeString = getComputedStyle(document.documentElement).getPropertyValue("--reveal-duration");

    if (!animationTimeString) return 0;

    if (animationTimeString.endsWith("ms")) return parseFloat(animationTimeString);

    else if (animationTimeString.endsWith("s")) return parseFloat(animationTimeString) * 1000;
    
    return 0;
}

// const popOutAnimationTimeString = getComputedStyle(document.documentElement).getPropertyValue("--animate-pop-out").trim().split(" ")[1];
export const getPopOutAnimationTimeInMilliseconds = () => {
    const animationTimeString = getComputedStyle(document.documentElement).getPropertyValue("--pop-out-duration");

    if (!animationTimeString) return 0;

    if (animationTimeString.endsWith("ms")) return parseFloat(animationTimeString);

    else if (animationTimeString.endsWith("s")) return parseFloat(animationTimeString) * 1000;

    return 0;
}

export const colorLookup = {
    ["H"]: "bg-red-200",
    ["L"]: "bg-blue-200",
    ["W"]: "bg-orange-200",
    ["O"]: "bg-gray-100",
    ["X"]: "bg-green-500",
    ["N"]: "bg-white"
}

export const arrowLookup = {
    ["H"]: " v",
    ["L"]: " ^",
    ["W"]: " *",
    ["O"]: "",
    ["X"]: "",
    ["N"]: ""
}