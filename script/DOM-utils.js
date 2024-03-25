import { translator } from "./translator.js";

const englishTextArea = document.querySelector("#englishInput");
const morseTextArea = document.querySelector("#morseCodeInput");
const englishDisplay = document.querySelector("#englishDisplay");
const morseDisplay = document.querySelector("#morseCodeDisplay");

const markErrorRed = (output, input, outputDisplay, inputDisplay) => {
  const errSpanOut = document.createElement("span");
  errSpanOut.classList.add("invalid");
  errSpanOut.append("#undecodable#");
  outputDisplay.innerHTML = output.translationTxt.replace(
    /#undecodable#/g,
    errSpanOut.outerHTML
  );
  const strArr = input.split("");
  output.errList.forEach((index) => {
    const errSpanIn = document.createElement("span");
    errSpanIn.classList.add("invalid");
    errSpanIn.append(strArr[index]);
    strArr[index] = errSpanIn.outerHTML;
  });

  inputDisplay.innerHTML = strArr.join("");
};
englishTextArea.addEventListener("input", () => {
  console.log("...translating to Morse Code.");
  englishDisplay.innerHTML = englishTextArea.value;
  const translation = translator.translateToMorseCode(englishTextArea.value);
  if (translation.isInvalidInput) {
    markErrorRed(
      translation,
      englishTextArea.value,
      morseDisplay,
      englishDisplay
    );
  } else {
    morseDisplay.innerHTML = translation.translationTxt;
  }
  morseTextArea.value = translation.translationTxt;
});

morseTextArea.addEventListener("input", (e) => {
  if (e.target) {
    console.log(e.target);
  }
  console.log("...translating to English.");
  morseDisplay.innerHTML = morseTextArea.value;
  const translation = translator.translateToEnglish(morseTextArea.value);
  if (translation.isInvalidInput) {
    markErrorRed(
      translation,
      morseTextArea.value,
      englishDisplay,
      morseDisplay
    );
  } else {
    englishDisplay.innerHTML = translation.translationTxt;
  }
  englishTextArea.value = translation.translationTxt;
});

morseTextArea.addEventListener("keypress", (e) => {
  if (e.keyCode !== "." && e.keyCode !== "-") {
    e.preventDefault();
  }
});
