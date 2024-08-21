export class Score {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public posX: number,
    public posY: number
  ) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
  }

  draw(score: number) {
    this.ctx.font = "24px sans-serif";
    this.ctx.fillStyle = "rgb(255 255 255 / 0.8)";
    this.ctx.fillText(`Score: ${score}`, this.posX, this.posY);
  }
  update(score: number) {
    this.draw(score);
  }
}
