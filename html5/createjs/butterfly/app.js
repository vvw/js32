var stage;
var queue;

function init() {
	queue = new createjs.LoadQueue();
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete", onLoadComplete);
	queue.loadManifest([{
		id: "butterfly",
		src: "img/butterfly.jpg"
	}]);

}

function onLoadComplete() {
	setupStage();
	buildButterflies();
	addTransparentLayer ();
}

function setupStage() {
	stage = new createjs.Stage(document.getElementById('canvas'));
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", function() {
		stage.update();
	});
}

function buildButterflies() {
	var img = queue.getResult("butterfly");
	var i, sound, butterfly;
	for (i = 0; i < 2; i++) {
		butterfly = new createjs.Bitmap(img);
		butterfly.x = i * 200;
		stage.addChild(butterfly);
		createjs.Tween.get(butterfly).wait(i * 1000).to({ y: 100}, 1000,createjs.Ease.quadOut).call(butterflyComplete);
	}
	butterfly = new createjs.Bitmap(img);
	butterfly.x = 3 * 200;
	stage.addChild(butterfly);
	createjs.Tween.get(butterfly).wait(3 * 1000).to({ y: 300}, 3000,createjs.Ease.quadOut).to({rotation:360},3000).call(butterflyComplete);
	// square.regX = square.regY = 50;  // setting rotation point
}

function butterflyComplete() {
	stage.removeChild(this);
	console.log (stage.getNumChildren());
	if (!stage.getNumChildren()) {
		console.log ('over.');
	}
}

function addTransparentLayer () {
	var screen = new createjs.Shape();
	screen.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, .5));
	screen.graphics.drawRect(0, 0, stage.canvas.width, stage.canvas.height);
	stage.addChild(screen);
}

