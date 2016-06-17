cc.Class({
    extends: cc.Component,

    properties: {

        speed: 0.1,

        radial_round: {
            default: null,
            type: cc.Sprite
        }
    },

    onLoad:function(){
        this.scheduleOnce(this.timestart, 3);
    },
    timestart:function(){
        var node1=new cc.Node();
        var sp = node1.addComponent(cc.Sprite);
        sp.type=cc.Sprite.Type.FILLED;
        sp.fillType=cc.Sprite.FillType.RADIAL;
        sp.fillCenter = new cc.Vec2(0.5, 0.5);
        sp.fillStart = 0;
        sp.fillRange = 1;


        cc.loader.loadRes("GameMain", cc.SpriteAtlas, function (err, atlas) {
            var frame1 = atlas.getSpriteFrame('game_seat_valid');
            sp.spriteFrame = frame1;
        });


    },
    update: function (dt) {
        this._updateFillRange(this.radial_round, 1, dt);
    },

    //原型进度条
    _updateFillRange: function (sprite, range, dt) {
        var fillRange = sprite.fillRange;
        //顺时针转
        fillRange = fillRange < range ? fillRange -= (dt * this.speed) : 0;

        sprite.fillRange = fillRange;
    }

});
