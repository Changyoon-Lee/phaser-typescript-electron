import Phaser from 'phaser';
import config from './config';
import Arrow from './scenes/Arrow';
import Enemy from './scenes/Enemy';
import HpBar from './scenes/HpBar';
import LoadAssets from './scenes/LoadAssets';
import Player from './scenes/Player';
import PlayingScene from './scenes/PlayingScene';
// import Stage from './scenes/Stage';


declare global {
  namespace Phaser {
    interface Scene {
      m_attacks: Phaser.GameObjects.Group;
      m_player: Player;
      soundGroup: { [key: string]: Phaser.Sound.BaseSound }
    }
  }
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      arrow(player: Player): Arrow
      enemy(x: number, y: number): Enemy
      hpBar(player: Player, maxHp: number): HpBar
    }
  }
}
new Phaser.Game(
  Object.assign(config, {
    scene: [LoadAssets, PlayingScene]
  })
);
