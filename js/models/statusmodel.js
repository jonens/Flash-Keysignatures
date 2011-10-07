/* 
	FlashNotes Keyboard
	Provides basic control functions for games */

/* constructor */
Flash.KeySignature.StatusModel = function() {
	this.MAX_LEVEL = 8;
	this.TIER_1 = 4; //max index for key signatures for first tier of play (up to 2 #'s or b's)
	this.TIER_2 = 8; //max index for key signatures for second tier of play (up to 4 #'s or b's)
	this.TIER_3 = 14; //max index for key signatures for third tier of play (up to 7 #'s or b's)
	this.MIN_ATTEMPTS = 5;
	this.MIN_PERCENT = 80;
	this.TIMEOUT = 25;
	this.BONUS = 50;
	this.BONUS_INC = 50;
	this.BONUS_LEVEL = 12;
	this.MAX_LIVES = 5;
	var time, date, date_time,
		points = 0,
		attempts = 0,
		score = 0,
		level = 0,
		bonus = 0,
		lives = 5,
		go = false,
		timeInterval = this.TIMEOUT,
		isTimeOut = false,
		old_score, hi_score,
		input_code = 0,
		value_code = 0,
		current_ks_index = this.TIER_1,
		key_sigs = {
			0: {spec: "C", majorName: "c_maj", minorName: "a_min"},
			1: {spec: "G", majorName: "g_maj", minorName: "e_min"},
			2: {spec: "F", majorName: "f_maj", minorName: "d_min"},
			3: {spec: "D", majorName: "d_maj", minorName: "b_min"},
			4: {spec: "Bb", majorName: "bf_maj", minorName: "g_min"},
			5: {spec: "A", majorName: "a_maj", minorName: "fs_min"},
			6: {spec: "Eb", majorName: "ef_maj", minorName: "c_min"},
			7: {spec: "E", majorName: "e_maj", minorName: "cs_min"},
			8: {spec: "Ab", majorName: "af_maj", minorName: "f_min"},
			9: {spec: "B", majorName: "b_maj", minorName: "gs_min"},
			10: {spec: "Db", majorName: "df_maj", minorName: "bf_min"},
			11: {spec: "F#", majorName: "fs_maj", minorName: "ds_min"}, 
			12: {spec: "Gb", majorName: "gf_maj", minorName: "ef_min"},
			13: {spec: "C#", majorName: "cs_maj", minorName: "as_min"},
			14: {spec: "Cb", majorName: "cf_maj", minorName: "af_min"}
		},
		temp_sigs = [];
		
	if (Modernizr.localstorage){
		old_score = parseInt(localStorage.getItem("hiscore_keysignature"));
		hi_score = (old_score) ? old_score : 0;
	}
	else {
		hi_score = 0;
	}
	this.getTime = function () {
		return time;
	}
	this.setTime = function (t) {
		time = t;
	}
	this.setDate = function () {
		date = new Date();
		date_time = date.getTime();
	}
	this.getDateTime = function () {
		return date_time;
	}
	this.getDateString = function () {	
		var month = "" + (date.getMonth() + 1);
		var day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();	
		return month + "-" + day + "-" + date.getFullYear();
	}
	this.getTimeString = function () {
		var hour = "" + date.getHours();
		var minute = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
		var second = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
		return hour + ":" + minute + ":" + second;
	}
	this.addPoint = function () {	
		points += 1;
	}
	this.setPoints = function (num) {	
		points = num;
	}
	this.getPoints = function () {
		return points;
	}
	this.addAttempt = function () {
		attempts += 1;
	}
	this.setAttempts = function (num) {
		attempts = num;
	}
	this.getAttempts = function () {
		return attempts;
	}
	this.getPercent = function () {
		return Math.floor((points / attempts) * 100);
	}
	this.calculateScore = function() {
		score += (points * level);
	}
	this.addBonus = function () {
		bonus = this.BONUS * level;
		score += bonus;
	}
	this.getBonus = function (){
		return bonus;
	}
	this.setScore = function (num) {
		score = num;
	}
	this.getScore = function () {
		return score;
	}
	this.getHiScore = function () {
		return hi_score;
	}
	this.setHiScore = function (num) {
		hi_score = num;
		if (Modernizr.localstorage){
			localStorage.setItem("hiscore_keysignature", hi_score);
		}
	}
	this.setLevel = function (lvl) {
		level = lvl;	
		if (level > this.BONUS_LEVEL) {
			this.BONUS += this.BONUS_INC;
		}
	}
	this.getLevel = function () {
		return level;
	}
	this.advanceLevel = function () {	
		this.setLevel((level < this.MAX_LEVEL) ? level += 1 : this.MAX_LEVEL);
		return this;
	}
	this.decLives = function () {
		lives -= 1;
		if (lives < 0){
			lives = 0;
		}
	}
	this.setLives = function (num) {
		lives = num;
	}
	this.getLives = function () {
		return lives;
	}
	/** @param boolean go Toggles game play  */
	this.start = function (g) {
		go = g;
	}
	this.getStart = function () {
		return go;
	}
	this.setTimeInterval = function (num) {
		timeInterval = num;
	}
	this.getTimeInterval = function () {
		return timeInterval;
	}
	/* Set a boolean indicating timeOut */
	this.setIsTimeout = function (to){
		isTimeOut = to;
	}
	/* Get boolean indicating timeOut */
	this.getIsTimeout = function () {
		return isTimeOut;
	}
	
	this.getMaxKeyIndex = function () {
		return current_ks_index;
	}
	
	this.setMaxKeyIndex = function (index) {
		current_ks_index = index;
	}
	
	/* Returns the spec for the currently-displayed key signature */
	this.getKeySpec = function () {
		var shuffled_keys = [], i, j,
			max = this.getMaxKeyIndex();
		
		//shuffle the key signatures (Fisher–Yates shuffle, inside-out)
		//To initialize an array a of n elements to a randomly shuffled copy of 
		//source, both 0-based:		
		shuffled_keys[0] = key_sigs[0];
		for (i = 1; i <= max; i++) {
			j = Math.round(Math.random() * 100) % (i + 1);
			shuffled_keys[i] = shuffled_keys[j];
			shuffled_keys[j] = key_sigs[i];			
		}		
		for (i = 0; i < 3; i++) {
			temp_sigs[i] = shuffled_keys[i];
		}
		j = Math.round(Math.random() * 1000) % 3;
		value_code = j;
		return temp_sigs[j].spec;
	}
	
	this.getTempSigs = function () {
		return temp_sigs;
	}
	
	this.setInputCode = function (code) {
		input_code = code;
	}
	
	this.getMatch = function () {
		return (input_code === value_code);
	}
	
	this.top_scores = new Array();
	this.top_times = new Array();
	this.top_date_strings = new Array();
	this.top_time_strings = new Array();							
}

