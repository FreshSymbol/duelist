import { Player } from "./player";

export class Projectile {
  player: Player;
  ctx: CanvasRenderingContext2D;
  posX: number;
  posY: number;
  color: string;
  radius: number;
  reverse: boolean;
  frequency: number;

  constructor(player: Player) {
    this.player = player;
    this.ctx = player.ctx;
    this.posX = player.posX;
    this.posY = player.posY;
    this.color = player.color;
    this.radius = 5;
    this.reverse = player.reverse;
    this.frequency = player.frequency;
  }
  draw() {
    const delta = this.reverse ? -this.player.radius : this.player.radius;
    this.ctx.beginPath();
    this.ctx.fillStyle = `${this.color}`;
    this.ctx.arc(this.posX + delta, this.posY, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  destroy() {
    const index = this.player.projectiles.indexOf(this);
    this.player.projectiles.splice(index, 1);
  }

  update() {
    this.draw();
    if (this.reverse) this.posX -= this.frequency;
    else this.posX += this.frequency;
  }
}
