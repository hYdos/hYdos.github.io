
const canvas = document.getElementById('Jngine');
const context = canvas.getContext('2d');


function render(){
    //clear the screen
    context.fillStyle = '#22c7ff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    //draw array of entity objects

    //tmp test image
    context.drawImage(img, 0, 0, img.width, img.height);
}



function update(){
    render();
    requestAnimationFrame(update);
}

let img;

async function init(){
    img = await loadImage("images/test.png");
    alert('Loaded image!');
    document.addEventListener('keydown', event =>{
        console.log(event.key);
        let key = event.key;
        //all key events go here
        if(key = 'h'){

        }
    });
}


init().then(update);
