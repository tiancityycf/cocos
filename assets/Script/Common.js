cc.Class({
    extends:  cc.Component,

    properties: {
        seat:{
            default:[],
            type:cc.Node
        }
    },
    sit_down:function(){
        var table_data = this.hand_data;
        table_data['table_name']=table_data['table_name']?table_data['table_name']:"未知牌局";
        table_data['table_code']=table_data['table_code']?table_data['table_code']:"位置邀请码";
        table_data['table_type']=table_data['table_type']?table_data['table_type']:1;
        // if(table_data == null){
        //     cc.log("没有数据");
        //     return false;
        // }
        var node_table_bg = cc.find("Canvas/table_bg");
        //牌局名字
        //var label = this.getComponent(cc.Label);
        var label = node_table_bg.getChildByName("table_name").getComponent(cc.Label);
        label.string = "§ " + table_data['table_name'] + " §";
        //牌局号
        //var node_table_bg = this.node.parent;
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
            url = 'http://img.51yche.com/avatar/2016-06-14/w_120x120_575ffcd3375aa.jpg';
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
            label_chips.string = v['remain_chip']+v['table_chip'];

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
        }
    }
});