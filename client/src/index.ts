import Phaser from 'phaser';
import config from './config';
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
      arrow(player: Player): IArrow
      enemy(x: number, y: number): IEnemy
    }
  }
  interface IArrow extends Phaser.Physics.Arcade.Image {
  }
  interface IEnemy extends Phaser.Physics.Arcade.Sprite {
  }
}
new Phaser.Game(
  Object.assign(config, {
    scene: [LoadAssets, PlayingScene]
  })
);
