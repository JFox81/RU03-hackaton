import { Module } from "../core/module";
import { ContextMenu } from '../menu.js';

const menu = new ContextMenu('#menu');

export class PaitingModule extends Module {
  constructor () {
    super('painting','Граффити-стена');
    this.colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    this.tools = ['spray', 'marker', 'neon', 'stencil'];
    this.isDrawing = false;
    this.currentTool = 'spray';
    this.currentColor = '#FF0000';
    this.canvas = null;
    this.ctx = null;
    this.toolPanel = null;
    this.clearButton = null;

    this.startDrawing = this.startDrawing.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    document.addEventListener('contextmenu', this.handleRightClick.bind(this));
  };

  handleRightClick(e) {
    e.preventDefault();
    menu.open(e.clientX, e.clientY);
  };

  trigger() {

    this.cleanup();
    this.createCanvas();
    this.createToolPanel();
    this.setupEventListeners();
    this.addClearButton();
    this.addMenuButton();
  }
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'paiting__canvas';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.append(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  createToolPanel() {
    const panel = document.createElement('div');
    panel.className = 'painting__toolpanel';

    const toolSelect = document.createElement('select');
    this.tools.forEach(tool => {
      const option = document.createElement('option');
      option.value = tool;
      option.textContent = tool;
      toolSelect.appendChild(option);
    });
    toolSelect.addEventListener('change', (e) => {
      this.currentTool = e.target.value;
    });


    const colorSelect = document.createElement('div');
    colorSelect.className = 'color__select';
    this.colors.forEach(color => {
      const colorBtn = document.createElement('button');
      colorBtn.className = 'color__button';
      colorBtn.style.backgroundColor = color;
      colorBtn.addEventListener('click', () => {
        this.currentColor = color;
      });
      colorSelect.appendChild(colorBtn);
    });

    panel.appendChild(toolSelect);
    panel.appendChild(colorSelect);
    document.body.appendChild(panel);
  }


  startDrawing(e) {
    this.isDrawing = true;
    this.draw(e);
  };

  draw = (e) => {
    if (!this.isDrawing) return;

    const x = e.clientX;
    const y = e.clientY;

    switch(this.currentTool) {
      case 'spray':
        this.sprayPaint(x, y);
        break;
      case 'marker':
        this.markerPaint(x, y);
        break;
      case 'neon':
        this.neonPaint(x, y);
        break;
      case 'stencil':
        this.stencilPaint(x, y);
        break;
    }
  };

  stopDrawing = () => {
    this.isDrawing = false;
    this.ctx.beginPath();
  };

  setupEventListeners() {
    this.canvas.addEventListener('mousedown', this.startDrawing);
    this.canvas.addEventListener('mousemove', this.draw);
    this.canvas.addEventListener('mouseup', this.stopDrawing);
    this.canvas.addEventListener('mouseout', this.stopDrawing);
  }

  sprayPaint(x, y) {
    const density = 30;
    const radius = 20;

    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;

      this.ctx.fillStyle = this.currentColor;
      this.ctx.beginPath();
      this.ctx.arc(px, py, Math.random() * 2 + 1, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  markerPaint(x, y) {
    this.ctx.lineWidth = 8;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.currentColor;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  neonPaint(x, y) {
    this.ctx.shadowBlur = 20;
    this.ctx.fillStyle = this.currentColor;
    this.ctx.shadowColor = this.currentColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }

  stencilPaint(x, y) {
    const size = 40;
    const stencils = ['★', '♦', '♠', '♣', '♥', '✈', '☠', '☢'];
    const randomStencil = stencils[Math.floor(Math.random() * stencils.length)];

    this.ctx.font = `${size}px Arial`;
    this.ctx.fillStyle = this.currentColor;
    this.ctx.fillText(randomStencil, x - size / 2, y + size / 2);
  }

  addClearButton() {
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear__button';
    clearBtn.textContent = 'Очистить';

    clearBtn.addEventListener('click', () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    });

    document.body.appendChild(clearBtn);
  };

  addMenuButton () {
    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu__button';
    menuBtn.textContent = 'Выйти';

    menuBtn.addEventListener('click', () => {
        this.cleanup();
        menu.open();
    });
    document.body.appendChild(menuBtn);
  }
  cleanup() {
    if (this.canvas) {
      this.canvas.remove();
    }
      document.querySelectorAll('.painting__toolpanel, .clear__button, .menu__button').forEach(el => el.remove());
  }
}