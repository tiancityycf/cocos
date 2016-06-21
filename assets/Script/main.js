var CountDown = require('CountDown');

cc.Class({
    //extends: cc.Component,
    extends: CountDown,

    properties: {

        //t_prefab:{
        //    default:null,
        //    type:cc.Prefab
        //},

        data:null,

        card:{
            default:[],
            type:cc.Node
        },
        inpot:{
            default: null,
            type: cc.Node
        },

        table_chips:{
            default:[],
            type:[cc.Node]
        },

        table_tips:{
            default:[],
            type:[cc.Node]
        },
        //是否有动作正在进行
        action:false,





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
        //}

    },

    // use this for initialization
    onLoad: function () {

        //4. 先获取目标组件所在的节点，然后通过getComponent获取目标组件
        //var _label = cc.find("Canvas/label").getComponent(cc.Label);

        //5.也可以如下形式【注意此种方式，目前有BUG，无法正常使用 (0.7.1) 】
        // var _label = cc.find("Canvas/label<cc.Label>");

        //var _label = cc.find("Canvas/card_49").getComponent(cc.Sprite);

        //cc.log(_label instanceof cc.Sprite);       // true


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




        this.reqstart();

        this.inpotstart(3,0);

    },


    //    站起							5
    //    离开房间						6
    //    flop发牌命令					9
    //    turn发牌命令					10
    //    river发牌命令					11
    //    check						    12
    //    call							13
    //    raise						    14
    //    fold							15
    //    一手结束数据    				16
    //    发表情    					    17
    //    发道具  						18
    //    延时操作						19
    //    主动亮牌						24
    //    牌局结束                       25
    //    发道具（可连发和群发）           35
    //    聊天消息                       36

    //    "CMD" : 13,
    //    "chair_id" : 3,
    //    "chip" : 1,
    //    "current_action_chair" : 4,
    //    "current_pot" : 4,
    //    "pot" : 4,
    //    "timestamp" : 1466422796,
    actions:function(response){
        var starttime=0;
        var len=response["actions"].length;
        for(var i=0;i<len;i++){
            if(i==0){
                response["actions"][i]["duration"]=response["actions"][i]["timestamp"]-response["start"]["timestamp"];
            }else{
                response["actions"][i]["duration"]=response["actions"][i]["timestamp"]-response["actions"][i-1]["timestamp"];
            }
        };
        var ac=response["actions"];
        return false;
        var i=0;
        while(true){
            if(this.action){
                //有动作正在进行 则等待
            }else{
                this.action=true;
                switch(ac[i]["CMD"]){
                    case 5:
                        this.quit(ac[i]["chair_id"],ac[i]["duration"]);
                        break;
                    case 6:
                        this.quit(ac[i]["chair_id"],ac[i]["duration"]);
                        break;
                    case 9:
                        this.flopstart();
                        break;
                    case 10:
                        this.turnstart();
                        break;
                    case 11:
                        this.riverstart();
                        break;
                    case 12:
                        this.check(ac[i]["chair_id"],ac[i]["duration"]);
                        break;
                    case 13:
                        this.check(ac[i]["chair_id"],ac[i]["duration"]);
                        break;
                    case 14:
                        this.check(ac[i]["chair_id"],ac[i]["duration"]);
                        break;
                    case 15:
                        this.check(ac[i]["chair_id"],ac[i]["duration"]);
                        break;
                    default:
                        this.action=false;
                        break;
                };
                //执行下一个动作
                i++;
            }
        }
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

        //this.card[0].stopAllActions();
        //this.card[1].stopAllActions();
        //this.card[2].stopAllActions();
        //this.card[3].stopAllActions();
        //this.card[4].stopAllActions();




        var callback=function(){
            this.bet(0,3,50,100,2);
        };

        var callback2=function(){
            this.fold(1,5);
        };


        var callback3=function(){
            this.raise(6,2,150,200,5);
        };


        var callback4=function(){
            this.call(7,2,50,100,2);
        };


        //第一个动作
        this.scheduleOnce(callback, 0);

        this.scheduleOnce(callback2, 4);

        this.scheduleOnce(callback3, 10);

        this.scheduleOnce(callback4, 13);

        var ttp=function(){
            this.tableToPot(0,500);
        };
        this.scheduleOnce(ttp, 18);


        //this.scheduleOnce(this.flopstart, 13);
        //
        //this.scheduleOnce(this.turnstart, 15);
        //
        //this.scheduleOnce(this.riverstart,17);


    },
    //显示操作提示
    game_tip:function(sit,url,clean){
        var game_tip=this.node.parent.getChildByName("table_bg").getChildByName("seat_"+sit).getChildByName("game_tip");
        //var pos=table_bg.getChildByName("seat_"+sit).getPosition();//获取坐标
        var sp=game_tip.getComponent(cc.Sprite);
        if(sp){
            //sp.destroy();
        }else{
            sp=game_tip.addComponent(cc.Sprite);
        }
        cc.loader.loadRes("GameMain_cn", cc.SpriteAtlas, function (err, atlas) {
            sp.spriteFrame = atlas.getSpriteFrame(url);
        });
        if(clean){
            this.table_tips.push(game_tip);
        };
        //当前动作结束
        this.action=false;
    },
    //check
    check:function(sit,duration){
        this.countdown_over_task=null;
        var node_table_bg = this.node.parent.getChildByName("table_bg");
        this.add_countdown(node_table_bg,sit,duration);
        //var turn = cc.callFunc(this.showriver, this, node);

        var url="game_check_tip";
        var finished=function(){
            this.game_tip(sit,url,true);
        };
        this.countdown_over_task=finished;

    },
    //弃牌
    fold:function(sit,duration){
        this.countdown_over_task=null;

        var node_table_bg = this.node.parent.getChildByName("table_bg");
        this.add_countdown(node_table_bg,sit,duration);

        var url="game_fold_tip";
        var finished=function(){
            this.game_tip(sit,url,false);
        };
        this.countdown_over_task=finished;

    },
    bet:function(sit,duration,pot,inpot,handChips){
        this.countdown_over_task=null;

        var url="game_bet_tip";
        var node_table_bg = this.node.parent.getChildByName("table_bg");
        this.add_countdown(node_table_bg,sit,duration);

        var finished=function(){
            this.game_tip(sit,url,true);
            this.chipsToTable(sit,pot,inpot,handChips);
        };
        this.countdown_over_task=finished;
    },
    call:function(sit,duration,pot,inpot,handChips){
        this.countdown_over_task=null;

        var url="game_call_tip";
        var node_table_bg = this.node.parent.getChildByName("table_bg");
        this.add_countdown(node_table_bg,sit,duration);

        var finished=function(){
            this.game_tip(sit,url,true);
            this.chipsToTable(sit,pot,inpot,handChips);
        };
        this.countdown_over_task=finished;

    },

    raise:function(sit,duration,pot,inpot,handChips){
        this.countdown_over_task=null;

        var url="game_raise_tip";
        var node_table_bg = this.node.parent.getChildByName("table_bg");
        this.add_countdown(node_table_bg,sit,duration);

        var finished=function(){
            this.game_tip(sit,url,true);
            this.chipsToTable(sit,pot,inpot,handChips);
        };
        this.countdown_over_task=finished;

    },
    //结束比牌
    end:function(sit,duration){
        this.countdown_over_task=null;

        var table_bg=this.node.parent.getChildByName("table_bg");
        var pos=table_bg.getChildByName("seat_"+sit).getPosition();//获取坐标
        table_bg.getChildByName("seat_"+sit).opacity=100;
        //cc.log(pos);
        this.timestart(pos);
    },
    //站起
    quit:function(sit,duration){
        this.countdown_over_task=null;

        var table_bg=this.node.parent.getChildByName("table_bg");
        var seat=table_bg.getChildByName("seat_"+sit);
        seat.removeAllChildren(true);

        var finished=function(){
            this.add_countdown(node_table_bg,sit,duration);
        };
        this.countdown_over_task=finished;

    },
    //桌子上的筹码进入底池
    tableToPot:function(pot,inpot){

        if(this.table_tips){
            for(var i=0;i<this.table_tips.length;i++){
                var sp=this.table_tips[i].getComponent(cc.Sprite);
                if(sp){
                    sp.destroy();
                }
            }
            this.table_tips=[];
        };

        var destorySelf=function(node){
            if(node){
                node.destroy();
            }
        };
        var destroyChips=function(sp){
            var action=cc.moveTo(0.5, cc.p(0, 200));
            var hide = cc.callFunc(destorySelf, this, sp);
            var seq=cc.sequence(action,hide);
            //sp.runAction(action);
            sp.runAction(seq);
        };

        if(this.table_chips){
            for(var i=0;i<this.table_chips.length;i++){
                this.table_chips[i].removeAllChildren(true);
                destroyChips(this.table_chips[i]);
            }
        }
        this.table_chips=[];
    },


    //筹码下注到桌子
    chipsToTable:function(sit,pot,inpot,handPot){
        pot=Number(pot);
        inpot=Number(inpot);
        var audio="audio/audio_chipsToTable";
        //var chips="game_chip_tip";
        var table_bg=this.node.parent.getChildByName("table_bg");
        var chipNode=table_bg.getChildByName("chip_"+sit);

        var chipSp=chipNode.getComponent(cc.Sprite);
        if(chipSp){
            chipSp.destroy();
        };
        var pos=table_bg.getChildByName("seat_"+sit).getPosition();//获取坐标
        var chipPos=chipNode.getPosition();//获取坐标

        var node=new cc.Node();

        var sp = node.addComponent(cc.Sprite);
        cc.loader.loadRes("GameMain", cc.SpriteAtlas, function (err, atlas) {
            var frame1 = atlas.getSpriteFrame('game_chip_tip');
            sp.spriteFrame = frame1;
        });
        node.parent=table_bg;

        node.setPosition(pos);

        var action=cc.moveTo(0.2,chipPos);

        var showLabel=function(node){
            var cn=new cc.Node();
            var chipLabel = cn.addComponent(cc.Label);
            cn.parent=node;
            chipLabel.fontSize=20;
            cn.color = new cc.Color(0, 0, 0);
            cn.setPosition(0,-40);
            chipLabel.string=handPot;
        };
        var showSelf = cc.callFunc(showLabel, this, node);

        var seq=cc.sequence(action,showSelf);

        this.table_chips.push(node);

        // play audioSource
        var audionode=new cc.Node();
        var audiosource=audionode.addComponent(cc.AudioSource);

        cc.loader.loadRes(audio, function (err, assets) {
            node.runAction(seq);
            cc.audioEngine.playEffect(assets);
        });

        this.inpotstart(pot,inpot);

    },

    //inpot 底层筹码变化
    inpotstart:function(pot,inpot){
        pot=Number(pot);
        inpot=Number(inpot);
        if(this.inpot){
            var potObj=this.inpot.getChildByName("pot").getComponent(cc.Label);
            var inpotNode=this.inpot.getChildByName("inpot");
            potObj.string="pot:"+(Number(potObj.string.substr(4))+pot);
            if(inpotNode){
                var inpotObj=inpotNode.getComponent(cc.Label);
                inpotObj.string= Number(inpotObj.string)+inpot;
            }else{
                this.inpottop(inpot);
            }
        }else{
            this.inpot=new cc.Node();
            this.inpot.parent=this.node.parent;
            this.inpot.setPosition(0,250);
            if(inpot>0){
                this.inpottop(inpot);
            };
            var potNode=new cc.Node();
            var plb = potNode.addComponent(cc.Label);
            plb.fontSize=20;
            potNode.color = new cc.Color(0, 0, 0);
            potNode.name="pot";
            potNode.parent=this.inpot;
            potNode.setPosition(0,-60);
            plb.string="pot:"+pot;
        }
    },
    //底池 最终结果生成
    inpottop:function(inpot){

        var sp = this.inpot.addComponent(cc.Sprite);
        cc.loader.loadRes("GameMain", cc.SpriteAtlas, function (err, atlas) {
            var frame1 = atlas.getSpriteFrame('game_inPot_frame');
            sp.spriteFrame = frame1;
        });
        var node=new cc.Node();
        var lb = node.addComponent(cc.Label);
        lb.fontSize=25;
        lb.string=inpot;
        //node.color = new cc.Color(0, 0, 0);
        node.name="inpot";
        node.parent=this.inpot;
        node.setPosition(0,-12);
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
        var action3=cc.callFunc(function(){
            //flop结束
            this.action=false;
        },this);

        var seq=cc.sequence(action2,action3);

        node1.runAction(action1);
        node2.runAction(seq);


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

        this.action=false;


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

        this.action=false;

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

    },

});