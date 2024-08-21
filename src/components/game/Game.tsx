import { FC, useEffect, useRef } from "react";
import style from "./Game.module.css";
import { Player } from "../../entity/player";
import { checkCollision } from "../../utils/checkCollision";
import { Score } from "../../entity/score";
import { isPointedPlayer } from "../../utils/ isPointedPlayer";

type TGame = {
  velocityFirstPlayer: number;
  velocitySecondPlayer: number;
  frequencyFirstPlayer: number;
  frequencySecondPlayer: number;
  colorProjectileFirstPlayer: string;
  colorProjectileSecondPlayer: string;
  firstInputColor: React.RefObject<HTMLInputElement>;
  secondInputColor: React.RefObject<HTMLInputElement>;
};

export const Game: FC<TGame> = ({
  velocityFirstPlayer,
  velocitySecondPlayer,
  frequencyFirstPlayer,
  frequencySecondPlayer,
  colorProjectileFirstPlayer,
  colorProjectileSecondPlayer,
  firstInputColor,
  secondInputColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let firstScoreCount = 0;
    const firstScore = new Score(ctx, 30, 40);
    let secondScoreCount = 0;
    const secondScore = new Score(ctx, canvas.width - 130, 40);

    const player = new Player(
      ctx,
      35,
      40,
      30,
      velocityFirstPlayer,
      false,
      colorProjectileFirstPlayer,
      frequencyFirstPlayer
    );

    const secondPlayer = new Player(
      ctx,
      canvas.width - 35,
      canvas.height - 40,
      30,
      velocitySecondPlayer,
      true,
      colorProjectileSecondPlayer,
      frequencySecondPlayer
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (isPointedPlayer(player, e)) player.velocity *= -1;
      if (isPointedPlayer(secondPlayer, e)) secondPlayer.velocity *= -1;
    };

    const handleMouseClick = (e: MouseEvent) => {
      if (isPointedPlayer(player, e)) firstInputColor.current?.click();
      if (isPointedPlayer(secondPlayer, e)) secondInputColor.current?.click();
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseClick);

    const render = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      firstScore.draw(firstScoreCount);
      secondScore.draw(secondScoreCount);
      player.update();
      secondPlayer.update();

      player.projectiles.forEach((projectile) => {
        if (checkCollision(projectile, secondPlayer)) {
          projectile.destroy();
          firstScoreCount++;
          firstScore.update(firstScoreCount);
        }
      });

      secondPlayer.projectiles.forEach((projectile) => {
        if (checkCollision(projectile, player)) {
          projectile.destroy();
          secondScoreCount++;
          secondScore.update(secondScoreCount);
        }
      });

      window.requestAnimationFrame(render);
    };
    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    velocityFirstPlayer,
    velocitySecondPlayer,
    frequencyFirstPlayer,
    frequencySecondPlayer,
    colorProjectileFirstPlayer,
    colorProjectileSecondPlayer,
    firstInputColor,
    secondInputColor,
  ]);

  return (
    <canvas ref={canvasRef} className={style.canvas} width={800} height={400} />
  );
};
