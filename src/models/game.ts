import { Player } from './player';

export class Game {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  player: Player;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.init();
  }

  init() {
    this.player = new Player(this.ctx, 300, 500);
  }

  start = () => {
    this.ctx.clearRect(0, 0, 600, 600);
    this.player.draw();
    window.requestAnimationFrame(this.start);
  };

  close = () => {};

  pause = () => {};

  resume = () => {};
}
