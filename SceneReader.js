async function readSceneFile(sceneFile){
    var file = await loadJsonFile(sceneFile);
    document.title = file.Title;
    return file;
}

async function createSceneModels(scene, gl){
    var models = [];

    if(gl === null || gl === undefined){
        console.error("gl not initialized cannot continue!");
        return;
    }

    for (var i = 0; i < scene.Models.length; i++) {
        var model = scene.Models[i];
        if(model.Type === "COLOUR"){
            models.push(await createColouredModel(gl, model.FileName, model.Position, model.Colour));
        }

    }

    return models;


}