

window.onload = function() {

  let canvas = document.getElementById('flappy-monster-game');

  let flappyMonster = new FlappyMonster(canvas);
  flappyMonster.start();
};
