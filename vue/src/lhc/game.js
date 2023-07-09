import Phaser from 'phaser';
import {SpineTask} from './task.js'
import ChainScene from './chain.js'
import DataScene from './data.js'
import NftScene from "./nft.js";
import PuzzleScene from "./puzzle.js";
import TreasureScene from "./treasure.js";
import MarketScene from "./market.js";
import {env} from "@/env";

//自定义三个精灵
class CustomSpineIdle {
    constructor(scene, x, y, key, animationName, loop) {
        this.scene = scene;
        this.spine = scene.add.spine(x, y, key, animationName, loop);
    }
}

class CustomSpineWalk {
    constructor(scene, x, y, key, animationName, loop) {
        this.scene = scene;
        this.spine = scene.make.spine({scene, x, y, key, animationName, loop});
        scene.sys.displayList.add(this.spine);
        scene.sys.updateList.add(this.spine);
    }
}

class CustomSpineRun {
    constructor(scene, x, y, key, animationName, loop) {
        this.scene = scene;
        this.parent = scene.add.container(0, 0);
        this.spine = scene.make.spine({scene, x, y, key, animationName, loop});
        this.parent.add(this.spine);
    }
}

export default class Game extends Phaser.Scene {

    //设置奔跑和站立的精灵位置
    setSpineVisible(action, posx, posy, direction) {
        //console.log('spine:x=', posx, ',y=', posy, ',action=', action, ',direction=', direction);
        if (direction == 'left') {
            this.spineIdle.spine.setScale(-0.15, 0.15);
            this.spineRun.spine.setScale(-0.15, 0.15);
        } else if (direction == 'right') {
            this.spineIdle.spine.setScale(0.15);
            this.spineRun.spine.setScale(0.15);
        }
        if (action == 'idle') {
            if (this.spineRun.spine.visible == true) this.spineRun.spine.setVisible(false);
            if (this.spineIdle.spine.visible == false) this.spineIdle.spine.setVisible(true);
            this.spineIdle.spine.x = posx;
            this.spineIdle.spine.y = posy;
        } else {
            if (this.spineIdle.spine.visible == true) this.spineIdle.spine.setVisible(false);
            if (this.spineRun.spine.visible == false) this.spineRun.spine.setVisible(true);
            this.spineRun.spine.x = posx;
            this.spineRun.spine.y = posy;
            const thresholdDistance = 50; // 假设阈值为 50 像素
            this.taskArray.forEach((element, index) => {
                // 计算两个物体之间的距离
                const distance = Phaser.Math.Distance.Between(posx, posy, element.taskhandlePosX, element.taskhandlePosY);
                //console.log('distinct=', distance, 'spine.x=', posx, ',spine.y=', posy, 'task.x=', element.taskhandlePosX, ',task.y=', element.taskhandlePosY);
                if (distance < thresholdDistance) {
                    console.log('match task:ntf=', element.nft);
                    element.taskhandleStatus = SpineTask.USEStatus.USING;
                    element.taskhandle?.destroy(); //房子自动消失
                    this.taskArray.splice(index, 1);
                    this.sound.play('door');
                    //暂停该场景，不然会继续执行定时器，也会继续响应键盘和鼠标事件
                    //this.scene.pause仅会暂停场景的更新和渲染，而不会自动暂停场景中的其他功能，例如音频播放
                    this.cameras.main.fadeOut(100); //渐变到子场景，因为fadeOut也是异步，所以需要setTimeout配合
                    setTimeout(() => {
                        this.scene.pause('Game');
                        if (element.type === 'treasure') {
                            this.openTreasure = true;
                            this.scene.launch('TreasureScene');
                        } else {
                            this.openPuzzle = true;
                            this.scene.launch('PuzzleScene');
                        }
                    }, 100);
                }
            })
            this.presentArray.forEach((element, index) => {
                // 计算两个物体之间的距离
                const distance = Phaser.Math.Distance.Between(posx, posy, element.taskhandlePosX, element.taskhandlePosY);
                //console.log('distinct=', distance, 'spine.x=', posx, ',spine.y=', posy, 'task.x=', element.taskhandlePosX, ',task.y=', element.taskhandlePosY);
                if (distance < thresholdDistance) {
                    console.log('match task:health=', element.health);
                    element.taskhandleStatus = SpineTask.USEStatus.USED;
                    element.taskhandle?.destroy(); //房子自动消失
                    this.presentArray.splice(index, 1);
                    //
                    window.customParam.health += element.health;
                    this.sound.play('dudu');
                    // 在父场景中调用子场景的方法，并传递数据
                    // 这种调用不会阻塞父场景，是异步调用，父场景立马返回
                    this.scene.get('DataScene').refreshData();
                    this.scene.get('ChainScene').chainOperation();
                }
            })
        }
    }

