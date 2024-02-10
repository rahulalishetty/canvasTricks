
const GAME_STATE = {
    INITIAL: 1,
    PLAYING: 2,
    OVER: 3
}

const KEY_CODE = {
    R: 82
}

function FlappyMonster(canvas) {
    let game = this;

    game.canvas = canvas;
    game.context = canvas.getContext('2d');

    game.currentState = GAME_STATE.INITIAL;

    //game speed
    game.speed = 5;

    game.bindEvents();
    game.createObjects();
}

FlappyMonster.prototype.start = function() {
    let game = this;

    // start game
    window.requestAnimationFrame(function() {
        game.gameLoop();
    });
}

FlappyMonster.prototype.bindEvents = function() {
    let game = this;

    game.canvas.addEventListener('click', function(event) {
        switch(game.currentState) {
            case GAME_STATE.INITIAL:
                game.currentState = GAME_STATE.PLAYING;
                game.wallFacory.generateWalls();
                break;
            
            case GAME_STATE.PLAYING:
                game.monster.vy = -1 * game.speed;
                break;
            
            default: 
                break;
        }
    });

    window.addEventListener('keydown', function(event) {
        switch(game.currentState) {
            case GAME_STATE.OVER:
                if(event.keyCode === KEY_CODE.R) {
                    game.reset();
                    game.currentState = GAME_STATE.INITIAL;
                }
                break;
        }
    });
}

FlappyMonster.prototype.reset = function() {
    let game = this;

    game.gameScore.start = new Date();
    game.gameScore.score = 0;
    game.wallFacory.walls = [];
    game.monster.x = 115;
    game.monster.y = 115;
}

FlappyMonster.prototype.createObjects = function () {
    let game = this;

    game.background = new GameBackground('images/back.png', game.canvas);
    game.backupBackground = new GameBackground('images/back.png', game.canvas);
    game.backupBackground.x = game.canvas.width;

    game.gameScore = new GameScore(game.canvas);
    game.gameScore.x = game.canvas.width - 150;
    game.gameScore.y = 80;

    game.wallFacory = new WallFactory(game.canvas);

    game.monster = new Monster('images/monster.png', game.canvas);

}

FlappyMonster.prototype.gameLoop = function() {
    let game = this;

    switch(game.currentState) {
        case GAME_STATE.INITIAL:
            game.drawInitialScreen();
            break;
        
        case GAME_STATE.PLAYING:
            game.drawPlayingScreen();
            break;
        
        case GAME_STATE.OVER:
            game.drawOverScreen();
            break;
        
        default: 
            break;
    }

    window.requestAnimationFrame(function() {
        game.gameLoop();
    });
}

FlappyMonster.prototype.drawInitialScreen = function() {
    let game = this;

    //background
    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    game.context.fillStyle = 'white';
    game.context.font = '36px Arial';
    game.context.fillText('Click to start', game.canvas.width/2 - 100, game.canvas.height/2);
}

FlappyMonster.prototype.drawPlayingScreen = function() {
    let game = this;

    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

    game.animateBackground();

    game.gameScore.draw();

    game.drawWalls();

    game.monster.draw();

    game.checkCollisions();
}

FlappyMonster.prototype.checkCollisions = function() {
    let game = this;

    let walls = game.wallFacory.walls;

    for(let i=0;i<walls.length;i++) {
        if(game.isCollided(game.monster, walls[i])) {
            game.currentState = GAME_STATE.OVER;
        }
    }
}

FlappyMonster.prototype.isCollided = function(monster, wall) {
    let game = this;
    let isCollided = true;

    let monsterTop = game.monster.y;
    let monsterBottom = game.monster.y+game.monster.h;
    let monsterRight = game.monster.x + game.monster.w;
    let monsterLeft = game.monster.x;

    let wallTop = wall.y + wall.h + wall.gap;
    let wallBottom = wall.y + wall.h;
    let wallRight = wall.x + wall.w;
    let wallLeft = wall.x;

    if((monsterBottom < wallTop && monsterTop > wallBottom)
        || (monsterLeft > wallRight)
        || (monsterRight < wallLeft)
    ) {
        isCollided = false;
    }

    return isCollided;
}

FlappyMonster.prototype.drawWalls = function() {
    let game = this;

    let walls = game.wallFacory.walls;

    for(let i=0;i<walls.length;i++) {
        walls[i].draw();
        walls[i].x = walls[i].x - game.speed;
    }

    game.removeExtraWalls();
}

FlappyMonster.prototype.removeExtraWalls = function() {
    let game = this;

    let walls = game.wallFacory.walls;

    for(let i=0;i<walls.length;i++) {
        if(walls[i].x + walls[i].w < 0) {
            walls.shift();
        }
    }
}

FlappyMonster.prototype.animateBackground = function() {
    let game = this;

    //background
    game.background.draw();

    if(Math.abs(game.background.x) > game.canvas.width) {
        game.background.x = game.canvas.width - game.speed;
    }

    game.background.x = game.background.x - game.speed;

    //backup background 
    game.backupBackground.draw();

    if(Math.abs(game.backupBackground.x) > game.canvas.width) {
        game.backupBackground.x = game.canvas.width - game.speed;
    }
    
    game.backupBackground.x = game.backupBackground.x - game.speed;
}

FlappyMonster.prototype.drawOverScreen = function() {
    let game = this;

    //background
    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    game.context.fillStyle = 'white';
    game.context.font = '36px Arial';
    game.context.fillText(`Score: ${game.gameScore.score}s GAME OVER`, game.canvas.width/2 - 200, game.canvas.height/2);
}
