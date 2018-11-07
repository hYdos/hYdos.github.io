async function loadImage(url) {

    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () =>{
            setTimeout(resolve, 2000, image);
        });
        image.src = url;
    });

}