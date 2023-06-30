import Phaser from 'phaser';

export default class DataScene extends Phaser.Scene {
    constructor() {
        super( 'DataScene');
    }

    refreshData(){
        try{
            const infotxt = this.healthtxt + window.customParam.health + this.intelligencetxt + window.customParam.intelligence + this.fightingtxt + window.customParam.fighting;
            this?.spineinfo?.setText(infotxt);
        }catch (error) {
            console.error('refreshData error:', error);
        }
    }

    create() {
        this.healthtxt = '令狐冲: 生命 ';
        this.intelligencetxt = ' 智力 ';
        this.fightingtxt = ' 战斗 ';

        const infotxt = this.healthtxt + window.customParam.health + this.intelligencetxt + window.customParam.intelligence + this.fightingtxt + window.customParam.fighting;
        this.spineinfo = this.add.text(10, 10, infotxt)
                                        .setOrigin(0, 0)
                                        .setScrollFactor(0)
                                        .setDepth(999); // 将深度设置为较高的值以确保文本始终位于顶部
        this.spineinfo.setShadow(1, 1, '#000000', 2);

        this.guild = this.add.text(10, 50, 'W => up\nS => down\nA => left\nD => right\nSPACE => nft market').setOrigin(0, 0).setScrollFactor(0).setDepth(999); // 将深度设置为较高的值以确保文本始终位于顶部
        this.guild.setShadow(1, 1, '#000000', 2);
    }
    doHide(){
        this.spineinfo.setVisible(false);
        this.guild.setVisible(false);
    }
    doVisible(){
        this.spineinfo.setVisible(true);
        this.guild.setVisible(true);
    }
}
