import { Module } from "../core/module";

export class ClickAnalyticsModule extends Module {
  constructor() {
    super("click_analytics", "Аналитика кликов");
    this.clickCount = 0;
    this.doubleClickCount = 0;
    this.isActive = false;
    this.timer = null;
    this.startTime = 0;
    this.analyticsTime = 3000; // 3 секунды
    this.timerStarted = false;
    this.clicksBeforeStart = 0;
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  trigger() {
    if (this.isActive) return;

    this.isActive = true;
    this.clickCount = 0;
    this.doubleClickCount = 0;
    this.startTime = 0;
    this.timerStarted = false;
    this.clicksBeforeStart = 0;

    this.createStatsContainer();

    document.addEventListener("click", this.handleClick);
    document.addEventListener("dblclick", this.handleDoubleClick);
  }

  createStatsContainer() {
    this.container = document.createElement("div");
    this.container.className = "click-analytics__container";
    document.body.appendChild(this.container);
  }

  handleClick(event) {
    if (!this.isActive) return;

    this.clicksBeforeStart++;

    if (this.clicksBeforeStart === 1) {
      this.updateStats("Остался 1 клик до старта отсчёта");
      return;
    }

    if (!this.timerStarted && this.clicksBeforeStart === 2) {
      this.startTime = Date.now();
      this.timerStarted = true;
      this.startCountdown();
      this.clickCount = 2;
      this.updateStats();
      return;
    }

    if (this.timerStarted) {
      this.clickCount++;
      this.updateStats();
    }
  }

  handleDoubleClick(event) {
    if (!this.isActive) return;

    if (!this.timerStarted) {
      this.clicksBeforeStart += 2;
      if (this.clicksBeforeStart < 2) {
        this.updateStats("Остался 1 клик до старта отсчёта");
        return;
      }
      this.startTime = Date.now();
      this.timerStarted = true;
      this.startCountdown();
      this.doubleClickCount = 1;
      this.clickCount = 0;
      this.updateStats();
      return;
    }

    this.doubleClickCount++;
    this.clickCount -= 2;
    this.updateStats();
  }

  startCountdown() {
    this.timer = setTimeout(() => {
      this.showResults();
      this.cleanup();
    }, this.analyticsTime);

    this.interval = setInterval(() => this.updateStats(), 100);
  }

  updateStats(message) {
    if (this.container) {
      let remainingTime = this.timerStarted
        ? Math.max(
            0,
            Math.ceil(
              (this.analyticsTime - (Date.now() - this.startTime)) / 1000
            )
          )
        : this.analyticsTime / 1000;
      this.container.innerHTML = `
        <div>
          <p>Осталось времени: ${remainingTime} сек</p>
          <p>Кликов: ${this.clickCount} | Двойных кликов: ${
        this.doubleClickCount
      }</p>
          ${message ? `<p>${message}</p>` : ""}
        </div>
      `;
    }
  }

  showResults() {
    if (this.container) {
      this.container.innerHTML = `
        <div style="text-align: center;">
          <h3 style="margin: 0 0 10px 0;">Результаты:</h3>
          <p style="margin: 5px 0;">Одинарных кликов: ${this.clickCount}</p>
          <p style="margin: 5px 0;">Двойных кликов: ${this.doubleClickCount}</p>
          <p style="margin: 5px 0;">Всего кликов: ${
            this.clickCount + this.doubleClickCount * 2
          }</p>
        </div>
      `;
    }
  }

  cleanup() {
    this.isActive = false;
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("dblclick", this.handleDoubleClick);
    if (this.interval) clearInterval(this.interval);

    setTimeout(() => {
      if (this.container) {
        this.container.remove();
      }
    }, 3000);
  }
}
