import { Module } from '../core/module'

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomSize() {
  return Math.floor(Math.random() * 100) + 50; // Random size between 50 and 150
}

function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - 150);
  const y = Math.random() * (window.innerHeight - 150);
  return { x, y };
}

export class ShapeModule extends Module {
  constructor(text) {
    super('shape', text);
  }

  trigger() {
    const size = getRandomSize();
    const color = getRandomColor();
    const position = getRandomPosition();

    const shape = document.createElement('div');
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.backgroundColor = color;
    shape.style.position = 'absolute';
    shape.style.left = `${position.x}px`;
    shape.style.top = `${position.y}px`;
    shape.style.borderRadius = '50%'; // Make it a circle

    document.body.appendChild(shape);

    // Remove the shape after a few seconds
    setTimeout(() => {
      shape.remove();
    }, 3000); // Remove after 3 seconds
  }
}