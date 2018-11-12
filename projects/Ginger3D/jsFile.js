let timeout = 200;

async function loadFile(url){
	let myHeaders = new Headers();
    let options = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };
	return new Promise(resolve => {
        setTimeout(resolve, timeout, fetch(url, options).then(resolve => resolve.text()));
    });
	
}


async function loadJsonFile(url) {
    let myHeaders = new Headers();
    let options = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };
    return new Promise(resolve => {
        setTimeout(resolve, timeout, fetch(url, options).then(resolve => resolve.json()));
    });
}

async function loadImage(url) {

    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () =>{
            setTimeout(resolve, timeout, image);
        });
        image.src = url;
    });

}