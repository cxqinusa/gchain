import Phaser from 'phaser';
import {SpineTask} from "./task";

export default class NftScene extends Phaser.Scene {
    constructor() {
        super( 'NftScene');
    }

    nftMint(index){
        try{
            const nftname = SpineTask.taskArray[index].nft;
            this?.spineinfo?.setText('NFT['+nftname+']通证铸造中...');
            const isTest = true;
            if (isTest) {
                setTimeout(() => {
                    this?.spineinfo?.setText('NFT['+nftname+']铸造完毕!');
                    setTimeout(() => {
                        this?.spineinfo?.setText(''); //'上链完成!'延迟500毫秒消失
                        console.log('NFT['+nftname+']通证铸造完毕.');
                    }, 500);
                }, 5000);
            } else {
                /*
                 * TODOLIST: cosmos nft接口调用，铸造NFT
                 */
                this?.spineinfo?.setText('NFT['+nftname+']铸造完毕!');
                setTimeout(() => {
                    this?.spineinfo?.setText(''); //'上链完成!'延迟500毫秒消失
                    console.log('NFT['+nftname+']通证铸造完毕.');
                }, 500);
            }
        }catch (error) {
            console.error('nftMint error:', error);
        }
    }

    create() {
        this.spineinfo = this.add
            .text(this.game.config.width - 10, 60, '')
            .setOrigin(1, 0) // right的时候，要将文本的原点设置为右上角
            .setAlign('right')
            .setScrollFactor(0)
            .setDepth(999);
        this.spineinfo.setShadow(1, 1, '#000000', 2);

        /*
        this.input.on('pointerdown', () => {
            this.scene.stop('ChainScene'); // 关闭场景
        });*/
    }
    doHide(){
        this.spineinfo.setVisible(false);
    }
    doVisible(){
        this.spineinfo.setVisible(true);
    }
}
