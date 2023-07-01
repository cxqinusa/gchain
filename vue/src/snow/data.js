import Phaser from 'phaser';

export default class DataScene extends Phaser.Scene {
    constructor() {
        super( 'DataScene');
    }

    refreshData(){
        try{
            const infotxt = this.healthtxt + window.snowParam.fighting + this.fightingtxt + window.snowParam.health;
            this?.spineinfo?.setText(infotxt);
        }catch (error) {
            console.error('refreshData error:', error);
        }
    }

    create() {
        this.healthtxt = '丑小鸭: 战力 ';
        this.fightingtxt = ' 体能 ';

        const infotxt = this.healthtxt + window.snowParam.fighting + this.fightingtxt + window.snowParam.health;
        this.spineinfo = this.add.text(20, 20, infotxt)
                                        .setOrigin(0, 0)
                                        .setScrollFactor(0)
                                        .setScale(1.3)
                                        .setDepth(999); // 将深度设置为较高的值以确保文本始终位于顶部
        this.spineinfo.setShadow(1, 1, '#000000', 2);
    }
    doHide(){
        this.spineinfo.setVisible(false);
    }
    doVisible(){
        this.spineinfo.setVisible(true);
    }
}
