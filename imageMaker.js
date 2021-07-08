// const { inspect } = require('util');
const fs = require('fs');
const { createCanvas } = require('canvas');
const data = require('./data');

function makeImages() {
  data.map((element) => {
    const atomicNum = String(element.atomicNumber).padStart(3, '0');
    const elementName = element.name.toLowerCase();

    const width = 250;
    const height = 250;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.fillStyle = '#FFF';
    context.strokeStyle = '#FFF';

    context.beginPath();
    context.arc(125, 125, 125, 0, 2 * Math.PI);
    context.stroke();
    const buffer = canvas.toBuffer('image/png');

    fs.writeFile(`${atomicNum}_${elementName}.jpg`, buffer, (err) => {
      if (err) throw err;
      console.log(`${element.name} file is created successfully.`);
    });
    return element;
  });
}

makeImages();
