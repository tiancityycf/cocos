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
        var load_avatar = function(url,sprite_user){
            cc.loader.load(url,function(err,tex){
                var frame  = new cc.SpriteFrame(tex,cc.Rect(0, 0, 87, 123));
                sprite_user.spriteFrame = frame;
            });
        };

        //坐下
        for(var k in table_data['table_info']){
            var v = table_data['table_info'][k];
            var node_position = node_table_bg.getChildByName("seat_"+v['seat_number']).getPosition();//获取坐标
            var node_size = node_table_bg.getChildByName("seat_"+v['seat_number']).getContentSize();//获取node的尺寸
            //名字
            var label_nick = node_table_bg.getChildByName("seat_"+v['seat_number']).getChildByName("nick").getComponent(cc.Label);
            label_nick.string = v['user_nick'];
            //带入的筹码
            var label_chips = node_table_bg.getChildByName("seat_"+v['seat_number']).getChildByName("chips").getComponent(cc.Label);
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
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
    },
});
