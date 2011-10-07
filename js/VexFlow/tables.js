// Vex Flow Notation
// Mohit Muthanna <mohit@muthanna.com>
//
// Copyright Mohit Muthanna 2010
//
// Requires vex.js.

Vex.Flow.clefProperties = function(clef) {
  if (!clef) throw new Vex.RERR("BadArguments", "Invalid clef: " + clef);

  var props = Vex.Flow.clefProperties.values[clef];
  if (!props) throw new Vex.RERR("BadArguments", "Invalid clef: " + clef);

  return props;
}

Vex.Flow.clefProperties.values = {
  'treble':  { line_shift: 0 },
  'bass':    { line_shift: 6 },
  'tenor':   { line_shift: 4 },
  'alto':    { line_shift: 3 }
};

Vex.Flow.keyProperties = function(key, clef) {
  if(clef === undefined) {
    clef = 'treble';
  }

  var pieces = key.split("/");

  if (pieces.length != 2) {
    throw new Vex.RERR("BadArguments",
        "Key must have note + octave: " + key);
  }

  var k = pieces[0].toUpperCase();
  var value = Vex.Flow.keyProperties.note_values[k];
  if (!value) throw new Vex.RERR("BadArguments", "Invalid key name: " + k);
  if (value.octave) pieces[1] = value.octave;

  var o = pieces[1];
  var base_index = (o * 7) - (4 * 7);
  var line = (base_index + value.index) / 2;
  line += Vex.Flow.clefProperties(clef).line_shift;

  var stroke = 0;

  if (line <= 0 && (((line * 2) % 2) == 0)) stroke = 1;  // stroke up
  if (line >= 6 && (((line * 2) % 2) == 0)) stroke = -1; // stroke down

  // Integer value for note arithmetic.
  var int_value = (typeof(value.int_val)!='undefined') ? (o * 12) +
    value.int_val : null;

  return {
    key: k,
    octave: o,
    line: line,
    int_value: int_value,
    accidental: value.accidental,
    code: value.code,
    stroke: stroke,
    shift_right: value.shift_right,
    displaced: false
  };
};

Vex.Flow.keyProperties.note_values = {
  'C':  { index: 0, int_val: 0, accidental: null },
  'CN': { index: 0, int_val: 0, accidental: "n" },
  'C#': { index: 0, int_val: 1, accidental: "#" },
  'C##': { index: 0, int_val: 2, accidental: "##" },
  'CB': { index: 0, int_val: -1, accidental: "b" },
  'CBB': { index: 0, int_val: -2, accidental: "bb" },
  'D':  { index: 1, int_val: 2, accidental: null },
  'DN': { index: 1, int_val: 2, accidental: "n" },
  'D#': { index: 1, int_val: 3, accidental: "#" },
  'D##': { index: 1, int_val: 4, accidental: "##" },
  'DB': { index: 1, int_val: 1, accidental: "b" },
  'DBB': { index: 1, int_val: 0, accidental: "bb" },
  'E':  { index: 2, int_val: 4, accidental: null },
  'EN': { index: 2, int_val: 4, accidental: "n" },
  'E#': { index: 2, int_val: 5, accidental: "#" },
  'E##': { index: 2, int_val: 6, accidental: "##" },
  'EB': { index: 2, int_val: 3, accidental: "b" },
  'EBB': { index: 2, int_val: 2, accidental: "bb" },
  'F':  { index: 3, int_val: 5, accidental: null },
  'FN': { index: 3, int_val: 5, accidental: "n" },
  'F#': { index: 3, int_val: 6, accidental: "#" },
  'F##': { index: 3, int_val: 7, accidental: "##" },
  'FB': { index: 3, int_val: 4, accidental: "b" },
  'FBB': { index: 3, int_val: 3, accidental: "bb" },
  'G':  { index: 4, int_val: 7, accidental: null },
  'GN': { index: 4, int_val: 7, accidental: "n" },
  'G#': { index: 4, int_val: 8, accidental: "#" },
  'G##': { index: 4, int_val: 9, accidental: "##" },
  'GB': { index: 4, int_val: 6, accidental: "b" },
  'GBB': { index: 4, int_val: 5, accidental: "bb" },
  'A':  { index: 5, int_val: 9, accidental: null },
  'AN': { index: 5, int_val: 9, accidental: "n" },
  'A#': { index: 5, int_val: 10, accidental: "#" },
  'A##': { index: 5, int_val: 11, accidental: "##" },
  'AB': { index: 5, int_val: 8, accidental: "b" },
  'ABB': { index: 5, int_val: 7, accidental: "bb" },
  'B':  { index: 6, int_val: 11, accidental: null },
  'BN': { index: 6, int_val: 11, accidental: "n" },
  'B#': { index: 6, int_val: 12, accidental: "#" },
  'B##': { index: 6, int_val: 13, accidental: "##" },
  'BB': { index: 6, int_val: 10, accidental: "b" },
  'BBB': { index: 6, int_val: 9, accidental: "bb" },
  'R': { index: 6, int_val: 9, rest: true }, // Rest
  'X':  {
    index: 6,
    accidental: "",
    octave: 4,
    code: "v3e",
    shift_right: 5.5
  }
}


