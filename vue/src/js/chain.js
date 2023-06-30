import Phaser from 'phaser';

export default class ChainScene extends Phaser.Scene {
    constructor() {
        super( 'ChainScene');
    }

    chainOperation(){
        try{
            this?.spineinfo?.setText('数据上链进行中...');
            const isTest = true;
            if (isTest) {
                setTimeout(() => {
                    this?.spineinfo?.setText('上链完成!');
                    setTimeout(() => {
                        this?.spineinfo?.setText(''); //'上链完成!'延迟500毫秒消失
                        console.log('上链处理结束.');
                    }, 500);
                }, 5000);
            } else {
                /*
                 * TODOLIST: cosmos sdk接口调用，令狐冲的数据上链
                 * 生命值: window.customParam.health
                 * 智力值: window.customParam.intelligence
                 * 战斗力: window.customParam.fighting
                 */
                this?.spineinfo?.setText('上链完成!');
                setTimeout(() => {
                    this?.spineinfo?.setText(''); //'上链完成!'延迟500毫秒消失
                    console.log('上链处理结束.');
                }, 500);
            }
        }catch (error) {
            console.error('chainOperation error:', error);
        }
    }

    create() {
        this.spineinfo = this.add
            .text(this.game.config.width - 10, 10, '')
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
