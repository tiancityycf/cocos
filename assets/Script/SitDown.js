cc.Class({
    extends: cc.Component,

    properties: {
         label: {
            default: null,
            type: cc.Label
        },
        t_prefab:{
            default:null,
            type:cc.Prefab
        },
        speed: 0.1,
        radial_round: {
            default: null,
            type: cc.Sprite
        },

        //倒计时
        countdown_time:0//执行了多少次
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
            this._AddCountDown(node_table_bg,node_position);
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
    //添加倒计时的进度条
    _AddCountDown:function(node_table_bg,node_position){
        var node_process = new cc.Node();
        var sprite_process = node_process.addComponent(cc.Sprite);
        sprite_process.type = cc.Sprite.Type.FILLED;
        sprite_process.fillType = cc.Sprite.FillType.RADIAL;
        sprite_process.fillCenter = new cc.Vec2(0.5,0.5);
        sprite_process.fillStart = 0;
        sprite_process.fillRange = 0;
        node_process.scale = 1.3;
        node_process.setPosition(node_position['x'],node_position['y']);
        cc.loader.loadRes("GameMain",cc.SpriteAtlas,function(err,atlas){
            var frame1 = atlas.getSpriteFrame("game_progress_frame");
            sprite_process.spriteFrame = frame1;
        });
        node_process.parent = node_table_bg;
        var time_interval = 0.1;
        this.schedule(function(){
            this._CountDown(sprite_process,20,time_interval);
        },time_interval);
    },
    //倒计时开始
    _CountDown:function(sprite_process,long_time,time_interval){
        this.countdown_time++;//已经执行了多少次
        var cycle_percent = 1;//一个周期的部分
        var cycle_time = 20;//一个周期所需的时间,20秒
        cycle_time = cycle_time * Math.ceil(parseInt(long_time)/cycle_time); //如果耗时大于一个周期所需的时间，说明用了延时道具
        var init_speed = cycle_percent / cycle_time;//初始速度

        var fillRange = sprite_process.fillRange;
        //逆时针转
        //fillRange = fillRange < range ? fillRange += (this.countdown_time * init_speed): 0;
        //顺时针转
        var do_time = time_interval * this.countdown_time;
        fillRange = do_time < long_time ? fillRange -= (time_interval * init_speed):0;
        sprite_process.fillRange = fillRange;
        if(fillRange == 0){
            this.unschedule();
        }
    }
});
