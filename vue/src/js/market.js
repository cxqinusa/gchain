import Phaser from 'phaser';

export default class MarketScene extends Phaser.Scene
{
    constructor ()
    {
        super('MarketScene');
    }

    preload ()
    {
        //this.load.setPath('../assets/');
    }

    create ()
    {
        const info = this.add.text(250, 250, 'Hello,\nNFT market.\nClick anythere to go back.',
            { fontFamily: 'Arial Black', fontSize: 50, color: '#c51b7d', align: 'center' }).setStroke('#de77ae', 16);

        //没有点击到宝藏位置，不退出
        this.input.on('pointerdown', () => {
            this.scene.stop('MarketScene'); //关闭自己场景
            this.scene.resume('Game');        //将父场景恢复起来
        });
    }

};
