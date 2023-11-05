import { CONFIG } from '../config';
import { Direction } from '../types';
import { Bullet } from './bullet';
import { Enemy } from './enemy';

export class Player {
  private ctx: CanvasRenderingContext2D;

  private x: number;

  private y: number;

  private direction: Direction = Direction.up;

  private bulletList: Bullet[] = [];

  private speed: number = CONFIG.PLAYER_SPEED;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.init();
  }

  init() {
    this.draw();
    window.addEventListener('keydown', ev => {
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
    this.drawBullet();
  }

  drawBullet() {
    this.destoryBullet();
    this.bulletList.forEach(b => b.draw());
  }

  destoryBullet() {
    // 边界处理
    for (let i = this.bulletList.length - 1; i >= 0; i--) {
      const bullet = this.bulletList[i];
      if (bullet.isOutBound()) {
        this.bulletList.splice(i, 1);
      }
    }
  }

  moveLeft() {
    if (this.x - 30 <= 0) return;
    this.direction = Direction.left;
    this.x -= this.speed;
  }

  moveRight() {
    if (this.x + 30 >= CONFIG.PANEL_WIDTH) return;
    this.direction = Direction.right;
    this.x += this.speed;
  }

  moveUp() {
    if (this.y - 30 <= 0) return;
    this.direction = Direction.up;
    this.y -= this.speed;
  }

  moveDown() {
    if (this.y + 30 >= CONFIG.PANEL_HEIGHT) return;
    this.direction = Direction.down;
    this.y += this.speed;
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
    // TODO 检测是否相撞
  }

  destoryEnemy(enemyList: Enemy[]) {
    for (let i = this.bulletList.length - 1; i >= 0; i--) {
      const bullet = this.bulletList[i];
      for (let j = enemyList.length - 1; j >= 0; j--) {
        const enemy = enemyList[j];
        if (
          bullet.getX() > enemy.getX() &&
          bullet.getX() < enemy.getX() + 30 &&
          bullet.getY() > enemy.getY() &&
          bullet.getY() < enemy.getY() + 40
        ) {
          this.bulletList.splice(i, 1);
          enemyList.splice(j, 1);
          break;
        }
      }
    }
  }
}
