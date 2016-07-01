var Common = require('Common');
cc.Class({
    extends: Common,
    properties: {
        //倒计时
        countdown_execution_interval:0.1,//执行间隔
        countdown_repeat_num:0,//重复了多少次
        countdown_long_time:0,//倒计时时长，单位:秒
        countdown_cycle_time:20,//倒计时一圈的时间，单位:秒
        countdown_node:{
            default:null,
            type:cc.Node
        },//倒计时，遮罩层所在的node
        countdown_task:null,//倒计时执行任务,是一个function，方便销毁定时器
        countdown_over_task:null,//倒计时结束，是一个function，执行完毕，最后会执行这个
        //动作列表
        actions:null,
        //正在进行的动作
        i:0,
        //该牌局的是数据
        hand_data:null
    },
    //添加倒计时的进度条
    add_countdown:function(seat_number,long_time){
        var me = this;
        if(parseInt(long_time) == 0 ){
            this.scheduleOnce(function(){
                me.scheduleOnce(this.countdown_over_task,0);
            },1);
            return false;
        }else{
            //判断是否开启固定思考模式
            if(me.open_fixedThinkTime == 1){
                long_time = me.fixedThinkTime;
            }
        }
        var node_table_bg = cc.find("Canvas/table_bg");
        //初始化
        this.countdown_repeat_num = 0;
        this.countdown_long_time = 0;
        this.countdown_cycle_time = 20;
        if(this.countdown_task!= null){
            this.unschedule(this.countdown_task);//删除定时任务
            this.countdown_node.destroy();//删除该节点
        }
        var seat = node_table_bg.getChildByName("seat_"+seat_number);//获取该作为的节点

        //倒计时遮罩层
        var node = new cc.Node();
        node.scale = 0.85;
        cc.log(node.scale);
        //node.setPosition(seat_position);
        //node.parent = node_table_bg;
        node.parent = seat;
        node.setPosition(0.5,0.5);
        node.setLocalZOrder(2);
        var sprite = node.addComponent(cc.Sprite);
        sprite.type = cc.Sprite.Type.FILLED;
        sprite.fillType = cc.Sprite.FillType.RADIAL;
        sprite.fillCenter = new cc.Vec2(0.5,0.5);
        sprite.fillStart = 0.25;
        sprite.fillRange = 0;
        var frame = this.GameMain.getSpriteFrame("game_progress_frame");
        sprite.spriteFrame = frame;
        //倒计时文字
        var node2 = new cc.Node();
        node2.name = "time";
        var label = node2.addComponent(cc.Label);
        label.string = this.countdown_cycle_time + "s";
        label.fontSize = 30;//设置字体大小
        node2.parent = node;
        //node2.color = new cc.Color(0, 0, 0);//设置字体颜色
        node2.setPosition(0,-10);

        this.countdown_node = node;
        this.countdown_long_time = long_time;//执行时长
        this.countdown_task = function(){
            this.start_countdown(1);
        };
        this.schedule(this.countdown_task,this.countdown_execution_interval);
    },
    //倒计时开始 direction(方向):1-顺时针2-逆时针
    start_countdown:function(direction){
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
        //如果开启固定思考时间的设置，并且这个过程的执行时间大于思考时间时，直接结束倒计时
        if(this.open_fixedThinkTime == 1 && this.countdown_long_time > this.fixedThinkTime){
            fillRange = 0;
        }
        if(fillRange == 0){
            this.unschedule(this.countdown_task);//删除定时任务
            this.countdown_node.destroy();//删除该节点
            this.countdown_task = null;
            //如果执行完毕，判断是否有下一步动作，如果有，执行下一步
            if(this.countdown_over_task != null ){
                this.scheduleOnce(this.countdown_over_task,0);
            }
        }
    },
    //延长时间
    delay_countdown:function(seat_number,duration){
        var remain_time = parseInt(this.countdown_cycle_time - duration);//剩余的时间
        var total_time = 20 + remain_time;
        this.countdown_cycle_time = total_time; //一圈的总耗时
        this.countdown_repeat_num = 0; //已经执行了多少
        if(this.countdown_task!= null){
            this.unschedule(this.countdown_task);//删除定时任务
            this.countdown_node.destroy();//删除该节点
        }
        //延时
        var node_table_bg = cc.find("Canvas/table_bg");
        var seat = node_table_bg.getChildByName("seat_"+seat_number);//获取该作为的节点
        //倒计时遮罩层
        var node = new cc.Node();
        node.scale = 0.85;
        node.parent = seat;
        node.setPosition(0.5,0.5);
        node.setLocalZOrder(2);
        var sprite = node.addComponent(cc.Sprite);
        sprite.type = cc.Sprite.Type.FILLED;
        sprite.fillType = cc.Sprite.FillType.RADIAL;
        sprite.fillCenter = new cc.Vec2(0.5,0.5);
        sprite.fillStart = 0.25;
        sprite.fillRange = 0;
        var frame = this.GameMain.getSpriteFrame("game_progress_frame");
        sprite.spriteFrame = frame;
        //倒计时文字
        var node2 = new cc.Node();
        node2.name = "time";
        var label = node2.addComponent(cc.Label);
        label.string = this.countdown_cycle_time + "s";
        label.fontSize = 30;//设置字体大小
        node2.parent = node;
        node2.setPosition(0,-10);

        this.countdown_node = node;
        this.countdown_task = function(){
            this.start_countdown(1);
        };
        this.schedule(this.countdown_task,this.countdown_execution_interval);
        var me = this;
        this.countdown_over_task = function(){
            me.actionend();
        };

    },
    reqstart:function(){
        var hand_id = this.getQueryString("hand_id");
        // var search = window.location.search; //获取url中"?"符后的字串
        // var hand_id=0;
        // if (search.indexOf("?") != -1) {
        //     var str = search.substr(1);
        //     var strs = str.split("&");
        //     for(var i = 0; i < strs.length; i++) {
        //         //theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        //         if(strs[i].split("=")[0]=="hand_id"){
        //             hand_id=strs[i].split("=")[1];
        //         }
        //     }
        // }
        var url="";
        if(hand_id != null){
            url = this.getDataConfig("data_host")+"/Html/get_mongo_data/hand_id/"+hand_id;
        }else{
            //测试数据
            url="http://172.16.0.210:2016/info.php";
         }


        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
        var me=this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = eval('(' + xhr.responseText + ')');
                    var starttime=0;
                    var len=response["actions"].length;
                    for(var i=0;i<len;i++){
                        if(i==0){
                            response["actions"][i]["duration"]=response["actions"][i]["timestamp"]-response["start"]["timestamp"];
                        }else{
                            if(response["actions"][i-1]['CMD'] == 19){
                                response["actions"][i]["duration"] = 0;
                            }else{
                                response["actions"][i]["duration"]=response["actions"][i]["timestamp"]-response["actions"][i-1]["timestamp"];
                            }
                        }
                    };
                    //初始化动作属性
                    me.actions=response["actions"];
                    me.i=0;
                    me.hand_data = response;
                    cc.log(response);
                    me.sit_down();//坐下
                } else {

                }
            }
        }
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
});
