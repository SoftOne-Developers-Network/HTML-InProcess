var slideInUse = new Array();

function Slide(objId, options) {
	var strImgDown = 'images/down_arrow.jpg';
	var strImgUp = 'images/up_arrow.jpg';
	this.obj = document.getElementById(objId);
	this.duration = 1;
	this.height = parseInt(this.obj.style.height);
	this.curState = this.obj.style.display == 'none' ? 0 : 1;
	this.clkImgObj = document.getElementById('img_'+objId);
		
	if(typeof options != 'undefined') { this.options = options; } else { this.options = {}; }
	if(this.options.duration) { this.duration = this.options.duration; }

	this.doASlide = function() {
		if (this.curState != undefined) if (this.curState == 0){
			this.down();			
		} else { this.up(); }		
	}
	
	this.CollapseAll = function() {
			this.up();
	}
	
	this.ExpandAll = function() {
		if (this.curState != undefined) if (this.curState == 0){
			this.down();
		}
	}

	this.up = function() {
		this.curHeight = this.height;
		this.newHeight = '1';
		if(slideInUse[objId] != true) {
			var finishTime = this.slide();
			window.setTimeout("Slide('"+objId+"').finishup("+this.height+");",finishTime);
			if (this.clkImgObj != undefined && this.clkImgObj != null){
				this.clkImgObj.src = strImgDown;
			}
		}
	}
	
	this.down = function() {
		this.newHeight = this.height;
		this.curHeight = '1';
		if(slideInUse[objId] != true) {
			this.obj.style.height = '1px';
			this.obj.style.display = 'block';
			this.slide();
			if (this.clkImgObj != undefined && this.clkImgObj != null){
				this.clkImgObj.src = strImgUp;
			}			
		}
	}
	
	this.slide = function() {
		slideInUse[objId] = true;
		var frames = 30 * duration; // Running at 30 fps

		var tIncrement = (duration*1000) / frames;
		tIncrement = Math.round(tIncrement);
		var sIncrement = (this.curHeight-this.newHeight) / frames;

		var frameSizes = new Array();
		for(var i=0; i < frames; i++) {
			if(i < frames/2) {
				frameSizes[i] = (sIncrement * (i/frames))*4;
			} else {
				frameSizes[i] = (sIncrement * (1-(i/frames)))*4;
			}
		}
		
		for(var i=0; i < frames; i++) {
			this.curHeight = this.curHeight - frameSizes[i];
			window.setTimeout("document.getElementById('"+objId+"').style.height='"+Math.round(this.curHeight)+"px';",tIncrement * i);
		}
		
		window.setTimeout("delete(slideInUse['"+objId+"']);",tIncrement * i);
		
		if(this.options.onComplete) {
			window.setTimeout(this.options.onComplete, tIncrement * (i-2));
		}
		
		return tIncrement * i;
	}
	
	this.finishup = function(height) {
		this.obj.style.display = 'none';
		this.obj.style.height = height + 'px';
	}

	return this;
}

function Expand() {
	var arrPanels = new Array();
	for (var i=1; i<=3; i++) {
		Slide('panel'+i).ExpandAll();
	}
}

function Collapse() {
	var arrPanels = new Array();
	for (var i=1; i<=3; i++) {
		Slide('panel'+i).CollapseAll();
	}
}