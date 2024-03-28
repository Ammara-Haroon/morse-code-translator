import { translator } from "./translator.js";

describe("Testing Translator from English to Morse Code", () => {
  it("Should return an empty string for an empty string input", () => {
    expect(translator.translateToMorseCode("").translationTxt).toBe("");
  });

  it("Should return same morse code for single letters lowercase or uppercase", () => {
    expect(translator.translateToMorseCode("a").translationTxt).toBe(".-");
    expect(translator.translateToMorseCode("A").translationTxt).toBe(".-");
    expect(translator.translateToMorseCode("c").translationTxt).toBe("-.-.");
    expect(translator.translateToMorseCode("D").translationTxt).toBe("-..");
  });

  it("Should return correct morse code for single digits", () => {
    expect(translator.translateToMorseCode("0").translationTxt).toBe("-----");
    expect(translator.translateToMorseCode("2").translationTxt).toBe("..---");
    expect(translator.translateToMorseCode("5").translationTxt).toBe(".....");
  });

  it("Should return correct morse code for single symbols and if the symbol does not have a morse code it should return '#undecodable#'", () => {
    expect(translator.translateToMorseCode("!").translationTxt).toBe("-.-.--");
    expect(translator.translateToMorseCode("#").translationTxt).toBe(
      "#undecodable#"
    );
    expect(translator.translateToMorseCode(")").translationTxt).toBe("-.--.-");
  });

  it("Should return the correct sequence of morse code separated by space for any sequence of charaters for which morse code exists", () => {
    expect(
      translator.translateToMorseCode("123bsdjdfjnbx").translationTxt
    ).toBe(".---- ..--- ...-- -... ... -.. .--- -.. ..-. .--- -. -... -..-");
    expect(translator.translateToMorseCode("nkhj2kj22").translationTxt).toBe(
      "-. -.- .... .--- ..--- -.- .--- ..--- ..---"
    );
    expect(
      translator.translateToMorseCode("nkjshd6786324").translationTxt
    ).toBe(
      "-. -.- .--- ... .... -.. -.... --... ---.. -.... ...-- ..--- ....-"
    );
    expect(translator.translateToMorseCode(")nus73()").translationTxt).toBe(
      "-.--.- -. ..- ... --... ...-- -.--. -.--.-"
    );
  });

  it("Should return the correct sequence of morse code separated by 1 space for any sequence of charaters for which morse code exists and '#undecodable#' for character for which morse code does not exists", () => {
    expect(
      translator.translateToMorseCode("12#3bsdjdfjnbx").translationTxt
    ).toBe(
      ".---- ..--- #undecodable# ...-- -... ... -.. .--- -.. ..-. .--- -. -... -..-"
    );
    expect(translator.translateToMorseCode("nkhj2}kj22").translationTxt).toBe(
      "-. -.- .... .--- ..--- #undecodable# -.- .--- ..--- ..---"
    );
    expect(
      translator.translateToMorseCode("{nkjshd6786324}").translationTxt
    ).toBe(
      "#undecodable# -. -.- .--- ... .... -.. -.... --... ---.. -.... ...-- ..--- ....- #undecodable#"
    );
  });

  it("Should return 7 spaces for 1 space in any sequence of characters and space combinations", () => {
    expect(translator.translateToMorseCode(" 1").translationTxt).toBe(
      "       .----"
    );
    expect(translator.translateToMorseCode("  1").translationTxt).toBe(
      "              .----"
    );
    expect(translator.translateToMorseCode("1 ").translationTxt).toBe(
      ".----       "
    );
    expect(translator.translateToMorseCode(" ").translationTxt).toBe("       ");
    expect(translator.translateToMorseCode(" 1  ").translationTxt).toBe(
      "       .----              "
    );
    expect(
      translator.translateToMorseCode("12# 3bsdjdfjnbx").translationTxt
    ).toBe(
      ".---- ..--- #undecodable#       ...-- -... ... -.. .--- -.. ..-. .--- -. -... -..-"
    );
    expect(translator.translateToMorseCode("nkhj2}kj 22").translationTxt).toBe(
      "-. -.- .... .--- ..--- #undecodable# -.- .---       ..--- ..---"
    );
    expect(
      translator.translateToMorseCode("{ nkjshd6 786324 }").translationTxt
    ).toBe(
      "#undecodable#       -. -.- .--- ... .... -.. -....       --... ---.. -.... ...-- ..--- ....-       #undecodable#"
    );
  });
});
