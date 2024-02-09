window.onload = function () {
    let canvas = document.getElementById("animation-canvas");
    let context = canvas.getContext("2d");
    let ballX = 400;
    let ballY = 300;
    let ballRadius = 30;
    let ballColor = 'orange';
    let changeX = 4;
    let changeY = 4;

    adjustDPI(canvas, context);
    window.requestAnimationFrame(animationLoop);
    // drawRandomColoredRectangle(230, 107, 40, 250);

    function generateRandonColor () {
        let red = randomValue(0, 257);
        let green = randomValue(0, 257);
        let blue = randomValue(0, 257);
        return {r: red, g: green, b: blue};
    }

    function randomValue(min, max) {
        min = Math.ceil(min);
        max = Math.ceil(max);
        return Math.floor(Math.random() * (max-min)) + min;
    }

    let start = new Date();

    function animationLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawRandomColoredRectangle();
        ballX += changeX;
        ballY += changeY;

        if(ballX + ballRadius > canvas.width) changeX *= -1;
        if(ballY + ballRadius > canvas.height) changeY *= -1;
        if(ballX - ballRadius < 0) changeX *= -1;
        if(ballY - ballRadius < 0) changeY *= -1;

        drawBall(ballX, ballY, ballRadius, ballColor);
        window.requestAnimationFrame(animationLoop);
    }

    function drawRandomColoredRectangle() {
        let now = new Date();

        if(now - start >= 1000) {
            start = new Date();
            
            let color = generateRandonColor();
            let fillOpacity = Math.random();
            let fillColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${fillOpacity})`;
            let borderColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

            let x = randomValue(0, canvas.width);
            let y = randomValue(0, canvas.height);
            let w = randomValue(0, canvas.width - x);
            let h = randomValue(0, canvas.height - y);

            context.beginPath();
            context.fillStyle = fillColor;
            context.strokeStyle = borderColor;
            context.rect(x, y, w, h); 
            context.stroke();
            context.fill();
        }
    }

    function adjustDPI(canvas, context) {
        const dpi = window.devicePixelRatio;
        const canvasRect = canvas.getBoundingClientRect();

        canvas.width = canvasRect.width * dpi;
        canvas.height = canvasRect.height * dpi;

        context.scale(dpi, dpi);
    }

    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000/60);
            }
    })();

    function drawBall(x, y, radius, color) {
        let radian = Math.PI / 180;

        context.beginPath();
        context.strokeStyle = color;
        context.fillStyle = color;
        context.arc(x, y, radius, 0, 360 * radian, false);
        context.stroke();
        context.fill();
    }
}