    //拖动鼠标开始，在摄像头没有跟踪精灵的情况下，用鼠标拖动摄像头方向
    startDrag(pointer) {
        if (this.destroyed) return;
        console.log('click:', pointer.worldX, ',', pointer.worldY);
        this.isDragging = true;
        this.dragStartX = pointer.worldX;
        this.dragStartY = pointer.worldY;
        this.dragStartCameraX = this.cameras.main.scrollX;
        this.dragStartCameraY = this.cameras.main.scrollY;
        this.input.on('pointermove', this.dragCamera, this);
    }

    //拖动鼠标时移动摄像头方向
    dragCamera(pointer) {
        if (this.destroyed) return;
        if (this.isDragging) {
            const dragX = this.dragStartX - pointer.worldX;
            const dragY = this.dragStartY - pointer.worldY;

            const dragThreshold = 10; // 设置拖动阈值，超过阈值才开始拖动
            if (Math.abs(dragX) > dragThreshold || Math.abs(dragY) > dragThreshold) {
                const dragFactor = 1.0; // 设置拖动系数，用于控制拖动速度

                // 计算平滑移动后的摄像机位置
                const targetCameraX = this.dragStartCameraX + (dragX * dragFactor);
                const targetCameraY = this.dragStartCameraY + (dragY * dragFactor);

                // 使用缓动效果平滑移动摄像机位置
                this.tweens.add({
                    targets: this.cameras.main,
                    scrollX: targetCameraX,
                    scrollY: targetCameraY,
                    duration: 200, // 设置缓动动画的持续时间
                    ease: 'Power2', // 设置缓动动画的缓动函数
                });
            }
        }
    }

    //停止拖动鼠标
    stopDrag() {
        if (this.destroyed) return;
        this.isDragging = false;
        this.input.off('pointermove', this.dragCamera, this);
    }

    //随机生成在画布内的位置。
    getRandomPostion() {
        const width = 32, height = 32;
        let randomx = Phaser.Math.Between(0 - width * height, width * height);
        let randomy = Phaser.Math.Between(Math.abs(randomx) / 2, width * height - Math.abs(randomx) / 2);
        if (randomx > 0) {
            randomx = randomx - (randomx > 900 ? 100 : 50);
        } else {
            randomx = randomx + (randomx < -900 ? 100 : 50);
        }
        if (randomy > width * height / 2) {
            randomy = randomy - 50;
        } else {
            randomy = randomy + 50;
        }
        return {randomx, randomy};
    }

    addPresentShow(key) {
        const parts = key.split('_'); // 将字符串按照下划线 "_" 进行分割
        const random = parseInt(parts[1]);
        const x = parseInt(parts[2]);
        const y = parseInt(parts[3]);
        const sprite = this.add.sprite(x, y, 'gems').setScale(0.6);
        sprite.play(key);
        SpineTask.presentArray[random].taskhandle = sprite;
        this.sound.play('diamond');
    }

    constructor() {
        super({
            key: 'Game',
            pack: {
                files: [
                    {
                        type: 'scenePlugin',
                        key: 'SpinePlugin',
                        url: '/plugins/3.8.95/SpinePluginDebug.js',
                        sceneKey: 'spine'
                    }
                ]
            }
        });
    }

    preload() {
        console.log('game preload.');
        //this.load.setPath('../assets/');
        this.load.setPath(env.assetPath);
        this.load.audio('flute', 'game/flute.mp3');
        this.load.audio('putong', 'game/putong.m4a');
        this.load.audio('diamond', 'game/diamond.m4a');
        this.load.audio('door', 'game/door.m4a');
        this.load.audio('dudu', 'game/dudu.m4a');

        this.load.image('house', 'game/rem_0002.png');
        this.load.image('tiles', 'game/iso-64x64-outside.png');
        this.load.image('tiles2', 'game/iso-64x64-building.png');
        this.load.tilemapTiledJSON('map', 'game/isorpg.json');
        this.load.spine('atlas', 'game/demos.json', ['game/atlas1.atlas'], true);

        this.load.atlas('gems', 'game/gems.png', 'game/gems.json');
        this.load.bitmapFont('desyrel', 'intro/desyrel.png', 'intro/desyrel.xml');
    }

