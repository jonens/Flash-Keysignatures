/* 
	Games.Notation.NotationController
	Methods to control the display and properties of a notation view, and update 
	the NotationModel   */

/* constructor - @param number num The number of ledgerlines to start with */
Games.Notation.NotationController = function ()
{
	//this.setRangeIndex(range_index);
	this.backend = Vex.Flow.Renderer.Backends.CANVAS;
	if (!Modernizr.canvas) {				
		this.backend = Vex.Flow.Renderer.Backends.RAPHAEL;		
	}
}

/** Draw a new staff on the canvas
	@param string canvas_id - the DOM canvas element id
	@param number x, y - the starting (upper left) coordinates for the staff
	@param number width - the width of the staff
	@param string size - the VexFlowMod size parameter (e.g., Config.LARGE = "large"*/
Games.Notation.NotationController.prototype.drawStaff = function (canvas_id, x, y, width, size)
{
	var canvas = document.getElementById(canvas_id);
	//console.log("y: " + y);
	var renderer = new Vex.Flow.Renderer(canvas, this.backend);
	var ctx = renderer.getContext();
	var stave = new Vex.Flow.Stave(x, y, width, Vex.Flow.stave_specs[size]);
	//var stave = new Vex.Flow.Stave(x, y, width);
	//var stave = new Vex.Flow.Stave(x, y, width);
	stave.setContext(ctx).draw(ctx, false, false);
	return stave;
}

/**	Draw a clef on an existing staff
	@param string canvas_id - the DOM canvas element id
	@param stave (object) stave - the VexFlow stave object to draw on
	@param string clef_type - The name string value of the clef to draw*/
Games.Notation.NotationController.prototype.drawClef = function (canvas_id, stave, clef_type)
{
	var canvas = document.getElementById(canvas_id);
	var renderer = new Vex.Flow.Renderer(canvas, this.backend);
	var ctx = renderer.getContext();
	stave.addClef(clef_type).setContext(ctx).draw(ctx, false, false);;
}

/**
	Draw a note on the given staff with the given parameters
	@param string canvas_id 	The DOM canvas element id for this note/staff
	@param Vex.Flow.Stave stave 			The VexFlow stave object for this note
	@param string note_name		The note name index for VexFlow
	@param string note_dur		The note duration index for VexFlow
	@param string clef_type		The clef type for VexFlow
	@param Vex.Flow time_sig  	The VexFlow sime signature property object for this note
									group 				*/
Games.Notation.NotationController.prototype.drawNote = function (canvas_id, stave, 
		note_name, note_dur, clef_type, sz, time_sig) {
	var canvas = document.getElementById(canvas_id),
		renderer = new Vex.Flow.Renderer(canvas, this.backend),
		ctx = renderer.getContext(),
		note,
		notes;
	
	/************ Render the note on the canvas ******************************/
	note = new Vex.Flow.StaveNote({ keys: [note_name], duration: note_dur, clef: clef_type, 
					size: sz }).setRenderOptions();
	notes = [note];
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes, time_sig);
	return note;
}

Games.Notation.NotationController.prototype.hideNote = function ()
{
	var stave_layer = $("div.staff_area canvas")[3];	
	var stave_renderer = new Vex.Flow.Renderer(stave_layer, this.backend);
	var stave_ctx = stave_renderer.getContext();
	stave_ctx.clearRect(0, 0, cfg.NOTE_LAYER_WIDTH, cfg.BG_LAYER_HEIGHT);
	var note_stave = new Vex.Flow.Stave(cfg.NOTE_LAYER_LEFT, cfg.FG_STAVE_TOP, 
			cfg.NOTE_LAYER_WIDTH - 10, Vex.Flow.stave_specs[cfg.LARGE]);
	note_stave.setContext(stave_ctx).draw(stave_ctx, false, false);
}

/** Draw a key signature on an existing staff
	@param stave (object) stave - the VexFlow stave object to draw on
	@param string keySpec - The name string value of the clef to draw
	@param string clefSpec - The string type of the clef to draw*/	
Games.Notation.NotationController.prototype.drawKeySignature = function (canvas_id, stave,
			keySpec, clefSpec)
{
	var canvas = document.getElementById(canvas_id),
		renderer = new Vex.Flow.Renderer(canvas, this.backend),
		ctx = renderer.getContext(),
		x_offset = 2,
		len = stave.glyphs.length;
	this.clearKeySignature(stave);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	stave.addKeySignature(keySpec, clefSpec).setContext(ctx).draw(ctx, false, false);
	stave.setNoteStartX(Math.round(stave.getNoteStartX() + 
				(Vex.Flow.keySignature.keySpecs[keySpec].num * x_offset)));
}

/** accidentalCodes can be read from Vex.Flow.accidentalCodes()
	clef codes: Treble = "v83"
	time signature code = "v0"*/	
Games.Notation.NotationController.prototype.clearKeySignature = function (stave) {
	var i, len = stave.glyphs.length, code, metrics;
	for (i = len - 1; i > 0; i--) {
		console.log("code: " + stave.glyphs[i].code);
		stave.glyphs.pop(i);
	}
}

Games.Notation.NotationController.prototype.drawTimeSignature = function (canvas_id, stave, timeSpec) {
	//TODO
	var canvas = document.getElementById(canvas_id),
		renderer = new Vex.Flow.Renderer(canvas, this.backend),
		ctx = renderer.getContext(),
		x_offset = 2,
		len = stave.glyphs.length;
	//this.clearTimeSignature(stave);
	console.log("draw TS: canvas_id: " + canvas_id + " timeSpec: " + timeSpec);
	stave.addTimeSignature(timeSpec).setContext(ctx).draw(ctx, false, false);
}

/** accidentalCodes can be read from Vex.Flow.accidentalCodes()
	clef codes: Treble = "v83"
	time signature code = "v0"*/	
Games.Notation.NotationController.prototype.clearTimeSignature = function (stave) {
	var i, len = stave.glyphs.length, code;
	/*
	for (i = len - 1; i > 1; i--) {
		console.log("code: " + stave.glyphs[i].code);
		stave.glyphs.pop(i);
	}
	*/
	for (i = len - 1; i >= 0; i--) {
		code = stave.glyphs[i].code;
		console.log("code = " + code);
		if (code === "v0"){
			stave.glyphs.pop(i);
		}
	}
}

Games.Notation.NotationController.prototype.getNoteValue = function ()
{
	return notationModel.getNoteValue();
}

Games.Notation.NotationController.prototype.setRangeIndex = function (num)
{
	notationModel.setRangeIndex(num);
}

Games.Notation.NotationController.prototype.getRandomClefIndex = function (range, offset)
{	
	return notationModel.randomClefIndex(range, offset);	
}

Games.Notation.NotationController.prototype.getRandomKeySignature = function ()
{	
	return notationModel.randomKeySignature();	
}

