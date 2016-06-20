cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        seat_empty
    },
    //初始化座位
    seat_empty:function(){
        var scene_width = cc.scene_width;
        var scene_height = cc.scene_height;
        cc.log("宽度："+scene_width+" 高度："+scene_height);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
