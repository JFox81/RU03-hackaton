import "./styles.css";
import { ContextMenu } from "./menu.js";
import { TimerMoudle } from "./modules/timer.module.js";
import { PaitingModule } from "./modules/paiting.module.js";
import { BackgroundModule } from "./modules/background.module.js";
import { CustomMessageModule } from "./modules/custom-message.module.js";
import { VladilenModule } from "./modules/vladilen.module.js";
import { ShapeModule } from "./modules/shape.module.js";
import { ClickAnalyticsModule } from "./modules/click-analytics.module.js";

const menu = new ContextMenu("#menu");
const customMessage = new CustomMessageModule();
const timer = new TimerMoudle("count_timer", "Таймер отсчета");
const painting = new PaitingModule("painting", "Граффити-стена");
const backgroundModule = new BackgroundModule();
const vladilenModule = new VladilenModule();
const shapeModule = new ShapeModule("Создать случайную фигуру");
const ClickAnalytics = new ClickAnalyticsModule();

menu.add({
  text: "Считать клики (за 3 секунды)",
  onClick: () => {
    ClickAnalytics.trigger();
  },
});

menu.add({
  text: "Создать случайную фигуру",
  onClick: () => {
    shapeModule.trigger();
  },
});

menu.add({
  text: "Таймер отсчета",
  onClick: () => {
    timer.trigger();
  },
});
menu.add({
  text: "Кастомное сообщение",
  onClick: () => {
    customMessage.trigger();
  },
});

menu.add({
  text: "Случайный фон",
  onClick: () => {
    backgroundModule.trigger();
  },
});
menu.add({
  text: "Only for Vladilen Minin",
  onClick: () => {
    vladilenModule.trigger();
  },
});
menu.add({
  text: "Граффити - стена",
  onClick: () => {
    painting.trigger();
  },
});
