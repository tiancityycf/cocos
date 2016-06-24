cc.Class({
    extends:  cc.Component,

    properties: {
        seat:{
            default:[],
            type:cc.Node
        },
        GameMain:null,//游戏资源
        GameCards:null,//游戏的牌中的资源
        audio_chipsToTable:null,//下注的音频
        audio_check:null,//check的音频
        audio_fold:null,//fold的音频
    },
    sit_down:function(){
        //加载游戏资源图片
        var me = this;
        cc.loader.loadRes("GameMain",cc.SpriteAtlas,function(err,atlas){
            me.GameMain = atlas;
        });
        cc.loader.loadRes("game_cards",cc.SpriteAtlas,function(err,atlas){
            me.GameCards = atlas;
        });
        //加载游戏音频
        // cc.loader.loadRes("audio/audio_chipsToTable", function (err, assets) {
        //     me.audio_chipsToTable = assets;
        //     cc.log("audio_chipsToTable");
        // });
        // cc.loader.loadRes("audio/audio_check", function (err, assets) {
        //     me.audio_check = assets;
        //     cc.log("audio_check");
        // });
        // cc.loader.loadRes("audio/audio_fold", function (err, assets) {
        //     me.audio_fold = assets;
        //     cc.log("audio_fold");
        // });

        var table_data = this.hand_data;
        table_data['table_name']=table_data['table_name']?table_data['table_name']:"未知牌局";
        table_data['table_code']=table_data['table_code']?table_data['table_code']:"位置邀请码";
        table_data['table_type']=table_data['table_type']?table_data['table_type']:1;

        var node_table_bg = cc.find("Canvas/table_bg");
        //牌局名字
        //var label = this.getComponent(cc.Label);
        var label = node_table_bg.getChildByName("table_name").getComponent(cc.Label);
        label.string = "§ " + table_data['table_name'] + " §";
        //牌局号,如果是快速牌局显示牌局号，如果是俱乐部牌局，显示盲注
        if(parseInt(table_data['table_code'])!=0){
            var label_table_code = node_table_bg.getChildByName("table_code").getComponent(cc.Label);
            label_table_code.string = table_data['table_code'];
        }
        //异步加载头像，不能放在循环内
        var load_avatar = function(url,sprite_user){
            url = 'http://img.51yche.com/avatar/2016-06-14/w_120x120_575ffcd3375aa.jpg';
            cc.loader.load(url,function(err,tex){
                var frame  = new cc.SpriteFrame(tex,cc.Rect(0, 0, 87, 123));
                sprite_user.spriteFrame = frame;
            });
        };
        var sb_data = null;//小盲的数据
        var bb_data = null;//大盲的数据
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

            if(v['chair_id'] == table_data['start']['sb_chair']){
                sb_data = v;
            }else if(v['chair_id'] == table_data['start']['bb_chair']){
                bb_data = v;
            }
        }
        if(parseInt(table_data['table_code'])==0){
            var label_table_code = node_table_bg.getChildByName("table_code").getComponent(cc.Label);
            label_table_code.string = "盲注 "+sb_data['table_chip']+"/"+bb_data['table_chip'];
        }
    },
    resetSeat:function(){
        var table_data = this.hand_data;
        var node_table_bg = cc.find("Canvas/table_bg");

        //坐下
        for(var k in table_data['players']){
            var v = table_data['players'][k];
            var seat_node = node_table_bg.getChildByName("seat_"+v['chair_id']);
            //带入的筹码
            var label_chips = seat_node.getChildByName("chips").getComponent(cc.Label);
            label_chips.string = v['remain_chip']+v['table_chip'];
        }
    }
});