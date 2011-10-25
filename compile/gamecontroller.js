/* 
	Flash Key Signatures
	Methods to control the gameplay and properties of a Flash Key Signatures game, 
	and to update the StatusModel */
   
/* constructor   */
Flash.KeySignature.GameController = function () {
	var is_max_level = false,
		label_mode;
	this.MAJOR = 0,
	this.MINOR = 1,
	this.BOTH = 2;
	this.SCALE = 1.3;
	this.stave;
	this.clef_index = cfg.TREBLE;
	this.clef_type = cfg.CLEF_TYPES[this.clef_index];
	this.ks_index = cfg.FS;
	this.key_spec = cfg.KEY_SIGS[this.ks_index];
	this.timeOut = 25;
	this.prev_labels = ["","",""];
	this.getLabelMode = function () {
		return label_mode;
	}
	this.setLabelMode = function (mode) {
		label_mode = mode;
	}
	this.init();	
}

/* Initialize game variables to initial state */
Flash.KeySignature.GameController.prototype.init = function () {	
	statusModel.start(false);
	statusModel.setIsTimeout(false);	
	statusModel.setTimeInterval(cfg.TIMEOUT);
	statusModel.setLevel(1);
	statusModel.setPoints(0);
	statusModel.setAttempts(0);
	statusModel.setScore(0);	
	statusModel.setLives(statusModel.MAX_LIVES);
	statusModel.setMaxKeyIndex(statusModel.TIER_1);
	this.setLabelMode(this.MAJOR);
	statusView.displayTime("#status_timer", 0);
	notationModel.setKeySignature(this.ks_index);
	this.stave = notationController.drawStaff("staff_paper", 10, 15, 245, this.SCALE);
	notationController.drawClef("staff_paper", this.stave, this.clef_type);
	this.displayScore();	
	return this;
}

Flash.KeySignature.GameController.prototype.displayGame = function () {
	this.init();
	statusView.initLivesDisplay("game_lives", statusModel.MAX_LIVES);
	statusView.initHitDisplay("hit_light");
	$('#status_level_label').html("Level:");
	$('#status_level').html("1");
	this.displaySessionAlert(true, false, false);		
}

Flash.KeySignature.GameController.prototype.startGame = function (timer_id) {
	var start = statusModel.getStart();
	if (!start){		
		statusModel.start(true);
		this.keySpec = statusModel.getKeySpec();
		this.displayButtonLabels();
		notationController.drawKeySignature("staff_paper", this.stave, this.keySpec);
		this.startTimer(timer_id, this.timeOut);
	}
	else{	
		this.stopGame();
	}
}

Flash.KeySignature.GameController.prototype.displayButtonLabels = function () {
	var i, id, label, labels = statusModel.getTempSigs(),
		mode = this.getLabelMode(), switcher = -1;
	if (mode === this.BOTH) {
		switcher = Math.round(Math.random() * 1000) % 2;
		mode = (switcher === 0) ? this.MAJOR : this.MINOR;
	}
	//TODO: choose major or minor label depending on current game level
	for (i = 0; i < labels.length; i++) {		
		label = (mode === this.MAJOR) ? labels[i].majorName : labels[i].minorName;
		id = "#" + $('div.input_box button')[i].id;
		$(id).removeClass(this.prev_labels[i]);
		$(id).addClass(label);
		this.prev_labels[i] = label;
	}
	
}
Flash.KeySignature.GameController.prototype.startTimer = function (timer_id, timeOut) {
	var t, that = this;
	if (timeOut < 0){	
		clearTimeout(this.getT);
		statusModel.setIsTimeout(true);		
		this.stopGame();	
	}
	else{
		t = setTimeout(function () {
			that.updateTimer(timer_id, timeOut, t)}, 1000);
	}	
	statusView.displayTime(timer_id, timeOut);	
	return this;	
}

Flash.KeySignature.GameController.prototype.updateTimer = function (timer_id, time, t) {	
	if (statusModel.getStart()) {
		time -= 1;
		statusModel.setTime(time);
		statusModel.setTimeInterval(time);
		this.startTimer(timer_id, time, t);	
	}
}

Flash.KeySignature.GameController.prototype.continueGame = function (code) {
	var lives, match,
		start = statusModel.getStart(),
		level = statusModel.getLevel();
	statusModel.setInputCode(parseInt(code));	
	match = statusModel.getMatch();
	if (match) {
		statusView.updateHitDisplay(true);
	}
	else {
		statusView.updateHitDisplay(false);
		statusModel.decLives();		
		lives = statusModel.getLives();
		statusView.updateLivesDisplay();
	}
	if (start && match){
		this.keySpec = statusModel.getKeySpec();
		this.displayButtonLabels();
		notationController.drawKeySignature("staff_paper", this.stave, this.keySpec);
		statusModel.addPoint();
		statusModel.calculateScore();
	}
	if (start){
		statusModel.addAttempt();		
		this.displayScore();		
	}
}

