import Phaser from 'phaser';
import Config from "../config";
import Button from "../objects/components/Button";

export default class GameoverScene extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    init(data: any) {
        // this.enemyKilled = data.enemyKilled;
    }

    create() {
        const bg = this.add.graphics();
        bg.fillStyle(0x5c6bc0);
        bg.fillRect(0, 0, Config.width, Config.height);
        bg.setScrollFactor(0);

        this.add.bitmapText(Config.width / 2, Config.height / 2 - 100, "pixelFont", 'Game Over', 40).setOrigin(0.5);

        // this.add.bitmapText(Config.width / 2, Config.height / 2, "pixelFont", `Enemy Killed : ${this.enemyKilled}`, 30).setOrigin(0.5);

        const startButton = new Button(Config.width / 2, Config.height / 2 + 100, 'Go to Main', this,
            () => this.scene.start("mainScene"),
        );
    }
}