const countTrailingSpaces = (str) => {
  let count = 0;
  for (let i = str.length - 1; i >= 0; --i) {
    if (str[i] === " ") {
      ++count;
    } else {
      break;
    }
  }
  return count;
};
const addTrailingSpaces = (str, count) => {
  let trail = "";
  for (let i = 0; i < count; ++i) {
    trail += " ";
  }
  return str + trail;
};

export const translator = {
  characterMap: {
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
    "*": "-..-",
    "%": "-----      -..-.      -----",
    "+": ".-.-.",
    '"': ".-..-.",
    "?": "..--..",
    "/": "-..-.",
  },
  translateToMorseCode(input) {
    let translationTxt = "";
    let markedInput = "";
    let translationDisplay = "";
    for (let i = 0; i < input.length; ++i) {
      if (input.charAt(i) === " ") {
        translationTxt =
          translationTxt.replace(/ $/, "") + this.characterMap[input.charAt(i)];
        translationDisplay =
          translationDisplay.replace(/ $/, "") +
          this.characterMap[input.charAt(i)];
        markedInput += input.charAt(i);
      } else if (this.characterMap[input.charAt(i)]) {
        translationTxt += this.characterMap[input.charAt(i)] + " ";
        translationDisplay += this.characterMap[input.charAt(i)] + " ";
        markedInput += input.charAt(i);
      } else if (this.characterMap[input.charAt(i).toUpperCase()]) {
        translationTxt +=
          this.characterMap[input.charAt(i).toUpperCase()] + " ";
        translationDisplay +=
          this.characterMap[input.charAt(i).toUpperCase()] + " ";
        markedInput += input.charAt(i);
      } else {
        translationTxt += "#undecodable# ";
        //console.log("came here");
        translationDisplay += markErrorRed("#undecodable#") + " ";
        markedInput += markErrorRed(input.charAt(i));
      }
    }
    return { translationTxt, translationDisplay, markedInput };
  },
  translateToEnglish(input) {
    let trailCount = countTrailingSpaces(input);
    input = input.slice(0, input.length - trailCount);
    console.log(trailCount);
    let translationTxt = "";
    let markedInput = "";
    let translationDisplay = "";
    let formattedInput = "";
    const words = input.split("       ");
    console.log("words", words);
    for (let i = 0; i < words.length; ++i) {
      const word = words[i];
      const letters = word.trim().split(" ");
      console.log("letters", letters);
      for (let j = 0; j < letters.length; ++j) {
        const letter = letters[j];
        if (letter.trim() === "") continue;
        if (this.characterMapReverse[letter]) {
          translationTxt += this.characterMapReverse[letter];
          translationDisplay += this.characterMapReverse[letter];
          markedInput += letter;
          formattedInput += letter;
        } else {
          translationTxt += "#undecodable#";
          translationDisplay += markErrorRed("#undecodable#");

          //          isInvalidInput = true;
          //          errList.push(letter);
          markedInput += markErrorRed(letter);
          formattedInput += letter;
        }
        if (j !== letters.length - 1) {
          markedInput += " ";
          formattedInput += " ";
        }
      }
      translationTxt += " ";
      translationDisplay += " ";
      if (i !== words.length - 1) {
        markedInput += "       ";
        formattedInput += "       ";
      }
    }
    markedInput = addTrailingSpaces(markedInput, trailCount);
    formattedInput = addTrailingSpaces(formattedInput, trailCount);
    console.log("my send", {
      translationTxt,
      translationDisplay,
      markedInput,
      formattedInput,
    });
    return { translationTxt, translationDisplay, markedInput, formattedInput }; //;{ translationTxt, isInvalidInput, errList };
  },
  // let literals = input.split(" ").filter(lit => lit);
  // console.log(literals.length, literals);
  // literals.pop();
  // console.log(literals.length, literals);
  // let isInvalidInput = false;
  // const errList = [];
  // literals.forEach((l, i) => {
  //   console.log(i, ":", l);
  // });

  // const translationTxt = literals.reduce((acc, cur, index) => {
  //   if (this.characterMapReverse[cur]) {
  //     acc += this.characterMapReverse[cur];
  //   } else {
  //     acc += "#undecodable# ";
  //     isInvalidInput = true;
  //     errList.push(index);
  //   }
  //   return acc;
  // }, "");
  // console.log(translationTxt, isInvalidInput, errList);
  // return { translationTxt, isInvalidInput, errList };
  // },
};

translator.characterMapReverse = Object.fromEntries(
  Object.entries(translator.characterMap).map((a) => a.reverse())
);
//translator.characterMapReverse[" "] = " ";
// console.log("added space", translator.characterMapReverse[" "], "after");
// for (const [k, v] of Object.entries(translator.characterMapReverse)) {
//   console.log(k, v);
// }

function markErrorRed(input) {
  const errSpan = document.createElement("span");
  errSpan.classList.add("invalid");
  errSpan.append(input);
  return errSpan.outerHTML;
}
