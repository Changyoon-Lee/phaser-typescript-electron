import Phaser from 'phaser';
import config from './config';
import Arrow from './objects/Arrow';
import Enemy from './objects/Enemy';
import HpBar from './objects/components/HpBar';
import LoadAssets from './scenes/LoadAssets';
import Player from './objects/Player';
import PlayingScene from './scenes/PlayingScene';
import MainScene from './scenes/MainScene';
import GameoverScene from './scenes/GameoverScene';
import Item from './objects/Item';
// import Stage from './scenes/Stage';


declare global {
  namespace Phaser {
    interface Scene {
      m_attacks: Phaser.GameObjects.Group;
      m_items: Phaser.GameObjects.Group;
      m_player: Player;
      m_itemCount: {[key:string]:number};
      soundGroup: { [key: string]: Phaser.Sound.BaseSound }
    }
  }
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      arrow(player: Player): Arrow
      enemy(x: number, y: number): Enemy
      hpBar(player: Player, maxHp: number): HpBar
      item(enemy:Enemy): Item
    }
  }
}
new Phaser.Game(
  Object.assign(config, {
    scene: [LoadAssets, PlayingScene, MainScene, GameoverScene]
  })
);
