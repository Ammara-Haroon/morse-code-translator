import { translator } from "./translator.js";

const englishTextArea = document.querySelector("#englishInput");
const morseTextArea = document.querySelector("#morseCodeInput");
const englishDisplay = document.querySelector("#englishDisplay");
const morseDisplay = document.querySelector("#morseCodeDisplay");
const ENGLISH_MODE = "english";
const MORSE_MODE = "morse";
const ERR_MSG = "#undecodable#";

const markErrorRed = (output, input, outputDisplay, inputDisplay) => {
  const errSpanOut = document.createElement("span");
  errSpanOut.classList.add("invalid");
  errSpanOut.append("#undecodable#");
  outputDisplay.innerHTML = output.translationTxt.replace(
    /#undecodable#/g,
    errSpanOut.outerHTML
  );
  const errSpanIn = document.createElement("span");
  errSpanIn.classList.add("invalid");
  let changedInput = input;
  output.errList.forEach((err) => {
    errSpanIn.append(err);
    changedInput = changedInput.replace(/err?![</span>]/, errSpanIn.outerHTML);
    console.log(changedInput);
  });
  inputDisplay.innerHTML = changedInput;

  // let strArr = [];
  // if (mode === "morse") {
  //   strArr = input.split(" ");
  //   strArr.pop();
  // } else {
  //   input.split("");
  // }
  // output.errList.forEach((index) => {
  //   const errSpanIn = document.createElement("span");
  //   errSpanIn.classList.add("invalid");
  //   errSpanIn.append(strArr[index]);
  //   strArr[index] = errSpanIn.outerHTML;
  // });

  // inputDisplay.innerHTML =
  //   mode === MORSE_MODE ? strArr.join(" ") : strArr.join("");
};
englishTextArea.addEventListener("input", () => {
  console.log("...translating to Morse Code.");
  englishDisplay.innerHTML = englishTextArea.value;
  // const translation = translator.translateToMorseCode(englishTextArea.value);
  // if (translation.isInvalidInput) {
  //   markErrorRed(
  //     translation,
  //     englishTextArea.value,
  //     morseDisplay,
  //     englishDisplay
  //   );
  // } else {
  //   morseDisplay.innerHTML = translation.translationTxt;
  // }
  // morseTextArea.value = translation.translationTxt;
  const { translationTxt, translationDisplay, markedInput } =
    translator.translateToMorseCode(englishTextArea.value);
  englishDisplay.innerHTML = markedInput;
  morseDisplay.innerHTML = translationDisplay;
  morseTextArea.value = translationTxt;
  console.log("display", morseDisplay.innerHTML);
  console.log("txt", morseTextArea.value);
});
morseTextArea.addEventListener("input", (e) => {
  morseDisplay.innerHTML = morseTextArea.value;
  //  console.log(morseTextArea.value);

  if (morseTextArea.value[morseTextArea.value.length - 1] !== " ") return;

  console.log("...translating to English.");
  //const translation = translator.translateToEnglish(morseTextArea.value);
  // const translation = translator.translateToEnglish(morseTextArea.value);
  // console.log(translation);
  // if (translation.isInvalidInput) {
  //   markErrorRed(
  //     translation,
  //     morseTextArea.value,
  //     englishDisplay,
  //     morseDisplay,
  //     MORSE_MODE
  //   );
  // } else {
  //   englishDisplay.innerHTML = translation.translationTxt;
  // }
  //englishTextArea.value = translation.translationTxt;
  //morseDisplay.value = translation.markedInput;
  console.log("return val", translator.translateToEnglish(morseTextArea.value));
  const { translationTxt, translationDisplay, markedInput, formattedInput } =
    translator.translateToEnglish(morseTextArea.value);
  morseDisplay.innerHTML = markedInput;
  morseTextArea.value = formattedInput;
  englishDisplay.innerHTML = translationDisplay;
  englishTextArea.value = translationTxt;
  console.log("display", morseDisplay.innerHTML);
  console.log("txt", morseTextArea.value);
});

morseTextArea.addEventListener("keypress", (e) => {
  //console.log(e.keyCode);
  const DASH = 45;
  const DOT = 46;
  const SPACE = 32;
  if (e.keyCode !== DASH && e.keyCode !== DOT && e.keyCode !== SPACE) {
    e.preventDefault();
  }
});

morseTextArea.addEventListener("scroll", () => {
  morseDisplay.scrollTop = morseTextArea.scrollTop;
});

englishTextArea.addEventListener("scroll", () => {
  englishDisplay.scrollTop = englishTextArea.scrollTop;
});
