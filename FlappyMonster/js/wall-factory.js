function WallFactory(canvas) {
    let factory = this;

    factory.canvas = canvas;
    factory.context = canvas.getContext('2d');

    factory.gap = 200;
    factory.maxGap = 300;
    factory.freq = 1500;
    factory.walls = [];
}

WallFactory.prototype.generateWalls = function() {
    let factory = this;

    setInterval(function() {
        let gap = getRandomInt(factory.gap, factory.maxGap);
        let height = getRandomInt(0, factory.maxGap);

        let wall = new Wall(factory.canvas);
        wall.gap = gap;
        wall.h = height;

        factory.walls.push(wall);
    }, factory.freq);
}