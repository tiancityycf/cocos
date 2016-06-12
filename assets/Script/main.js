cc.Class({
    extends: cc.Component,

    properties: {

        sprite: {
            default: null,
            type: cc.Sprite
        }

    },

    onLoad:function(){
        
        // var stencil = null   //可以是精灵，也可以DrawNode画的各种图形
        // //1.创建裁剪节点
        // //var clipper = new cc.ClippingNode();   //创建裁剪节点ClippingNode对象  不带模板
        // var clipper = new cc.ClippingNode(stencil);   //创建裁剪节点ClippingNode对象  带模板
        // clipper.setInverted(false);         //显示被模板裁剪下来的底板内容。默认为false 显示被剪掉部分。
        // clipper.inverted = true             //设置底板可见，显示剩余部分
        // //2.设置模板
        // //clipper.setStencil(stencil);        //设置模板
        // clipper.stencil = stencil;          //同上
        // //alpha阀值：表示像素的透明度值。
        // // 只有模板（stencil）中像素的alpha值大于alpha阈值时，内容才会被绘制。
        // //alpha阈值（alphaThreshold）：取值范围[0,1]。
        // //默认为1，表示alpha测试默认关闭，即全部绘制。
        // //若不是1，表示只绘制模板中，alpha像素大于alphaThreshold的内容。
        // //clipper.setAlphaThreshold(0);    //设置绘制底板的Alpha值为0
        // clipper.alphaThreshold = 0.5;
        // //3.创建底板
        // var sprite = clipper.addComponent(cc.Sprite);
        // cc.loader.loadRes("GameMain", cc.SpriteAtlas, function (err, atlas) {
        //     var frame = atlas.getSpriteFrame('game_emotion_press');
        //     sprite.spriteFrame = frame;
        // });
        // //sprite.scale = this.size.height/prize.height
        // this.addChild(sprite);
        // //加入底板
        // clipper.addChild(sprite);
    },
    update: function (dt) {
        
    },
   

});
