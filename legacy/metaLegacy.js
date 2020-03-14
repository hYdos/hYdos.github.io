Meta=function()
{
	
	var tmpStr = window.location.href;
	var tmp = tmpStr.split("index.html");
	var coreString = tmp[0]; 
	
	//keep this updated with each new release and fork
	//.version should match the version's G.engineVersion in main.js
	var versions=[
		{name:'Legacy v1',version:1,url:coreString + ''},
		{name:'Legacy v2',version:2,url:coreString + 'v2/index.html'},
	];
	
	G.versions=versions;
}