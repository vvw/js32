var spawn = require('child_process').spawn;
var reconize=function(imageName,callback){
	var child = spawn('./calldll', [imageName]);
	child.stdout.on('data', function(chunk) {
       		callback (''+chunk);
	});
	
}
var imageName = __dirname + '/IMG_0167.JPG';
reconize(imageName, function(re) {
	console.log(re);
});
