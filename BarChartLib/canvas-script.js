
window.onload = function() {
    let min = 1;
    let max = 200;

    let data = [
        {label: 'Jan', value: randomValue(min, max)},
        {label: 'Feb', value: randomValue(min, max)},
        {label: 'March', value: randomValue(min, max)},
        {label: 'April', value: randomValue(min, max)},
        {label: 'May', value: randomValue(min, max)}
    ];

    function randomValue(min, max) {
        min = Math.ceil(min);
        max = Math.ceil(max);
        return Math.floor(Math.random() * (max-min)) + min;
    }

    let targetId = 'chart';
    let canvasWidth = 600;
    let canvasHeight = 450;

    let chart = new BarChart(targetId, canvasWidth, canvasHeight, data);

}