import Phaser from 'phaser';
import Player from './Player';
import PlayingScene from './PlayingScene';
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    public speed!: number
    public hp!: number
    constructor(scene: PlayingScene, x: number, y: number) {

        super(scene, 128, 128, "enemy");
        this.setPosition(x, y)
        this.speed = 2
        this.hp = 100

        this.play("enemyWalk", true)
        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.scale = 1;

        // this.flipX = player.flipX; // player의 flip 여부에 따라 화살 방향도 정해짐
        // this.setCircle(radius, this.flipX ? offsetX - radius : this.width - radius - 5, offsetY + radius);
        // this.setVelocityX(this.flipX ? -Arrow.SPEED : +Arrow.SPEED);

        // scene.m_attacks.add(this);
        // scene.soundGroup.m_tap.play();

        // setTimeout(() => this.destroy(), Arrow.DURATION);
    }
    // hit(attack:, damage) {
    //     attack.destroy();
    //     this.hp -= damage
    // }
    update() {
    }
}