'use strict';

var Scene;

async function Init() {
	var canvas = document.getElementById('gl-surface');
	var gl = canvas.getContext('webgl');
	if (!gl) {
		console.log('Failed to get WebGL context - trying experimental context');
		gl = canvas.getContext('experimental-webgl');
	}
	if (!gl) {
		alert('Your browser does not support WebGL - please use a different browser\nGoogleChrome works great!');
		return;
	}
	var models = [];
	Scene = new LightMapDemoScene(gl);
	Scene.Load(models,
		function (demoLoadError) {
		if (demoLoadError) {
			alert('Could not load the demo - see console for more details');
			console.error(demoLoadError);
		} else {




			Scene.Begin();
		}
	});
}