Vex.Flow.integerToNote = function(integer) {
  if (typeof(integer) == "undefined")
    throw new Vex.RERR("BadArguments", "Undefined integer for integerToNote");

  if (integer < -2)
    throw new Vex.RERR("BadArguments",
        "integerToNote requires integer >= -2: " + integer);//jensming added '='

  var noteValue = Vex.Flow.integerToNote.table[integer];
  if (!noteValue)
    throw new Vex.RERR("BadArguments", "Unkown note value for integer: " +
        integer);

  return noteValue;
}

Vex.Flow.integerToNote.table = {	
	0: "C",
	1: "C#",
	2: "D",
	3: "D#",
	4: "E",
	5: "F",
	6: "F#",
	7: "G",
	8: "G#",
	9: "A",
	10: "A#",
	11: "B",
	12: "C",
	13: "C#"
};

//jensming added for game use (separate out index for letter name only)
Vex.Flow.integerToNoteLetter = function(integer) {
  if (typeof(integer) == "undefined")
    throw new Vex.RERR("BadArguments", "Undefined integer for integerToNote");

  if (integer < 0)
    throw new Vex.RERR("BadArguments",
        "integerToNote requires integer >= 0: " + integer);//jensming added '='
  var noteName = Vex.Flow.integerToNoteLetter.table[integer];
  if (!noteName)
    throw new Vex.RERR("BadArguments", "Unkown note letter for integer: " +
        integer);
		
  return noteName;
}

Vex.Flow.integerToNoteLetter.table = {
	0: "C",
	1: "D",
	2: "E",
	3: "F",
	4: "G",
	5: "A",
	6: "B"	
};

Vex.Flow.tabToGlyph = function(fret) {
  var glyph = null;
  var width = 0;
  var shift_y = 0;

  if (fret.toString().toUpperCase() == "X") {
    glyph = "v7f";
    width = 7;
    shift_y = -4.5;
  } else {
    width = Vex.Flow.textWidth(fret.toString());
  }

  return {
    text: fret,
    code: glyph,
    width: width,
    shift_y: shift_y
  };
};

Vex.Flow.textWidth = function(text) {
  return 6 * text.toString().length;
}

Vex.Flow.accidentalCodes = function(acc) {
  return Vex.Flow.accidentalCodes.accidentals[acc];
}

Vex.Flow.accidentalCodes.accidentals = {
  "#": {
    code: "v18",
    width: 10,
    shift_right: 0,
    shift_down: 0
  },
  "##": {
    code: "v7f",
    width: 13,
    shift_right: -1,
    shift_down: 0
  },
  "b": {
    code: "v44",
    width: 8,
    shift_right: 0,
    shift_down: 0
  },
  "bb": {
    code: "v26",
    width: 14,
    shift_right: -3,
    shift_down: 0
  },
  "n": {
    code: "v4e",
    width: 8,
    shift_right: 0,
    shift_down: 0
  }
};

