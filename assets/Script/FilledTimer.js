cc.Class({
    extends: cc.Component,

    properties: {

        speed: 0.1,

        horizontal: {
            default: null,
            type: cc.Sprite
        },

        vertical: {
            default: null,
            type: cc.Sprite
        },

        radial_round: {
            default: null,
            type: cc.Sprite
        },

        radial_semicircle: {
            default: null,
            type: cc.Sprite
        }
    },

    update: function (dt) {
        // update fill start
        //this._updataFillStart(this.horizontal, dt);
        //this._updataFillStart(this.vertical, dt);
        // update fill range
        this._updateFillRange(this.radial_round, 1, dt);
        //this._updateFillRange(this.radial_semicircle, 0.5, dt);
    },
    //进度条
    _updataFillStart: function (sprite, dt) {
        var fillStart = sprite.fillStart;
        fillStart = fillStart > 0 ? fillStart -= (dt * this.speed) : 1;
        sprite.fillStart = fillStart;
    },
    //原型进度条
    _updateFillRange: function (sprite, range, dt) {

        var fillRange = sprite.fillRange;
        //逆时针转
        //fillRange = fillRange < range ? fillRange += (dt * this.speed) : 0;
        //顺时针转
        fillRange = fillRange < range ? fillRange -= (dt * this.speed) : 0;
        //cc.log(sprite);
        sprite.fillRange = fillRange;
    }

});
