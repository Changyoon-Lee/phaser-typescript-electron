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
        const offsetX = 10
        const offsetY = 11.5
        const radius = 10
        const x = enemy.x;
        const y = enemy.y;
        const itemIdx = Phaser.Math.Between(0, Item.itemList.length-1);
        super(scene, x, y, Item.itemList[itemIdx]);
        
        this.scale = 1;
        scene.m_items.add(this);
        scene.physics.world.enableBody(this);
        this.setCircle(radius);// 이거 위치 중심부터로 계산하는게 좋을듯

        setTimeout(() => this.destroy(), Item.DURATION);
    }

    update() {
    }
    collected(player:Player){
        // player방향으로 이동하면서 사라지도록
        const itemName = this.texture.key
        console.log(itemName)
        this.scene.m_itemCount[itemName] += 1
        this.scene.soundGroup.m_pickupSound.play()
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