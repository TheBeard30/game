import { CONFIG } from '../config';
import { Enemy } from './enemy';
import { Player } from './player';

export class Game {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  player: Player;

  enemyList: Enemy[] = [];
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.init();
  }

  init() {
    this.player = new Player(this.ctx, 300, 500);
    const enemy_1 = new Enemy(this.ctx, 30, 40);
    const enemy_2 = new Enemy(this.ctx, 130, 40);
    this.enemyList.push(...[enemy_1, enemy_2]);
  }

  start = () => {
    this.ctx.clearRect(0, 0, CONFIG.PANEL_WIDTH, CONFIG.PANEL_HEIGHT);
    this.player.draw();
    this.enemyList.forEach(e => e.draw());
    window.requestAnimationFrame(this.start);
  };

  close = () => {};

  pause = () => {};

  resume = () => {};
}
