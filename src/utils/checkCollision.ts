import { Player } from "../entity/player";
import { Projectile } from "../entity/projectile";

export const checkCollision = (a: Player | Projectile, b: any): boolean => {
  return (
    a.posX < b.posX + b.radius &&
    a.posX + a.radius > b.posX &&
    a.posY < b.posY + b.radius &&
    a.posY + a.radius > b.posY
  );
};
