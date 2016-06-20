var CountDown = require('CountDown');
cc.Class({
    extends: CountDown,

    properties: {
        seat:{
            default:[],
            type:cc.Node
        }
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
                                },{
                                    "user_id" : "6",
                                    "user_nick" : "小刚4",
                                    "user_avatar" : "http://img.51yche.com/avatar/2016-06-15/w_120x120_57602bd098133.jpg",
                                    "user_chips" : "1000",
                                    "seat_number" : "4"
                                },
                                {
                                    "user_id" : "6",
                                    "user_nick" : "小龙2",
                                    "user_avatar" : "http://img.51yche.com/avatar/2016-06-14/w_120x120_575ffcd3375aa.jpg",
                                    "user_chips" : "10000",
                                    "seat_number" : "5"
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
        //加载手牌图片
        var load_hand_card = function (sprite){
            cc.loader.loadRes("GameMain",cc.SpriteAtlas,function(err,atlas){
                var frame = atlas.getSpriteFrame("game_handCard_cover_tip");
                sprite.spriteFrame = frame;
            });
        };


        //坐下
        for(var k in table_data['table_info']){
            var v = table_data['table_info'][k];
            var seat_node = node_table_bg.getChildByName("seat_"+v['seat_number']);
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
            node_mark.width = node_size['width']-10;
            node_mark.height = node_size['height']-10;
            node_mark.setPosition(0.5,0.5);
            node_mark.parent =  seat_node;

            var node_user = new cc.Node();
            var sprite_user = node_user.addComponent(cc.Sprite);
            node_user.parent = node_mark;
            load_avatar(v['user_avatar'],sprite_user);
            seat_node.getChildByName("game_tip").setLocalZOrder(3);

            //发牌
            var node_hand_card = new cc.Node();
            var sprite_hand_card = node_hand_card.addComponent(cc.Sprite);
            node_hand_card.scale = 1;
            node_hand_card.name = "hand_card";
            node_hand_card.parent = seat_node;
            node_hand_card.setPosition(20,-30);
            seat_node.getChildByName("hand_card").setLocalZOrder(1);
            load_hand_card(sprite_hand_card);






            //添加倒计时
            //this.add_countdown(node_table_bg,v['seat_number'],15);
            //CountDown.add_countdown(node_table_bg,v['seat_number'],15);
            //this._AddCountDown(node_table_bg,v['seat_number'],15);
            //break;
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
