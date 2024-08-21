import { FC } from "react";
import style from "./PlayerUI.module.css";

type TPlayerUI = {
  velocity: number;
  frequency: number;
  reverse?: boolean;
  setVelocity: (value: number) => void;
  setFrequency: (value: number) => void;
};

export const PlayerUI: FC<TPlayerUI> = ({
  velocity,
  frequency,
  setVelocity,
  setFrequency,
  reverse,
}) => {
  return (
    <div className={reverse ? style.reverseContainer : style.container}>
      <div className={style.fieldset}>
        <label htmlFor="velocity">velocity</label>
        <input
          className={style.input}
          type="range"
          id="velocity"
          value={velocity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setVelocity(+e.target.value)
          }
          min={0}
          max={10}
          step={1}
        />
        <label htmlFor="frequency">frequency</label>
        <input
          className={style.input}
          type="range"
          id="frequency"
          value={frequency}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFrequency(+e.target.value)
          }
          min={1}
          max={4}
          step={0.5}
        />
      </div>
    </div>
  );
};
