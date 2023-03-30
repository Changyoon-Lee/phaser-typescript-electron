import Phaser from 'phaser';
import Player from './Player';
import Enemy from './Enemy';

export default class Item extends Phaser.Physics.Arcade.Image {
    static DURATION = 10000;
    static itemList = [
        "itemKey",// 적 강화, 아이템 확률 증가
        "itemRing", // 보조딜러 생성
        "itemNecklace", // 플레이어 힘을 배율로 증가
        "itemForce", // 플레이어 무기 강화를 위함 ,
    ]

    constructor(scene: Phaser.Scene, enemy: Enemy) {

        const radius = 30
        const x = enemy.x;
        const y = enemy.y;
        const itemIdx = Phaser.Math.Between(0, Item.itemList.length - 1); // 램덤숫자 생성
        super(scene, x, y + enemy.body.height - 10, Item.itemList[itemIdx]); // 랜덤 아이템 생성

        this.scale = 1;
        scene.m_items.add(this);
        scene.physics.world.enableBody(this);
        this.setCircle(radius, this.width / 2 - radius, this.height / 2 - radius);// 이거 위치 중심부터로 계산하는게 좋을듯

        setTimeout(() => this.destroy(), Item.DURATION);
    }

    update() {
    }
    collected(player: Player) {
        // player방향으로 이동하면서 사라지도록
        const itemName = this.texture.key
        this.scene.m_itemCount[itemName] += 1

        this.scene.soundGroup.m_pickupSound.play()

        if (this.scene.m_itemCount[itemName] >= 5) {
            this.scene.m_itemCount[itemName] = 0
            switch (itemName) {
                case "itemKey":
                    this.scene.upgradeEnemy()
                    break
                case "itemRing":
                    this.scene.upgradePet()
                    break
                case "itemNecklace":
                    this.scene.upgradeDamage()
                case "itemForce":
                    this.scene.upgradeArrow()

            }
        }
        this.scene.drawItemUI()
        this.destroy()
    }
}

// at the bottom of the file
// It has a register function for adding creation methods. This will allow us to use them with this.add.
// first parameter we will be able to use it in the Scene as this.add.arrow()
Phaser.GameObjects.GameObjectFactory.register('item', function (this: Phaser.GameObjects.GameObjectFactory, enemy: Enemy) {
    const item = new Item(this.scene, enemy)
    this.displayList.add(item)
    // this.updateList.add(arrow) // preupdate 할게 있으면 추가

    return item
})