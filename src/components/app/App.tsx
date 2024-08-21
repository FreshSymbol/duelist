import { FC, useEffect, useRef, useState } from "react";
import { Game } from "../game/Game";
import { PlayerUI } from "../ui/PlayerUI";
import style from "./App.module.css";

export const App: FC = () => {
  const [velocityFirstPlayer, setVelocityFirstPlayer] = useState<number>(1);
  const [velocitySecondPlayer, setVelocitySecondPlayer] = useState<number>(1);
  const [frequencyFirstPlayer, setFrequencyFirstPlayer] = useState<number>(1);
  const [frequencySecondPlayer, setFrequencySecondPlayer] = useState<number>(1);
  const [colorProjectileFirstPlayer, setColorProjectileFirstPlayer] =
    useState<string>("#ffffff");
  const [colorProjectileSecondPlayer, setColorProjectileSecondPlayer] =
    useState<string>("#ffffff");

  const firstInputColorRef = useRef<HTMLInputElement>(null);
  const secondInputColorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {});

  const handleFirstColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorProjectileFirstPlayer(e.target.value);
  };

  const handleSecondColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorProjectileSecondPlayer(e.target.value);
  };

  return (
    <main className={style.app}>
      <div className={style.ui}>
        <input
          className={style.input}
          ref={firstInputColorRef}
          type="color"
          value={colorProjectileFirstPlayer}
          onChange={handleFirstColorChange}
        />

        <PlayerUI
          velocity={velocityFirstPlayer}
          frequency={frequencyFirstPlayer}
          setVelocity={setVelocityFirstPlayer}
          setFrequency={setFrequencyFirstPlayer}
        />
        <PlayerUI
          reverse
          frequency={frequencySecondPlayer}
          velocity={velocitySecondPlayer}
          setVelocity={setVelocitySecondPlayer}
          setFrequency={setFrequencySecondPlayer}
        />

        <input
          className={style.input}
          ref={secondInputColorRef}
          type="color"
          value={colorProjectileSecondPlayer}
          onChange={handleSecondColorChange}
        />
      </div>

      <Game
        velocityFirstPlayer={velocityFirstPlayer}
        velocitySecondPlayer={velocitySecondPlayer}
        frequencyFirstPlayer={frequencyFirstPlayer}
        frequencySecondPlayer={frequencySecondPlayer}
        colorProjectileFirstPlayer={colorProjectileFirstPlayer}
        colorProjectileSecondPlayer={colorProjectileSecondPlayer}
        firstInputColor={firstInputColorRef}
        secondInputColor={secondInputColorRef}
      />
    </main>
  );
};
