import './styles.css';
import { ContextMenu } from './menu.js';

import { TimerMoudle } from './modules/timer.module.js';
import { BackgroundModule } from './modules/background.module.js';

const menu = new ContextMenu('#menu');
const timer = new TimerMoudle('count_timer', 'Таймер отсчета');
const backgroundModule = new BackgroundModule();

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
    timer.trigger();
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
    backgroundModule.trigger();
  },
});
menu.add({
  text: 'Случайный звук',
  onClick: () => {
    console.log('Случайный звук');
  },
});
