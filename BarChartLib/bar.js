/**
 * 
 * bar.js
 * simple, elegant bar chart library
 * {data} - version 1.0
 * {url}
 * 
 * Copyright 2024 Rahul Alishetty
 * Released under the MIT License
 * {license url}
 * 
 */

'use strict';

function BarChart(targetId, width, height, data) {
    let chart = this;

    // specify configurations
    chart.configureChart(targetId, width, height, data);

    // pre operations
    chart.performPreOperations();

    chart.drawChart();
}

BarChart.prototype.configureChart = function(targetId, width, height, data) {
    let chart = this;

    // canvas specifications
    chart.setCanvasParameters(targetId, width, height, data);

    // chart specifications
    chart.setChartParameters(targetId, width, height, data);
}

BarChart.prototype.setCanvasParameters = function(targetId, width, height, data) {
    let chart = this;

    // canvas specifications
    chart.id = targetId;
    chart.width = width;
    chart.height = height;
    chart.data = data;
}

BarChart.prototype.setChartParameters = function() {
    let chart = this;

    // chart specifications
    chart.axeRatio = 10;
    chart.verticalMargin = (chart.height * chart.axeRatio) / 100;
    chart.horizontalMargin = (chart.width * chart.axeRatio) / 100;
    chart.axeColor = '#b1b1b1';
    chart.axeWidth = 0.75;

    // label configurations
    chart.fontRatio = 3;
    chart.fontStyle = 'normal';
    chart.fontFamily = 'times';
    chart.fontColor = '#666';
    chart.fontWeight = 300;
    chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
    chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;

    // guideline configurations
    chart.guidelineColor = '#e5e5e5';
    chart.guidelineWidth = 0.5;
}

BarChart.prototype.performPreOperations = function () {
    let chart = this;

    // create canvas
    chart.createCanvas();

    // get data
    chart.handleData();

    chart.prepareData();
}

BarChart.prototype.createCanvas = function () {
    let chart = this;

    let canvas = document.createElement('canvas');
    canvas.id = chart.id + '-' + Math.random();
    canvas.width = chart.width;
    canvas.height = chart.height;

    document.getElementById(chart.id).innerHTML = '';
    document.getElementById(chart.id).appendChild(canvas);

    chart.canvas = canvas;
    chart.context = canvas.getContext('2d');
}

BarChart.prototype.handleData = function () {
    let chart = this;

    chart.labels = [];
    chart.values = [];

    chart.data.forEach(function(item) {
        chart.labels.push(item.label);
        chart.values.push(item.value);
    });
}

BarChart.prototype.prepareData = function () {
    let chart = this;

    chart.totalItems = chart.data.length;
    chart.maxValue = Math.max.apply(null, chart.values);
    chart.minValue = Math.min.apply(null, chart.values);

    chart.verticalAxeWidth = chart.height - 2 * chart.verticalMargin;
    chart.horizontalAxeWidth = chart.width - 2 * chart.horizontalMargin;

    chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
    chart.verticalLabelFreq = chart.verticalUpperBound / chart.totalItems;
    chart.horizontalLabelFreq = chart.horizontalAxeWidth / chart.totalItems;
}

BarChart.prototype.drawChart = function () {
    let chart = this;

    chart.drawVerticalAxis();
    chart.drawVerticalLables();
    chart.drawHorizontalAxis();
    chart.drawHorizontalLabels();
    chart.drawHorizontalGuideLines();
    chart.drawBars();
}

BarChart.prototype.drawVerticalAxis = function () {
    let chart = this;

    chart.context.beginPath();
    chart.context.strokeStyle = chart.axeColor;
    chart.context.lineWidth = chart.axeWidth;
    chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
    chart.context.lineTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
    chart.context.stroke();
}

BarChart.prototype.drawHorizontalAxis = function () {
    let chart = this;

    chart.context.beginPath();
    chart.context.strokeStyle = chart.axeColor;
    chart.context.lineWidth = chart.axeWidth;
    chart.context.moveTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
    chart.context.lineTo(chart.width - chart.horizontalMargin, chart.height - chart.verticalMargin);
    chart.context.stroke();
}

BarChart.prototype.drawVerticalLables = function () {
    let chart = this;

    let labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily;
    chart.context.font = labelFont;
    chart.context.fillStyle = chart.fontColor;
    chart.context.textAlign = 'right';

    // scaling chart
    let scaledVerticalLabelFreq = (chart.verticalAxeWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;

    for(let i=0;i<=chart.totalItems;i++) {
        let labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq;
        let verticalLabelX = chart.horizontalMargin;
        let verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq;

        chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
    }

}

BarChart.prototype.drawHorizontalLabels = function () {
    let chart = this;

    let labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily;
    chart.context.font = labelFont;
    chart.context.fillStyle = chart.fontColor;
    chart.context.textAlign = 'right';
    chart.context.textBaseline = 'top';

    for(let i=0;i<chart.totalItems;i++) {
        let horizontalLabelX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq;
        let horizontalLabelY = chart.height - chart.verticalMargin + chart.verticalMargin / chart.axeRatio;

        chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);
    }
}

BarChart.prototype.drawHorizontalGuideLines = function () {
    let chart = this;

    chart.context.strokeStyle = chart.guidelineColor;
    chart.context.lineWidth = chart.guidelineWidth;

    // scaling chart
    let scaledVerticalLabelFreq = (chart.verticalAxeWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;

    for(let i=0;i<=chart.totalItems;i++) {
        let horizontalGuidelineStartX = chart.horizontalMargin;
        let horizontalGuidelineStartY = chart.verticalMargin + i * scaledVerticalLabelFreq;

        let horizontalGuidelineEndX = chart.horizontalMargin + chart.horizontalAxeWidth;
        let horizontalGuidelineEndY = chart.verticalMargin + i * scaledVerticalLabelFreq;

        chart.context.beginPath();
        chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
        chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
        chart.context.stroke();
    }
}

BarChart.prototype.drawBars = function () {
    let chart = this;

    for(let i=0;i<chart.totalItems;i++) {
        let color = chart.generateRandonColor();
        let fillOpacity = '0.3';
        let fillColor = `rgba(${color.r},${color.g},${color.b},${fillOpacity})`;
        let borderColor = `rgba(${color.r},${color.g},${color.b})`;

        chart.context.beginPath();

        let barX = chart.horizontalMargin + i * this.horizontalLabelFreq + chart.horizontalLabelFreq / chart.axeRatio;
        let barY = chart.height - chart.verticalMargin;
        let barWidth = chart.horizontalLabelFreq - 2 * chart.horizontalLabelFreq / chart.axeRatio;
        let barHeight = -1 * chart.verticalAxeWidth * chart.values[i] / chart.maxValue;

        chart.context.fillStyle = fillColor;
        chart.context.strokeStyle = borderColor;
        chart.context.rect(barX, barY, barWidth, barHeight);
        chart.context.stroke();
        chart.context.fill();
    }

}

BarChart.prototype.generateRandonColor = function () {
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