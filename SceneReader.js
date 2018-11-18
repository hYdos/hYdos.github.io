async function readSceneFile(sceneFile){
    var file = await loadJsonFile(sceneFile);
    console.log("loaded scene: " + file.Title);
    document.title = file.Title;
    return file;
}

async function loadSceneModels(scene){
    for (var i = 0; i < scene.Models.length; i++) {

    }
}