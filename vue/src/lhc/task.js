import {env} from "@/env";
// 定义自定义参数
/*
//必须定义为类，普通对象在多个场景中不能直接共享。普通对象的属性和值是独立的，每个场景都会有自己的对象实例
const CustomParams = {
    health: 0,            //生命值：初始化100，每分钟自动减少60，捡到礼盒增加随机数
    intelligence: 0,     //智力值：初始化100，答对谜题增加20，并有nft奖励，打错谜题减少30
    fighting: 0,         ///战斗力：初始化100，成功完成寻宝任务增加20，并有nft奖励，没有完成减少30
    //生命值，智力值，战斗力如果低于0，game over，可以使用代币购买
    //礼物提高生命值
    //寻宝提高战斗力
    //谜题提高智力值
};
*/
class CustomParams {
    constructor(health, intelligence, fighting) {

        //生命值：初始化100，每分钟自动减少50，捡到礼盒增加随机数
        this.health = health;

        //智力值：初始化100，答对谜题增加20，并有nft奖励，打错谜题减少30
        this.intelligence = intelligence;

        //战斗力：初始化100，成功完成寻宝任务增加20，并有nft奖励，没有完成减少30
        this.fighting = fighting;
    }
};

// 定义一个名为MySpineTask的类
class SpineTask {

    //type有两个：礼物，谜题和寻宝
    //question,describe和answer是针对谜题的，问题，描述和答案
    //nft是代表答对该谜题或者寻到宝时，获取到的nft名称，这里只是名称
    constructor(type, question, describe, answer, nft, nfturi, health) {
        this.type = type;
        this.question = question;
        this.describe = describe;
        this.answer = answer;
        this.nft = nft;
        this.nfturi = nfturi;
        this.health = health;
        this.deadline = 0;
        this.taskhandle = undefined; //房子/礼物等对象，用于destroy
        this.taskhandlePosX = 0;     //房子/礼物等对象的位置X
        this.taskhandlePosY = 0;     //房子/礼物等对象的位置Y
        this.taskhandleStatus = 0;   //0未使用，1显示中, 2使用中，3已使用
        this.taskSuccessful = false; //任务是否执行成功
    };
    //使用状态
    static USEStatus = {
        UNUSE: 0,
        SHOW: 1,
        USING: 2,
        USED: 3
    };

    // 简化
    static taskArray = [
        // 添加具体的任务对象
        new SpineTask('puzzle', '武器谜题', '你来到一个密室，看到墙上挂着五把不同的武器：剑、刀、棍、鞭、锤。\n' +
            '每把武器上都有一个数字，分别是2、5、()、11、14。根据某种规律，你需要找出武器棍的数字。\n' +
            '线索：数字之间存在某种模式或关系，需要寻找规律。\n' +
            '选项：A: 5, B: 9, C: 8, D: 17\n', 'C', '武器', env.nftPath + 'gift-1.png'),
        new SpineTask('puzzle', '阴阳谜局', '你来到一间阴室，看到墙上有两个开关，一个标有「阴」，一个标有「阳」。\n' +
            '房间中央有一个盒子，但你必须根据一组线索来选择正确的开关才能打开盒子。\n' +
            '线索：线索是一句谜语「先天一灯，后天两炬，心之一拍，倾刻生灭。」\n' +
            '选项：A: 「阳」开关, B: 「阴」开关\n', 'A', '宝盒', env.nftPath + 'gift-2.png'),
        new SpineTask('treasure', '', '', '', '九阴真经', env.nftPath + 'treasure-1.png'),
        new SpineTask('treasure', '', '', '', '葵花宝典', env.nftPath + 'treasure-2.png'),
        new SpineTask('treasure', '', '', '', '黯然销魂掌', env.nftPath + 'treasure-3.png'),
        // 可以添加更多的任务对象
    ];
    static presentArray = [
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
        new SpineTask('present', '', '', '', '','' , Phaser.Math.Between(10, 100)),
    ];
}

class KeplrClient{
    constructor(signingClient, address) {

        //StargateClient
        this.signingClient = signingClient;

        //keplr地址：cgt12ltvts09ga3gj32hsmnwq922ze0gmk4t6vhwne
        this.address = address;
    }
}
// 导出
export {SpineTask, CustomParams, KeplrClient};

