cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        var avatar=['http://img.51yche.com/avatar/2016-06-14/575ffcd3375aa.jpg',
            'http://localhost:7456/res/raw-assets/resources/game_header_mask.png',
            'http://img.51yche.com/avatar/2016-06-15/w_120x120_57602aed7d6d8.jpg',
            'http://img.51yche.com/avatar/2016-06-15/w_120x120_57602aed7d6d8.jpg',
            'http://img.51yche.com/avatar/2016-06-15/w_120x120_57602aed7d6d8.jpg',
            'http://img.51yche.com/avatar/2016-06-15/w_120x120_57602aed7d6d8.jpg',
            'http://img.51yche.com/avatar/2016-06-15/w_120x120_57602aed7d6d8.jpg',
            'http://img.51yche.com/avatar/2016-06-15/w_120x120_57602aed7d6d8.jpg',
            'http://img.51yche.com/avatar/2016-06-15/w_120x120_57602bd098133.jpg',
        ];
        var index=this.node.name.substring(3);
        var mask = this.node.addComponent(cc.Mask);
        mask.type = cc.Mask.ELLIPSE;
        this.node.width = 100;
        this.node.height = 100;
        var node=new cc.Node();
        var mSf = node.addComponent(cc.Sprite);
        mSf.node.parent = this.node;
        if(avatar[index]){
            cc.loader.load(avatar[index], function (err, tex) {
                mSf.spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, 87, 123));
            });
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
