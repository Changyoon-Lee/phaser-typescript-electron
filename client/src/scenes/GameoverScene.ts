import Phaser from 'phaser';
import Config from "../config";
import Button from "../objects/components/Button";

export default class GameoverScene extends Phaser.Scene {
    public itemCount!: { [key: string]: number; };
    constructor() {
        super("gameoverScene");
    }

    init(data: any) {
        // this.enemyKilled = data.enemyKilled;
        console.log(data)
        this.itemCount = data
    }

    create() {
        const bg = this.add.graphics();
        bg.fillStyle(0x5c6bc0);
        bg.fillRect(0, 0, Config.width, Config.height);
        bg.setScrollFactor(0);

        this.add.bitmapText(Config.width / 2, Config.height / 2 - 200, "pixelFont", 'Game Over', 40).setOrigin(0.5);
        
        this.add.image(400, 250, "itemKey").setOrigin(0.5, 0.5)
        this.add.bitmapText(450, 250, "pixelFont", `x ${this.itemCount["itemKey"]}`, 40).setOrigin(0.5, 0.5);
        this.add.image(400, 300, "itemRing").setOrigin(0.5,0.5)
        this.add.bitmapText(450, 300, "pixelFont", `x ${this.itemCount["itemRing"]}`, 40).setOrigin(0.5, 0.5);
        this.add.image(400, 350, "itemNecklace").setOrigin(0.5,0.5)
        this.add.bitmapText(450, 350, "pixelFont", `x ${this.itemCount["itemNecklace"]}`, 40).setOrigin(0.5, 0.5);
        this.add.image(400, 400, "itemForce").setOrigin(0.5, 0.5)
        this.add.bitmapText(450, 400, "pixelFont", `x ${this.itemCount["itemForce"]}`, 40).setOrigin(0.5, 0.5);
        // this.add.bitmapText(Config.width / 2, Config.height / 2, "pixelFont", `Enemy Killed : ${this.enemyKilled}`, 30).setOrigin(0.5);

        const startButton = new Button(Config.width -100, Config.height -100, 'Go to Main', this,
            () => this.scene.start("mainScene"),
        );
    }
}