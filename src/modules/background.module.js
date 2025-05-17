import { Module } from '../core/module';

export class BackgroundModule extends Module {
  constructor() {
    super('background', 'Случайный фон');
  }

  trigger() {
    document.body.style.backgroundColor = BackgroundModule.getRandomColor();
  }

  static getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
