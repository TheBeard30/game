import { Game } from './models/game';

window.onload = () => {
  const element = document.getElementById('panel') as HTMLCanvasElement;
  const game = new Game(element);
  game.start();
};
