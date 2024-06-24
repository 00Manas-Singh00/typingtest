const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".container .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector(".start-button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const para = [
    " Avoid daydreaming about the years to come.",
    "You are the most important person in your whole life.",
    "Always be true to who you are, and ignore what other people have to say about you.",
    "Always be true to who you are, and ignore what other people have to say about you.",
    "Only demonstrate your strength when it’s really required.",
    "Fix your bent antenna, tune it in, and then I'm gonna Enter in and up under your skin like a splinter",
    "Feel the tension soon as someone mentions me Here's my ten cents, my two cents is free A nuisance, who sent?",
  ];

  const randomPara = Math.floor(Math.random() * para.length);
  typingText.innerHTML = "";
  for (const char of para[randomPara]) {
    console.log(char);
    typingText.innerHTML += `<span>${char}</span>`;
  }
}

loadParagraph();
