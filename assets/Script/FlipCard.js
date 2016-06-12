cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        text: 'Hello, World!',

        t_prefab:{
            default:null,
            type:cc.Prefab
        },
        
        cardBG:cc.Sprite,

        t_sprite:{//定义一个cc的类型，并定义上常用属性
            default:null,
            type:cc.SpriteFrame,//类型的定义
            url:cc.Texture2D, //Raw Asset(cc.Texture2D, cc.Font, cc.AudioClip)
            enabled:true,//属性检查器中是否可见
            displayName:'himi',//属性检查器中属性的名字
            tooltip:"测试脚本",//属性检查器中停留此属性名称显示的提示文字
            readonly:false,//属性检查器中显示（readonly）且不可修改[当前有bug，设定只读也能修改]
            serializable:true,//设置false就是临时变量
            editorOnly:false//导出项目前剔除此属性
        },

        t_url:{
            default:null,
            url:cc.Texture2D
        },

        t_count_2:200,//基础类型

        //可以只定义 get 方法，这样相当于一份 readonly 的属性。[当前有bug，只设定get也能修改]
        t_getSet:{
            default:12,
            get:function(){return this.t_getSet},//get
            set:function(value){this.t_getSet =value;}//set
        },

        t_array:{//定义一个数组
            default:[],
            type:[cc.Sprite]
        },
        game_card_reverse:{
            default:null,
            type:cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.flopstart();
        this.turnstart();
        this.riverstart();

        
        
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


        // //--->>> 计时器 (component)schedule (cc.Node 不包含计时器相关 API)
        // //参数： call funtion/interval/repeat times/delay time
        // //不延迟，永久重复
        // this.schedule(function(){
        //     console.log("schedule log...");
        // },1);

        // //不延迟，有重复次数限定
        // // this.schedule(function(){
        // //     console.log("schedule log...");
        // // },1,2);

        // //重复2次，重复间隔为1秒，延迟1秒进行
        // // this.schedule(function(){
        // //     console.log("schedule log...");
        // // },1,2,1);

        // //一次性的计时器
        // var mySch =function(){ console.log("schedule Once log..."); }
        // this.scheduleOnce(mySch);

        // //取消定时器
        // this.unschedule(mySch);


        //--->>> url raw资源获取
        
         //获得 Raw Asset 的 url
        
        
        // var mSf = new cc.Node().addComponent(cc.Sprite);
        // //var mSf = new cc.Node().addComponent(this.cardBG);
        
        // var texture = cc.textureCache.addImage(cc.url.raw("resources/card_02.png"));
        // console.log("raw asset url:"+texture);
        
        // //this.t_url=mUrl;
        
        // var frame  = new cc.SpriteFrame(texture, cc.Rect(0, 0, 87, 123));     
        
        // mSf.spriteFrame =   frame;
        // //mSf.spriteFrame.setTexture(this.t_url);
        // //mSf.url=mUrl;
        // mSf.node.setPosition(98,0);
        // mSf.node.parent = this.node.parent;
        
        
        //mSf.node.setScale(0.5);
        // 加载 Texture，不需要后缀名
        // cc.loader.loadRes("card_02", function (err, texture) {
        //     //cc.log(err);
        //     cc.log(texture);

        //     cc.log("end");
        // });
       
       

    },
     flopstart:function(){
        var node1=new cc.Node();
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
        node1.active=true;
        node1.parent = this.node.parent;
        node1.setPosition(-200,53);

        mSf2.enabled=true;
        node2.active=true;
        node2.parent = this.node.parent;
        node2.setPosition(-200,53);

        mSf3.enabled=true;
        node3.active=true;
        node3.parent = this.node.parent;
        node3.setPosition(-200,53);
                
        var action1=cc.moveTo(1, cc.p(-95, 53));
        var action2=cc.moveTo(2, cc.p(5, 53));

        node1.runAction(action1);
        node2.runAction(action2);
       
    },
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
        node.setPosition(105,53);
        
        var turn = cc.callFunc(this.showturn, this, node);

        var action1=cc.rotateTo(0.3, 0, 180);
      
        var seq=cc.sequence(action1,turn);
        
        node.runAction(seq);

    },
    showturn:function(node){

        var mSf = new cc.Node().addComponent(cc.Sprite);
        cc.loader.loadRes("game_cards", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('card_04');
            mSf.spriteFrame = frame;
        });
        
        mSf.node.setPosition(node.x,node.y);
         
        mSf.enabled=false;
        
        mSf.node.parent = this.node.parent;
     
        mSf.enabled=true;
  
        node.active=false;
        
    },
    riverstart:function(){

        var node=new cc.Node();
        var mSf = node.addComponent(cc.Sprite);
        cc.loader.loadRes("GameMain", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('game_card_reverse');
            mSf.spriteFrame = frame;
        });
        
        mSf.enabled=true;
        node.active=true;
        node.parent = this.node.parent;
        node.setPosition(205,53);
        
        var turn = cc.callFunc(this.showriver, this, node);

        var action1=cc.rotateTo(0.3, 0, 180);
      
        var seq=cc.sequence(action1,turn);
        
        node.runAction(seq);

    },
    showriver:function(node){

        var mSf = new cc.Node().addComponent(cc.Sprite);
        cc.loader.loadRes("game_cards", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('card_02');
            mSf.spriteFrame = frame;
        });
        
        mSf.node.setPosition(node.x,node.y);
         
        mSf.enabled=false;
        
        mSf.node.parent = this.node.parent;
     
        mSf.enabled=true;
  
        node.active=false;

    },
    flip:function(){
        
        var node=this.node;
        
        var opt="";
        var turn = cc.callFunc(this.showturn, this, opt);

        var river = cc.callFunc(this.showriver, this, opt);


        var action1=cc.rotateTo(0.3, 0, 180);
        //var action2=cc.removeSelf(true);
        //var action2=cc.hide();

        //var action2=cc.delayTime(2);
        
        
        //var seq=cc.sequence(action1,action2,finished);
        var seq=cc.sequence(action1,turn,river);
        
        node.runAction(seq);
        
      
        // this.scheduleOnce(function() {
        //      // 这里的 this 指向 component
        //      this.showself();
        //  }, 2);

        // node2.runAction(action3);

       
        
        cc.log("xxx");
        //cc.moveTo(2, cc.p(80, 80),1);
        //cc.moveTo(2, cc.p(80, 80));

    },
    showself:function(){

        cc.log("回调");
        
        var mSf = new cc.Node().addComponent(cc.Sprite);

        var texture = cc.textureCache.addImage(cc.url.raw("resources/game_cards/card_04"));
       
        var frame  = new cc.SpriteFrame(texture, cc.Rect(0, 0, 87, 123));     
        
        mSf.spriteFrame =   frame;
        
        mSf.node.setPosition(98,0);
        
        //mSf.visible=false;
        mSf.enabled=false;
        
        mSf.node.parent = this.node.parent;
        
        //mSf.visible=true;
        mSf.enabled=true;

       
        this.game_card_reverse.active=false;

        console.log("回调函数");
        
    },
    
    // called every frame
    update: function (dt) {
        //this.flip();
    },
});
