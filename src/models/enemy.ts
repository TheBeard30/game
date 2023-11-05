import { CONFIG } from '../config';
import { Direction } from '../types';

export class Enemy {
  private x: number = 0;

  private y: number = 0;

  private direction: Direction = Direction.down;

  speed: number = CONFIG.ENEMY_SPEED;

  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'pink';

    this.ctx.rect(this.x, this.y, 30, 40);
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  move() {
    const map = {
      [Direction.up]: this.moveUp,
      [Direction.right]: this.moveRight,
      [Direction.down]: this.moveDown,
      [Direction.left]: this.moveLeft
    };

    const fn = map[this.direction];

    fn();
  }

  moveLeft = () => {
    this.direction = Direction.left;
    this.x -= this.speed;
  };

  moveRight = () => {
    this.direction = Direction.right;
    this.x += this.speed;
  };

  moveUp = () => {
    this.direction = Direction.up;
    this.y -= this.speed;
  };

  moveDown = () => {
    this.direction = Direction.down;
    this.y += this.speed;
  };
}