Flash.KeySignature.GameController.prototype.stopGame = function () {
	var next_level, level, game_over;
	statusModel.start(false);
	next_level = statusModel.isLevelAdvance();
	game_over = (statusModel.getLives() > 0) ? false : true;
	if (next_level){
		statusModel.advanceLevel();
		statusModel.addBonus();		
	}
	this.displaySessionAlert(false, game_over, next_level);	
	return this;
}

/* Call this function only after a timeout (not after user presses stop button) */
Flash.KeySignature.GameController.prototype.resetGame = function () {
	statusModel.setIsTimeout(false);
	statusModel.setTimeInterval(this.timeOut);
	statusModel.setPoints(0);
	statusModel.setAttempts(0);	
	this.displayScore();
}

Flash.KeySignature.GameController.prototype.getStart = function() {
	return statusModel.getStart();
}
		
/* Use this method to update the game to the next level when in GAME mode,
	ONLY after stopGame() */
Flash.KeySignature.GameController.prototype.updateLevel = function () {	
	var level = statusModel.getLevel();
	if (statusModel.getIsTimeout()){
		this.resetGame();
	}
	switch(level) {
		case 1:
			statusModel.setMaxKeyIndex(statusModel.TIER_1);
			this.setLabelMode(this.MAJOR);
			break;
		case 2:
			statusModel.setMaxKeyIndex(statusModel.TIER_2);
			this.setLabelMode(this.MAJOR);
			break;
		case 3:
			statusModel.setMaxKeyIndex(statusModel.TIER_3);
			this.setLabelMode(this.MAJOR);
			break;
		case 4:
			statusModel.setMaxKeyIndex(statusModel.TIER_4);
			this.setLabelMode(this.MAJOR);
			break;
		case 5:
			statusModel.setMaxKeyIndex(statusModel.TIER_5);
			this.setLabelMode(this.MAJOR);
			break;
		case 6:
			statusModel.setMaxKeyIndex(statusModel.TIER_1);
			this.setLabelMode(this.MINOR);
			break;
		case 7:
			statusModel.setMaxKeyIndex(statusModel.TIER_2);
			this.setLabelMode(this.MINOR);
			break;
		case 8:
			statusModel.setMaxKeyIndex(statusModel.TIER_3);
			this.setLabelMode(this.MINOR);
			break;
		case 9:
			statusModel.setMaxKeyIndex(statusModel.TIER_4);
			this.setLabelMode(this.MINOR);
			break;
		case 10:
			statusModel.setMaxKeyIndex(statusModel.TIER_5);
			this.setLabelMode(this.MINOR);
			break;
		case 11:
			statusModel.setMaxKeyIndex(statusModel.TIER_2);
			this.setLabelMode(this.BOTH);
			break;
		case 12:
			statusModel.setMaxKeyIndex(statusModel.TIER_3);
			this.setLabelMode(this.BOTH);
			break;
		case 13:
			statusModel.setMaxKeyIndex(statusModel.TIER_4);
			this.setLabelMode(this.BOTH);
			break;
		case 14:
			statusModel.setMaxKeyIndex(statusModel.TIER_5);
			this.setLabelMode(this.BOTH);
			break;
	}
	this.displayScore();
	this.displaySessionAlert(true, false, false);
}

/* Display points, percent, and total score on Status Bar on Game Screen */
Flash.KeySignature.GameController.prototype.displayScore = function () {	
	statusView.displayPoints("#status_points", statusModel.getPoints(), 
		statusModel.getAttempts());
	statusView.displayPercent("#status_percent", statusModel.getPoints(), 
		statusModel.getAttempts());
	statusView.displayScore("#status_score", statusModel.getScore());	
	statusView.displayLevel("#status_level", statusModel.getLevel());	
	statusView.displayHiScore("#hi_score", statusModel.getHiScore());
}

/* Display points, percent, and total score on Summary Screen*/
Flash.KeySignature.GameController.prototype.displaySummary = function () {	
	var time;
	$('#game_frame').hide();
	$('#staff_paper').hide();
	statusView.displayPoints("#point_summary", statusModel.getPoints(),
		statusModel.getAttempts());
	statusView.displayPercent("#percent_summary", statusModel.getPoints(),
		statusModel.getAttempts());
	statusView.displayScore("#score_summary", statusModel.getScore());
	$('#time_summary_row').hide();
	$('#score_summary_row').show();
	$('#level_summary_row').show();
	$('#lives_summary_row').show();
	$('#next_level_row').show();
	$('#level_summary').html("" + statusModel.getLevel());
	$('#lives_summary').html("" + statusModel.getLives());
	$('#summary_frame').show();	
}

