
var VertexShaderText =  `precision mediump float;

attribute vec2 vertPosition;
attribute vec3 vertColor;

varying vec3 fragColor;

void main()
{
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}`
var FragmentShaderText = `precision mediump float;

varying vec3 fragColor;

void main()
{
    gl_FragColor = vec4(fragColor, 1.0);
}`

console.log(VertexShaderText);

var InitDemo = function () {

	console.log("Starting...");
	
	var canvas = document.getElementById('game-surface');
	var gl = canvas.getContext('webgl');
	
	if (!gl){
		gl = canvas.getContext('experimental-webgl');
	}
	
	if(!gl){
		
		alert("your browser does not support webGl!");
		console.log("your browser does not support webGl!");
		
	}
	
	
	canvas.width = window.innerWidth - 20;
	canvas.height = window.innerHeight - 20;
	gl.viewport(0,0 ,window.innerWidth - 20, window.innerHeight - 20);
	
	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	
	
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	
	gl.shaderSource(vertexShader, VertexShaderText);
	gl.shaderSource(fragmentShader, FragmentShaderText);
	
	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}
	
	gl.compileShader(fragmentShader);
		if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}
	
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	
	
	//
	// Create Buffer
	//
	var triangleVertices =
	[
		0.0, 0.5,   1.0,1.0,0.0,
		-0.5, -0.5, 0.7,0.0,1.0,
		0.5, -0.5,  0.1,1.0, 0.6
	];
	
	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);


    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		positionAttribLocation,
		2, // number of elements per attribute
		gl.FLOAT, //type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT,// size of vertexes
		0 // offset from the beginning of a single vertex to this attribute
	);
    gl.vertexAttribPointer(
        colorAttribLocation,
        3, // number of elements per attribute
        gl.FLOAT, //type of elements
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,// size of vertexes
        2 * Float32Array.BYTES_PER_ELEMENT // offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

	//
    // Main render loop
    //
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
	
	
};