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
    //TODO: add panning as an option on settings
    //TODO: add panning as an option on settings
    //TODO: add panning as an option on settings
    //TODO: add panning as an option on settings//TODO: add panning as an option on settings
    //TODO: add panning as an option on settings


    window.oncontextmenu = function ()
    {
        //
        //stop person from seeing normal right click menu
        //
        return false;
    }

    const settings = {
		canvasContext: gl,
        shadowTextureSize: 1024,
		clearColour: [0.7,0.7,1]
    };


    var mower = await createColouredModel(gl, "mower.json", [0,0,0], [1,1,1]);

    var scene = await readSceneFile("demoScene.G3D");
    var sceneModels = await createSceneModels(scene, gl);


    let Engine = new Ginger3D(settings);
    Engine.Load(sceneModels,
        function (SceneLoadError) {
            if (SceneLoadError) {
                alert('Could not load:' + scene.Title + '; see console for more details');
                console.error(SceneLoadError);
            } else {




                Engine.Begin();
            }
        });

}