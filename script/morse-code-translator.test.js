import { translateToEnglish } from "./translator.js";

describe("Testing Translator from Morse Code to English", () => {
  it("Should return an empty string for an empty string input", () => {
    expect(translateToEnglish("").translationTxt).toBe("");
  });

  it("Should return English letter or symbol or number for morse code and undecodable if the morse code sequence is incorrect", () => {
    expect(translateToEnglish(".-").translationTxt).toBe("A");
    expect(translateToEnglish("-.-.").translationTxt).toBe("C");
    expect(translateToEnglish("-----").translationTxt).toBe("0");
    expect(translateToEnglish("..---").translationTxt).toBe("2");
    expect(translateToEnglish(".....").translationTxt).toBe("5");
    expect(translateToEnglish("-.-.--").translationTxt).toBe("!");
    expect(translateToEnglish("-----------..").translationTxt).toBe(
      "#undecodable#"
    );
    expect(translateToEnglish("-.--.-").translationTxt).toBe(")");
  });

  it("Should return the correct sequence of characters separated for any sequence of morse code", () => {
    expect(
      translateToEnglish(
        ".---- ..--- ...-- -... ... -.. .--- -.. ..-. .--- -. -... -..-"
      ).translationTxt
    ).toBe("123BSDJDFJNBX");
    expect(
      translateToEnglish("-. -.- .... .--- ..--- -.- .--- ..--- ..---")
        .translationTxt
    ).toBe("NKHJ2KJ22");
    expect(
      translateToEnglish(
        "-. -.- .--- ... .... -.. -.... --... ---.. -.... ...-- ..--- ....-"
      ).translationTxt
    ).toBe("NKJSHD6786324");
    expect(
      translateToEnglish("-.--.- -. ..- ... --... ...-- -.--. -.--.-")
        .translationTxt
    ).toBe(")NUS73()");
  });

  it("Should return 1 space in English for 7 space in morse code in any sequence of valid code and space combinations", () => {
    expect(translateToEnglish("       .----").translationTxt).toBe(" 1");
    expect(translateToEnglish("              .----").translationTxt).toBe(
      "  1"
    );
    expect(translateToEnglish(".----       ").translationTxt).toBe("1 ");
    expect(translateToEnglish("       ").translationTxt).toBe(" ");
    expect(
      translateToEnglish("       .----              ").translationTxt
    ).toBe(" 1  ");
  });

  //
  it("Should return the correct sequence of characters for any sequence of valid morse code and '#undecodable#' for character for which morse code does not exists", () => {
    expect(
      translateToEnglish(
        "........... .---- ..--- ...-- -... ... -.. .--- -.. ..-. .--- -. -... -..-"
      ).translationTxt
    ).toBe("#undecodable#123BSDJDFJNBX");
    expect(
      translateToEnglish(
        "-. -.- .... .--- ........... ..--- -.- .--- ..--- ..---"
      ).translationTxt
    ).toBe("NKHJ#undecodable#2KJ22");
    expect(
      translateToEnglish(
        "-. -.- .--- ........... ... .... -.. -.... --... ........... ....-------... ---.. -.... ...-- ..--- ....- ..........."
      ).translationTxt
    ).toBe("NKJ#undecodable#SHD67#undecodable##undecodable#86324#undecodable#");
    expect(
      translateToEnglish(
        "-.--.- -. ..- ... --... ...-- -.--. -------------- -.--.-"
      ).translationTxt
    ).toBe(")NUS73(#undecodable#)");
  });

  it("Should return 1 space in English for 7 space in morse code in any sequence of valid and invalid code and space combinations", () => {
    expect(
      translateToEnglish(
        ".---- ..--- -.-.-.-.-.-.-.       ...-- -... ... -.. .--- -.. ..-. .--- -. -... -..-"
      ).translationTxt
    ).toBe("12#undecodable# 3BSDJDFJNBX");
    expect(
      translateToEnglish(
        "-. -.- .... .--- ..--- ---------------- -.- .---       ..--- ..---"
      ).translationTxt
    ).toBe("NKHJ2#undecodable#KJ 22");
    expect(
      translateToEnglish(
        "..........---------       -. -.- .--- ... .... -.. -....       --... ---.. -.... ...-- ..--- ....-       .......-------------"
      ).translationTxt
    ).toBe("#undecodable# NKJSHD6 786324 #undecodable#");
  });
});
