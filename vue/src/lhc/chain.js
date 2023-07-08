import Phaser from 'phaser';

import { eventBus } from "@/main.ts";
export default class ChainScene extends Phaser.Scene {
    constructor() {
        super( 'ChainScene');
    }

    async chainOperation() {
        try {
            this?.spineinfo?.setText('数据上链进行中...');
            /*
            const signingClient = window.keplrClient.signingClient;
            // 创建一个更新 KV 存储内容的消息对象
            const msgvalue = {
                creator: window.keplrClient.address,
                lhc: {
                    address: window.keplrClient.address,
                    health: window.customParam.health,
                    intelligence: window.customParam.intelligence,
                    fighting: window.customParam.fighting,
                },
            };
            const encodeMsg = {
                typeUrl: "/gchain.player.MsgUpdatePlayerStatus",
                value : msgvalue,
            };
            // 构造交易手续费对象
            const fee = {
                amount: [{ denom: "cgt", amount: "200000" }], // 手续费的币种和数量
                gas: "200000", // 指定的 gas 数量
            };

            const memo = "";
            const tx = {
                msg: [encodeMsg], // 将更新 KV 存储内容的消息添加到交易中
                fee: fee,
                memo: memo, // 可选的交易备注
            };
            // 广播交易到区块链节点
            console.log("begin to updatePlayStatus:");
            //const txResponse = await signingClient.broadcastTx(tx);
            const txResponse = await signingClient.signAndBroadcast(window.keplrClient.address,[tx],fee,memo);
            console.dir("updatePlayStatus:"+JSON.stringify(txResponse));
            */
            console.log('eventBus updatePlayStatus emit...');
            const json = JSON.stringify({
                    address: window.keplrClient.address,
                    health: window.customParam.health,
                    intelligence: window.customParam.intelligence,
                    fighting: window.customParam.fighting
            });
            eventBus.emit("updatePlayStatus", json);
            this?.spineinfo?.setText('上链完成!');
            setTimeout(() => {
                this?.spineinfo?.setText(''); //'上链完成!'延迟500毫秒消失
                console.log('上链处理结束.');
            }, 500);
        } catch (error) {
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
