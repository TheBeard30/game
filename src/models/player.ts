import { Direction } from '../types';
import { Bullet } from './bullet';

export class Player {
  private ctx: CanvasRenderingContext2D;

  private x: number;

  private y: number;

  private direction: Direction = Direction.up;

  private bulletList: Bullet[] = [];

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.init();
  }

  init() {
    this.draw();
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
      if (ev.code == 'KeyJ') {
        this.shoot();
      }
    });
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'green';
    this.ctx.arc(this.x, this.y, 30, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
    this.drawBullet();
  }

  drawBullet() {
    this.destoryBullet();
    this.bulletList.forEach(b => b.draw());
  }

  destoryBullet() {
    // 边界处理
  }

  moveLeft() {
    this.direction = Direction.left;
    this.x -= 20;
  }

  moveRight() {
    this.direction = Direction.right;
    this.x += 20;
  }

  moveUp() {
    this.direction = Direction.up;
    this.y -= 20;
  }

  moveDown() {
    this.direction = Direction.down;
    this.y += 20;
  }

  shoot() {
    let x = this.x;
    let y = this.y;
    const map = {
      [Direction.up]: (x, y) => {
        y -= 30;
        return [x, y];
      },
      [Direction.down]: (x, y) => {
        y += 30;
        return [x, y];
      },
      [Direction.left]: (x, y) => {
        x -= 30;
        return [x, y];
      },
      [Direction.right]: (x, y) => {
        x += 30;
        return [x, y];
      }
    };

    const fn = map[this.direction];
    [x, y] = fn(x, y);
    const bullet = new Bullet(this.ctx, x, y, this.direction);
    this.bulletList.push(bullet);
  }
}
