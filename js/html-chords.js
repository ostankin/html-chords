/* HTML Chords (https://github.com/ostankin/html-chords) - 02.04.2016 */
function guitar_chord_writer() {
	this.notes =     ["C",  "C#", "Db", "D",  "D#", "Eb", "E",  "F",  "F#", "Gb", "G",  "G#", "Ab", "A",  "A#", "Hb", "H",  "Bb", "B"];
	this.upnotes =   ["C#", "D",  "D",  "D#", "E",  "E",  "F",  "F#", "G",  "G",  "G#", "A",  "A",  "Hb", "H",  "H",  "C",  "H",  "H"];
	this.downnotes = ["H",  "C",  "C",  "Db", "D",  "D",  "Eb", "E",  "F",  "F",  "Gb", "G",  "G",  "Ab", "A",  "A",  "Hb", "A",  "A"];
	
	this.transpositionHandler = function(oDiv, t_up) {
		var oSong = oDiv.parent().parent("div.song");
		var oThis = this;
		var oChords = oSong.find("span.chord, span.chord-inline").each(function(index) {
			var chord = $(this).text();
			var new_chord = "";
			var i = 0;
			var last_note_end = 0;
			while (i<chord.length) {
				var found_note = "";
				var replacement_note = "";
				for (n=0;n<oThis.notes.length;++n) {
					var note = oThis.notes[n];
					var match = chord.substr(i, note.length) == note;
					// find the longest match (i.e. C# rahter than C)
					if (match && note.length > found_note.length) {
						found_note = note;
						replacement_note = t_up?oThis.upnotes[n]:oThis.downnotes[n];
					}
				}
				if (found_note != "") {
					new_chord += chord.substr(last_note_end, i - last_note_end);
					new_chord += replacement_note;
					last_note_end = i + found_note.length;
					i += found_note.length;
				} else
					++i;
	       	
			}
			if (chord.length > last_note_end)
				new_chord += chord.substr(last_note_end);
			$(this).text(new_chord);
		});
	};

	this.init = function(transposition_text, up, down) {

		var tclass = "transposition";
		var cclass = "chord";
		var song_processed_class = "song-transposition-processed";
		var song_selector = "div.song:not(." + song_processed_class + ")";
		var oThis = this;

		$(song_selector).each(function(index){
			var s = $(this).html();
			s = s.replace(/\{\s+\}/g, function(x) {
				var r = "";
				for(var i=2;i<x.length;i++)
					r += "&nbsp; ";
				return r;
			});
			s = s.replace(/\{_/g, "<span class='chord-inline'>");
			s = s.replace(/\{/g, "<span class='chord'>");
			s = s.replace(/\}/g, "</span>");
			$(this).html(s);
		});

		$(song_selector + " span.chord").each(function(index){
			var s = $(this).html();
			s = s.replace(/[ ]/g, " &nbsp; ");
			$(this).html(s);
		});
		
		$("<span>" + transposition_text + ": </span>").appendTo($(song_selector + " div"));
		$("<a>").attr("href","#").addClass(tclass).text(up).appendTo($(song_selector + " div"));
		$("<a>").attr("href","#").addClass(tclass).text(down).appendTo($(song_selector + " div"));
		$(song_selector + " div a." + tclass + ":contains(" + up + ")").click(function(){oThis.transpositionHandler($(this),true); return false;});
		$(song_selector + " div a." + tclass + ":contains(" + down + ")").click(function(){oThis.transpositionHandler($(this),false); return false;});

	
		$(song_selector).each(function () {
			$(this).addClass(song_processed_class);
		});
	}
}


$(document).ready(function() {

	var gcwriter = new guitar_chord_writer();
	var lang = $("head script#html-chords-script").attr("lang");
	switch (lang) {
		case "ru":
			gcwriter.init("Изменить тональность", "на полтона вверх", "на полтона вниз");
		default:
			gcwriter.init("Key change", "up a halftone", "down a halftone");
	}
});
