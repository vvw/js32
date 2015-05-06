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
	for (i = 0; i < 3; i++) {
		butterfly = new createjs.Bitmap(img);
		butterfly.x = i * 200;
		stage.addChild(butterfly);
		createjs.Tween.get(butterfly).wait(i * 1000).to({ y: 100}, 1000,createjs.Ease.quadOut).call(butterflyComplete);
	}
}

function butterflyComplete() {
	stage.removeChild(this);
	if (!stage.getNumChildren()) {
		console.log ('over.');
	}
}