export class Player {
  private ctx: CanvasRenderingContext2D;

  private x: number;

  private y: number;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.init();
  }

  init() {
    this.drawPlayer();
    window.addEventListener('keydown', ev => {
      console.log(ev);
      if (ev.code == 'ArrowUp') {
        this.moveUp();
      }
      if (ev.code == 'ArrowDown') {
        this.moveDown();
      }
      if (ev.code == 'ArrowLeft') {
        this.moveLeft();
      }
      if (ev.code == 'ArrowRight') {
        this.moveRight();
      }
    });
  }

  drawPlayer() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'green';
    this.ctx.arc(this.x, this.y, 50, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  moveLeft() {
    this.x -= 20;
  }

  moveRight() {
    this.x += 20;
  }

  moveUp() {
    this.y -= 20;
  }

  moveDown() {
    this.y += 20;
  }
}
