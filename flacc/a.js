(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 800,
	height: 600,
	fps: 12,
	color: "#FFFFFF",
	manifest: [
		{src:"images/_5403.jpg", id:"_5403"},
		{src:"images/_5404.jpg", id:"_5404"},
		{src:"images/_5405.jpg", id:"_5405"},
		{src:"images/_5406.jpg", id:"_5406"},
		{src:"images/_5407.jpg", id:"_5407"},
		{src:"images/位图13.png", id:"位图13"}
	]
};



// symbols:



(lib._5403 = function() {
	this.initialize(img._5403);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,600);


(lib._5404 = function() {
	this.initialize(img._5404);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,600);


(lib._5405 = function() {
	this.initialize(img._5405);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,600);


(lib._5406 = function() {
	this.initialize(img._5406);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,600);


(lib._5407 = function() {
	this.initialize(img._5407);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,600);


(lib.位图13 = function() {
	this.initialize(img.位图13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,556,69);


(lib.补间7 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.位图13();
	this.instance.setTransform(-278,-34.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-278,-34.5,556,69);


(lib.元件1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.补间7("synched",0);
	this.instance.setTransform(278,34.5,0.54,0.539);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1},24).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(128,15.9,300,37.2);


(lib.手把手教学 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();  
		var _this = this; // this is window
		var t=setTimeout(function(){
		    console.log(this, _this); // and this is movieclip
		    _this.gotoAndPlay(1);
		}, 1000);
	}
	this.frame_1 = function() {
		this.stop();  
		var _this = this; // this is window
		var t=setTimeout(function(){
		    console.log(this, _this); // and this is movieclip
		    _this.gotoAndPlay(2);
		}, 1000);
	}
	this.frame_2 = function() {
		this.stop();  
		var _this = this; // this is window
		var t=setTimeout(function(){
		    console.log(this, _this); // and this is movieclip
		    _this.gotoAndPlay(3);
		}, 1000);
	}
	this.frame_3 = function() {
		this.stop();  
		var _this = this; // this is window
		var t=setTimeout(function(){
		    console.log(this, _this); // and this is movieclip
		    _this.gotoAndPlay(4);
		}, 1000);
	}
	this.frame_4 = function() {
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(16));

	// 图层 2
	this.instance = new lib.元件1();
	this.instance.setTransform(189,238,1,1,0,0,0,278,34.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({_off:false},0).to({_off:true},13).wait(3));

	// 图层 1
	this.instance_1 = new lib._5403();

	this.instance_2 = new lib._5404();

	this.instance_3 = new lib._5405();

	this.instance_4 = new lib._5406();

	this.instance_5 = new lib._5407();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).wait(16));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,800,600);


// stage content:



(lib._12 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.手把手教学();
	this.instance.setTransform(400,300,1,1,0,0,0,400,300);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(400,300,800,600);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;