/** @return true if level advances, false otherwise */
Flash.KeySignature.StatusModel.prototype.isLevelAdvance = function () {	
	var advance = ((this.getPercent() >= this.MIN_PERCENT) && (this.getIsTimeout()) && 
				(this.getAttempts() >= this.MIN_ATTEMPTS)) ? true : false;
	return advance;
}

Flash.KeySignature.StatusModel.prototype.setGameClefTypes = function () {
	var sel, sw,
		level = this.getLevel();
	if (level <= this.TIER_1) {
		sw = (level % 2 === 0);
		sel = [!sw, sw, false, false]; //treble || bass only
	}
	if (level > this.TIER_1 && level <= this.TIER_2) {
		sel = [true, true, false, false]; //treble || bass only
	}
	if (level > this.TIER_2 && level <= this.TIER_3) {
		sw = (level % 2 === 0);
		sel = [false, false, !sw, sw]; //alto || tenor only
	}
	if (level > this.TIER_3 && level <= this.TIER_4) {
		sel = [false, false, true, true]; //alto || tenor only
	}
	if (level > this.TIER_4) {
		sel = [true, true, true, true]; //any clef
	}
	this.set_clef(sel);
}

Flash.KeySignature.StatusModel.prototype.set_clef = function (selections) {
	var i;
	for (i = 0; i < 4; i++) {
		this.active_clefs[i] = selections[i];
	}
}
