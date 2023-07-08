import Phaser from 'phaser';

import Boot from './boot.js';
import Intro from './intro.js';
import Game from './game.js';
import ChainScene from './chain.js';
import DataScene from './data.js';
import TreasureScene from './treasure.js';
import PuzzleScene from './puzzle.js';
import NftScene from './nft.js';
import MarketScene from './market.js';
import {CustomParams,KeplrClient} from './task.js';

export function initGame(){
    console.log('initGame lhc...');
    // 创建全局变量并实例化 CustomParams
    window.customParam = new CustomParams(0,0,0);
    window.keplrClient = new KeplrClient(null,'');
    const config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 800,
        backgroundColor: '#000000',
        parent: 'game-container',
        scene: [Boot,Intro,Game,ChainScene,DataScene,TreasureScene,PuzzleScene,NftScene,MarketScene],
        physics: {
            default: 'arcade',
            arcade: {debug: false}
        }
    };

    let game = new Phaser.Game(config);
    return game;
}

export function stopGame(game){
    console.log('stopGame snow...');
    game.destroy(true);
}
