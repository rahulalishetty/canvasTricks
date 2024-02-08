window.onload = function () {
    let canvas = document.getElementById("hello-world-canvas");
    let context = canvas.getContext("2d");

    context.beginPath();
    context.strokeStyle = 'blue';
    context.moveTo(30, 70);
    context.lineTo(130, 70);
    context.lineTo(130,120);
    context.lineTo(30, 120);
    context.stroke();
}
