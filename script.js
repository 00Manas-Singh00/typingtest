const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".container .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistakes span");
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
    " n the forest of whispered dreams, where the trees hummed secrets to the stars, a peculiar creature named Quilliam danced under the moonlight. Quilliam had a coat of shimmering scales that changed color with each heartbeat, reflecting the emotions of the ancient oaks around him. ",
    "Tonight, the oaks whispered of forgotten tales and lost wishes, their leaves rustling like pages turning in the breeze. Quilliam twirled and leaped, his laughter echoing through the glade, as fireflies joined his dance, weaving trails of light in the soft, cool air",
    "Lemonade elephants galloped through sparkly rainbows chasing polka dot harmonicas in waltzing galaxies where bubblegum mountains hummed disco anthems to sleepy llamas dreaming of upside-down raindrops",
    "The purple pineapple danced swiftly on fluffy clouds while whispering pancakes giggled melodiously under moonlit spoons",
    "a solitary owl hooted softly, its eyes bright with the wisdom of centuries. And so, beneath the velvet sky, the night spun its tale of magic and wonder, wrapping the world in a blanket of enchantment",
    "Fix your bent antenna, tune it in, and then I'm gonna Enter in and up under your skin like a splinter",
    "Feel the tension soon as someone mentions me Here's my ten cents, my two cents is free A nuisance, who sent?",
    "In the shimmering cheeseburger of eternity, octopus socks harmonized with twinkling submarines, juggling moonlight and rubber ducks in synchronized confusion",
    "Marshmallow elephants tap-danced on fluffy volcanoes, serenading polka dot penguins with kazoo symphonies jellybean clouds somersaulted over rainbow waterfalls while dandelion whispers tickled the ears of whispering strawberries",
    "Sapphire unicorn pineapple jazz explosion shimmering nebula cookie avalanche rocket kangaroo disco fever mystery banana galaxy whirlwind mermaid spaceship labyrinth harmonica wizard avalanche labyrinth moonlight chocolate thunderstorm",
  ];

  const randomPara = Math.floor(Math.random() * para.length);
  typingText.innerHTML = "";
  for (const char of para[randomPara]) {
    // console.log(char);
    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => {
    input.focus();
  });
}

function initTyping() {
  const char = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);
  if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = true;
    }

    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add("correct");
    } else {
      mistake++;
      char[charIndex].classList.add("incorrect");
    }
    charIndex++;
    char[charIndex].classList.add("active");
    mistakes.innerHTML = `<span>${mistake}</span>`;
    cpm.innerText = charIndex - mistake;
  } else {
    clearInterval(timer);
    input.value = "";
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    let wpmVal = Math.round(
      ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm.innerText = wpmVal;
  } else {
    clearInterval(timer);
  }
}

input.addEventListener("input", initTyping);
loadParagraph();
