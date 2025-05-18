import { Module } from '../core/module.js';

export class VladilenModule extends Module {
  constructor() {
    super('vladilen', 'Only for Vladilen Minin');
    this.numbers = [];
    this.isActive = false;
    this.audio = new Audio(
      'https://downloader.disk.yandex.ru/disk/1d2927b1d6b9c02af15cd886676a93dbd69d890b8924bc4c85e9c5b683ee6e8c/6829f3c5/OZ5j_x7_E1SW5M0kjVNR7zZiH84-6VaRbspgQeuvdFyf5ZaqHBJazcUS6F-v5aFhRn8SwQ6rnrCfjwUovI3DMw%3D%3D?uid=0&filename=only_minin.mp3&disposition=attachment&hash=APpsJSgMIGeAXpVYzti4%2BvK017rDgbaRPVnwab0oG55eO4pfbmd%2B35Z2UyRKYm4hq/J6bpmRyOJonT3VoXnDag%3D%3D&limit=0&content_type=audio%2Fmpeg&owner_uid=309255373&fsize=655127&hid=29993ec1c08a2df8baaf487506ca1b84&media_type=audio&tknv=v3'
    );
    this.audio.loop = true;
  }

  trigger() {
    if (this.isActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  activate() {
    this.isActive = true;
    this.audio.play();
    this.createGradientAnimation();
    this.createNumbers();
    this.createExitButton();
  }

  deactivate() {
    this.isActive = false;
    this.audio.pause();
    this.audio.currentTime = 0;
    document.body.style.background = '';
    this.numbers.forEach((num) => num.element.remove());
    this.numbers = [];
    const exitBtn = document.querySelector('.vladilen-exit');
    if (exitBtn) exitBtn.remove();
  }

  createGradientAnimation() {
    let hue = 0;
    let lastTime = 0;
    const speed = 0.05;

    const animate = (currentTime) => {
      if (!this.isActive) return;

      if (currentTime - lastTime > 16) {
        hue = (hue + speed) % 360;
        document.body.style.background = `linear-gradient(${hue}deg, 
          hsl(${hue}, 40%, 45%), 
          hsl(${(hue + 60) % 360}, 40%, 45%),
          hsl(${(hue + 120) % 360}, 40%, 45%))`;
        lastTime = currentTime;
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  createRandomPosition() {
    const padding = 20;
    return {
      x: padding + Math.random() * (window.innerWidth - padding * 2),
      y: padding + Math.random() * (window.innerHeight - padding * 2),
    };
  }

  removeNumber(number) {
    number.element.style.opacity = '0';
    number.element.style.transform = `translate(-50%, -50%) scale(0)`;
    setTimeout(() => {
      if (number.element && number.element.parentNode) {
        number.element.remove();
      }
      this.numbers = this.numbers.filter((n) => n !== number);
    }, 1000);
  }

  createNumbers() {
    const createNumber = () => {
      if (!this.isActive) return;

      const position = this.createRandomPosition();
      const number = document.createElement('div');
      number.textContent = '42';
      number.style.position = 'fixed';
      number.style.color = 'white';
      number.style.fontSize = '20px';
      number.style.fontWeight = 'bold';
      number.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
      number.style.zIndex = '1000';
      number.style.transition = 'all 0.5s ease-in-out';
      number.style.opacity = '0';
      number.style.left = `${position.x}px`;
      number.style.top = `${position.y}px`;
      number.style.transform = 'translate(-50%, -50%) scale(0)';

      document.body.appendChild(number);

      // Плавное появление
      setTimeout(() => {
        number.style.opacity = '1';
        number.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 50);

      // Случайная начальная фаза анимации
      const startPhase = Math.random() * Math.PI * 2;
      const speed = 0.015 + Math.random() * 0.01;

      const numberObj = {
        element: number,
        phase: startPhase,
        speed: speed,
        position: position,
      };

      this.numbers.push(numberObj);

      // Анимация масштабирования
      const animate = () => {
        if (!this.isActive) return;
        if (!numberObj.element) return;

        numberObj.phase += numberObj.speed;
        // Масштабирование от 1 (20px) до 2.75 (55px)
        const scale = 1 + Math.sin(numberObj.phase) * 1.75;
        numberObj.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
        requestAnimationFrame(animate);
      };
      animate();

      // Случайное исчезновение
      const lifeTime = Math.random() * 2000 + 2000;
      setTimeout(() => {
        if (this.isActive && numberObj.element) {
          this.removeNumber(numberObj);
          setTimeout(createNumber, Math.random() * 100);
        }
      }, lifeTime);
    };

    // Создаем начальные числа
    for (let i = 0; i < 100; i++) {
      setTimeout(createNumber, i * 20);
    }

    // Периодически добавляем новые числа
    const addNewNumbers = () => {
      if (!this.isActive) return;
      createNumber();
      setTimeout(addNewNumbers, Math.random() * 200 + 100);
    };
    setTimeout(addNewNumbers, 2000);
  }

  createExitButton() {
    const button = document.createElement('button');
    button.textContent = 'Выйти';
    button.className = 'vladilen-exit';
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '20px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    button.style.border = '2px solid white';
    button.style.borderRadius = '5px';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    button.style.zIndex = '2000';
    button.style.transition = 'all 0.3s ease';

    // Анимация подсветки
    let opacity = 0.2;
    let increasing = true;
    const animate = () => {
      if (!this.isActive) return;
      if (increasing) {
        opacity += 0.005;
        if (opacity >= 0.8) increasing = false;
      } else {
        opacity -= 0.005;
        if (opacity <= 0.2) increasing = true;
      }
      button.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      requestAnimationFrame(animate);
    };
    animate();

    button.addEventListener('click', () => this.deactivate());
    document.body.appendChild(button);
  }
}
