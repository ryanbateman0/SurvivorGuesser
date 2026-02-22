

export default function PopOutAnimation({popOutText, children}) {

    return (
      <div class="absolute inset-x-0 inset-y-0 w-screen h-screen flex justify-center items-center">
        <div class={`text-6xl md:text-9xl w-full md:w-4xl bg-gray-600/90 z-10 ${popOutText.length > 0 ? "animate-pop-out p-16" : ""}`}>
          {popOutText}
        </div>
      </div>
    )
}