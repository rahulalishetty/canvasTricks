
function GameScore(canvas) {
    let score = this;

    score.canvas = canvas;
    score.context = canvas.getContext('2d');
    
    score.start = new Date();
    score.score = 0;
    score.x = 0;
    score.y = 0;
}

GameScore.prototype.draw = function() {
    let score = this;

    let draw = new Date();

    score.score = parseFloat((draw - score.start) / 1000).toFixed(1);
    score.context.font = '45px Verdana';
    score.context.fillText(score.score, score.x, score.y);
}