//jensming - adjust for different clefs!! add the clef parameter
Vex.Flow.keySignature = function(spec, clef) {
	var keySpec = Vex.Flow.keySignature.keySpecs[spec];

	//jensming add these ids for clef adjustments
	var treble = 0, bass = 1, alto = 2, tenor = 3, clef_shift; 
	switch (clef) {
		case treble:
			clef_shift = 0;
			break;
		case bass:
			clef_shift = 1;
			break;
		case alto:
			clef_shift = 0.5;
			break;
		case tenor:
			clef_shift = -0.5;
			break;	
	}

	if (keySpec == undefined) {
	throw new Vex.RERR("BadKeySignature",
		"Bad key signature spec: '" + spec + "'");
	}

	if (!keySpec.acc) {
	return [];
	}

	var code = Vex.Flow.accidentalCodes.accidentals[keySpec.acc].code;
	
	//jensming added is_tenor_sharps to adjust for tenor clef sharp keysigs.
	var is_tenor_sharps = (keySpec.acc === "#" && clef === tenor) ? true : false;
	clef_shift = (is_tenor_sharps) ? 0 : clef_shift;
	var notes = Vex.Flow.keySignature.accidentalList(keySpec.acc, is_tenor_sharps);

	var acc_list = new Array();
	for (var i = 0; i < keySpec.num; ++i) {
		var line = notes[i] + clef_shift; //add clef_shift to adjust for various clefs
		acc_list.push({glyphCode: code, line: line});
	}

	return acc_list;
}

Vex.Flow.keySignature.keySpecs = {
  "C": {acc: null, num: 0},
  "Am": {acc: null, num: 0},
  "F": {acc: "b", num: 1},
  "Dm": {acc: "b", num: 1},
  "Bb": {acc: "b", num: 2},
  "Gm": {acc: "b", num: 2},
  "Eb": {acc: "b", num: 3},
  "Cm": {acc: "b", num: 3},
  "Ab": {acc: "b", num: 4},
  "Fm": {acc: "b", num: 4},
  "Db": {acc: "b", num: 5},
  "Bbm": {acc: "b", num: 5},
  "Gb": {acc: "b", num: 6},
  "Ebm": {acc: "b", num: 6},
  "Cb": {acc: "b", num: 7},
  "Abm": {acc: "b", num: 7},
  "G": {acc: "#", num: 1},
  "Em": {acc: "#", num: 1},
  "D": {acc: "#", num: 2},
  "Bm": {acc: "#", num: 2},
  "A": {acc: "#", num: 3},
  "F#m": {acc: "#", num: 3},
  "E": {acc: "#", num: 4},
  "C#m": {acc: "#", num: 4},
  "B": {acc: "#", num: 5},
  "G#m": {acc: "#", num: 5},
  "F#": {acc: "#", num: 6},
  "D#m": {acc: "#", num: 6},
  "C#": {acc: "#", num: 7},
  "A#m": {acc: "#", num: 7}
};

//jensming: these needed to be adjusted for tenor clef sharps
//added is_tenor_sharps boolean parameter to signify tenor clef / sharp key sig.
Vex.Flow.keySignature.accidentalList = function(acc, is_tenor_sharps) {
	if (acc == "b") {
		return [2, 0.5, 2.5, 1, 3, 1.5, 3.5];
	}
	else if (acc == "#" && !is_tenor_sharps) {
		return [0, 1.5, -0.5, 1, 2.5, 0.5, 2]; 
	}
	else {
		return [3, 1, 2.5, 0.5, 2, 0, 1.5];
	}
	
}

Vex.Flow.durationToTicks = {
  "w":    Vex.Flow.RESOLUTION / 1,
  "wr":   Vex.Flow.RESOLUTION / 1,
  "h":    Vex.Flow.RESOLUTION / 2,
  "hr":   Vex.Flow.RESOLUTION / 2,
  "hd":   (Vex.Flow.RESOLUTION / 2) + (Vex.Flow.RESOLUTION / 4),
  "q":    Vex.Flow.RESOLUTION / 4,
  "qr":   Vex.Flow.RESOLUTION / 4,
  "qd":   (Vex.Flow.RESOLUTION / 4) + (Vex.Flow.RESOLUTION / 8),
  "8":    Vex.Flow.RESOLUTION / 8,
  "8r":   Vex.Flow.RESOLUTION / 8,
  "8d":   (Vex.Flow.RESOLUTION / 8) + (Vex.Flow.RESOLUTION / 16),
  "16":   Vex.Flow.RESOLUTION / 16,
  "16r":  Vex.Flow.RESOLUTION / 16,
  "16d":  (Vex.Flow.RESOLUTION / 16) + (Vex.Flow.RESOLUTION / 32),
  "32":   Vex.Flow.RESOLUTION / 32,
  "32d":  (Vex.Flow.RESOLUTION / 32) + (Vex.Flow.RESOLUTION / 64),
  "32r":  Vex.Flow.RESOLUTION / 32,
  "b":    Vex.Flow.RESOLUTION / 32
};

