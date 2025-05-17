import { Menu } from './core/menu.js';

export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector);
    this.init();
  }

  init() {
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      this.open(event.clientX, event.clientY);
    });

    document.body.addEventListener('click', (event) => {
      if (event.target.offsetParent !== this.el) {
        this.close();
      }
    });
  }

  open(x, y) {
    this.el.style.display = 'block';
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
  }

  close() {
    this.el.style.display = 'none';
  }

  add(item) {
    const menuItem = document.createElement('li');
    menuItem.className = 'menu-item';
    menuItem.textContent = item.text;

    if (item.onClick) {
      menuItem.addEventListener('click', () => {
        item.onClick();
        this.close();
      });
    }

    this.el.appendChild(menuItem);
  }
}
