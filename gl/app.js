
var VertexShaderText =  `precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertColor;

varying vec3 fragColor;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
    fragColor = vertColor;
    gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}`
var FragmentShaderText = `precision mediump float;

varying vec3 fragColor;

void main()
{
    gl_FragColor = vec4(fragColor, 1.0);
}`


var Init = function () {

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
	[//  x   y     z     r   g   b
		0.0, 0.5, 0.0,  1.0,1.0,0.0,
		-0.5, -0.5, 0.0,  0.7,0.0,1.0,
		0.5, -0.5, 0.0,  0.1,1.0, 0.6
	];
	
	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);


    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		positionAttribLocation,
		3, // number of elements per attribute
		gl.FLOAT, //type of elements
		gl.FALSE,
		6 * Float32Array.BYTES_PER_ELEMENT,// size of vertexes
		0 // offset from the beginning of a single vertex to this attribute
	);
    gl.vertexAttribPointer(
        colorAttribLocation,
        3, // number of elements per attribute
        gl.FLOAT, //type of elements
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,// size of vertexes
        3 * Float32Array.BYTES_PER_ELEMENT // offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    //tell open gl to use this shader program
    gl.useProgram(program);


    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');


    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0,0, -2],[0,0,0],[0,1,0]);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);


    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);


	//
    // Main render loop
    //
    var identityMatrix = new Float32Array(16);
    mat4.identity(identityMatrix);
    var angle = 0;
    var loop = function() {

        angle = performance.now() / 1000 / 6 * 2 * Math.PI;
        mat4.rotate(worldMatrix, identityMatrix, angle, [0, 1 ,0]);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);


        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
	
	
};