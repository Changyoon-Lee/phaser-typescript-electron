import Phaser from 'phaser';
import Player from './Player';
import PlayingScene from '../scenes/PlayingScene';
export default class Arrow extends Phaser.Physics.Arcade.Image {
    static SPEED = 200;
    static DURATION = 2000;

    constructor(scene: Phaser.Scene, player: Player) {
        const offsetX = 10
        const offsetY = 11.5
        const radius = 10
        const x = player.x - 10;
        const y = player.y + 11.5;
        super(scene, x, y, "arrow");
        this.scale = 1;

        // scene.add.existing(this); => items may be added to the Scene Systems’ displayList or updateList 아래 gameObjectFactory에서 displayList로 해결
        scene.physics.world.enableBody(this);
        this.flipX = player.flipX; // player의 flip 여부에 따라 화살 방향도 정해짐
        this.setCircle(radius, this.flipX ? offsetX - radius : this.width - radius - 5, offsetY + radius);// 이거 위치 중심부터로 계산하는게 좋을듯
        this.setVelocityX(this.flipX ? -Arrow.SPEED : +Arrow.SPEED);

        scene.m_attacks.add(this);
        scene.soundGroup.m_tap.play();

        setTimeout(() => this.destroy(), Arrow.DURATION);
    }

    update() {
    }
}

// at the bottom of the file
// It has a register function for adding creation methods. This will allow us to use them with this.add.
// first parameter we will be able to use it in the Scene as this.add.arrow()
Phaser.GameObjects.GameObjectFactory.register('arrow', function (this: Phaser.GameObjects.GameObjectFactory, player: Player) {
    const arrow = new Arrow(this.scene, player)

    this.displayList.add(arrow)
    // this.updateList.add(arrow) // preupdate 할게 있으면 추가

    return arrow
})