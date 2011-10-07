// Vex Flow Notation
// Implements key signatures
//
// Requires vex.js.

/**
 * @constructor
 */
Vex.Flow.KeySignature = function(keySpec, clef) { //jensming:  added clef type to adjust for clefs
  if (arguments.length > 0) this.init(keySpec, clef);
}

Vex.Flow.KeySignature.prototype = new Vex.Flow.StaveModifier();
Vex.Flow.KeySignature.prototype.constructor = Vex.Flow.KeySignature;
Vex.Flow.KeySignature.superclass = Vex.Flow.StaveModifier.prototype;

Vex.Flow.KeySignature.prototype.init = function(key_spec, clef) {
	Vex.Flow.KeySignature.superclass.init();

	this.glyphFontScale = 38;
	this.accList = Vex.Flow.keySignature(key_spec, clef);	
}

Vex.Flow.KeySignature.prototype.addAccToStave = function(stave, acc) {
  var glyph = new Vex.Flow.Glyph(acc.glyphCode, this.glyphFontScale);
  this.placeGlyphOnLine(glyph, stave, acc.line)
  stave.addGlyph(glyph);
}

Vex.Flow.KeySignature.prototype.addModifier = function(stave) {
  for (var i = 0; i < this.accList.length; ++i) {
    this.addAccToStave(stave, this.accList[i]);
  }
}

Vex.Flow.KeySignature.prototype.addToStave = function(stave, firstGlyph) {
	//jensming add 9-2-2011 to account for different stave sizes
	var size = stave.options.size;
	size = size.replace("_w", "");
	this.glyphFontScale = Vex.Flow.stavenote_render_codes[size].glyph_font_scale;
	if (this.accList.length == 0)
    return this;

  if (!firstGlyph) {
    stave.addGlyph(this.makeSpacer(this.padding));
  }

  this.addModifier(stave);
  return this;
}
