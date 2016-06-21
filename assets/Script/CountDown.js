cc.Class({
    extends: cc.Component,
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
    },
    //添加倒计时的进度条
    add_countdown:function(node_table_bg,seat_number,long_time){
        //初始化
        this.countdown_repeat_num = 0;
        this.countdown_long_time = 0;
        if(this.countdown_task!= null){
            this.unschedule(this.countdown_task);//删除定时任务
            this.countdown_node.destroy();//删除该节点
        }



        var seat = node_table_bg.getChildByName("seat_"+seat_number);//获取该作为的节点
        //var seat_position = seat.getPosition();//获取该座位的位置坐标

        //倒计时遮罩层
        var node = new cc.Node();
        node.scale = 1.0;
        //node.setPosition(seat_position);
        //node.parent = node_table_bg;
        node.parent = seat;
        node.setPosition(0.5,0.5);
        node.setLocalZOrder(2);
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
        label.fontSize = 30;//设置字体大小
        node2.parent = node;
        //node2.color = new cc.Color(0, 0, 0);//设置字体颜色
        node2.setPosition(0,-10);

        this.countdown_node = node;
        this.countdown_sprite = sprite;
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
        if(fillRange == 0){
            this.unschedule(this.countdown_task);//删除定时任务
            this.countdown_node.destroy();//删除该节点
            this.countdown_task = null;
            //如果执行完毕，判断是否有下一步动作，如果有，执行下一步
            if(this.countdown_over_task != null ){
                this.scheduleOnce(this.countdown_over_task,0);
            }
        }
    }
});
