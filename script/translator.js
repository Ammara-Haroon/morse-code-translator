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
    " ": "      ",
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
    let isInvalidInput = false;
    const errList = [];
    for (let i = 0; i < input.length; ++i) {
      if (this.characterMap[input.charAt(i)]) {
        translationTxt += this.characterMap[input.charAt(i)] + " ";
      } else if (this.characterMap[input.charAt(i).toUpperCase()]) {
        translationTxt +=
          this.characterMap[input.charAt(i).toUpperCase()] + " ";
      } else {
        translationTxt += "#undecodable# ";
        isInvalidInput = true;
        errList.push(i);
      }
    }
    return { translationTxt, isInvalidInput, errList };
  },

  translateToEnglish(input) {},
};

translator.characterMapReverse = Object.fromEntries(
  Object.entries(translator.characterMap).map((a) => a.reverse())
);