    create() {
        this.destroyed = false;
        this.openTreasure = false;
        this.openPuzzle = false;
        this.openMarket = false;
        console.log('game create.');
        this.sound.play('flute', {loop: true, volume: 0.05});

        //地图
        const map = this.add.tilemap('map');
        const tileset1 = map.addTilesetImage('iso-64x64-outside', 'tiles');
        const tileset2 = map.addTilesetImage('iso-64x64-building', 'tiles2');

        const layer1 = map.createLayer('Tile Layer 1', [tileset1, tileset2]);
        const layer2 = map.createLayer('Tile Layer 2', [tileset1, tileset2]);
        const layer3 = map.createLayer('Tile Layer 3', [tileset1, tileset2]);
        const layer4 = map.createLayer('Tile Layer 4', [tileset1, tileset2]);
        const layer5 = map.createLayer('Tile Layer 5', [tileset1, tileset2]);

        //监听鼠标拖动事件
        this.input.mouse.disableContextMenu(); // 禁用鼠标右键菜单
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            if (this.destroyed) return;
            const zoomFactor = 0.1; // 调整缩放因子以适应你的需求
            if (deltaY < 0 && this.cameras.main.zoom < 2.0) {
                this.cameras.main.zoom += zoomFactor; // 向上滚动放大
            } else if (deltaY > 0 && this.cameras.main.zoom > 0.5) {
                this.cameras.main.zoom -= zoomFactor; // 向下滚动缩小
            }
            //console.log('x=',this.spineinfo.x,',y=',this.spineinfo.y,'scrollX=',this.cameras.main.scrollX,',scrollY=',this.cameras.main.scrollY)
        });
        this.input.on('pointerdown', this.startDrag, this); // 鼠标按下事件
        this.input.on('pointerup', this.stopDrag, this); // 鼠标释放事件

        //初始化精灵位置
        this.spinePosX = -290;
        this.spinePosY = 210;
        this.spineAction = 'idle';
        this.spineIdle = new CustomSpineIdle(this, 0, 0, 'atlas.spineboy', 'idle', true);
        this.spineIdle.spine.setScale(0.15);
        // this.spineWalk.spine.setScale(0.15);
        // this.spineWalk = new CustomSpineWalk(this, 0, 0, 'atlas.spineboy', 'walk', true);
        this.spineRun = new CustomSpineRun(this, 0, 0, 'atlas.spineboy', 'run', true);
        this.spineRun.spine.setScale(0.15);
        this.setSpineVisible(this.spineAction, this.spinePosX, this.spinePosY, '');

        //
        // 创建键盘对象
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wKey = this.input.keyboard.addKey('W'); // 创建表示 W 键的 Phaser.Input.Keyboard.Key 对象
        this.sKey = this.input.keyboard.addKey('S'); // 创建表示 S 键的 Phaser.Input.Keyboard.Key 对象
        this.aKey = this.input.keyboard.addKey('A'); // 创建表示 A 键的 Phaser.Input.Keyboard.Key 对象
        this.dKey = this.input.keyboard.addKey('D'); // 创建表示 D 键的 Phaser.Input.Keyboard.Key 对象
        // 创建标志变量来跟踪按键状态
        this.isMoving = false;
        // 监听按键按下事件
        this.input.keyboard.on('keydown', this.handleKeyDown, this);
        // 监听按键弹起事件
        this.input.keyboard.on('keyup', this.handleKeyUp, this);
        // 监听空格键的按下事件
        this.input.keyboard.on('keydown-SPACE', this.handleSpaceKey, this);

        //
        this.anims.on(Phaser.Animations.Events.ADD_ANIMATION, this.addPresentShow, this);

        // 初始化摄像头
        this.cameras.main.setSize(this.game.config.width, this.game.config.height);
        this.cameras.main.setZoom(1.0);
        this.bResetCamera = true;
        //
        this.cameras.main.scrollX = 0 - this.game.config.width / 2;
        this.cameras.main.scrollY = 0;
        this.cameraOffsetX = this.spinePosX - this.cameras.main.scrollX;
        this.cameraOffsetY = this.spinePosY - this.cameras.main.scrollY;
        console.log('camera offset:x=', this.cameraOffsetX, ',y=', this.cameraOffsetY);

        // 创建定时器
        this.presentArray = new Array();
        this.taskArray = new Array();
        this.time.addEvent({
            delay: Phaser.Math.Between(8000, 15000), // 随机延迟时间，范围为 8000 到 15000 毫秒
            callback: this.triggerPresentEvent, // 触发事件的回调函数
            callbackScope: this, // 回调函数的作用域
            loop: true // 设置为重复触发
        });
        this.time.addEvent({
            delay: Phaser.Math.Between(20000, 30000), // 随机延迟时间，范围为 20000 到 30000 毫秒
            callback: this.triggerTaskEvent, // 触发事件的回调函数
            callbackScope: this, // 回调函数的作用域
            loop: true // 设置为重复触发
        });
        this.time.addEvent({
            delay: 3000,
            callback: this.triggerErase, // 触发事件的回调函数
            callbackScope: this, // 回调函数的作用域
            loop: true // 设置为重复触发
        });
        this.time.addEvent({
            delay: 1000, //随机延迟时间为 1000 毫秒
            callback: this.triggerChain, // 触发事件的回调函数
            callbackScope: this, // 回调函数的作用域
            loop: true // 设置为重复触发
        });
        this.cameras.main.fadeIn(3000);
        //创建三个子场景，分别放在左上角和右上角
        this.scene.launch('DataScene');
        this.scene.launch('ChainScene');
        this.scene.launch('NftScene');
    }

    //键盘按下
    handleKeyDown(event) {
        if (this.destroyed) return;
        switch (event.code) {
            /*
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
             */
            case 'KeyW':
            case 'KeyS':
            case 'KeyA':
            case 'KeyD':
                this.isMoving = true;
                break;
            default:
                break;
        }
        //console.log('handleKeyDown,event.code:', event.code, 'isMoving:', this.isMoving);
    }

    //键盘拿起
    handleKeyUp(event) {
        if (this.destroyed) return;
        switch (event.code) {
            /*
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
             */
            case 'KeyW':
            case 'KeyS':
            case 'KeyA':
            case 'KeyD':
                this.isMoving = false;
                this.update(1, 1); // 手动调用update函数
                break;
            default:
                break;
        }
        //console.log('handleKeyUp,event.code:', event.code, 'isMoving:', this.isMoving);
    }

    //监听space按键
    handleSpaceKey(event){
        if (this.destroyed) return;
        if(this.openMarket) return;
        this.openMarket = true;
        //暂停该场景，不然会继续执行定时器，也会继续响应键盘和鼠标事件
        //this.scene.pause仅会暂停场景的更新和渲染，而不会自动暂停场景中的其他功能，例如音频播放
        this.cameras.main.fadeOut(100); //渐变到子场景，因为fadeOut也是异步，所以需要setTimeout配合
        setTimeout(() => {
            this.scene.pause('Game');
            this.scene.launch('MarketScene');
        }, 100);
    }

    update(time, delta) {
        if (this.destroyed) return;
        if (this.openTreasure == true || this.openPuzzle == true) {
            const typeName = this.openTreasure ? 'treasure' : 'puzzle';
            console.log('updated by close ' + typeName + '.');
            SpineTask.taskArray.forEach((element, index) => {
                if (element.type === typeName && element.taskhandleStatus == SpineTask.USEStatus.USING) {
                    if (element.taskSuccessful == true) {
                        this.scene.get('NftScene').nftMint(index);
                    }
                    element.taskhandleStatus = SpineTask.USEStatus.USED;
                    const points = element.taskSuccessful ? 20 : (0 - 30);
                    if (this.openTreasure) {
                        window.customParam.fighting += points; //战斗力：初始化100，成功完成寻宝任务增加20，并有nft奖励，没有完成减少30
                        window.customParam.fighting = window.customParam.fighting < 0 ? 0 : window.customParam.fighting; //小于0就应该game over，这里为了测试，能够继续玩下去
                    } else {
                        window.customParam.intelligence += points; //智力值：初始化100，答对谜题增加20，并有nft奖励，打错谜题减少30
                        window.customParam.intelligence = window.customParam.intelligence < 0 ? 0 : window.customParam.intelligence; //小于0就应该game over，这里为了测试，能够继续玩下去
                    }
                }
            });
            // 在父场景中调用子场景的方法，并传递数据
            // 这种调用不会阻塞父场景，是异步调用，父场景立马返回
            this.scene.get('DataScene').refreshData();
            this.openPuzzle = false;   //不可能两个都是true
            this.openTreasure = false; //打开子场景的时候调用fadeOut，需要再渐变回来
            this.cameras.main.fadeIn(500);
        }
        if(this.openMarket==true){
            this.openMarket = false; //打开子场景的时候调用fadeOut，需要再渐变回来
            this.cameras.main.fadeIn(500);
        }

        //按照精灵奔跑速度设置精灵位置
        let direction = '';
        const spineRunSpeed = 3;
        if (this.wKey.isDown) {  //this.cursors.up.isDown
            this.spinePosY -= spineRunSpeed;
        } else if (this.sKey.isDown) {  //this.cursors.down.isDown
            this.spinePosY += spineRunSpeed;
        } else if (this.aKey.isDown) { //this.cursors.left.isDown
            direction = 'left';
            this.spinePosX -= spineRunSpeed;
        } else if (this.dKey.isDown) {  //this.cursors.right.isDown
            direction = 'right';
            this.spinePosX += spineRunSpeed;
        } else if (time != 1 || delta != 1) {
            //handleKeyUp的手动调用update函数
            return;
        }
        if (this.isMoving) {
            this.spineAction = 'run';
            this.setSpineVisible(this.spineAction, this.spinePosX, this.spinePosY, direction);
        } else {
            this.spineAction = 'idle';
            this.setSpineVisible(this.spineAction, this.spinePosX, this.spinePosY, direction);
        }
        // 设置摄像机位置为精灵的位置加上偏移量，摄像头跟踪精灵
        //不设置跟随，直接通过鼠标拖动摄像头
        //if (this.bResetCamera) {
        if (false) {
            this.bResetCamera = false;
            this.cameras.main.startFollow(this.spineRun.spine, false, 1, 1, 0 - this.cameraOffsetX + 10, 0 - this.cameraOffsetY + 10);
        }
    }

    //定时调用数据上链
    triggerChain() {
        //1000毫秒调用一次
        window.customParam.health -= 1;    //生命值：初始化100，每分钟自动减少60，捡到礼盒增加随机数
        window.customParam.health = window.customParam.health < 0 ? 0 : window.customParam.health; //小于0就应该game over，这里为了测试，能够继续玩下去
        // 在父场景中调用子场景的方法，并传递数据
        // 这种调用不会阻塞父场景，是异步调用，父场景立马返回
        this.scene.get('DataScene').refreshData();
        //this.scene.get('ChainScene').chainOperation();
    }

    //定时删除礼物和人物
    triggerErase() {
        const currtime = Date.now();
        this.taskArray.forEach((element) => {
            if (element.deadline <= currtime) {
                console.log('remove task:nft=', element.nft, ',x=', element.taskhandlePosX, ',y=', element.taskhandlePosY);
                element.taskhandleStatus = SpineTask.USEStatus.USED;
                element.taskhandle?.destroy(); //自动消失
            }
        });
        this.taskArray = this.taskArray.filter((element) => element.deadline > currtime);
        //
        this.presentArray.forEach((element) => {
            if (element.deadline <= currtime) {
                console.log('remove present:health=', element.health, ',x=', element.taskhandlePosX, ',y=', element.taskhandlePosY);
                element.taskhandleStatus = SpineTask.USEStatus.USED;
                element.taskhandle?.stop();
                element.taskhandle?.destroy(); //自动消失
            }
        });
        this.presentArray = this.presentArray.filter((element) => element.deadline > currtime);
    }

    // 定时器触发事件的回调函数
    triggerPresentEvent() {
        //console.log('Present Event triggered!');
        const indexArray = new Array();
        SpineTask.presentArray.forEach((element, index) => {
            if (element.taskhandleStatus == SpineTask.USEStatus.UNUSE) indexArray.push(index);
        });
        if (indexArray.length == 0 || this.presentArray.length >= 10) return; //每个礼物只能出现一次，画布上的礼物不能超过10个
        const random = Phaser.Math.RND.pick(indexArray);
        console.log('show present:index=', random);

        const currtime = Date.now();
        const {randomx, randomy} = this.getRandomPostion();
        const diamondkey = 'diamond_' + random + '_' + randomx + '_' + randomy;
        console.log('diamondkey:', diamondkey)
        this.anims.create({
            key: diamondkey,
            frames: this.anims.generateFrameNames('gems', {prefix: 'diamond_', end: 15, zeroPad: 4}),
            repeat: -1
        });
        SpineTask.presentArray[random].deadline = currtime + Phaser.Math.Between(20, 50) * 1000;
        SpineTask.presentArray[random].taskhandlePosX = randomx;
        SpineTask.presentArray[random].taskhandlePosY = randomy;
        SpineTask.presentArray[random].taskhandleStatus = SpineTask.USEStatus.SHOW;
        this.presentArray.push(SpineTask.presentArray[random]);
        console.log('length:', this.presentArray.length, ',', SpineTask.presentArray[random]);
    }

    // 定时器触发事件的回调函数
    triggerTaskEvent() {
        //console.log('Task Event triggered!');
        const indexArray = new Array();
        SpineTask.taskArray.forEach((element, index) => {
            if (element.taskhandleStatus == SpineTask.USEStatus.UNUSE) indexArray.push(index);
        });
        if (indexArray.length == 0 || this.taskArray.length >= 3) return; //每个任务只能出现一次，画布上的任务不能超过3个
        const random = Phaser.Math.RND.pick(indexArray);
        console.log('show task:index=', random);

        const currtime = Date.now();
        const {randomx, randomy} = this.getRandomPostion();
        const house = this.add.image(randomx, randomy - 200, 'house');
        house.setScale(0.75);
        //house.depth = house.y + 80;
        // 定义动画配置
        const animConfig = {
            targets: house,
            y: house.y + 200,  // 目标位置的y坐标
            duration: 300,  // 动画持续时间，单位为毫秒
            ease: 'Linear',  // 缓动函数，可以根据需要选择不同的缓动效果
            onComplete: () => { //箭头函数才会继承外部作用域的 this 上下文
                this.sound.play('putong');
            }
        };
        this.tweens.add(animConfig);

        SpineTask.taskArray[random].deadline = currtime + Phaser.Math.Between(30, 100) * 1000;
        SpineTask.taskArray[random].taskhandle = house;
        SpineTask.taskArray[random].taskhandlePosX = randomx; //PosX和posY保存的是图片的中心点，不知道为啥PosX不能加上(house.width / 2 * 0.75)
        SpineTask.taskArray[random].taskhandlePosY = randomy + (house.height / 2 * 0.75);
        SpineTask.taskArray[random].taskhandleStatus = SpineTask.USEStatus.SHOW;
        this.taskArray.push(SpineTask.taskArray[random]);
        console.log('length:', this.taskArray.length, ',nft=', SpineTask.taskArray[random].nft, ',house:x=', SpineTask.taskArray[random].taskhandlePosX, ',y=', SpineTask.taskArray[random].taskhandlePosY);
    }

    gameOver() {
        // 在父场景中删除子场景
        //不能删除，子场景还在运行，会报错
        //this.scene.remove('DataScene');
        //this.scene.remove('ChainScene');
        ///this.scene.remove('NftScene');
        this.scene.get('DataScene').doHide();
        this.scene.get('ChainScene').doHide();
        this.scene.get('NftScene').doHide();

        this.destroyed = true;
        // 一次性删除当前场景中的所有时间事件
        this.time.removeAllEvents();
        this.overText = this.add.bitmapText(0, 400, 'desyrel', 'Game Over!', 100).setOrigin(0.5).setCenterAlign().setDepth(1);
        this.tweens.add({
            targets: this.overText,
            alpha: 1,
            duration: 300
        });

        this.input.once('pointerdown', () => {
            // 停止当前场景
            this.sound.stopAll();
            this.scene.stop();
            this.scene.start('Boot');
            //好奇怪，重新开始游戏之后，精灵显示不出来
        });
    }
};
