import Phaser from 'phaser';
import Button from '../objects/components/Button';
import Config from "../config"
export default class MainScene extends Phaser.Scene {
  constructor() {
    super('mainScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    const logo = this.add.image(100, 70, 'logo');
    const bg = this.add.graphics();
    bg.fillStyle(0x005500);
    bg.fillRect(0, 0, Config.width, Config.height)

    this.add.bitmapText(Config.width / 2, 180, 'pixelFont', 'unlucky archer', 70).setOrigin()
    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
    const stratButton = new Button(Config.width / 2, Config.height / 2 + 150, "Start Game", this, () => { this.scene.start("playGame") })
  }
}
