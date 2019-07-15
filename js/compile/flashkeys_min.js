function Games(){};function Flash(){};Games.Common={};Games.Common.displayScore=function(){statusView.displayPoints("#status_points",statusModel.getPoints(),statusModel.getAttempts());statusView.displayPercent("#status_percent",statusModel.getPoints(),statusModel.getAttempts());statusView.displayScore("#status_score",statusModel.getScore());statusView.displayLevel("#status_level",statusModel.getLevel());statusView.displayHiScore("#hi_score",statusModel.getHiScore())};
Games.Common.displaySummary=function(){$("#game_frame").hide();$("#staff_paper").hide();statusView.displayPoints("#point_summary",statusModel.getPoints(),statusModel.getAttempts());statusView.displayPercent("#percent_summary",statusModel.getPoints(),statusModel.getAttempts());statusView.displayScore("#score_summary",statusModel.getScore());$("#time_summary_row").hide();$("#score_summary_row").show();$("#level_summary_row").show();$("#lives_summary_row").show();$("#next_level_row").show();$("#level_summary").html(""+
statusModel.getLevel());$("#lives_summary").html(""+statusModel.getLives());$("#summary_frame").show()};Games.Common.removeLivesDisplay=function(){statusView.removeLivesDisplay()};
Games.Common.displaySessionAlert=function(a,b,c){$("#menu_frame").hide();$("#instructions_frame").hide();$("#summary_frame").hide();$("#game_frame").hide();$("#staff_paper").hide();$("#menu_buttons").hide();$("#session_frame").show();$("#game_status_box").show();a&&!b?($("#session_start_header").html("Level "+statusModel.getLevel()),$("#session_end").hide(),$("#game_end").hide(),$("#session_start").show(),$("#session_start_button").focus()):b?($("#session_start").hide(),$("#session_end").hide(),$("#game_end").show(),
$("#scores_button").focus()):($("#session_start").hide(),$("#game_end").hide(),lives=statusModel.getLives(),lives_str=1<lives?" lives":" life",$("#lives").html(""+statusModel.getLives()+lives_str+" left"),c?($("#session_end_header").html("Good Job!"),$("#bonus").html("BONUS PTS<br/>"+statusModel.getBonus())):($("#session_end_header").html("Same Level"),$("#bonus").html("BONUS PTS<br/>0")),$("#session_end").show(),$("#session_end_button").focus())};
Games.Common.processFinalScore=function(){var a,b;a=statusModel.getScore();var c,d;statusModel.setDate();b=statusModel.getDateTime();c=statusModel.getDateString();d=statusModel.getTimeString();b="score="+a+"&time="+b+"&date_string="+c+"&time_string="+d;Modernizr.localstorage?(c=statusModel.getHiScore(),statusModel.setHiScore(c>a?c:a)):statusModel.setHiScore(a);$("#score_text").html("Please wait . . . retrieving scores");ajaxUtilities.createXHR();a=ajaxUtilities.getXHR();ajaxUtilities.open("POST",
"php/get_scores.php");a.onreadystatechange=ajaxUtilities.onChange;ajaxUtilities.send("POST",b)};
Games.Common.displayFinalScore=function(a){var b,c,d,e="",f="",g="",h="your score: "+statusModel.getScore(),k=statusModel.top_scores.length;if(a)for(a=0;a<k;a++)b=parseInt(statusModel.top_scores[a]),c=statusModel.top_date_strings[a],d=parseInt(statusModel.top_times[a]),b===statusModel.getScore()&&d===statusModel.getDateTime()?(e+='<span class="your_scores">'+(a+1)+".</span><br />",f+='<span class="your_scores">'+b+"*</span><br />",g+='<span class="your_scores">'+c+"</span><br />",h="* your score"):
(e+=a+1+".<br />",f+=b+"<br />",g+=c+"<br />");else for(a=0;10>a;a++)e+=a+1+".<br />",f+="unavailable<br />",g+="unavailable<br />";$("#score_display_frame").show();$("#main_menu_button").focus();$("#top_rank").html(e);$("#top_scores").html(f);$("#top_dates").html(g);$("#top_score_footer").html(h)};Games.Common.AjaxUtilities=function(){var a,b,c=!1;this.createXHR=function(){a=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")};this.getXHR=function(){return a};this.open=function(b,e){try{a.open(b,e,!0)}catch(f){c=!1}};this.send=function(b,e){try{a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),a.responseType='document',
a.overrideMimeType('text/xml'),a.send(e)}catch(f){c=!1}};this.onChange=function(){var d,e,f;if(4===a.readyState){if(200===a.status||"OK"===a.statusText){c=!0;try{for(b=a.responseXML,
e=b.getElementsByTagName("score"),f=b.getElementsByTagName("time"),ds=b.getElementsByTagName("date_string"),ts=b.getElementsByTagName("time_string"),d=0;d<e.length;d++)statusModel.top_scores[d]=e[d].childNodes[0].nodeValue,statusModel.top_times[d]=f[d].childNodes[0].nodeValue,statusModel.top_date_strings[d]=ds[d].childNodes[0].nodeValue,statusModel.top_time_strings[d]=ts[d].childNodes[0].nodeValue}catch(g){c=!1}}else c=!1;Games.Common.displayFinalScore(c);$("#main_menu_button").show()}}};Flash.KeySignature={};Games.KeySignature={};Flash.KeySignature.noteRangeProperties=function(a){return Flash.KeySignature.noteRangeProperties.table[a]};
Flash.KeySignature.noteRangeProperties.table={0:{base_index:[1,6,4,2],base_octave:[4,3,3,4],upper_index:[4,6,1,3],upper_octave:[5,5,6,6]},1:{base_index:[3,1,6,4],base_octave:[2,2,1,1],upper_index:[6,1,3,5],upper_octave:[3,4,4,4]},2:{base_index:[2,0,5,3],base_octave:[3,3,2,2],upper_index:[5,0,2,4],upper_octave:[4,5,5,5]},3:{base_index:[0,5,3,1],base_octave:[3,2,2,2],upper_index:[3,5,0,2],upper_octave:[4,4,5,5]}};Flash.KeySignature.keyIdToElementId=function(a){return Flash.KeySignature.keyIdToElementId.table[a]};
Flash.KeySignature.keyIdToElementId.table={a:"c",w:"cs",s:"d",e:"ds",d:"e",f:"f",t:"fs",g:"g",y:"gs",h:"a",u:"as",j:"b",k:"c"};Flash.KeySignature.keySignatureAccidentals=function(a,b){void 0===a&&(a="C");return Flash.KeySignature.keySignatureAccidentals.table[a][b]};
Flash.KeySignature.keySignatureAccidentals.table={C:"      ".split(" "),"C#":"#######".split(""),Cb:"bbbbbbb".split(""),D:"#   #   ".split(" "),Db:" b b  b b b".split(" "),E:"# #  # #  ".split(" "),Eb:"  b   b b".split(" "),F:"      b".split(" "),"F#":"# # # # # # ".split(" "),G:"   #   ".split(" "),Gb:"b b b  b b b".split(" "),A:"#   # #  ".split(" "),Ab:" b b   b b".split(" "),B:"# #  # # # ".split(" "),Bb:"  b    b".split(" ")};$(document).ready(function(){Modernizr.canvas?(cfg=new Games.Notation.Config,statusModel=new Flash.KeySignature.StatusModel,statusView=new Flash.KeySignature.StatusView,notationModel=new Games.Notation.NotationModel,notationController=new Games.Notation.NotationController,gameController=new Flash.KeySignature.GameController,$("#menu_frame").show(),$("#play_button").click(function(){gameController.displayGame()}),$("#play_button").keydown(function(a){a=parseInt(a.keyCode);a===cfg.UP_KEY?$("#show_top_scores_button").focus():
a===cfg.DOWN_KEY&&$("#instructions_button").focus()}),$("#instructions_button").click(function(){$("#menu_frame").hide();$("#instructions_frame").show();$("#back_button").focus()}),$("#instructions_button").keydown(function(a){a=parseInt(a.keyCode);a===cfg.UP_KEY?$("#play_button").focus():a===cfg.DOWN_KEY&&$("#show_top_scores_button").focus()}),$("#show_top_scores_button").click(function(){Games.Common.processFinalScore()}),$("#show_top_scores_button").keydown(function(a){a=parseInt(a.keyCode);a===
cfg.UP_KEY?$("#instructions_button").focus():a===cfg.DOWN_KEY&&$("#play_button").focus()}),$("#back_button").click(function(){$("#instructions_frame").hide();$("#menu_frame").show();$("#play_button").focus()}),$("#session_start_button").click(function(){$("#session_frame").hide();statusModel.setIsTimeout(!1);$("#game_frame").show();$("#staff_paper").show();gameController.startGame("#status_timer")}),$("#session_end_button").click(function(){$("#session_frame").hide();gameController.displaySummary();
$("#sum_continue_button").focus()}),$(".input").click(function(){var a=$(this).attr("value");gameController.continueGame(a)}),$("#scores_button").click(function(){$("#session_frame").hide();gameController.processFinalScore()}),$("#sum_continue_button").click(function(){$("#summary_frame").hide();$("#session_frame").hide();statusModel.getIsTimeout()?gameController.updateLevel():gameController.startGame("#timer")}),$("#sum_continue_button").keydown(function(a){a=a.keyCode;if(a===cfg.UP_KEY||a===cfg.DOWN_KEY)$(this).blur(),
$("#quit_button").focus()}),$("#quit_button").click(function(){$("#summary_frame").hide();gameController.processFinalScore();gameController.removeLivesDisplay();$("#score_display_frame").show()}),$("#quit_button").keydown(function(a){a=a.keyCode;a!==cfg.UP_KEY&&a!==cfg.DOWN_KEY||$("#sum_continue_button").focus()}),$("#main_menu_button").click(function(){$("#score_display_frame").hide();$("#main_menu_button").hide();gameController.init();$("#menu_frame").show();$("#play_button").focus()}),$("button").hover(function(){$(this).css({opacity:1})},
function(){$(this).css({opacity:.9})})):$("#nocanvas_frame").show()});Games.Notation={};Games.Notation.Config=function(){this.TREBLE=0;this.BASS=1;this.ALTO=2;this.TENOR=3;this.TREBLE_OFFSET=10;this.BASS_OFFSET=12;this.ALTO_OFFSET=11;this.TENOR_OFFSET=9;this.RANDOM_TB=4;this.RANDOM_AT=5;this.RANDOM_ALL=6;this.ENTER_KEY=13;this.ESC_KEY=27;this.UP_KEY=38;this.DOWN_KEY=40;this.KEY_C=65;this.KEY_CS=87;this.KEY_D=83;this.KEY_DS=69;this.KEY_E=68;this.KEY_F=70;this.KEY_FS=84;this.KEY_G=71;this.KEY_GS=89;this.KEY_A=72;this.KEY_AS=85;this.KEY_B=74;this.KEY_C2=75;this.SMALL="small";this.SMALL_W=
"small_w";this.NORMAL="normal";this.NORMAL_W="normal_w";this.MEDIUM="medium";this.MEDIUM_W="medium_w";this.LARGE="large";this.LARGE_W="large_w";this.HUGE="huge";this.HUGE_W="huge_w";this.BG_STAVE_LEFT=20;this.BG_STAVE_TOP=10;this.BG_STAVE_WIDTH=100;this.BG_LAYER_WIDTH=320;this.BG_LAYER_HEIGHT=200;this.FG_STAVE_TOP=10;this.NOTE_LAYER_LEFT=this.KS_LAYER_LEFT=this.CLEF_LAYER_LEFT=0;this.CLEF_LAYER_WIDTH=70;this.KS_LAYER_WIDTH=100;this.NOTE_LAYER_WIDTH=146;this.CLEF_TYPES=["treble","bass","alto","tenor"];
this.MIN_RANGE_INDEX=0;this.MAX_RANGE_INDEX=3;this.ACC_LEVELS=[5,6,19,20];this.KS_TIER_1=[7,14];this.KS_TIER_2=[21,30];this.KS_EASY_LEVELS=[7,8,11,12,21,22,25,26,29];this.KS_HARD_LEVELS=[9,10,13,14,23,24,27,28,30];this.EASY_KEYS=0;this.HARD_KEYS=1;this.KS_MIN=this.CF;this.KS_MAX=this.CS;this.KS_MAJOR=0;this.KS_MINOR=1;this.ACC_SINGLE=0;this.ACC_DOUBLE=1;this.ACC_ALL=2;this.ACC_SINGLE_NOT_C=3;this.ACC_ALL_NOT_C=4;this.ACC_NONE=-1;this.ACC_TYPE_C=0;this.ACC_TYPE_FLAT=-1;this.ACC_TYPE_SHARP=1;this.ACCIDENTAL_ON=
{single_acc:!1,double_acc:!1};this.C=7;this.CS=14;this.CF=0;this.D=9;this.DF=2;this.E=11;this.EF=4;this.F=6;this.FS=13;this.G=8;this.GF=1;this.A=10;this.AF=3;this.B=12;this.BF=5;this.KEY_SIGS="Cb Gb Db Ab Eb Bb F C G D A E B F# C#".split(" ");this.KS_C_INDEX=7;this.KS_EASY=[this.C,this.G,this.F,this.D,this.BF,this.A,this.EF];this.KS_HARD=[this.E,this.AF,this.B,this.DF,this.FS,this.GF,this.CS,this.CF];this.KS_SEL_WIDTH=55;this.KS_SEL_HEIGHT=45};Games.Notation.NotationController=function(){this.backend=Vex.Flow.Renderer.Backends.CANVAS;Modernizr.canvas||(this.backend=Vex.Flow.Renderer.Backends.RAPHAEL);this.note_spacer=120};Games.Notation.NotationController.prototype.drawStaff=function(a,b,c,d,e){a=document.getElementById(a);a=(new Vex.Flow.Renderer(a,this.backend)).getContext();b=new Vex.Flow.Stave(b,c,d);a.setTransform(1,0,0,1,0,0);a.scale(e,e);b.setContext(a).draw(a,!1,!1);return b};
Games.Notation.NotationController.prototype.drawClef=function(a,b,c){a=document.getElementById(a);var d=(new Vex.Flow.Renderer(a,this.backend)).getContext();b.addClef(c);1<b.glyphs.length&&(b.glyphs[0]=b.glyphs[b.glyphs.length-1],b.glyphs.pop(b.glyphs.length-1),b.glyphs.pop(b.glyphs.length-1),d.clearRect(0,0,a.width,a.height));b.setContext(d).draw(d,!1,!1)};
Games.Notation.NotationController.prototype.drawNote=function(a,b,c,d,e,f,g){a=document.getElementById(a);a=(new Vex.Flow.Renderer(a,this.backend)).getContext();c=new Vex.Flow.StaveNote({keys:[c],duration:d,clef:b.clef});g&&c.addAccidental(0,new Vex.Flow.Accidental(g));b.setNoteStartX(f);this.note_spacer=f;Vex.Flow.Formatter.FormatAndDraw(a,b,[c],e);return c};
Games.Notation.NotationController.prototype.drawNotes=function(a,b,c,d,e){a=document.getElementById(a);a=(new Vex.Flow.Renderer(a,this.backend)).getContext();var f,g,h,k=[],l=[],m=[];for(f=0;f<c.length;f++){for(g=0;g<c[f].note_names.length;g++)k[g]=c[f].note_names[g],l[g]=c[f].accidentals[g];h=new Vex.Flow.StaveNote({keys:k,duration:c[f].note_dur,clef:b.clef});for(g=0;g<c[f].note_names.length;g++)l[g]&&h.addAccidental(g,new Vex.Flow.Accidental(l[g]));m[f]=h}b.setNoteStartX(e);Vex.Flow.Formatter.FormatAndDraw(a,
b,m,d);return h};Games.Notation.NotationController.prototype.addAccidental=function(a,b,c,d,e){a=document.getElementById(a);a=(new Vex.Flow.Renderer(a,this.backend)).getContext();c.addAccidental(d,new Vex.Flow.Accidental(e));b.setContext(a).draw(a,!1,!1)};
Games.Notation.NotationController.prototype.hideNote=function(a,b){var c=document.getElementById(a),d=(new Vex.Flow.Renderer(c,this.backend)).getContext();d.clearRect(0,0,c.width,c.height);b.setNoteStartX(this.note_spacer);b.setContext(d).draw(d,!1,!1)};
Games.Notation.NotationController.prototype.drawKeySignature=function(a,b,c){a=document.getElementById(a);var d=(new Vex.Flow.Renderer(a,this.backend)).getContext();this.clearKeySignature(b);d.clearRect(0,0,a.width,a.height);b.addKeySignature(c).setContext(d).draw(d,!1,!1)};Games.Notation.NotationController.prototype.clearKeySignature=function(a){var b;for(b=a.glyphs.length-1;0<b;b--)a.glyphs.pop(b)};
Games.Notation.NotationController.prototype.drawTimeSignature=function(a,b,c){a=document.getElementById(a);a=(new Vex.Flow.Renderer(a,this.backend)).getContext();b.addTimeSignature(c).setContext(a).draw(a,!1,!1)};Games.Notation.NotationController.prototype.clearTimeSignature=function(a){var b,c;for(b=a.glyphs.length-1;0<=b;b--)c=a.glyphs[b].code,"v0"===c&&a.glyphs.pop(b)};Games.Notation.NotationController.prototype.getNoteValue=function(){return notationModel.getNoteValue()};
Games.Notation.NotationController.prototype.setRangeIndex=function(a){notationModel.setRangeIndex(a)};Games.Notation.NotationController.prototype.getRandomClefIndex=function(a,b){return notationModel.randomClefIndex(a,b)};Games.Notation.NotationController.prototype.getRandomKeySignature=function(){return notationModel.randomKeySignature()};Games.Notation.NotationModel=function(){var a=cfg.MIN_RANGE_INDEX,b=cfg.TREBLE,c=0,d=0,e=-1,f=-1,g=-1,h=cfg.C,k=cfg.KEY_SIGS[h],l=cfg.SINGLE_C,m=!1,n=cfg.ACC_TYPE_C,p=!1;this.getRangeIndex=function(){return a};this.setRangeIndex=function(b){b<cfg.MIN_RANGE_INDEX&&(a=cfg.MIN_RANGE_INDEX);a=b>cfg.MAX_RANGE_INDEX?cfg.MAX_RANGE_INDEX:b};this.getClefIndex=function(){return b};this.setClefIndex=function(a){c=b;b=a};this.getPrevClefIndex=function(){return c};this.setPrevClefIndex=function(a){c=a};this.getNoteIndex=
function(){return d};this.setNoteIndex=function(a){d=0<=a?a:0;6<d&&(d=6)};this.getOctave=function(){return e};this.setOctave=function(a){e=a};this.getNoteValue=function(){return f};this.setNoteValue=function(a){f=Vex.Flow.keyProperties(a,cfg.CLEF_TYPES[b]).int_value%12};this.getKeySignatureLevel=function(){return g};this.setKeySignatureLevel=function(a){g=a};this.getKeySigIndex=function(){return h};this.setKeySigIndex=function(a){h=a};this.getKeySignature=function(){return k};this.setKeySignature=
function(a){k=cfg.KEY_SIGS[a]};this.updateKeySignature=function(a){h+=a;h=0>a?h>=this.KS_MIN_INDEX?h:this.KS_MIN_INDEX:h<=this.KS_MAX_INDEX?h:this.KS_MAX_INDEX;k=cfg.KEY_SIGS[h];this.convertNoteValue()};this.getAccidentalRange=function(){return l};this.setAccidentalRange=function(a){l=a};this.getAddAccidental=function(){return m};this.setAddAccidental=function(a){m=a};this.getAccidentalType=function(){return n};this.setAccidentalType=function(a){n=a};this.getAddKeySignature=function(){return p};this.setAddKeySignature=
function(a){p=a};this.clefIndexArray=[cfg.TREBLE,cfg.BASS,cfg.ALTO,cfg.TENOR];this.clefIndexProperties={0:!0,1:!1,2:!1,3:!1};this.keysig_acc_type={sharp:"#",flat:"b"}};Games.Notation.NotationModel.prototype.convertNoteIndex=function(){var a=this.getNoteIndex(),b=this.getClefIndex(),c=this.getPrevClefIndex(),d=[0,2,1,6];this.setNoteIndex(Math.abs((a-(d[c]-d[b]))%7))};
Games.Notation.NotationModel.prototype.convertNoteValue=function(){notationModel.getClefIndex();var a=this.getNoteIndex(),b=Vex.Flow.integerToNoteLetter(a),c=this.checkOctaveRange(),b=b+Games.Notation.keySignatureAccidentals(this.getKeySignature(),a);this.setNoteValue(""+b+"/"+c)};
Games.Notation.NotationModel.prototype.checkOctaveRange=function(){var a=this.getOctave(),b=this.getClefIndex(),c=this.getRangeIndex(),d=this.getNoteIndex(),e=Games.Notation.noteRangeProperties(b),b=e.base_octave[c],f=e.upper_octave[c],g=e.base_index[c],c=e.upper_index[c];a<b&&(a=b);a===b&&d<g&&(a=b+1);a>f&&(a=f);a===f&&d>c&&(a=f-1);return a};Games.Notation.NotationModel.prototype.randomClefIndex=function(a,b){return this.clefIndexArray[Math.round(100*Math.random())%a+b]};
Games.Notation.NotationModel.prototype.practiceClefIndex=function(){var a,b;for(a=0;4>a;a++)if(b=this.clefIndexProperties[a])return this.clefIndexArray[a];return null};
Games.Notation.NotationModel.prototype.randomAccidental=function(){var a=this.getAccidentalRange(),b=null,c=[null,"b","#","bb","##","n"],d=[null,"b","#","n"],e=[null,"bb","##"],f=c.length,g=d.length,h=e.length;this.getNoteIndex();this.getKeySignature();switch(a){case cfg.ACC_ALL:a=Math.round(1E3*Math.random())%(f-1);b=c[a];break;case cfg.ACC_ALL_NOT_C:a=Math.round(1E3*Math.random())%f;(b=c[a])&&(b=this.filterAccidental(b));break;case cfg.ACC_SINGLE:a=Math.round(1E3*Math.random())%(g-1);b=d[a];break;
case cfg.ACC_SINGLE_NOT_C:a=Math.round(1E3*Math.random())%g;(b=d[a])&&(b=this.filterAccidental(b));break;case cfg.ACC_DOUBLE:a=Math.round(1E3*Math.random())%h,b=e[a]}return b};Games.Notation.NotationModel.prototype.filterAccidental=function(a){var b=this.getKeySignature(),c=this.getNoteIndex(),b=Games.Notation.keySignatureAccidentals(b,c);return"##"===a||"bb"===a?a:"n"===a?""!=b?a:null:""==b?a:null};
Games.Notation.NotationModel.prototype.randomKeySignature=function(){var a;this.getKeySignatureLevel()===cfg.EASY_KEYS?(a=cfg.KS_EASY.length,a=Math.round(1E3*Math.random())%a,a=cfg.KS_EASY[a]):(a=cfg.KS_HARD.length,a=Math.round(1E3*Math.random())%a,a=cfg.KS_HARD[a]);return a};
Games.Notation.NotationModel.prototype.getImgUrl=function(a){switch(a){case cfg.TREBLE:return"images/treble.png";case cfg.BASS:return"images/bass.png";case cfg.ALTO:return"images/c_clef.png";case cfg.TENOR:return"images/c_clef.png";default:return"images/treble.png"}};Games.Notation.NotationModel.prototype.getClefOffset=function(a){switch(a){case cfg.TREBLE:return cfg.TREBLE_OFFSET;case cfg.BASS:return cfg.BASS_OFFSET;case cfg.ALTO:return cfg.ALTO_OFFSET;case cfg.TENOR:return cfg.TENOR_OFFSET;default:return cfg.TREBLE_OFFSET}};Flash.KeySignature.GameController=function(){var a;this.MAJOR=0;this.MINOR=1;this.BOTH=2;this.SCALE=1.3;this.clef_index=cfg.TREBLE;this.clef_type=cfg.CLEF_TYPES[this.clef_index];this.ks_index=cfg.FS;this.key_spec=cfg.KEY_SIGS[this.ks_index];this.timeOut=25;this.prev_labels=["","",""];this.getLabelMode=function(){return a};this.setLabelMode=function(b){a=b};this.init()};
Flash.KeySignature.GameController.prototype.init=function(){statusModel.start(!1);statusModel.setIsTimeout(!1);statusModel.setTimeInterval(cfg.TIMEOUT);statusModel.setLevel(1);statusModel.setPoints(0);statusModel.setAttempts(0);statusModel.setScore(0);statusModel.setLives(statusModel.MAX_LIVES);statusModel.setMaxKeyIndex(statusModel.TIER_1);this.setLabelMode(this.MAJOR);statusView.displayTime("#status_timer",0);notationModel.setKeySignature(this.ks_index);this.stave=notationController.drawStaff("staff_paper",
10,15,245,this.SCALE);notationController.drawClef("staff_paper",this.stave,this.clef_type);this.displayScore();return this};Flash.KeySignature.GameController.prototype.displayGame=function(){this.init();statusView.initLivesDisplay("game_lives",statusModel.MAX_LIVES);statusView.initHitDisplay("hit_light");$("#status_level_label").html("Level:");$("#status_level").html("1");this.displaySessionAlert(!0,!1,!1)};
Flash.KeySignature.GameController.prototype.startGame=function(a){statusModel.getStart()?this.stopGame():(statusModel.start(!0),this.keySpec=statusModel.getKeySpec(),this.displayButtonLabels(),notationController.drawKeySignature("staff_paper",this.stave,this.keySpec),this.startTimer(a,this.timeOut))};
Flash.KeySignature.GameController.prototype.displayButtonLabels=function(){var a,b,c,d=statusModel.getTempSigs(),e=this.getLabelMode();a=-1;e===this.BOTH&&(a=Math.round(1E3*Math.random())%2,e=0===a?this.MAJOR:this.MINOR);for(a=0;a<d.length;a++)c=e===this.MAJOR?d[a].majorName:d[a].minorName,b="#"+$("div.input_box button")[a].id,$(b).removeClass(this.prev_labels[a]),$(b).addClass(c),this.prev_labels[a]=c};
Flash.KeySignature.GameController.prototype.startTimer=function(a,b){var c,d=this;0>b?(clearTimeout(this.getT),statusModel.setIsTimeout(!0),this.stopGame()):c=setTimeout(function(){d.updateTimer(a,b,c)},1E3);statusView.displayTime(a,b);return this};Flash.KeySignature.GameController.prototype.updateTimer=function(a,b,c){statusModel.getStart()&&(--b,statusModel.setTime(b),statusModel.setTimeInterval(b),this.startTimer(a,b,c))};
Flash.KeySignature.GameController.prototype.continueGame=function(a){var b=statusModel.getStart();statusModel.getLevel();statusModel.setInputCode(parseInt(a));(a=statusModel.getMatch())?statusView.updateHitDisplay(!0):(statusView.updateHitDisplay(!1),statusModel.decLives(),statusModel.getLives(),statusView.updateLivesDisplay());b&&a&&(this.keySpec=statusModel.getKeySpec(),this.displayButtonLabels(),notationController.drawKeySignature("staff_paper",this.stave,this.keySpec),statusModel.addPoint(),statusModel.calculateScore());
b&&(statusModel.addAttempt(),this.displayScore())};Flash.KeySignature.GameController.prototype.stopGame=function(){var a,b;statusModel.start(!1);a=statusModel.isLevelAdvance();b=0<statusModel.getLives()?!1:!0;a&&(statusModel.advanceLevel(),statusModel.addBonus());this.displaySessionAlert(!1,b,a);return this};Flash.KeySignature.GameController.prototype.resetGame=function(){statusModel.setIsTimeout(!1);statusModel.setTimeInterval(this.timeOut);statusModel.setPoints(0);statusModel.setAttempts(0);this.displayScore()};
Flash.KeySignature.GameController.prototype.getStart=function(){return statusModel.getStart()};
Flash.KeySignature.GameController.prototype.updateLevel=function(){var a=statusModel.getLevel();statusModel.getIsTimeout()&&this.resetGame();switch(a){case 1:statusModel.setMaxKeyIndex(statusModel.TIER_1);this.setLabelMode(this.MAJOR);break;case 2:statusModel.setMaxKeyIndex(statusModel.TIER_2);this.setLabelMode(this.MAJOR);break;case 3:statusModel.setMaxKeyIndex(statusModel.TIER_3);this.setLabelMode(this.MAJOR);break;case 4:statusModel.setMaxKeyIndex(statusModel.TIER_4);this.setLabelMode(this.MAJOR);
break;case 5:statusModel.setMaxKeyIndex(statusModel.TIER_5);this.setLabelMode(this.MAJOR);break;case 6:statusModel.setMaxKeyIndex(statusModel.TIER_1);this.setLabelMode(this.MINOR);break;case 7:statusModel.setMaxKeyIndex(statusModel.TIER_2);this.setLabelMode(this.MINOR);break;case 8:statusModel.setMaxKeyIndex(statusModel.TIER_3);this.setLabelMode(this.MINOR);break;case 9:statusModel.setMaxKeyIndex(statusModel.TIER_4);this.setLabelMode(this.MINOR);break;case 10:statusModel.setMaxKeyIndex(statusModel.TIER_5);
this.setLabelMode(this.MINOR);break;case 11:statusModel.setMaxKeyIndex(statusModel.TIER_2);this.setLabelMode(this.BOTH);break;case 12:statusModel.setMaxKeyIndex(statusModel.TIER_3);this.setLabelMode(this.BOTH);break;case 13:statusModel.setMaxKeyIndex(statusModel.TIER_4);this.setLabelMode(this.BOTH);break;case 14:statusModel.setMaxKeyIndex(statusModel.TIER_5),this.setLabelMode(this.BOTH)}this.displayScore();this.displaySessionAlert(!0,!1,!1)};
Flash.KeySignature.GameController.prototype.displayScore=function(){statusView.displayPoints("#status_points",statusModel.getPoints(),statusModel.getAttempts());statusView.displayPercent("#status_percent",statusModel.getPoints(),statusModel.getAttempts());statusView.displayScore("#status_score",statusModel.getScore());statusView.displayLevel("#status_level",statusModel.getLevel());statusView.displayHiScore("#hi_score",statusModel.getHiScore())};
Flash.KeySignature.GameController.prototype.displaySummary=function(){$("#game_frame").hide();$("#staff_paper").hide();statusView.displayPoints("#point_summary",statusModel.getPoints(),statusModel.getAttempts());statusView.displayPercent("#percent_summary",statusModel.getPoints(),statusModel.getAttempts());statusView.displayScore("#score_summary",statusModel.getScore());$("#time_summary_row").hide();$("#score_summary_row").show();$("#level_summary_row").show();$("#lives_summary_row").show();$("#next_level_row").show();
$("#level_summary").html(""+statusModel.getLevel());$("#lives_summary").html(""+statusModel.getLives());$("#summary_frame").show()};Flash.KeySignature.GameController.prototype.removeLivesDisplay=function(){statusView.removeLivesDisplay()};
Flash.KeySignature.GameController.prototype.displaySessionAlert=function(a,b,c){$("#menu_frame").hide();$("#instructions_frame").hide();$("#summary_frame").hide();$("#game_frame").hide();$("#staff_paper").hide();$("#menu_buttons").hide();$("#session_frame").show();$("#game_status_box").show();a&&!b?($("#session_start_header").html("Level "+statusModel.getLevel()),$("#session_end").hide(),$("#game_end").hide(),$("#session_start").show(),$("#session_start_button").focus()):b?($("#session_start").hide(),
$("#session_end").hide(),$("#game_end").show(),$("#scores_button").focus()):($("#session_start").hide(),$("#game_end").hide(),lives=statusModel.getLives(),lives_str=1<lives?" lives":" life",$("#lives").html(""+statusModel.getLives()+lives_str+" left"),c?($("#session_end_header").html("Good Job!"),$("#bonus").html("BONUS PTS<br/>"+statusModel.getBonus())):($("#session_end_header").html("Same Level"),$("#bonus").html("BONUS PTS<br/>0")),$("#session_end").show(),$("#session_end_button").focus())};
Flash.KeySignature.GameController.prototype.processFinalScore=function(){var a,b;a=statusModel.getScore();var c,d;statusModel.setDate();b=statusModel.getDateTime();c=statusModel.getDateString();d=statusModel.getTimeString();b="score="+a+"&time="+b+"&date_string="+c+"&time_string="+d;Modernizr.localstorage?(c=statusModel.getHiScore(),statusModel.setHiScore(c>a?c:a)):statusModel.setHiScore(a);$("#score_text").html("Please wait . . . retrieving scores");ajaxUtilities.createXHR();a=ajaxUtilities.getXHR();
ajaxUtilities.open("POST","php/get_scores.php");a.onreadystatechange=ajaxUtilities.onChange;ajaxUtilities.send("POST",b)};
Flash.KeySignature.GameController.prototype.displayFinalScore=function(a){var b,c,d,e="",f="",g="",h="your score: "+statusModel.getScore(),k=statusModel.top_scores.length;if(a)for(a=0;a<k;a++)b=parseInt(statusModel.top_scores[a]),c=statusModel.top_date_strings[a],d=parseInt(statusModel.top_times[a]),b===statusModel.getScore()&&d===statusModel.getDateTime()?(e+='<span class="your_scores">'+(a+1)+".</span><br />",f+='<span class="your_scores">'+b+"*</span><br />",g+='<span class="your_scores">'+c+"</span><br />",
h="* your score"):(e+=a+1+".<br />",f+=b+"<br />",g+=c+"<br />");else for(a=0;10>a;a++)e+=a+1+".<br />",f+="unavailable<br />",g+="unavailable<br />";$("#score_display_frame").show();$("#main_menu_button").focus();$("#top_rank").html(e);$("#top_scores").html(f);$("#top_dates").html(g);$("#top_score_footer").html(h)};Flash.KeySignature.StatusModel=function(){this.MAX_LEVEL=14;this.TIER_1=4;this.TIER_2=6;this.TIER_3=10;this.TIER_4=12;this.TIER_5=14;this.MIN_ATTEMPTS=5;this.MIN_PERCENT=80;this.TIMEOUT=25;this.BONUS_INC=this.BONUS=50;this.BONUS_LEVEL=12;this.MAX_LIVES=5;var a,b,c,d=0,e=0,f=0,g=0,h=0,k=5,l=!1,m=this.TIMEOUT,n=!1,p,q,t=0,u=0,v=this.TIER_1,w={0:{spec:"C",majorName:"c_maj",minorName:"a_min"},1:{spec:"G",majorName:"g_maj",minorName:"e_min"},2:{spec:"F",majorName:"f_maj",minorName:"d_min"},3:{spec:"D",
majorName:"d_maj",minorName:"b_min"},4:{spec:"Bb",majorName:"bf_maj",minorName:"g_min"},5:{spec:"A",majorName:"a_maj",minorName:"fs_min"},6:{spec:"Eb",majorName:"ef_maj",minorName:"c_min"},7:{spec:"E",majorName:"e_maj",minorName:"cs_min"},8:{spec:"Ab",majorName:"af_maj",minorName:"f_min"},9:{spec:"B",majorName:"b_maj",minorName:"gs_min"},10:{spec:"Db",majorName:"df_maj",minorName:"bf_min"},11:{spec:"F#",majorName:"fs_maj",minorName:"ds_min"},12:{spec:"Gb",majorName:"gf_maj",minorName:"ef_min"},13:{spec:"C#",
majorName:"cs_maj",minorName:"as_min"},14:{spec:"Cb",majorName:"cf_maj",minorName:"af_min"}},r=[];q=Modernizr.localstorage?(p=parseInt(localStorage.getItem("hiscore_keysignature")))?p:0:0;this.getTime=function(){return a};this.setTime=function(b){a=b};this.setDate=function(){b=new Date;c=b.getTime()};this.getDateTime=function(){return c};this.getDateString=function(){var a=""+(b.getMonth()+1),c=10>b.getDate()?"0"+b.getDate():b.getDate();return a+"-"+c+"-"+b.getFullYear()};this.getTimeString=function(){var a=
""+b.getHours(),c=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),d=10>b.getSeconds()?"0"+b.getSeconds():b.getSeconds();return a+":"+c+":"+d};this.addPoint=function(){d+=1};this.setPoints=function(a){d=a};this.getPoints=function(){return d};this.addAttempt=function(){e+=1};this.setAttempts=function(a){e=a};this.getAttempts=function(){return e};this.getPercent=function(){return Math.floor(d/e*100)};this.calculateScore=function(){f+=d*g};this.addBonus=function(){h=this.BONUS*g;f+=h};this.getBonus=
function(){return h};this.setScore=function(a){f=a};this.getScore=function(){return f};this.getHiScore=function(){return q};this.setHiScore=function(a){q=a;Modernizr.localstorage&&localStorage.setItem("hiscore_keysignature",q)};this.setLevel=function(a){g=a;g>this.BONUS_LEVEL&&(this.BONUS+=this.BONUS_INC)};this.getLevel=function(){return g};this.advanceLevel=function(){this.setLevel(g<this.MAX_LEVEL?g+=1:this.MAX_LEVEL);return this};this.decLives=function(){--k;0>k&&(k=0)};this.setLives=function(a){k=
a};this.getLives=function(){return k};this.start=function(a){l=a};this.getStart=function(){return l};this.setTimeInterval=function(a){m=a};this.getTimeInterval=function(){return m};this.setIsTimeout=function(a){n=a};this.getIsTimeout=function(){return n};this.getMaxKeyIndex=function(){return v};this.setMaxKeyIndex=function(a){v=a};this.getKeySpec=function(){var a=[],b,c,d=this.getMaxKeyIndex();a[0]=w[0];for(b=1;b<=d;b++)c=Math.round(100*Math.random())%(b+1),a[b]=a[c],a[c]=w[b];for(b=0;3>b;b++)r[b]=
a[b];u=c=Math.round(1E3*Math.random())%3;return r[c].spec};this.getTempSigs=function(){return r};this.setInputCode=function(a){t=a};this.getMatch=function(){return t===u};this.top_scores=[];this.top_times=[];this.top_date_strings=[];this.top_time_strings=[]};Flash.KeySignature.StatusModel.prototype.isLevelAdvance=function(){return this.getPercent()>=this.MIN_PERCENT&&this.getIsTimeout()&&this.getAttempts()>=this.MIN_ATTEMPTS?!0:!1};
Flash.KeySignature.StatusModel.prototype.setGameClefTypes=function(){var a,b=this.getLevel();b<=this.TIER_1&&(a=0===b%2,a=[!a,a,!1,!1]);b>this.TIER_1&&b<=this.TIER_2&&(a=[!0,!0,!1,!1]);b>this.TIER_2&&b<=this.TIER_3&&(a=0===b%2,a=[!1,!1,!a,a]);b>this.TIER_3&&b<=this.TIER_4&&(a=[!1,!1,!0,!0]);b>this.TIER_4&&(a=[!0,!0,!0,!0]);this.set_clef(a)};Flash.KeySignature.StatusModel.prototype.set_clef=function(a){var b;for(b=0;4>b;b++)this.active_clefs[b]=a[b]};Flash.KeySignature.StatusView=function(){var a,b,c,d,e,f,g,h=[],k,l;this.initLivesDisplay=function(c,d){b=Raphael(c,60,20);for(a=0;a<d;a++)h[a]=b.circle(10*(a+1),5,4.5).attr({fill:"green",stroke:"#000"})};this.updateLivesDisplay=function(){k=h.length;0<k&&(h[k-1].remove(),h.pop())};this.removeLivesDisplay=function(){b.remove()};this.drawStatusBar=function(a,b,e,f){c=Raphael(a,b,e,f);d=c.rect(0,0,e,f);d.attr({stroke:"red",fill:"#202000"})};this.initHitDisplay=function(a){e=Raphael(a,0,0);f=e.path("M 5 18 L 17 30 L 33 2 L 17 23 Z").attr({stroke:"#447",
"stroke-width":1});g=e.path("M 5 5 L 35 35 M 35 5 L 5 35").attr({stroke:"#447","stroke-width":5});f.hide();g.hide()};this.removeHitDisplay=function(){e.remove();$(".hit_box").hide()};this.updateHitDisplay=function(a){a?(f.attr({stroke:"#0c2",fill:"#0c2"}),g.hide(),f.show()):(g.attr({stroke:"#f00"}),f.hide(),g.show());this.startHitTimer();$(".hit_box").show()};this.startHitTimer=function(){var a=this;l=setTimeout(function(){a.stopHitTimer()},600)};this.stopHitTimer=function(){f.hide();g.hide();$(".hit_box").hide();
clearTimeout(l)}};Flash.KeySignature.StatusView.prototype.displayInputLabels=function(a,b){var c,d,e,f=btn_array.length;for(c=0;c<f;c++)d=a[c],e=b[c],$(d).html(e)};Flash.KeySignature.StatusView.prototype.displayTime=function(a,b){var c="00:",d=0<=b?""+b:""+(b+1);10>b&&(c="00:0");$(a).html(c+d)};Flash.KeySignature.StatusView.prototype.displayLevel=function(a,b){var c=""+b;$(a).html(c)};Flash.KeySignature.StatusView.prototype.displayPoints=function(a,b,c){b=""+b+"/"+c;$(a).html(b)};
Flash.KeySignature.StatusView.prototype.displayPercent=function(a,b,c){b=""+(0<c?Math.round(b/c*100):0)+"%";$(a).html(b)};Flash.KeySignature.StatusView.prototype.displayScore=function(a,b){var c=""+b;$(a).html(c)};Flash.KeySignature.StatusView.prototype.displayHiScore=function(a,b){var c=""+b;$(a).html(c)};