Flash.KeySignature.GameController.prototype.removeLivesDisplay = function () {
	statusView.removeLivesDisplay();	
}

/* Display Game_Mode session alerts 
	@param boolean start Display "start_session" button if true, display 
		"end_session" button if false.  
	@param boolean over Display "game_end" if true		*/
Flash.KeySignature.GameController.prototype.displaySessionAlert = function (start, over, nextLevel) {
	$('#menu_frame').hide();
	$('#instructions_frame').hide();
	$('#summary_frame').hide();
	$('#game_frame').hide();
	$('#staff_paper').hide();
	$('#menu_buttons').hide();	
	$('#session_frame').show();
	$('#game_status_box').show();	
	if (start && !over){
		$('#session_start_header').html("Level " + statusModel.getLevel());		
		$('#session_end').hide();
		$('#game_end').hide();				
		$('#session_start').show();
		$('#session_start_button').focus();
	}
	else if (!over){
		$('#session_start').hide();
		$('#game_end').hide();
		lives = statusModel.getLives();
		lives_str = (lives > 1) ? " lives" : " life";
		$('#lives').html("" + statusModel.getLives() + lives_str + " left");
		if (nextLevel) {
			$('#session_end_header').html("Good Job!");
			$('#bonus').html("BONUS PTS<br/>" + statusModel.getBonus());
		}
		else {
			$('#session_end_header').html("Same Level");
			$('#bonus').html("BONUS PTS<br/>0");
		}
		$('#session_end').show();
		$('#session_end_button').focus();
	}
	else{
		$('#session_start').hide();
		$('#session_end').hide();
		$('#game_end').show();
		$('#scores_button').focus();
	}
}

Flash.KeySignature.GameController.prototype.processFinalScore = function () {
	var xhr, hiScore, 
		scoreStr,
		currentScore = statusModel.getScore(),
		storedScore,
		time,
		date_string,
		time_string;
	statusModel.setDate();
	time = statusModel.getDateTime();
	date_string = statusModel.getDateString();
	time_string = statusModel.getTimeString();
	scoreStr = "score=" + currentScore + "&time=" + time + "&date_string=" + 
					date_string + "&time_string=" + time_string;	
	if (Modernizr.localstorage){
		storedScore = statusModel.getHiScore();
		hiScore = (storedScore > currentScore) ? storedScore : currentScore;
		statusModel.setHiScore(hiScore);
	}
	else{
		hiScore = currentScore;
		statusModel.setHiScore(hiScore);
	}
	$('#score_text').html("Please wait . . . retrieving scores");
	ajaxUtilities.createXHR();
	xhr = ajaxUtilities.getXHR();	
	ajaxUtilities.open("POST", "php/get_scores.php");
	xhr.onreadystatechange = ajaxUtilities.onChange;
	ajaxUtilities.send("POST", scoreStr);	
}

Flash.KeySignature.GameController.prototype.displayFinalScore = function (success) {
	var i, score, date, time, 
		rank = "",		
		scores = "",
		dates = "",
		footer_string = "your score: " + statusModel.getScore(),
		length = statusModel.top_scores.length;
	if (success) {
		for (i = 0; i < length; i++){			
			score = parseInt(statusModel.top_scores[i]);
			date = statusModel.top_date_strings[i];
			time = parseInt(statusModel.top_times[i]);
			if (score === statusModel.getScore() && time === statusModel.getDateTime()){
				rank += "<span class=\"your_scores\">" + (i + 1) + ".</span><br />";
				scores += "<span class=\"your_scores\">" + score + "*" +  "</span><br />";
				dates += "<span class=\"your_scores\">" + date + "</span><br />";
				footer_string = "* your score";
			}
			else {
				rank += (i + 1) + ".<br />";
				scores += score + "<br />";
				dates += date + "<br />";
			}
		}
	}
	else {
		for (i = 0; i < 10; i++){
			rank += (i + 1) + ".<br />";
			scores += "unavailable<br />";
			dates += "unavailable<br />";
		}
	}	
	$('#score_display_frame').show();
	$('#main_menu_button').focus();
	$('#top_rank').html(rank);
	$('#top_scores').html(scores);
	$('#top_dates').html(dates);
	$('#top_score_footer').html(footer_string);
}

