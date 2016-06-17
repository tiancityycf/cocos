cc.Class({
    extends: cc.Component,

    properties: {
        seat:{
            default:[],
            type:cc.Node
        },
        //倒计时
        countdown_execution_interval:0.1,//执行间隔
        countdown_repeat_num:0,//重复了多少次
        countdown_long_time:0,//倒计时时长，单位:秒
        countdown_cycle_time:20,//倒计时一圈的时间，单位:秒
        countdown_node:{
            default:null,
            type:cc.Node
        },//倒计时，遮罩层所在的node
        countdown_sprite:{
            default:null,
            type:cc.Sprite
        },//倒计时，遮罩层的精灵
        countdown_task:null,//倒计时执行任务,是一个function，方便销毁定时器
        countdown_over_task:null,//倒计时结束，是一个function，执行完毕，最后会执行这个
    },

    // use this for initialization
    onLoad: function () {
        this.sit_down();
    },
    //模拟数据
    table_data:function(){
        var table_data={
                            "table_info" : [{
                                    "user_id" : "5",
                                    "user_nick" : "小明",
                                    "user_avatar" : "http://img.51yche.com/avatar/2016-06-15/w_120x120_57602aed7d6d8.jpg",
                                    "user_chips" : "800",
                                    "seat_number" : "0"
                                }, {
                                    "user_id" : "6",
                                    "user_nick" : "小刚",
                                    "user_avatar" : "http://img.51yche.com/avatar/2016-06-15/w_120x120_57602bd098133.jpg",
                                    "user_chips" : "1000",
                                    "seat_number" : "1"
                                },
                                {
                                    "user_id" : "6",
                                    "user_nick" : "小龙",
                                    "user_avatar" : "http://img.51yche.com/avatar/2016-06-14/w_120x120_575ffcd3375aa.jpg",
                                    "user_chips" : "10000",
                                    "seat_number" : "7"
                                }
                            ],
                            "table_name":"devin的牌局",
                            "table_verify_code":"23434566"
                        };
        return table_data;
    },
    sit_down:function(){
        var table_data = this.table_data();
        //牌局名字
        var label = this.getComponent(cc.Label);
        label.string=table_data['table_name'];
        //牌局号
        var node_table_bg = this.node.parent;
        var label_table_code = node_table_bg.getChildByName("table_code").getComponent(cc.Label);
        label_table_code.string = table_data['table_verify_code'];
        //异步加载图片，不能放在循环内
        var load_avatar = function(url,sprite_user){
            cc.loader.load(url,function(err,tex){
                var frame  = new cc.SpriteFrame(tex,cc.Rect(0, 0, 87, 123));
                sprite_user.spriteFrame = frame;
            });
        };
        //坐下
        for(var k in table_data['table_info']){
            var v = table_data['table_info'][k];
            var seat_node = node_table_bg.getChildByName("seat_"+v['seat_number']);
            var node_position = seat_node.getPosition();//获取坐标
            var node_size = seat_node.getContentSize();//获取node的尺寸
            //名字
            var label_nick = seat_node.getChildByName("nick").getComponent(cc.Label);
            label_nick.string = v['user_nick'];
            //带入的筹码
            var label_chips = seat_node.getChildByName("chips").getComponent(cc.Label);
            label_chips.string = v['user_chips'];

            //头像
            var node_mark = new cc.Node();
            var mask_user = node_mark.addComponent(cc.Mask);
            mask_user.type = cc.Mask.ELLIPSE;
            node_mark.width = node_size['width']-15;
            node_mark.height = node_size['height']-15;
            node_mark.setPosition(node_position['x'],node_position['y']);
            node_mark.parent =  node_table_bg;

            var node_user = new cc.Node();
            var sprite_user = node_user.addComponent(cc.Sprite);
            node_user.parent = node_mark;
            load_avatar(v['user_avatar'],sprite_user);

            //添加倒计时
            this._AddCountDown(node_table_bg,v['seat_number'],15);
            break;
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
    //添加倒计时的进度条
    _AddCountDown:function(node_table_bg,seat_number,long_time){
        var seat = node_table_bg.getChildByName("seat_"+seat_number);//获取该作为的节点
        var seat_position = seat.getPosition();//获取该座位的位置坐标
        var seat_size = seat.getContentSize();//获取该座位的尺寸

        //倒计时遮罩层
        var node = new cc.Node();
        node.scale = 1.3;
        node.setPosition(seat_position);
        node.parent = node_table_bg;
        var sprite = node.addComponent(cc.Sprite);
        sprite.type = cc.Sprite.Type.FILLED;
        sprite.fillType = cc.Sprite.FillType.RADIAL;
        sprite.fillCenter = new cc.Vec2(0.5,0.5);
        sprite.fillStart = 0;
        sprite.fillRange = 0;
        cc.loader.loadRes("GameMain",cc.SpriteAtlas,function(err,atlas){
            var frame = atlas.getSpriteFrame("game_progress_frame");
            sprite.spriteFrame = frame;
        });
        //倒计时文字
        var node2 = new cc.Node();
        node2.name = "time";
        var label = node2.addComponent(cc.Label);
        label.string = this.countdown_cycle_time + "s";
        label.fontSize = 30;
        node2.parent = node;
        //node2.color = new cc.Color(0, 0, 0);
        node2.setPosition(0,-10);

        this.countdown_node = node;
        this.countdown_sprite = sprite;
        this.countdown_long_time = long_time;//执行时长
        this.countdown_task = function(){
            this._StartCountDown(1);
        };
        this.schedule(this.countdown_task,this.countdown_execution_interval);
    },
    //倒计时开始 direction(方向):1-顺时针2-逆时针
    _StartCountDown:function(direction){
        this.countdown_repeat_num++;//已经执行了多少次
        var full_cycle = 1;//一个整圈
        var speed = full_cycle / this.countdown_cycle_time;//速度

        var sprite = this.countdown_node.getComponent(cc.Sprite);
        var fillRange = sprite.fillRange;
        var cost_time = this.countdown_execution_interval * this.countdown_repeat_num;//耗时
        if(parseInt(cost_time) == cost_time ){
            var time_node = this.countdown_node.getChildByName("time");
            var time_label = time_node.getComponent(cc.Label);
            time_label.string =  (parseInt(time_label.string) - 1)+"s";
        }
        if(direction == 2){
            //逆时针
            fillRange = cost_time < this.countdown_long_time ? fillRange += (this.countdown_execution_interval * speed):0;
        }else{
            //顺时针
            fillRange = cost_time < this.countdown_long_time ? fillRange -= (this.countdown_execution_interval * speed):0;
        }
        sprite.fillRange = fillRange;
        if(fillRange == 0){
            this.unschedule(this.countdown_task);//删除定时任务
            this.countdown_node.destroy();//删除该节点
            //如果执行完毕，判断是否有下一步动作，如果有，执行下一步
            if(this.countdown_over_task != null ){
               this.scheduleOnce(this.countdown_over_task,1);
            }
        }
    }
});
