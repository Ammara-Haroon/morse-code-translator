import { translator } from "./translator.js";
import { play } from "./audio-generator.js";
const englishTextArea = document.querySelector("#englishInput");
const morseTextArea = document.querySelector("#morseCodeInput");
const englishDisplay = document.querySelector("#englishDisplay");
const morseDisplay = document.querySelector("#morseCodeDisplay");
const playBtn = document.querySelector("#playBtn");
const clearBtn = document.querySelector("#clearBtn");

//on input to the english text area, translate it to morse code and put output in the morse code text area
englishTextArea.addEventListener("input", () => {
  const { translationTxt, translationDisplay, markedInput } =
    translator.translateToMorseCode(englishTextArea.value);
  englishDisplay.innerHTML = markedInput;
  morseDisplay.innerHTML = translationDisplay;
  morseTextArea.value = translationTxt;
});

//on input to the morse-code text area, translate it to english and put output in the english text area
morseTextArea.addEventListener("input", () => {
  const { translationTxt, translationDisplay, markedInput, formattedInput } =
    translator.translateToEnglish(morseTextArea.value);
  morseDisplay.innerHTML = markedInput;
  morseTextArea.value = formattedInput;
  englishDisplay.innerHTML = translationDisplay;
  englishTextArea.value = translationTxt;
});

const errorMsg = document.querySelector(".error");
// keys that allowed to work in the morse code text area--block the rest
morseTextArea.addEventListener("keydown", (e) => {
  if (
    e.key !== "-" &&
    e.key !== "." &&
    e.key !== " " &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight" &&
    e.key !== "ArrowUp" &&
    e.key !== "ArrowDown" &&
    e.key !== "Backspace" &&
    e.key !== "Delete"
  ) {
    e.preventDefault();
    errorMsg.style.opacity = 1;
  } else {
    errorMsg.style.opacity = 0;
  }
});

//match the scrollbars of masking color displaying divs and the text areas
morseTextArea.addEventListener("scroll", () => {
  morseDisplay.scrollTop = morseTextArea.scrollTop;
});

englishTextArea.addEventListener("scroll", () => {
  englishDisplay.scrollTop = englishTextArea.scrollTop;
});

//clear the text areas
clearBtn.addEventListener("click", () => {
  englishDisplay.innerHTML = "";
  morseDisplay.innerHTML = "";
  englishTextArea.value = "";
  morseTextArea.value = "";
});

//play sound
playBtn.addEventListener("click", () => {
  play(englishTextArea.value);
});
