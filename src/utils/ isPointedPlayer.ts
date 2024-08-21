import { Player } from "../entity/player";
import { checkCollision } from "./checkCollision";

export const isPointedPlayer = (
  player: Player,
  target: MouseEvent
): boolean => {
  return checkCollision(player, {
    posX: target.offsetX,
    posY: target.offsetY,
    radius: player.radius,
  });
};
