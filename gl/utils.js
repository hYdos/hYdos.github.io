var error = function (string){
    console.error(string);
}

var filesLoaded = new Map();

function filesNotLoaded(files){
    var file;
    var fileAmount = Object.keys(files).length;
    var fileMatches = 0;
    Object.keys(files).forEach(function(key) {
        file = files[key];
        if(!filesLoaded.contains(file)){
            filesLoaded.put(file);
            fileMatches++;
        }
        if(fileAmount == fileMatches){
            return true;
        }else{
            return false;
        }
    });
}

function foo(file) {
    // RETURN the promise
    return fetch(file).then(function(response) {
        return response;

    });
}

function fooJson(file) {
    // RETURN the promise
    return fetch(file).then(function(response){
        return response; // process it inside the `then`
    });
}



// Load a text resource from a file over the network
var loadTextResource = function (url) {
    var request = new XMLHttpRequest();
    request.open('GET', url + '?please-dont-cache=' + Math.random(), false);
    request.onload = function () {
        if (request.status < 200 || request.status > 299) {
            error('Error: HTTP Status ' + request.status + ' on resource ' + url);
            return;
        } else {
            return request.responseText;
        }
    };
    request.send();
};

var loadImage = function (url) {
    var image = new Image();
    image.onload = function () {
        return image;
    };
    image.src = url;
};

var loadJSONResource = function (url) {
    loadTextResource(url, function (err, result) {
        if (err) {
            error(err);
            return;
        } else {
            try {
                return JSON.parse(result);
            } catch (e) {
                error(e)
                return;
            }
        }
    });
};