/* This class controls the browser output for the StatusBar */

/* constructor */
Flash.KeySignature.StatusView = function (){		
	var i, lives_paper,
		status_paper,
		box,
		hit_paper,
		hit_path,
		miss_path,
		hit_light,
		miss_light,	
		dots = [],
		length, t;
	this.initLivesDisplay = function (lives_id, lives){
		lives_paper = Raphael(lives_id, 60, 20);
		for (i = 0; i < lives; i++){
			dots[i] = lives_paper.circle(10 * (i + 1), 5, 4.5).attr({fill: "green", 
							stroke: "#000"});
		}	
	}
	this.updateLivesDisplay = function (){
		length = dots.length;
		if (length > 0){
			dots[length - 1].remove();
			dots.pop();
		}	
	}
	this.removeLivesDisplay = function (){	
		lives_paper.remove();	
	}
	this.drawStatusBar = function (x, y, w, h){
		status_paper = Raphael(x,y,w,h);
		box = status_paper.rect(0,0,w,h);
		box.attr({stroke:"red", fill:"#202000"});	
	}
	this.initHitDisplay = function (hit_id){
		hit_paper = Raphael(hit_id, 0, 0);	
		hit_path = "M 5 18 L 17 30 L 33 2 L 17 23 Z";
		miss_path = "M 5 5 L 35 35 M 35 5 L 5 35";
		hit_light = hit_paper.path(hit_path).attr({stroke: "#447",
							'stroke-width': 1});
		miss_light = hit_paper.path(miss_path).attr({stroke: "#447",
							'stroke-width': 5});
		hit_light.hide();
		miss_light.hide();
	}
	this.removeHitDisplay = function (){	
		hit_paper.remove();
		$('.hit_box').hide();
	}
	this.updateHitDisplay = function (hit){
		if (hit) {		
			hit_light.attr({stroke: "#0c2", fill: "#0c2"});	
			miss_light.hide();
			hit_light.show();		
			this.startHitTimer();
		}
		else {		
			miss_light.attr({stroke: "#f00"});
			hit_light.hide();
			miss_light.show();		
			this.startHitTimer();
		}
		$('.hit_box').show();
	}
	this.startHitTimer = function () {
		var that = this;
		t = setTimeout(function () {
				that.stopHitTimer() 
				}, 
				600);
	}
	this.stopHitTimer = function () {
		hit_light.hide();
		miss_light.hide();
		$('.hit_box').hide();
		clearTimeout(t);
	}
}

Flash.KeySignature.StatusView.prototype.displayInputLabels = function (btnId_array, lbl_array) {
	var i, button_id, label, len = btn_array.length;
	for (i = 0; i < len; i++) {
		button_id = btnId_array[i];
		label = lbl_array[i];
		$(button_id).html(label);
	}
}



/** @param string timer_id The html element displaying the timer 
	@param number timeOut The time left in this round (in seconds) */
Flash.KeySignature.StatusView.prototype.displayTime = function (timer_id, timeOut){	
	var prefix = "00:";
	var timeStr = (timeOut >= 0) ? "" + timeOut : "" + (timeOut + 1);
	if (timeOut < 10){
		prefix = "00:0";
	}
	//console.log("time: " + prefix + timeStr);
	$(timer_id).html(prefix + timeStr);
}

/** @param string level_id The html element displaying the current game level */
Flash.KeySignature.StatusView.prototype.displayLevel = function (level_id, lvl){
	var levelStr = "" + lvl;	
	$(level_id).html(levelStr);
}

/** @param string points_id The html element that displays the points
	@param number pts The total points accumulated so far in the game
	@param number att The number of attempts so far in the game */
Flash.KeySignature.StatusView.prototype.displayPoints = function (points_id, pts, att){
	var percentStr = "" + pts + "/" + att;
	$(points_id).html(percentStr);
}

/** @param string percent_id The html element that displays the percent
	@param number pts The total points accumulated so far in the game
	@param number att The number of attempts so far in the game */
Flash.KeySignature.StatusView.prototype.displayPercent = function (percent_id, pts, att){
	var percent = (att > 0) ? Math.round(pts/att * 100) : 0;
	var percentStr = "" + percent + "%";
	$(percent_id).html(percentStr);
}

Flash.KeySignature.StatusView.prototype.displayScore = function (score_id, score){
	var scoreStr = "" + score;
	$(score_id).html(scoreStr);
}

Flash.KeySignature.StatusView.prototype.displayHiScore = function (hiscore_id, hiscore){
	var hiscoreStr = "" + hiscore;
	$(hiscore_id).html(hiscoreStr);
}

