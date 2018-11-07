var get = (url) => {
    let myHeaders = new Headers();
    let options = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };
    return fetch(url, options).then(response => response.text());
};
var getJsonFile = (url) => {
    let myHeaders = new Headers();
    let options = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };
    return fetch(url, options).then(response => response.json());
};

async function loadImage(url) {

    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () =>{
            setTimeout(resolve, 2000, image);
        });
        image.src = url;
    });

}