Vex.Flow.durationToGlyph = function(duration, size) {
  Vex.Flow.durationToGlyph.duration_codes[duration].head_width = 
		Vex.Flow.glyph_head_width[size];
  return Vex.Flow.durationToGlyph.duration_codes[duration];
}

Vex.Flow.durationIsDotted = function(duration) {
  var ret = Vex.Flow.durationToGlyph.duration_codes[duration].dot;
  if (ret == undefined)
    return false;
  return ret;
}

Vex.Flow.durationToGlyph.duration_codes = {
  "w": { // Whole note
    code_head: "v1d",
    code_rest: "v5c",
    head_width: 16.5,
    stem: false,
    flag: false
  },
  "wr": { // Whole rest
    code_head: "v5c",
    head_width: 10.5,
    stem: false,
    flag: false,
    rest: true,
    position: "D/5"
  },
  "h": { // Half note
    code_head: "v81",
    code_rest: "vc",
    head_width: 10.5,
    stem: true,
    flag: false
  },
  "hr": { // Half rest
    code_head: "vc",
    head_width: 10.5,
    stem: false,
    flag: false,
    rest: true,
    position: "B/4"
  },
  "hd": { // Dotted half note
    code_head: "v81",
    code_rest: "vc",
    head_width: 10.5,
    stem: true,
    flag: false,
    dot: true
  },
  "q": { // Quarter note
    code_head: "vb",
    code_rest: "v7c",
    head_width: 10.5,
    stem: true,
    flag: false
  },
  "qr": { // Quarter rest
    code_head: "v7c",
    head_width: 10.5,
    rest: true,
    position: "B/4",
    stem: false,
    flag: false
  },
  "qd": { // Dotted quarter note
    code_head: "vb",
    code_rest: "v7c",
    head_width: 10.5,
    stem: true,
    flag: false,
    dot: true
  },
  "8": { // Eighth note
    code_head: "vb",
    code_rest: "va5",
    head_width: 10.5,
    stem: true,
    flag: true,
    beam_count: 1,
    code_flag_upstem: "v54",
    code_flag_downstem: "v9a"
  },
  "8r": { // Eighth rest
    code_head: "va5",
    head_width: 10.5,
    stem: false,
    flag: false,
    rest: true,
    beam_count: 1,
    position: "B/4"
  },
  "8d": {
    code_head: "vb",
    code_rest: "va5",
    head_width: 10.5,
    stem: true,
    flag: true,
    beam_count: 1,
    code_flag_upstem: "v54",
    code_flag_downstem: "v9a",
    dot: true
  },
  "16": {
    beam_count: 2,
    code_head: "vb",
    code_rest: "v3c",
    head_width: 10.5,
    stem: true,
    flag: true,
    code_flag_upstem: "v3f",
    code_flag_downstem: "v8f"
  },
  "16r": {
    beam_count: 2,
    code_head: "v3c",
    head_width: 10.5,
    stem: false,
    flag: false,
    rest: true,
    position: "B/4"
  },
  "16d": {
    beam_count: 2,
    code_head: "vb",
    code_rest: "v3c",
    head_width: 10.5,
    stem: true,
    flag: true,
    code_flag_upstem: "v3f",
    code_flag_downstem: "v8f",
    dot: true
  },
  "32": {
    beam_count: 3,
    code_head: "vb",
    code_rest: "v55",
    head_width: 10.5,
    stem: true,
    flag: true,
    code_flag_upstem: "v47",
    code_flag_downstem: "v2a"
  },
  "32d": {
    beam_count: 3,
    code_head: "vb",
    code_rest: "v55",
    head_width: 10.5,
    dot: true,
    flag: true,
    code_flag_upstem: "v47",
    code_flag_downstem: "v2a",
    stem: true
  },
  "32r": {
    beam_count: 3,
    code_head: "v55",
    head_width: 10.5,
    stem: false,
    flag: false,
    rest: true,
    position: "B/4"
  }
};

