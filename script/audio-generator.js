import { characterMap } from "./translator.js";
const MORSE_CODES = characterMap;
function play_char(gain, dot, time, character) {
  for (let i = 0; i < character.length; i++) {
    switch (character[i]) {
      case ".":
        gain.gain.setValueAtTime(1.0, time);
        time += dot;
        gain.gain.setValueAtTime(0.0, time);
        break;
      case "-":
        gain.gain.setValueAtTime(1.0, time);
        time += 3 * dot;
        gain.gain.setValueAtTime(0.0, time);
        break;
    }
    time += dot;
  }
  return time;
}
export function play(text) {
  let context = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator = context.createOscillator();
  let gain = context.createGain();
  gain.gain.value = 0;
  oscillator.frequency.value = 750;
  oscillator.connect(gain);
  let rate = 20;
  let dot = 1.2 / rate;
  oscillator.start(0);
  gain.connect(context.destination);
  let time = context.currentTime;
  text = text.toUpperCase();
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      time += 3 * dot;
    } else if (MORSE_CODES[text[i]] !== undefined) {
      time = play_char(gain, dot, time, MORSE_CODES[text[i]]);
      time += 2 * dot;
    }
  }
  return time;
}
