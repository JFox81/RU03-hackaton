import './styles.css';
import { ContextMenu } from './menu.js';

const menu = new ContextMenu('#menu');

menu.add({
  text: 'Считать клики (за 3 секунды)',
  onClick: () => {
    console.log('Считать клики (за 3 секунды)');
  },
});

menu.add({
  text: 'Создать фигуру',
  onClick: () => {
    console.log('Создать фигуру');
  },
});
menu.add({
  text: 'Таймер отсчета',
  onClick: () => {
    console.log('Таймер отсчета');
  },
});
menu.add({
  text: 'Кастомное сообщение',
  onClick: () => {
    console.log('Кастомное сообщение');
  },
});

menu.add({
  text: 'Случайный фон',
  onClick: () => {
    console.log('Случайный фон');
  },
});
menu.add({
  text: 'Случайный звук',
  onClick: () => {
    console.log('Случайный звук');
  },
});
