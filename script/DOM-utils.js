import { translator } from "./translator.js";
import { play } from "./audio-generator.js";
const englishTextArea = document.querySelector("#englishInput");
const morseTextArea = document.querySelector("#morseCodeInput");
const englishDisplay = document.querySelector("#englishDisplay");
const morseDisplay = document.querySelector("#morseCodeDisplay");
const playBtn = document.querySelector("#playBtn");
const clearBtn = document.querySelector("#clearBtn");

let isBackspace = false;

//on input to the english text area, translate it to morse code and put output in the morse code text area
englishTextArea.addEventListener("input", () => {
  //console.log("...translating to Morse Code.");
  const { translationTxt, translationDisplay, markedInput } =
    translator.translateToMorseCode(englishTextArea.value);
  englishDisplay.innerHTML = markedInput;
  morseDisplay.innerHTML = translationDisplay;
  morseTextArea.value = translationTxt;
});

//on input to the morse-code text area, translate it to english and put output in the english text area
morseTextArea.addEventListener("input", () => {
  if (morseTextArea.value.length === 0) {
    morseDisplay.innerHTML = "";
    morseTextArea.value = "";
    englishDisplay.innerHTML = "";
    englishTextArea.value = "";
    return;
  }
  if (
    !isBackspace &&
    morseTextArea.value[morseTextArea.value.length - 1] !== " "
  ) {
    morseDisplay.innerText +=
      morseTextArea.value[morseTextArea.value.length - 1];
    return;
  }
  //  console.log("...translating to English.");
  const { translationTxt, translationDisplay, markedInput, formattedInput } =
    translator.translateToEnglish(morseTextArea.value);
  morseDisplay.innerHTML = markedInput;
  morseTextArea.value = formattedInput;
  englishDisplay.innerHTML = translationDisplay;
  englishTextArea.value = translationTxt;
});

// keys that allowed to work in the morse code text area--block the rest
morseTextArea.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" || e.key === "Delete") {
    isBackspace = true;
    return;
  }
  if (
    e.key !== "-" &&
    e.key !== "." &&
    e.key !== " " &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight" &&
    e.key !== "ArrowUp" &&
    e.key !== "ArrowDown"
  ) {
    e.preventDefault();
  }
  isBackspace = false;
});

//match the scrollbars of masking color displaying divs and the text areas
morseTextArea.addEventListener("scroll", () => {
  morseDisplay.scrollTop = morseTextArea.scrollTop;
});

englishTextArea.addEventListener("scroll", () => {
  englishDisplay.scrollTop = englishTextArea.scrollTop;
});

clearBtn.addEventListener("click", () => {
  englishDisplay.innerHTML = "";
  morseDisplay.innerHTML = "";
  englishTextArea.value = "";
  morseTextArea.value = "";
});

playBtn.addEventListener("click", () => {
  play(englishTextArea.value);
});
