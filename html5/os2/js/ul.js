
function addProperty(canvas) {
	// 子cavas 相对rootCanvas 的x, y 坐标值
	Object.defineProperty(canvas, "x", {
		value: -1,
		writable: true
	}); 
	Object.defineProperty(canvas, "y", {
		value: -1,
		writable: true
	});
	Object.defineProperty(canvas, "clickedQ", {
		value: false,
		writable: true
	});
	Object.defineProperty(canvas, "mouseOverQ", {
		value: false,
		writable: true
	});
	Object.defineProperty(canvas, "images", {
		value: [],
		writable: true
	});
}

function hit (mouseX, mouseY, canvas) {
	if ( mouseX >= canvas.x && mouseX <= canvas.x + canvas.width ) {
    	if ( mouseY >= canvas.y && mouseY <= canvas.y + canvas.height ) {
    		return true;	
    	}
 	}
 	return false;
}

function whichHit (canvasArr) {
	var ca = null;
	for (var i=0; i < canvasArr.length; i++) {
		var canvas = canvasArr[i];
		if ( hit (mouseX, mouseY, canvas) ) {
			ca = canvas;
			break;
		}
	}
	return ca;
}

function whichMouseOver (canvasArr) {
	var ca = null;
	for (var i=0; i < canvasArr.length; i++) {
		var canvas = canvasArr[i];
		if ( canvas.mouseOverQ ) {
			ca = canvas;
			break;
		}
	}
	return ca;
}

function whichClicked (canvasArr) {
	var ca = null;
	for (var i=0; i < canvasArr.length; i++) {
		var canvas = canvasArr[i];
		if ( canvas.clickedQ ) {
			ca = canvas;
			break;
		}
	}
	return ca;
}

function updateGarbageSate(canvas) {
	if ( hit (mouseX, mouseY, canvas) ) {
   		drawCanvas (canvas, rootCanvas, canvas.images[2], function (err, msg) {
			if (err) throw err;
			console.log (msg);
		});
   	}
}

function updateCamvasState (mouseX, mouseY, canvas, rootCanvas, clicked) {
	// 手动对图片检测mouseOver
      		if ( mouseX >= canvas.x && mouseX <= canvas.x + canvas.width ) {
      			if ( mouseY >= canvas.y && mouseY <= canvas.y + canvas.height ) {
      				//console.log ('###mouse over on image');
      				if (clicked) {
      					if (!canvas.clickedQ) {
      						canvas.clickedQ = true;
      						drawCanvas (canvas, rootCanvas, canvas.images[2], function (err, msg) {
      							if (err) throw err;
      							console.log (msg);
      						});
      						return;
      					} else {
      						canvas.clickedQ = false;
      						drawCanvas (canvas, rootCanvas, canvas.images[1], function (err, msg) {
      							if (err) throw err;
      							console.log (msg);
      						});
      					}
      				} 
      				if (!canvas.mouseOverQ && !canvas.clickedQ) {
      					canvas.mouseOverQ = true;
      					if (!clicked) {
							drawCanvas (canvas, rootCanvas, canvas.images[1], function (err, msg) {
      							if (err) throw err;
      							console.log (msg);
      						});
						}
					}
				} else {
					if (canvas.mouseOverQ && !canvas.clickedQ) {
						canvas.mouseOverQ = false;
						drawCanvas (canvas, rootCanvas, canvas.images[0], function (err, msg) {
      						if (err) throw err;
      						console.log (msg);
      					});
					}
				}
      		} else {
      			if (canvas.mouseOverQ && !canvas.clickedQ) {
					canvas.mouseOverQ = false;
					drawCanvas (canvas, rootCanvas, canvas.images[0], function (err, msg) {
      					if (err) throw err;
      					console.log (msg);
      				});
				}
      		}
}

function drawCanvas (canvas, rootCanvas, imageSrc, cb) {
	var img = new Image();
	img.onload = function () {
		canvas.width = img.width;
		canvas.height = img.height;
		rootCanvas.getContext("2d").clearRect(canvas.x, canvas.y, canvas.width, canvas.height);
		rootCanvas.getContext("2d").drawImage(img, canvas.x, canvas.y);
		if (typeof cb == 'function') {
			cb (null, imageSrc + ' loaded.');
		}
	}
	img.src = imageSrc;
}
