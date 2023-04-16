import Phaser from 'phaser';
import Item from '../objects/Item';
import Config from "../config";
import Button from "../objects/components/Button";

export default class GameoverScene extends Phaser.Scene {
    public itemCount!: { [key: string]: number; };
    public timer!: string;
    public isWin!: boolean;
    constructor() {
        super("gameoverScene");
    }

    init(data: any,) {
        // this.enemyKilled = data.enemyKilled;
        console.log(data)
        this.itemCount = data.itemCount
        this.timer = data.timer
        this.isWin = data.isWin
    }

    create() {
        const bg = this.add.graphics();
        bg.fillStyle(0x5c6bc0);
        bg.fillRect(0, 0, Config.width, Config.height);
        bg.setScrollFactor(0);

        this.add.bitmapText(Config.width / 2, Config.height / 2 - 200, "pixelFont", this.isWin ? "You Win!" : 'Game Over', 40).setOrigin(0.5);
        this.add.bitmapText(Config.width / 2, Config.height / 2 - 100, "pixelFont", this.timer, 40).setOrigin(0.5);
        let x = Config.width / 2
        let y = 250
        const xDist = 50
        const yDist = 50
        for (let item of Item.itemList) {
            this.add.image(x - xDist / 2, y, item).setOrigin(0.5)
            this.add.bitmapText(x + xDist / 2, y, "pixelFont", `x ${this.itemCount[item]}`, 40).setOrigin(0.5);
            y += yDist
        }

        // this.add.bitmapText(Config.width / 2, Config.height / 2, "pixelFont", `Enemy Killed : ${this.enemyKilled}`, 30).setOrigin(0.5);

        const startButton = new Button(Config.width - 100, Config.height - 100, 'Go to Main', this,
            () => this.scene.start("mainScene"),
        );
    }
}