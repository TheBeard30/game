import { CONFIG } from '../config';
import { Direction } from '../types';

export class Bullet {
  private x: number = 0;

  private y: number = 0;

  private direction: Direction;

  speed: number = CONFIG.BULLET_SPEED;

  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, direction: Direction) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    this.ctx.rect(this.x, this.y, 2, 4);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
    this.move();
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
    this.x -= this.speed;
  };

  moveRight = () => {
    this.x += this.speed;
  };

  moveUp = () => {
    this.y -= this.speed;
  };

  moveDown = () => {
    this.y += this.speed;
  };
}
