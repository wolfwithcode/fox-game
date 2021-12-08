import { SCENES, RAIN_CHANCE } from "./constants";
import { modFox, modScene } from "./ui";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  tick() {
    this.clock++;
    if (this.clock === this.wakeTime) {
      this.wake();
    }
    return this.clock;
  },
  startGame() {
    console.log("hatching");
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
  },
  wake() {
    console.log("hatched");
    this.current = "IDLING";
    this.wakeTime = -1;
    modFox("idling");
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
  },
  handleUserAction(icon) {
    if (
      ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)
    ) {
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
    }
  },
  changeWeather() {
    console.log("changing weather");
  },
  cleanUpPoop() {
    console.log("cleaning up");
  },
  feed() {
    console.log("feeding");
  },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);

export default gameState;
