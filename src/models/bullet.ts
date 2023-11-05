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

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    let width = 2;
    let height = 4;
    if (this.direction == Direction.left || this.direction == Direction.right) {
      width = 4;
      height = 2;
    }
    this.ctx.rect(this.x, this.y, width, height);
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
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

  isOutBound(): boolean {
    return this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 600;
  }
}
