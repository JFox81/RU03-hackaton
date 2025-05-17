import {Module} from '../core/module';

export class TimerMoudle extends Module {
  createTimerElements() {
    this.body = document.body;
    this.input = document.createElement('input');
    this.form = document.createElement('form');
    this.button = document.createElement('button');
    this.container = document.createElement('div');
    this.container.className = 'timer__container';
    this.counter = document.createElement('div');

    this.input.className = 'timer';
    this.input.placeholder = 'Введите число от 1 до 10';
    this.input.type = 'number';
    this.input.min = '1';
    this.input.max = '10';


    this.button.textContent = 'Старт отсчета';
    this.button.className = 'timer__btn';
    this.button.type = 'submit';

    this.counter.textContent = '10';
    this.counter.className = 'timer__counter';
    this.counter.style.display = 'none';

    this.form.append(this.input, this.button);
    this.container.append(this.form, this.counter);
    this.body.append(this.container);
  }

  trigger() {
    this.createTimerElements();
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      if (this.input.value) {
        this.counter.textContent = this.input.value;
        this.form.style.display = 'none';
        this.counter.style.display = 'block';

        let count = +this.input.value;
        const timeOutstanding = setInterval( () => {
          count--;
          this.counter.textContent = `${count}`;
          if (count === 0) {
              clearInterval(timeOutstanding);
              setTimeout(() => {
                  alert('Время вышло');
                  this.counter.remove();
              }, 1000);
          }
      }, 1000);
      }
    });
  }
}