//jensming added 9-1-2011
Vex.Flow.glyph_head_width = {
	"small": 8.0,
	"small_w": 13.0,
	"normal": 10.5,
	"normal_w": 16.5,
	"medium": 12.0,
	"medium_w": 20.0,
	"large": 14.5,
	"large_w": 22.5,
	"huge": 17.0,
	"huge_w": 26.5
};

//jensming added 9-1-2011
Vex.Flow.stave_specs = {
	"small" : {
		vertical_bar_width: 8, // Width around vertical bar end-marker
		glyph_spacing_px: 8,
		num_lines: 5,
		spacing_between_lines_px: 8, // in pixels
		space_above_staff_ln: 4, // in staff lines
		space_below_staff_ln: 4,  // in staff lines
		top_text_position: 1, // in staff lines
		bottom_text_position: 7, // in staff lines
		size: "small"
	},
	"normal" : {  //default
		vertical_bar_width: 10, // Width around vertical bar end-marker
		glyph_spacing_px: 10,
		num_lines: 5,
		spacing_between_lines_px: 10, // in pixels
		space_above_staff_ln: 4, // in staff lines
		space_below_staff_ln: 4,  // in staff lines
		top_text_position: 1, // in staff lines
		bottom_text_position: 7, // in staff lines
		size: "normal"
	},
	"medium" : {
		vertical_bar_width: 10, // Width around vertical bar end-marker
		glyph_spacing_px: 12,
		num_lines: 5,
		spacing_between_lines_px: 12, // in pixels
		space_above_staff_ln: 4, // in staff lines
		space_below_staff_ln: 4,  // in staff lines
		top_text_position: 1, // in staff lines
		bottom_text_position: 7, // in staff lines
		size: "medium"
	},
	"large" : {
		vertical_bar_width: 11, // Width around vertical bar end-marker
		glyph_spacing_px: 15,
		num_lines: 5,
		spacing_between_lines_px: 14, // in pixels
		space_above_staff_ln: 4, // in staff lines
		space_below_staff_ln: 4,  // in staff lines
		top_text_position: 1, // in staff lines
		bottom_text_position: 7, // in staff lines
		size: "large"
	},
	"huge" : {
		vertical_bar_width: 11, // Width around vertical bar end-marker
		glyph_spacing_px: 18,
		num_lines: 5,
		spacing_between_lines_px: 16, // in pixels
		space_above_staff_ln: 4, // in staff lines
		space_below_staff_ln: 4,  // in staff lines
		top_text_position: 1, // in staff lines
		bottom_text_position: 7, // in staff lines
		size: "huge"
	}
};

//jensming added 9-1-2011
Vex.Flow.stavenote_render_codes = {
	"small" : {
		glyph_font_scale: 30,
		stem_height: 28,
		stroke_px: 2,
		stroke_spacing: Vex.Flow.stave_specs["small"].spacing_between_lines_px,						
		annotation_spacing: 5
	},
	"normal" : {	//default
		glyph_font_scale: 38, // font size for note heads and rests
		stem_height: 35,      // in pixels
		stroke_px: 3,         // number of stroke px to the left and right of head
		stroke_spacing: Vex.Flow.stave_specs["normal"].spacing_between_lines_px,  
								// spacing between strokes (TODO: take from stave)
		annotation_spacing: 5 // spacing above note for annotations
	},
	"medium" : {
		glyph_font_scale: 44,
		stem_height: 41,
		stroke_px: 4,
		stroke_spacing: Vex.Flow.stave_specs["medium"].spacing_between_lines_px,
		annotation_spacing: 5
	},
	"large" : {
		glyph_font_scale: 51,
		stem_height: 48,
		stroke_px: 4.5,
		stroke_spacing: Vex.Flow.stave_specs["large"].spacing_between_lines_px,
		annotation_spacing: 5
	},
	"huge" : {
		glyph_font_scale: 59,
		stem_height: 55,
		stroke_px: 5,
		stroke_spacing: Vex.Flow.stave_specs["huge"].spacing_between_lines_px,
		annotation_spacing: 5
	}	
};

