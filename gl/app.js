var VertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'',
'void main()',
'{',
'gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

var FragmentShaderText = 
[
'precision mediump float;',
'',
'',
'void main()',
'{',
'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
'}'
].join('\n');

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
		0.0, 0.5,
		-0.5, -0.5,
		0.5, -0.5
	];
	
	
};