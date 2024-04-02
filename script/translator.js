//count number of trailing spaces to add them later to the morse - code input
const countTrailingSpaces = (str) => {
  let count = 0;
  for (let i = str.length - 1; i >= 0; --i) {
    if (str[i] === " ") {
      ++count;
    } else {
      break;
    }
  }
  return count % 7;
};

//add trailing spaces back to the end of morse code input
const addTrailingSpaces = (str, count) => {
  let trail = "";
  for (let i = 0; i < count; ++i) {
    trail += " ";
  }
  return str + trail;
};

//translator ppbject with all the character codes
export const characterMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  " ": "       ",
  "&": ".-...",
  "'": ".----.",
  "@": ".--.-.",
  ")": "-.--.-",
  "(": "-.--.",
  ":": "---...",
  ",": "--..--",
  "=": "-...-",
  "!": "-.-.--",
  ".": ".-.-.-",
  "-": "-....-",
  "+": ".-.-.",
  '"': ".-..-.",
  "?": "..--..",
  "/": "-..-.",
};

export const translateToMorseCode = (input) => {
  let translationTxt = "";
  let markedInput = "";
  let translationDisplay = "";
  const inputUpperCase = input.toUpperCase();

  for (let i = 0; i < inputUpperCase.length; ++i) {
    //split english to individual letters/symbols
    if (inputUpperCase.charAt(i) === " ") {
      //remove the trailing space and add seven spaces to the translation to indicate new word
      if (countTrailingSpaces(translationTxt) === 1) {
        translationTxt = translationTxt.replace(/\s$/, "");
        translationDisplay = translationDisplay.replace(/\s$/, "");
      }
    }
    if (characterMap[inputUpperCase.charAt(i)]) {
      // if the code for the symbol is found add it to the translation
      translationTxt += characterMap[inputUpperCase.charAt(i)];
      translationDisplay += characterMap[inputUpperCase.charAt(i)];
      markedInput += input.charAt(i);
    } else {
      // if the code for the symbol, is not found add undecodable and mark it red
      translationTxt += "#undecodable#";
      translationDisplay += markErrorRed("#undecodable#");
      markedInput += markErrorRed(input.charAt(i));
    }
    if (i !== inputUpperCase.length - 1 && inputUpperCase.charAt(i) !== " ") {
      translationTxt += " ";
      translationDisplay += " ";
    }
  }
  return { translationTxt, translationDisplay, markedInput };
};

export const translateToEnglish = (input) => {
  //count trailing spaces at the end
  let trailCount = countTrailingSpaces(input);
  //remove the trailing spaces
  input = input.slice(0, input.length - trailCount);
  let translationTxt = "";
  let markedInput = "";
  let translationDisplay = "";
  let formattedInput = "";
  //split the morse code into words based on 7 spaces
  const words = input.split("       ");
  for (let i = 0; i < words.length; ++i) {
    //split morse code words to letters based on a space separation
    const word = words[i];
    //remove extra spaces
    const letters = word.trim().split(" ");
    for (let j = 0; j < letters.length; ++j) {
      const letter = letters[j];
      if (letter.trim() === "") continue;
      //if the corresponding english letter is found add it to the translation
      if (characterMapReverse[letter]) {
        translationTxt += characterMapReverse[letter];
        translationDisplay += characterMapReverse[letter];
        markedInput += letter;
        formattedInput += letter;
      } else {
        //if the corresponding english letter is not found add undecodable to the translation and mark it red in both english and morse code
        translationTxt += "#undecodable#";
        translationDisplay += markErrorRed("#undecodable#");
        markedInput += markErrorRed(letter);
        formattedInput += letter;
      }
      //add space for the letters excpet the last one in the word
      if (j !== letters.length - 1) {
        markedInput += " ";
        formattedInput += " ";
      }
    }
    //add 7 spaces after each word except to the last one
    if (i !== words.length - 1) {
      markedInput += "       ";
      formattedInput += "       ";
      translationTxt += " ";
      translationDisplay += " ";
    }
  }
  //add trailing spaces back
  markedInput = addTrailingSpaces(markedInput, trailCount);
  formattedInput = addTrailingSpaces(formattedInput, trailCount);
  return { translationTxt, translationDisplay, markedInput, formattedInput };
};

//creates and adds a reverse map from morse code to english to translator object
const characterMapReverse = Object.fromEntries(
  Object.entries(characterMap).map((a) => a.reverse())
);

// creates a red font span to highlight error in input
function markErrorRed(input) {
  // const errSpan = document.createElement("span");
  // errSpan.classList.add("invalid");
  // errSpan.append(input);
  // return errSpan.outerHTML;
  return `<span class="invalid">${input}</span>`;
}
