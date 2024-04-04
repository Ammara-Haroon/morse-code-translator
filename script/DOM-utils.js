import {
  characterMap,
  translateToEnglish,
  translateToMorseCode,
} from "./translator.js";
import { play } from "./audio-generator.js";
const englishTextArea = document.querySelector("#englishInput");
const morseTextArea = document.querySelector("#morseCodeInput");
const englishDisplay = document.querySelector("#englishDisplay");
const morseDisplay = document.querySelector("#morseCodeDisplay");
const playBtn = document.querySelector("#playBtn");
const clearBtn = document.querySelector("#clearBtn");
const infoMsg = document.querySelector("#infoMsg");

//on input to the english text area, translate it to morse code and put output in the morse code text area
englishTextArea.addEventListener("input", () => {
  infoMsg.style.opacity = 0;

  const { translationTxt, translationDisplay, markedInput } =
    translateToMorseCode(englishTextArea.value);
  englishDisplay.innerHTML = markedInput;
  morseDisplay.innerHTML = translationDisplay;
  morseTextArea.value = translationTxt;
});

const clearEverything = () => {
  englishDisplay.innerHTML = "";
  morseDisplay.innerHTML = "";
  englishTextArea.value = "";
  morseTextArea.value = "";
};
englishTextArea.addEventListener("click", () => {
  const cleanEnglish = englishDisplay.innerHTML.replace(
    /<span class="invalid">#undecodable#<\/span>/gi,
    ""
  );
  if (cleanEnglish.length !== englishDisplay.innerHTML.length) {
    infoMsg.style.opacity = 1;
  }
  englishDisplay.innerText = cleanEnglish;
  englishTextArea.value = cleanEnglish;
  morseTextArea.value = translateToMorseCode(cleanEnglish).translationTxt;
  morseDisplay.innerText = morseTextArea.value;
});

morseTextArea.addEventListener("click", () => {
  const cleanMorse = morseDisplay.innerHTML.replace(
    /<span class="invalid">#undecodable#<\/span>/gi,
    ""
  );
  if (cleanMorse.length !== morseDisplay.innerHTML.length) {
    infoMsg.style.opacity = 1;
  }
  const translation = translateToEnglish(cleanMorse);
  englishTextArea.value = translation.translationTxt;
  englishDisplay.innerText = translation.translationDisplay;
  morseDisplay.innerText = translation.formattedInput;
  morseTextArea.value = translation.formattedInput;
});

//on input to the morse-code text area, translate it to english and put output in the english text area
morseTextArea.addEventListener("input", () => {
  infoMsg.style.opacity = 0;
  const { translationTxt, translationDisplay, markedInput, formattedInput } =
    translateToEnglish(morseTextArea.value);
  morseDisplay.innerHTML = markedInput;
  morseTextArea.value = formattedInput;
  englishDisplay.innerHTML = translationDisplay;
  englishTextArea.value = translationTxt;
});

const errorMsg = document.querySelector("#errMsg");
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
  clearEverything();
});

//play sound
playBtn.addEventListener("click", () => {
  play(englishTextArea.value);
});
