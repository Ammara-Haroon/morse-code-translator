import { translateToMorseCode } from "./js";

describe("Testing Translator from English to Morse Code", () => {
  it("Should return an empty string for an empty string input", () => {
    expect(translateToMorseCode("").translationTxt).toBe("");
  });

  it("Should return same morse code for single letters lowercase or uppercase", () => {
    expect(translateToMorseCode("a").translationTxt).toBe(".-");
    expect(translateToMorseCode("A").translationTxt).toBe(".-");
    expect(translateToMorseCode("c").translationTxt).toBe("-.-.");
    expect(translateToMorseCode("D").translationTxt).toBe("-..");
  });

  it("Should return correct morse code for single digits", () => {
    expect(translateToMorseCode("0").translationTxt).toBe("-----");
    expect(translateToMorseCode("2").translationTxt).toBe("..---");
    expect(translateToMorseCode("5").translationTxt).toBe(".....");
  });

  it("Should return correct morse code for single symbols", () => {
    expect(translateToMorseCode("!").translationTxt).toBe("-.-.--");
    expect(translateToMorseCode(")").translationTxt).toBe("-.--.-");
  });

  it("Should return the correct sequence of morse code separated by space for any sequence of charaters for which morse code exists", () => {
    expect(translateToMorseCode("123bsdjdfjnbx").translationTxt).toBe(
      ".---- ..--- ...-- -... ... -.. .--- -.. ..-. .--- -. -... -..-"
    );
    expect(translateToMorseCode("nkhj2kj22").translationTxt).toBe(
      "-. -.- .... .--- ..--- -.- .--- ..--- ..---"
    );
    expect(translateToMorseCode("nkjshd6786324").translationTxt).toBe(
      "-. -.- .--- ... .... -.. -.... --... ---.. -.... ...-- ..--- ....-"
    );
    expect(translateToMorseCode(")nus73()").translationTxt).toBe(
      "-.--.- -. ..- ... --... ...-- -.--. -.--.-"
    );
  });

  it("Should return 7 spaces for 1 space in any sequence of characters and space combinations", () => {
    expect(translateToMorseCode(" 1").translationTxt).toBe("       .----");
    expect(translateToMorseCode("  1").translationTxt).toBe(
      "              .----"
    );
    expect(translateToMorseCode("1 ").translationTxt).toBe(".----       ");
    expect(translateToMorseCode(" ").translationTxt).toBe("       ");
    expect(translateToMorseCode(" 1  ").translationTxt).toBe(
      "       .----              "
    );
  });

  it("Should add '#undecodable#' to translation for every character for which morse code doesnt exist", () => {
    expect(translateToMorseCode("#").translationTxt).toBe("#undecodable#");
  });
  it("Should return the correct sequence of morse code separated by 1 space for any sequence of charaters for which morse code exists and '#undecodable#' for character for which morse code does not exists", () => {
    expect(translateToMorseCode("12#3bsdjdfjnbx").translationTxt).toBe(
      ".---- ..--- #undecodable# ...-- -... ... -.. .--- -.. ..-. .--- -. -... -..-"
    );
    expect(translateToMorseCode("nkhj2}kj22").translationTxt).toBe(
      "-. -.- .... .--- ..--- #undecodable# -.- .--- ..--- ..---"
    );
    expect(translateToMorseCode("{nkjshd6786324}").translationTxt).toBe(
      "#undecodable# -. -.- .--- ... .... -.. -.... --... ---.. -.... ...-- ..--- ....- #undecodable#"
    );
  });
  it("Should return 7 spaces for 1 space in any sequence of vlid and invalid characters and space combinations", () => {
    expect(translateToMorseCode("12# 3bsdjdfjnbx").translationTxt).toBe(
      ".---- ..--- #undecodable#       ...-- -... ... -.. .--- -.. ..-. .--- -. -... -..-"
    );
    expect(translateToMorseCode("nkhj2}kj 22").translationTxt).toBe(
      "-. -.- .... .--- ..--- #undecodable# -.- .---       ..--- ..---"
    );
    expect(translateToMorseCode("{ nkjshd6 786324 }").translationTxt).toBe(
      "#undecodable#       -. -.- .--- ... .... -.. -....       --... ---.. -.... ...-- ..--- ....-       #undecodable#"
    );
  });
});
