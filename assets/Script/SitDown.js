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
                            "actions" : [{
                                "CMD" : 13,
                                "chair_id" : 3,
                                "chip" : 1,
                                "current_action_chair" : 4,
                                "current_pot" : 4,
                                "pot" : 4,
                                "timestamp" : 1466422796,
                                "user_id" : 145
                            }, {
                                "CMD" : 19,
                                "chair_id" : 4,
                                "delay_time" : 20,
                                "timestamp" : 1466422800,
                                "user_id" : 138
                            }, {
                                "CMD" : 19,
                                "chair_id" : 4,
                                "delay_time" : 20,
                                "timestamp" : 1466422802,
                                "user_id" : 138
                            }, {
                                "CMD" : 14,
                                "chair_id" : 4,
                                "chip" : 6,
                                "current_action_chair" : 3,
                                "current_pot" : 10,
                                "pot" : 10,
                                "timestamp" : 1466422807,
                                "user_id" : 138
                            }, {
                                "CMD" : 14,
                                "chair_id" : 3,
                                "chip" : 36,
                                "current_action_chair" : 4,
                                "current_pot" : 46,
                                "pot" : 46,
                                "timestamp" : 1466422811,
                                "user_id" : 145
                            }, {
                                "CMD" : 13,
                                "chair_id" : 4,
                                "chip" : 30,
                                "current_action_chair" : 99,
                                "current_pot" : 76,
                                "pot" : 76,
                                "timestamp" : 1466422814,
                                "user_id" : 138
                            }, {
                                "CMD" : 9,
                                "common_card" : [41, 40, 54],
                                "current_action_chair" : 4,
                                "current_pot" : 76,
                                "pot" : 76,
                                "timestamp" : 1466422815
                            }, {
                                "CMD" : 17,
                                "chair_id" : 4,
                                "index" : 4,
                                "timestamp" : 1466422829,
                                "user_id" : 138
                            }, {
                                "CMD" : 12,
                                "chair_id" : 4,
                                "chip" : 0,
                                "current_action_chair" : 3,
                                "current_pot" : 76,
                                "pot" : 76,
                                "timestamp" : 1466422831,
                                "user_id" : 138
                            }, {
                                "CMD" : 17,
                                "chair_id" : 4,
                                "index" : 2,
                                "timestamp" : 1466422832,
                                "user_id" : 138
                            }, {
                                "CMD" : 18,
                                "from_chair" : 3,
                                "from_user" : 145,
                                "index" : 0,
                                "timestamp" : 1466422839,
                                "to_chair" : [4],
                                "to_user" : [138]
                            }, {
                                "CMD" : 18,
                                "from_chair" : 3,
                                "from_user" : 145,
                                "index" : 2,
                                "timestamp" : 1466422841,
                                "to_chair" : [4],
                                "to_user" : [138]
                            }, {
                                "CMD" : 12,
                                "chair_id" : 3,
                                "chip" : 0,
                                "current_action_chair" : 99,
                                "current_pot" : 76,
                                "pot" : 76,
                                "timestamp" : 1466422847,
                                "user_id" : 145
                            }, {
                                "CMD" : 10,
                                "common_card" : [29],
                                "current_action_chair" : 4,
                                "current_pot" : 76,
                                "pot" : 76,
                                "timestamp" : 1466422848
                            }, {
                                "CMD" : 14,
                                "chair_id" : 4,
                                "chip" : 76,
                                "current_action_chair" : 3,
                                "current_pot" : 152,
                                "pot" : 152,
                                "timestamp" : 1466422856,
                                "user_id" : 138
                            }, {
                                "CMD" : 13,
                                "chair_id" : 3,
                                "chip" : 76,
                                "current_action_chair" : 99,
                                "current_pot" : 228,
                                "pot" : 228,
                                "timestamp" : 1466422857,
                                "user_id" : 145
                            }, {
                                "CMD" : 11,
                                "common_card" : [12],
                                "current_action_chair" : 4,
                                "current_pot" : 228,
                                "pot" : 228,
                                "timestamp" : 1466422859
                            }, {
                                "CMD" : 12,
                                "chair_id" : 4,
                                "chip" : 0,
                                "current_action_chair" : 3,
                                "current_pot" : 228,
                                "pot" : 228,
                                "timestamp" : 1466422862,
                                "user_id" : 138
                            }, {
                                "CMD" : 12,
                                "chair_id" : 3,
                                "chip" : 0,
                                "current_action_chair" : 99,
                                "current_pot" : 228,
                                "pot" : 228,
                                "timestamp" : 1466422863,
                                "user_id" : 145
                            }
                            ],
                            "end" : [{
                                "chair_id" : 3,
                                "change_chip" : 114,
                                "hand_poker_0" : 13,
                                "hand_poker_1" : 43,
                                "new_chip" : 314,
                                "user_id" : 145
                            }, {
                                "chair_id" : 4,
                                "change_chip" : -114,
                                "hand_poker_0" : 57,
                                "hand_poker_1" : 52,
                                "new_chip" : 86,
                                "user_id" : 138
                            }
                            ],
                            "hand_id" : 1,
                            "players" : [{
                                "avatar" : "http://img.51yche.com/avatar/2016-06-15/w_120x120_57602bd098133.jpg",
                                "chair_id" : 3,
                                "hand_poker_0" : 13,
                                "hand_poker_1" : 43,
                                "nick" : "小行星星",
                                "remain_chip" : 199,
                                "table_chip" : 1,
                                "user_id" : 145
                            }, {
                                "avatar" : "http://img.51yche.com/avatar/2016-06-14/w_120x120_575ffcd3375aa.jpg",
                                "chair_id" : 4,
                                "hand_poker_0" : 57,
                                "hand_poker_1" : 52,
                                "nick" : "舞",
                                "remain_chip" : 198,
                                "table_chip" : 2,
                                "user_id" : 138
                            }
                            ],
                            "start" : {
                                "bb_chair" : 4,
                                "current_action_chair" : 3,
                                "d_chair" : 3,
                                "sb_chair" : 3,
                                "timestamp" : 1466422792
                            },
                            "table_id" : 2321,
                            "table_name":"扑克之夜第一局",
                            "table_code":"5672823"
                        };
        return table_data;
    },
    sit_down:function(){
        var table_data = this.table_data();
        //牌局名字
        var label = this.getComponent(cc.Label);
        label.string = "§ " + table_data['table_name'] + " §";
        //牌局号
        var node_table_bg = this.node.parent;
        var label_table_code = node_table_bg.getChildByName("table_code").getComponent(cc.Label);
        label_table_code.string = table_data['table_code'];
        //dealer位
        var dealer_node = node_table_bg.getChildByName("dealer_"+table_data['start']['d_chair']);
        var dealer_sprite = dealer_node.addComponent(cc.Sprite);
        //大盲位
        var big_blind_node = node_table_bg.getChildByName("chip_"+table_data['start']['bb_chair']);
        var big_blind_sprite = big_blind_node.addComponent(cc.Sprite);
        //小盲位
        var small_blind_node = node_table_bg.getChildByName("chip_"+table_data['start']['sb_chair']);
        var small_blind_sprite = small_blind_node.addComponent(cc.Sprite);
        cc.loader.loadRes("GameMain",cc.SpriteAtlas,function(err,atlas){
            //dealer位的图片加载
            var dealer_frame = atlas.getSpriteFrame("game_dealer_tip");
            dealer_sprite.spriteFrame = dealer_frame;
            //大盲位的图片加载
            var big_blind_frame = atlas.getSpriteFrame("game_bigBlind_tip");
            big_blind_sprite.spriteFrame = big_blind_frame;
            //小盲位的图片加载
            var small_blind_frame = atlas.getSpriteFrame("game_smallBlind_tip");
            small_blind_sprite.spriteFrame = small_blind_frame;
        });

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
        for(var k in table_data['players']){
            var v = table_data['players'][k];
            var seat_node = node_table_bg.getChildByName("seat_"+v['chair_id']);
            var node_size = seat_node.getContentSize();//获取node的尺寸
            //名字
            var label_nick = seat_node.getChildByName("nick").getComponent(cc.Label);
            label_nick.string = v['nick'].length>4 ? v['nick'].substring(0,4)+"...":v['nick'].substring(0,4);
            //带入的筹码
            var label_chips = seat_node.getChildByName("chips").getComponent(cc.Label);
            label_chips.string = v['remain_chip'];

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
            load_avatar(v['avatar'],sprite_user);
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
