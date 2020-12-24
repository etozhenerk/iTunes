"use strict";

import { radioPlayerInit } from "./radioPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";

const playerBtn = document.querySelectorAll(".player-btn"),
  playerBlock = document.querySelectorAll(".player-block"),
  temp = document.querySelector(".temp"),
  btnSection = document.querySelector(".player");

const deactivationPlayer = () => {
  temp.style.display = "none";
  playerBtn.forEach(item => item.classList.remove('active'));
  playerBlock.forEach(item => item.classList.remove('active'));

  radioPlayerInit.stop();
  videoPlayerInit.stop();
  musicPlayerInit.stop();
};

btnSection.addEventListener("click", (event) => {
  let target = event.target;
  target = target.closest(".player-btn");
  if (target) {
    playerBtn.forEach((item, i) => {
      if (item === target) {
        deactivationPlayer();
        item.classList.add('active');
        playerBlock[i].classList.add('active');
      }
    });
  }
});

radioPlayerInit();
videoPlayerInit();
musicPlayerInit();
