import Phaser from 'phaser';
import Player from './Player';
import PlayingScene from '../scenes/PlayingScene';

export interface ArrowStat {
    damage: number
    speed: number
    duration: number
    scale: number
}
interface ArrowLevelStat {
    [key: number]: ArrowStat
}

export default class Arrow extends Phaser.Physics.Arcade.Image {

    static arrowStatList: ArrowLevelStat = {
        1: { damage: 10, speed: 100, duration: 2000, scale: 1 },
        2: { damage: 20, speed: 200, duration: 2000, scale: 1.2 },
        3: { damage: 40, speed: 300, duration: 2000, scale: 1.4 },
        4: { damage: 80, speed: 400, duration: 2000, scale: 1.6 },
        5: { damage: 160, speed: 500, duration: 2000, scale: 1.8 },
        6: { damage: 320, speed: 600, duration: 2000, scale: 2 },
        7: { damage: 640, speed: 700, duration: 2000, scale: 2.3 },
        8: { damage: 1280, speed: 800, duration: 2000, scale: 2.6 },
        9: { damage: 2560, speed: 900, duration: 2000, scale: 3 },
        10: { damage: 5120, speed: 1000, duration: 2000, scale: 3.5 },
    }
    public arrowStat!: ArrowStat
    constructor(scene: Phaser.Scene, player: Player, arrowStat: ArrowStat) {
        const offsetY = 11.5 // 플레이어 대비 화살의 시작지점
        const radius = 1
        const x = player.x;
        const y = player.y;
        // const y = player.y + offsetY;
        super(scene, x, y + offsetY, "arrow");
        this.scale = 1;
        this.setOrigin(0.5)
        this.arrowStat = arrowStat
        // scene.add.existing(this); => items may be added to the Scene Systems’ displayList or updateList 아래 gameObjectFactory에서 displayList로 해결
        scene.physics.world.enableBody(this);
        this.flipX = player.flipX; // player의 flip 여부에 따라 화살 방향도 정해짐
        this.setBodySize(8, 8, true)
        const offsetX = this.width * 0.35;
        this.body.offset.x = this.flipX
            ? this.body.offset.x - offsetX
            : this.body.offset.x + offsetX

        // this.setCircle(radius);// 이거 위치 중심부터로 계산하는게 좋을듯
        // this.setCircle(radius, this.flipX ? offsetX - radius : this.width - radius - 5, offsetY + radius).setOrigin(0.5, 0.5);// 이거 위치 중심부터로 계산하는게 좋을듯
        this.setVelocityX(this.flipX ? -arrowStat.speed : +arrowStat.speed);

        scene.m_attacks.add(this);
        scene.soundGroup.m_tap.play();

        setTimeout(() => this.destroy(), arrowStat.duration);
    }

    update() {
    }
}

// at the bottom of the file
// It has a register function for adding creation methods. This will allow us to use them with this.add.
// first parameter we will be able to use it in the Scene as this.add.arrow()
Phaser.GameObjects.GameObjectFactory.register('arrow', function (this: Phaser.GameObjects.GameObjectFactory, player: Player, arrowStat: ArrowStat) {
    const arrow = new Arrow(this.scene, player, arrowStat)

    this.displayList.add(arrow)
    // this.updateList.add(arrow) // preupdate 할게 있으면 추가

    return arrow
})