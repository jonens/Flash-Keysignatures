//Flash.Notes.Keyboard
$(document).ready(function () {

	/* Set up global variables and objects */
	var inputs = ["a", "w", "s", "e", "d", "f", "t", "g", "y", "h", "u", "j", "k"];
	var key_buttons = ["#c", "#cs", "#d", "#ds", "#e", "#f", "#fs", "#g", "#gs", "#a",
							"#as", "#b", "#c2"];
	
	if (!Modernizr.canvas) {
		$('#nocanvas_frame').show();
	}
	else {
		cfg = new Games.Notation.Config();
		statusModel = new Flash.KeySignature.StatusModel();
		statusView = new Flash.KeySignature.StatusView();
		notationModel = new Games.Notation.NotationModel();
		notationController = new Games.Notation.NotationController(cfg.MIN_RANGE);		
		gameController = new Flash.KeySignature.GameController();
		
		$('#menu_frame').show();
		
		$('#play_button').click(function () {		
			gameController.displayGame();
		});
		$('#play_button').keydown(function (event) {			
			var code = parseInt(event.keyCode);
			if (code === cfg.UP_KEY || code === cfg.DOWN_KEY) {			
				$('#instructions_button').focus();
			}
		});
		$('#instructions_button').click(function () {
			$('#menu_frame').hide();
			$('#instructions_frame').show();
			$('#back_button').focus();
		});
		$('#instructions_button').keydown(function (event) {			
			var code = parseInt(event.keyCode);
			if (code === cfg.UP_KEY || code === cfg.DOWN_KEY) {
				$('#play_button').focus();
			}
		});
		$('#back_button').click(function () {
			$('#instructions_frame').hide();
			$('#menu_frame').show();
			$('#play_button').focus();
		});
		$('#session_start_button').click(function () {
			$('#session_frame').hide();		
			statusModel.setIsTimeout(false);
			$('#game_frame').show();
			$('#staff_paper').show();
			gameController.startGame("#status_timer");
		});		
		$('#session_end_button').click(function () {
			$('#session_frame').hide();
			gameController.displaySummary();
			$('#sum_continue_button').focus();
		});
		$('.input').click(function () {
			var $input = $(this);		
			var code = $input.attr('value');
			gameController.continueGame(code);		
		});
		$('#scores_button').click(function () {
			$('#session_frame').hide();
			gameController.processFinalScore();
		});		
		$('#sum_continue_button').click(function () {
			$('#summary_frame').hide();
			$('#session_frame').hide();
			if (!statusModel.getIsTimeout())
			{
				gameController.startGame("#timer");
			}
			else {
				gameController.updateLevel();
			}
		});
		$('#sum_continue_button').keydown(function (event) {
			var code = event.keyCode;
			if (code === cfg.UP_KEY || code === cfg.DOWN_KEY) {
				$(this).blur();
				$('#quit_button').focus();
			}
		});
		$('#quit_button').click(function () {
			$('#summary_frame').hide();
			gameController.processFinalScore();
			gameController.removeLivesDisplay();
			$('#score_display_frame').show();
		});
		$('#quit_button').keydown(function (event) {
			var code = event.keyCode;			
			if (code === cfg.UP_KEY || code === cfg.DOWN_KEY) {
				$('#sum_continue_button').focus();
			}
		});			
		$('#main_menu_button').click(function () {
			$('#score_display_frame').hide();
			$('#main_menu_button').hide();
			gameController.init();
			$('#menu_frame').show();
			$('#play_button').focus();
		});
		$('button').hover(function () {
			$(this).css({opacity: 1.0});
			},
			function () {
				$(this).css({opacity: 0.90});
				}
		);
	}
});