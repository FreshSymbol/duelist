import { Projectile } from "./projectile";

export class Player {
  projectiles: Projectile[];
  isReadyShoot: boolean;
  constructor(
    public ctx: CanvasRenderingContext2D,
    public posX: number,
    public posY: number,
    public radius: number,
    public velocity: number,
    public reverse: boolean,
    public color: string,
    public frequency: number
  ) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.velocity = velocity;
    this.color = color;
    this.reverse = reverse;
    this.frequency = frequency;
    this.projectiles = [];
    this.isReadyShoot = true;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  shoot() {
    this.isReadyShoot = false;
    this.projectiles.push(new Projectile(this));
    setTimeout(() => {
      this.isReadyShoot = true;
    }, 1000 / this.frequency);
  }

  update() {
    this.draw();
    this.projectiles.forEach((projectile) => projectile.update());
    if (this.isReadyShoot) this.shoot();

    if (
      this.posY - this.radius < 0 ||
      this.posY > this.ctx.canvas.height - this.radius
    )
      this.velocity *= -1;
    this.posY += this.velocity;
  }
}
