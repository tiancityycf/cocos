var FlipCard=cc.Class({
    extends: cc.Component,

    properties: {
        //label: {
        //    default: null,
        //    type: cc.Label
        //},
        //t_prefab:{
        //    default:null,
        //    type:cc.Prefab
        //},

        card:{
            default:[],
            type:cc.Node
        },
        speed: 0.1,
        duration:20,

        timing:false,

        timer: {
            default: null,
            type: cc.Node
        },
        timersp: {
            default: null,
            type: cc.Sprite
        },

        //t_sprite:{//定义一个cc的类型，并定义上常用属性
        //    default:null,
        //    type:cc.SpriteFrame,//类型的定义
        //    url:cc.Texture2D, //Raw Asset(cc.Texture2D, cc.Font, cc.AudioClip)
        //    enabled:true,//属性检查器中是否可见
        //    displayName:'himi',//属性检查器中属性的名字
        //    tooltip:"测试脚本",//属性检查器中停留此属性名称显示的提示文字
        //    readonly:false,//属性检查器中显示（readonly）且不可修改[当前有bug，设定只读也能修改]
        //    serializable:true,//设置false就是临时变量
        //    editorOnly:false//导出项目前剔除此属性
        //},
        //
        //t_url:{
        //    default:null,
        //    url:cc.Texture2D
        //},
        //
        //t_count_2:200,//基础类型
        //
        ////可以只定义 get 方法，这样相当于一份 readonly 的属性。[当前有bug，只设定get也能修改]
        //t_getSet:{
        //    default:12,
        //    get:function(){return this.t_getSet},//get
        //    set:function(value){this.t_getSet =value;}//set
        //},
        //
        //t_array:{//定义一个数组
        //    default:[],
        //    type:[cc.Sprite]
        //},
        //game_card_reverse:{
        //    default:null,
        //    type:cc.Node
        //}
    },

    // use this for initialization
    onLoad: function () {

        //this.check(6,1);
        //--->>> 获取组件的几种形式:
        //1. 通过属性检查器被赋值的label组件，直接拿到得到实例
        //2. 通过属性检查器被赋值的label组件所在的node节点，然后通过getComponent获取
        // this.label.string = this.text;

        //3. 获取当前this(node)节点上的label组件
        // var _label = this.getComponent(cc.Label);

        //4. 先获取目标组件所在的节点，然后通过getComponent获取目标组件
        //var _label = cc.find("Canvas/label").getComponent(cc.Label);

        //5.也可以如下形式【注意此种方式，目前有BUG，无法正常使用 (0.7.1) 】
        // var _label = cc.find("Canvas/label<cc.Label>");
        
        //var _label = cc.find("Canvas/card_49").getComponent(cc.Sprite);

        //cc.log(_label instanceof cc.Sprite);       // true
        //console.log(_label.Position);
        //console.log(this.t_getSet);
        //cc.log("haha")
        //--->>>全局变量的访问
        /* 任意脚本中定义如下：【注意不要有var哦】*/

        // t_global = {
        //  tw:100,
        //  th:200
        // };

         
        // t_global.th = 2000;
        // console.log(t_global.th);

        // //--->>>模块之间的访问
        // /*任意脚本中定义如下 【注意关键字是module.exports】

        //  module.exports= {
        //  tme_pa1:"100",
        //  tme_pa2:333221
        //  };

        //  */
        // //--->>>用 require + 文件名(不含路径) 来获取到其他 模块 的对象
        // var tModuleData = require("testJs");
        // tModuleData.tme_pa2 = 991;
        // console.log(tModuleData.tme_pa2);


        // //--->>>在当前节点下添加一个组件
        // var mySprite = new cc.Node().addComponent(cc.Sprite);
        // mySprite.spriteFrame = this.t_sprite;
        // mySprite.node.parent = this.node;
        // mySprite.node.setPosition(300,200);


        // //--->>>复制节点/或者复制 prefab
        // //复制节点
        // var lLabel = cc.instantiate(this.label);
        // lLabel.node.parent = this.node;
        // lLabel.node.setPosition(-200,0);
        // //复制prefab
        // var tPrefab = cc.instantiate(this.t_prefab);
        // tPrefab.parent = this.node;
        // tPrefab.setPosition(-210,100);


        // //--->>>  销毁节点(销毁节点并不会立刻发生，而是在当前 帧逻辑更新结束后，统一执行)
        // if (cc.isValid(this.label.node) ) {
        //     console.log("有效存在，进行摧毁");
        //     this.label.destroy();
        // }else{
        //     console.log("已摧毁");
        // }

        // //--->>> 事件监听 on 4种形式
        // //枚举类型注册
        // var tFun =function (event){
        //     console.log("touchend event:"+event.touch.getLocation().x +"|"+event.touch.getLocation().y);
        // };
        // this.node.on(cc.Node.EventType.TOUCH_END,tFun,this);

        // //事件名注册
        // // var tFun =function (event){
        // //   console.log("touchend event");
        // // };
        // // this.node.on("touchend",tFun);

        // // this.node.on("touchend",function (event){
        // //   console.log("touchend event");
        // // });

        // // this.node.on("touchend",function (event){
        // //   console.log("touchend event");
        // // },this);

        // // this.node.on("touchend",function (event){
        // //   console.log("touchend event");
        // // }.bind(this));

        // //--->>> 一次性的事件监听 once
        // // this.node.once("touchend",function (event){
        // //   console.log("touchend event");
        // // });


        // //--->>> 关闭监听
        // this.node.off("touchend",tFun,this);


        // //--->>> 发射事件（事件手动触发)
        // this.node.on("tEmitFun",function (event){
        //     console.log("tEmitFun event:"+event.detail.himi+"|"+event.detail.say);

        //     //-->>> 事件中断,如下函数阻止事件向当前父级进行事件传递
        //     // event.stopPropagation();
        // });
        // this.node.emit("tEmitFun",{himi:27,say:"hello,cc!"});


        // //--->>> 动作，类似c2dx api 基本无变化
        // var mTo = cc.moveBy(1,-100, -200);
        // var mAction = cc.repeatForever(cc.sequence(cc.moveBy(1,-100, -200),mTo.reverse(),cc.delayTime(0.5),cc.callFunc(function(action,data){
        //     console.log("action callback:"+data.himi);
        // },this,{tx:100,himi:"i'm action callback and bring data"})));
        // mySprite.node.runAction(mAction);
        // //暂停动作
        // mySprite.node.stopAction(mAction);



        //--->>> url raw资源获取
        
         //获得 Raw Asset 的 url
        
        
        // var mSf = new cc.Node().addComponent(cc.Sprite);

        // var texture = cc.textureCache.addImage(cc.url.raw("resources/card_02.png"));
        // console.log("raw asset url:"+texture);
        
        // //this.t_url=mUrl;
        
        // var frame  = new cc.SpriteFrame(texture, cc.Rect(0, 0, 87, 123));     
        
        // mSf.spriteFrame =   frame;
        // //mSf.spriteFrame.setTexture(this.t_url);
        // //mSf.url=mUrl;
        // mSf.node.setPosition(98,0);
        // mSf.node.parent = this.node.parent;
       
    },


    //圆形头像 cc.Mask 例子
    mainstart:function(){

        this.unschedule(this.flopstart);
        this.unschedule(this.turnstart);
        this.unschedule(this.riverstart);
        this.unschedule(callback);
        this.unschedule(callback2);


        this.card[0].removeAllChildren(true);
        this.card[1].removeAllChildren(true);
        this.card[2].removeAllChildren(true);
        this.card[3].removeAllChildren(true);
        this.card[4].removeAllChildren(true);

        this.card[0].stopAllActions();
        this.card[1].stopAllActions();
        this.card[2].stopAllActions();
        this.card[3].stopAllActions();
        this.card[4].stopAllActions();

        var callback=function(){
            this.duration=6;
            this.check(0);
        };

        var callback2=function(){
            this.duration=10;
            this.check(1);
        };

        this.scheduleOnce(callback, 0);

        this.scheduleOnce(callback2, 6);

        this.scheduleOnce(this.flopstart, 0);

        this.scheduleOnce(this.turnstart, 3);

        this.scheduleOnce(this.riverstart, 4);


    },
    check:function(sit){
        var table_bg=this.node.parent.getChildByName("table_bg");
        var pos=table_bg.getChildByName("seat_"+sit).getPosition();//获取坐标
        table_bg.getChildByName("seat_"+sit).opacity=100;
        //cc.log(pos);
        this.timestart(pos);

     },
     //flop三张牌移动效果
     flopstart:function(){

         var node1=new cc.Node();
         //var node1=new cc.Node();
         var mSf1 = node1.addComponent(cc.Sprite);

         var node2=new cc.Node();
         var mSf2 = node2.addComponent(cc.Sprite);

         var node3=new cc.Node();
         var mSf3 = node3.addComponent(cc.Sprite);
        
        cc.loader.loadRes("game_cards", cc.SpriteAtlas, function (err, atlas) {
            var frame1 = atlas.getSpriteFrame('card_01');
            var frame2 = atlas.getSpriteFrame('card_03');
            var frame3 = atlas.getSpriteFrame('card_05');
            mSf1.spriteFrame = frame1;
            mSf2.spriteFrame = frame2;
            mSf3.spriteFrame = frame3;
        });
        
        mSf1.enabled=true;
        //node1.active=true;
        //node1.parent = this.node.parent;
        //node1.setPosition(-200,50);
        node1.parent=this.card[0];

        mSf2.enabled=true;
        //node2.active=true;
        //node2.parent = this.node.parent;
        //node2.setPosition(-200,50);
         node2.parent=this.card[1];

        mSf3.enabled=true;
        //node3.active=true;
        //node3.parent = this.node.parent;
        //node3.setPosition(-200,50);
         node3.parent=this.card[2];
                
        //var action1=cc.moveTo(1, cc.p(-100, 50));
        //var action2=cc.moveTo(2, cc.p(0, 50));
         var action1=cc.moveTo(1, cc.p(100, 0));
         var action2=cc.moveTo(2, cc.p(200, 0));

         node1.runAction(action1);
         node2.runAction(action2);
       
    },
    //翻牌效果 
    turnstart:function(){
        var node=new cc.Node();
        var mSf = node.addComponent(cc.Sprite);
        cc.loader.loadRes("GameMain", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('game_card_reverse');
            mSf.spriteFrame = frame;
        });
        
        mSf.enabled=true;
        node.active=true;
        node.parent = this.node.parent;
        node.setPosition(100,50);

        var turn = cc.callFunc(this.showturn, this, node);

        var action1=cc.rotateTo(0.3, 0, 180);

        var seq=cc.sequence(action1,turn);

        node.runAction(seq);

    },
    //翻牌效果 回调
    showturn:function(node){
        var node1=new cc.Node();
        node1.parent=this.card[3];
        var mSf = node1.addComponent(cc.Sprite);
        cc.loader.loadRes("game_cards", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('card_04');
            mSf.spriteFrame = frame;
        });
        
        //mSf.node.setPosition(node.x,node.y);
         
        //mSf.enabled=false;
        
        //mSf.node.parent = this.node.parent;
     
        //mSf.enabled=true;
        node.active=false;
        
    },
    //翻牌效果
    riverstart:function(){
        var node=new cc.Node();
        var mSf = node.addComponent(cc.Sprite);
        cc.loader.loadRes("GameMain", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('game_card_reverse');
            mSf.spriteFrame = frame;
        });
        
        mSf.enabled=true;
        node.active=true;
        //node.parent = this.card[4];
        node.parent=this.node.parent;
        node.setPosition(200,50);
        
        var turn = cc.callFunc(this.showriver, this, node);

        var action1=cc.rotateTo(0.3, 0, 180);
      
        var seq=cc.sequence(action1,turn);
        
        node.runAction(seq);

    },
    //翻牌效果 回调
    showriver:function(node){
        var node1=new cc.Node();
        node1.parent=this.card[4];
        var mSf = node1.addComponent(cc.Sprite);
        cc.loader.loadRes("game_cards", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('card_02');
            mSf.spriteFrame = frame;
        });

        node.active=false;

    },


    timestart:function(pos){
        this.timer=new cc.Node();

        this.timer.scale=1.2;

        var sp = this.timer.addComponent(cc.Sprite);
        sp.type=cc.Sprite.Type.FILLED;
        sp.fillType=cc.Sprite.FillType.RADIAL;
        sp.fillCenter = new cc.Vec2(0.5, 0.5);
        sp.fillStart = 0;
        sp.fillRange = 0;
        cc.loader.loadRes("GameMain", cc.SpriteAtlas, function (err, atlas) {
            var frame1 = atlas.getSpriteFrame('game_progress_frame');
            sp.spriteFrame = frame1;
        });
        this.timersp=sp;
        this.timer.parent=this.node.parent;
        this.timer.position=pos;
        this.timing=true;
    },
    update: function (dt) {
        //cc.log(this.timer);
        if (this.timing) {
           this._updateTimer(dt);
        };
        //this._updateFillRange(this.radial_round, 1, dt);
    },
    //原型进度条
    _updateTimer: function (dt) {
        var max=-1*(this.duration/20)
        if(this.timing){
            var fillRange = this.timersp.fillRange;
            if(fillRange>max){
                //顺时针转
                fillRange = fillRange < 1 ? fillRange -= (dt * this.speed) : 0;
                this.timersp.fillRange = fillRange;
            }else{
                this.timing=false;
                this.timersp.destroy();
                this.timer.destroy();
            }
        }

    },
    //原型进度条
    _updateFillRange: function (sprite, range, dt) {

        var fillRange = sprite.fillRange;
        //逆时针转
        //fillRange = fillRange < range ? fillRange += (dt * this.speed) : 0;
        //顺时针转
        fillRange = fillRange < range ? fillRange -= (dt * this.speed) : 0;
        sprite.fillRange = fillRange;
    }
   
});