var POLYGON = null;

var Module = {
	//INITIAL_MEMORY: 256*1024*1024,
	locateFile: function(path, prefix) {
		return "./"+prefix + path;
	},
	postRun: [function() {
	
		var canvas = document.getElementById('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		Module.SetUseWebWorker(true);
		Module.Start(canvas.width, canvas.height, "canvas");		

		Module.getViewCamera().setLocation(new Module.JSVector3D(126.92836647767662, 37.52439503321471, 1000.0));

		Module.XDEMapCreateLayer("facility_build", "http://xdworld.vworld.kr:8080", 8080, true, true, false, 9, 0, 15);
		
		var layerList = new Module.JSLayerList(false);
		var layer = layerList.nameAtLayer("facility_build");
		layer.tile_load_ratio = 3.0;
		layer.lod_object_detail_ratio = 3.0;

		Module.getOption().setTextureCapacityLimit(false);
	}],
	canvas: (function() {
		
		var canvas = document.getElementById('canvas');
		if (canvas == null) {
			return;
		}
		
		canvas.getContext("experimental-webgl", {
			preserveDrawingBuffer: true
		});
		
		canvas.addEventListener("contextmenu", function(e){
			e.preventDefault();
		});
		
		return canvas;

	})()
};

window.onresize = function() {
	Module.Resize(window.innerWidth, window.innerHeight);
	Module.XDRenderData();
};

;(function(){

	/* 웹 어셈블리 버전 엔진 안정화 후 적용 sumin 210106 */
	// 1. XDWorldEM.asm.js 파일 로드
	var file = "./XDWorldEM.js";
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/wasm");
	xhr.open('GET', file, true);
	xhr.onload = function() {

		var script = document.createElement('script');
		script.innerHTML = xhr.responseText;
		document.body.appendChild(script);
	};

	xhr.send(null);	

})();