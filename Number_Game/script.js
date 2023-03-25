"use strict";

let score = 20;
let guess;
let number = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;

const resetNumber = function () {
  number = Math.trunc(Math.random() * 20) + 1;
};

// AGAIN BUTTON
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  document.querySelector(".score").textContent = score;
  resetNumber();

  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});

// CHECK BUTTON
document.querySelector(".check").addEventListener("click", function () {
  guess = Number(document.querySelector(".guess").value);
  if (guess < 1 || guess > 20) {
    document.querySelector(".message").textContent =
      "🚫 Enter a number between 1 and 20...";
  }
  if (guess === number) {
    document.querySelector(".number").textContent = number;
    document.querySelector(".message").textContent =
      "🎉 You guessed the number!!!";
    document.querySelector("body").style.backgroundColor = "#168f14";
    document.querySelector(".number").style.width = "30rem";
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== number) {
    score--;
    document.querySelector(".score").textContent = score;
    document.querySelector(".message").textContent =
      guess < number ? "🚫 Number too low... 📉" : "🚫 Number too high... 📈";
  }
  if (score < 1) {
    document.querySelector("body").style.backgroundColor = "red";
    document.querySelector(".message").textContent = "🚫You lost the game!!!";
    document.querySelector(".number").textContent = number;
    document.querySelector(".number").style.width = "30rem";
  }
});
