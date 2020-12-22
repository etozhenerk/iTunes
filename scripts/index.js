"use strict";

import { radioPlayerInit } from "./radioPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";

const playerBtn = document.querySelectorAll(".player-btn"),
  playerBlock = document.querySelectorAll(".player-block"),
  temp = document.querySelector(".temp"),
  btnSection = document.querySelector(".player");

const toggleTabContent = (index) => {
  temp.style.display = "none";
  for (let i = 0; i < playerBlock.length; i++) {
    if (index === i) {
      playerBtn[i].classList.add("active");
      playerBlock[i].classList.add("active");
    } else {
      playerBtn[i].classList.remove("active");
      playerBlock[i].classList.remove("active");
    }
  }
};
btnSection.addEventListener("click", (event) => {
  let target = event.target;
  target = target.closest(".player-btn");
  if (target) {
    playerBtn.forEach((item, i) => {
      if (item === target) {
        toggleTabContent(i);
      }
    });
  }
});

radioPlayerInit();
videoPlayerInit();
musicPlayerInit();
