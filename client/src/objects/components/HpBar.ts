// import { clamp } from "../utils/math";
import { clamp } from "../../utils/math";
import Player from "../Player";

export default class HpBar extends Phaser.GameObjects.Graphics {
    public m_x: number
    public m_y: number
    public m_maxHp: number
    public m_currentHp: number

    static WIDTH = 80;
    static HEIGHT = 12;
    static BORDER = 2;

    constructor(scene: Phaser.Scene, player: Player, maxHp: number) {
        super(scene);

        this.m_x = 10
        this.m_y = 10

        this.m_maxHp = maxHp;
        this.m_currentHp = maxHp;
        this.draw();
        this.setScrollFactor(0);

    }

    increase(amount: number) {
        this.m_currentHp = clamp(this.m_currentHp + amount, 0, this.m_maxHp);
        this.draw();
    }

    decrease(amount: number) {
        this.m_currentHp = clamp(this.m_currentHp - amount, 0, this.m_maxHp);
        this.draw();
    }

    draw() {
        this.clear();

        // BG
        this.fillStyle(0x000000);
        this.fillRect(
            this.m_x, this.m_y, //사각형의 시작지점좌표 왼쪽상단
            HpBar.WIDTH, HpBar.HEIGHT); //사각형의 가로세로 크기

        // Health
        this.fillStyle(0xffffff);
        this.fillRect(this.m_x + HpBar.BORDER, this.m_y + HpBar.BORDER,
            HpBar.WIDTH - 2 * HpBar.BORDER, HpBar.HEIGHT - 2 * HpBar.BORDER);

        if (this.m_currentHp < 30) {
            this.fillStyle(0xff0000);
        } else {
            this.fillStyle(0x00ff00);
        }

        let d = Math.floor((HpBar.WIDTH - 2 * HpBar.BORDER) / this.m_maxHp * this.m_currentHp);

        this.fillRect(this.m_x + HpBar.BORDER, this.m_y + HpBar.BORDER, d, HpBar.HEIGHT - 2 * HpBar.BORDER);
    }
}

Phaser.GameObjects.GameObjectFactory.register('hpBar', function (this: Phaser.GameObjects.GameObjectFactory, player: Player, maxHp: number) {
    const hpBar = new HpBar(this.scene, player, maxHp)

    this.displayList.add(hpBar)
    // this.updateList.add(enemy) // preupdate 할게 있으면 추가

    return hpBar
})