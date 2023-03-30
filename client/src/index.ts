import Phaser from 'phaser';
import config from './config';
import Arrow, { ArrowStat } from './objects/Arrow';
import Enemy, { EnemyStat } from './objects/Enemy';
import HpBar from './objects/components/HpBar';
import LoadAssets from './scenes/LoadAssets';
import Player from './objects/Player';
import PlayingScene from './scenes/PlayingScene';
import MainScene from './scenes/MainScene';
import GameoverScene from './scenes/GameoverScene';
import Item from './objects/Item';
import Explosion from './objects/Explosion';
// import Stage from './scenes/Stage';


declare global {
  namespace Phaser {
    interface Scene {
      m_attacks: Phaser.GameObjects.Group;
      m_items: Phaser.GameObjects.Group;
      m_player: Player;
      m_itemCount: { [key: string]: number };
      soundGroup: { [key: string]: Phaser.Sound.BaseSound }
      arrowLevel: number;
      upgradeEnemy(): void
      upgradeArrow(): void
      upgradePet(): void
      upgradeDamage(): void
      drawItemUI(): void
    }
  }
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      arrow(player: Player, arrowStat: ArrowStat): Arrow
      enemy(x: number, y: number, enemyStat: EnemyStat): Enemy
      hpBar(player: Player, maxHp: number): HpBar
      item(enemy: Enemy): Item
      explosion(x: number, y: number): Explosion
    }
  }
}
new Phaser.Game(
  Object.assign(config, {
    scene: [LoadAssets, PlayingScene, MainScene, GameoverScene]
  })
);
