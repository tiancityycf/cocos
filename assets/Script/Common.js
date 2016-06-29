cc.Class({
    extends:  cc.Component,

    properties: {
        seat:{
            default:[],
            type:cc.Node
        },
        GameMain:null,//游戏资源
        replay_cn:null,//游戏资源
        GameCards:null,//游戏的牌中的资源
        audio_chipsToTable:null,//下注的音频
        audio_check:null,//check的音频
        audio_fold:null,//fold的音频
        audio_distributeCard:null,//翻牌的声音
        open_fixedThinkTime:0,//开启固定思考时间的设置0-否1-开启
        fixedThinkTime:2,//固定思考时间，配合open_fixedThinkTime使用，单位：秒
        open_mute:0,//是否开启静音模式0-否1-是
    },
    sit_down:function(){
        //加载游戏资源图片
        var me = this;
        cc.loader.loadRes("game_cards",cc.SpriteAtlas,function(err,atlas){
            me.GameCards = atlas;
        });
        cc.loader.loadRes("replay_cn",cc.SpriteAtlas,function(err,atlas){
            me.replay_cn = atlas;
        });
        //加载游戏音频
        if(this.open_mute == 0){
            cc.loader.loadRes("audio/audio_chipsToTable", function (err, assets) {
                me.audio_chipsToTable = assets;
            });
            cc.loader.loadRes("audio/audio_check", function (err, assets) {
                me.audio_check = assets;
            });
            cc.loader.loadRes("audio/audio_fold", function (err, assets) {
                me.audio_fold = assets;
            });
            cc.loader.loadRes("audio/audio_distributeCard", function (err, assets) {
                me.audio_distributeCard = assets;
            });
        }

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
        var img_host = this.getDataConfig("img_host");
        var load_avatar = function(url,sprite_user){
            url = img_host + url;
            cc.loader.load(url,function(err,tex){
                var frame  = new cc.SpriteFrame(tex,cc.Rect(0, 0, 87, 123));
                sprite_user.spriteFrame = frame;
            });
        };
        cc.loader.loadRes("GameMain",cc.SpriteAtlas,function(err,atlas){
            me.GameMain = atlas;
            var sb_data = null;//小盲的数据
            var bb_data = null;//大盲的数据
            //坐下
            for(var k in table_data['players']){
                var v = table_data['players'][k];
                var seat_node = node_table_bg.getChildByName("seat_"+v['chair_id']);
                var node_size = seat_node.getContentSize();//获取node的尺寸
                //名字
                var label_nick = seat_node.getChildByName("nick").getComponent(cc.Label);
                label_nick.string = me.getLength(v['nick'])>10?me.cutStr(v['nick'],7):v['nick'];
                label_nick.fontSize = 20;
                //带入的筹码
                var label_chips = seat_node.getChildByName("chips").getComponent(cc.Label);
                label_chips.string = v['remain_chip']+v['table_chip'];
                //头像
                var node_mark = new cc.Node();
                node_mark.name='avatar';
                var mask_user = node_mark.addComponent(cc.Mask);
                mask_user.type = cc.Mask.ELLIPSE;
                node_mark.width = node_size['width']-10;
                node_mark.height = node_size['height']-10;
                node_mark.setPosition(0.5,0.5);
                node_mark.parent =  seat_node;
                
                var node_user = new cc.Node();
                var sprite_user = node_user.addComponent(cc.Sprite);
                node_user.parent = node_mark;
                if(v['avatar'] != null && v['avatar']!=""){
                    node_user.scale = (node_size['width']-10)/120;
                    load_avatar(v['avatar'],sprite_user);
                }else{
                    sprite_user.spriteFrame =  me.GameMain.getSpriteFrame("game_seat_valid");
                }

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
        });
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
            seat_node.getChildByName("avatar").setOpacity(255);
            seat_node.getChildByName("nick").setOpacity(255);
            seat_node.getChildByName("chips").setOpacity(255);
            if(cc.isValid(seat_node.getChildByName("hand_card"))){
                seat_node.getChildByName("hand_card").destroy();
            }
        }
    },
    //js获取当前url的参数
    getQueryString:function(name){
        if(undefined==window.location){
            return null;
        };
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return  unescape(r[2]);
        }else{
            return null;
        }
    },
    //获取字符串长度
    getLength:function (str) {
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    },
    //s截取字符串，中英文都能用@param str：需要截取的字符串@param len: 需要截取的长度
    cutStr:function (str, len) {
        var str_length = 0;
        var str_len = str.length;
        var str_cut = new String();
        for (var i = 0; i < str_len; i++) {
            var a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < len) {
            return str;
        }
    },
    //获取json的配置
    getDataConfig:function(key){
        var config ={
                        "env":"env_qa",
                        "env_product":{
                            "data_host":"http://qa-api.kkpoker.com:8090",
                            "img_host":"http://qa-img.kkpoker.com:8090"
                        },
                        "env_qa":{
                            "data_host":"http://qa-api.kkpoker.com:8090",
                            "img_host":"http://qa-img.kkpoker.com:8090"
                        }
                    };
        var env_key = config['env'];
        return config[env_key][key];
    },
    //开启固定思考时间status:0-关闭1-开启
    set_fixedThinkTime:function(){
        var sprite_url = "";
        if(this.open_fixedThinkTime == 1){
            this.open_fixedThinkTime = 0;
            sprite_url='forward_unnormal';
        }else{
            this.open_fixedThinkTime = 1;
            sprite_url='forward_normal';
        }
        var fast_forward =cc.find("Canvas/fast_forward");
        var sprite = fast_forward.getComponent(cc.Sprite);
        sprite.spriteFrame = this.replay_cn.getSpriteFrame(sprite_url);
    },
    //开启静音模式status:0-关闭1-开启
    set_mute:function(){
        var sprite_url = "";
        if(this.open_mute == 1){
            this.open_mute = 0;
            sprite_url='open_audio';
        }else{
            this.open_mute = 1;
            sprite_url='close_audio';
        }
        var fast_forward =cc.find("Canvas/sound");
        var sprite = fast_forward.getComponent(cc.Sprite);
        sprite.spriteFrame = this.replay_cn.getSpriteFrame(sprite_url);
    }
});