//jensming added 9-2-2011
Vex.Flow.accidental_render_codes = {
	"small" : {
		font_scale: 30,		
		stroke_px: 2,
		stroke_spacing: Vex.Flow.stave_specs["small"].spacing_between_lines_px
	},
	"normal" : {	//default
		font_scale: 38, // font size for accidentals		
		stroke_px: 3,         // number of stroke px to the left and right of accidental
		stroke_spacing: Vex.Flow.stave_specs["normal"].spacing_between_lines_px
								// spacing between strokes (TODO: take from stave)		
	},
	"medium" : {
		font_scale: 44,
		stroke_px: 3,
		stroke_spacing: Vex.Flow.stave_specs["medium"].spacing_between_lines_px
	},
	"large" : {
		font_scale: 51,
		stroke_px: 4,
		stroke_spacing: Vex.Flow.stave_specs["large"].spacing_between_lines_px
	},
	"huge" : {
		font_scale: 59,
		stroke_px: 4,
		stroke_spacing: Vex.Flow.stave_specs["huge"].spacing_between_lines_px
	}	
};

//jensming added 9-2-2011 - use with StaveNote.getModifierStartXY()
Vex.Flow.shift_factor = {
	"small": 2,
	"small_w": 2,
	"normal": 2,
	"normal_w": 2,
	"medium": 4,
	"medium_w": 4,
	"large": 6,
	"large_w": 6,
	"huge": 8,
	"huge_w": 8
};

//jensming added 9-2-2011 - use with ModifierContext.formatAccidentals()
Vex.Flow.accidental_spacing = {
	"small": 1.0,
	"small_w": 1.0,
	"normal": 2,
	"normal_w": 2,
	"medium": 3,
	"medium_w": 3,
	"large": 4,
	"large_w": 4,
	"huge": 6,
	"huge_w": 6
}

//jensming added 9-2-2011 - use with ModifierContext.formatAccidentals()
Vex.Flow.clef_points = {
	"small": 31.5,
	"small_w": 31.5,
	"normal": 39.5,
	"normal_w": 39.5,
	"medium": 47.5,
	"medium_w": 47.5,
	"large": 55.5,
	"large_w": 55.5,
	"huge": 63,
	"huge_w": 63
}

//jensming added 9-2-2011 - use with Beam
Vex.Flow.beam_width = {
	"small": 4,
	"small_w": 4,
	"normal": 5,
	"normal_w": 5,
	"medium": 5,
	"medium_w": 5,
	"large": 6,
	"large_w": 6,
	"huge": 7,
	"huge_w": 7
}

// Some defaults
//jensming expanded 9-1-2011
Vex.Flow.TIME2_4 = {
  num_beats: 2,
  beat_value: 4,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME3_4 = {
  num_beats: 3,
  beat_value: 4,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME4_4 = {
  num_beats: 4,
  beat_value: 4,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME5_4 = {
  num_beats: 5,
  beat_value: 4,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME2_8 = {
  num_beats: 2,
  beat_value: 8,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME3_8 = {
  num_beats: 3,
  beat_value: 8,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME4_8 = {
  num_beats: 4,
  beat_value: 8,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME5_8 = {
  num_beats: 5,
  beat_value: 8,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME6_8 = {
  num_beats: 6,
  beat_value: 8,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME7_8 = {
  num_beats: 7,
  beat_value: 8,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME8_8 = {
  num_beats: 8,
  beat_value: 8,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME9_8 = {
  num_beats: 9,
  beat_value: 8,
  resolution: Vex.Flow.RESOLUTION
};

Vex.Flow.TIME12_8 = {
  num_beats: 12,
  beat_value: 8,
  resolution: Vex.Flow.RESOLUTION
};