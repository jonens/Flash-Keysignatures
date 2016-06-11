/**
 * Flash Key Signatures - a web-based musical flash card game
 * 
 * Copyright Jon Ensminger 2011
 * 
 * This class provides various conversions.
 */

/* Clef is a number from the config file --> a clef
	Index is a range index (smaller the index, smaller the range) */
Flash.KeySignature.noteRangeProperties = function(clef) {
	var props = Flash.KeySignature.noteRangeProperties.table[clef];
	return props;
}

/* Arrays progress from min to max -- smallest to widest range
	in VexFlow, these values map to the letter names only (not accidentals)*/
Flash.KeySignature.noteRangeProperties.table = {
	0: {
		base_index: [1, 6, 4, 2],
		base_octave: [4, 3, 3, 4],
		upper_index: [4, 6, 1, 3],
		upper_octave: [5, 5, 6, 6]
	},
	1: {
		base_index: [3, 1, 6, 4],
		base_octave: [2, 2, 1, 1],
		upper_index: [6, 1, 3, 5],
		upper_octave: [3, 4, 4, 4]
	},
	2: {
		base_index: [2, 0, 5, 3],
		base_octave: [3, 3, 2, 2],
		upper_index: [5, 0, 2, 4],
		upper_octave: [4, 5, 5, 5]
	},
	3: {
		base_index: [0, 5, 3, 1],
		base_octave: [3, 2, 2, 2],
		upper_index: [3, 5, 0, 2],
		upper_octave: [4, 4, 5, 5]	
	}
}

Flash.KeySignature.keyIdToElementId = function (key_id) {
	return Flash.KeySignature.keyIdToElementId.table[key_id];
}

//Keys are mapped from qwerty keyboard to the musical keyboard name
Flash.KeySignature.keyIdToElementId.table = {
	'a' : 'c',
	'w' : 'cs',
	's' : 'd',
	'e' : 'ds',
	'd' : 'e',
	'f' : 'f',
	't' : 'fs',
	'g' : 'g',
	'y' : 'gs',
	'h' : 'a',
	'u' : 'as',
	'j' : 'b',
	'k' : 'c'
}

Flash.KeySignature.keySignatureAccidentals = function (key, index) {
	var keysig, accidental;
	if(key === undefined) {
		key = "C";
	}
	keysig = Flash.KeySignature.keySignatureAccidentals.table[key];
	accidental = keysig[index];
	return accidental;	
}

//all arrays are [0] = "C_"
Flash.KeySignature.keySignatureAccidentals.table = {
	"C": ["","","","","","",""],
	"C#": ["#","#","#","#","#","#","#"],
	"Cb": ["b","b","b","b","b","b","b"],
	"D": ["#","","","#","","",""],
	"Db": ["","b","b","","b","b","b"],
	"E": ["#","#","","#","#","",""],
	"Eb": ["","","b","","","b","b"],
	"F": ["","","","","","","b"],
	"F#": ["#","#","#","#","#","#",""],
	"G": ["","","","#","","",""],
	"Gb": ["b","b","b","","b","b","b"],
	"A": ["#","","","#","#","",""],
	"Ab": ["","b","b","","","b","b"],
	"B": ["#","#","","#","#","#",""],
	"Bb": ["","","b","","","","b"]
}