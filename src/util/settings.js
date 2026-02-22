export const CastawayCatagories = [
  "Castaway Name", //0
  "Season", //1
  "Age", //2
  "Gender", //3
  "Place", //4
  "Votes", //5
  "Hot Cold"
]

const revealAnimationTimeString = getComputedStyle(document.documentElement).getPropertyValue("--animate-reveal").trim().split(" ")[1];
export const revealAnimationTimeInMilliseconds = parseFloat(revealAnimationTimeString.substring(0, revealAnimationTimeString.length - 1))  * 1000;

const popOutAnimationTimeString = getComputedStyle(document.documentElement).getPropertyValue("--animate-pop-out").trim().split(" ")[1];
export const popOutAnimationTimeInMilliseconds = parseFloat(popOutAnimationTimeString.substring(0, popOutAnimationTimeString.length - 1))  * 1000;

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