import Config from "../config";

export function getRandomPosition(x: number, y: number) {
    // const randRad = Math.random() * Math.PI * 2;
    // const _r = Math.sqrt(Config.width * Config.width + Config.height * Config.height) / 2;
    // const _x = x + (_r * Math.cos(randRad));
    // const _y = y + (_r * Math.sin(randRad));
    const signed = [-1,1]
    const _x = signed[Phaser.Math.Between(0,1)] * 500 + x
    const _y = Phaser.Math.Between(200,490)
    return [_x, _y];
}

export function clamp(value: number, lo: number, hi: number): number {
    return Math.min(Math.max(value, lo), hi);
}