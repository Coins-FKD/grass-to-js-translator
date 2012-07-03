$(function() {
		"use strict";
		var g = Fkd.GrassToJSTranslator;
		var translator = new g.Translator(new g.IndentMaker(4, 0));
		$("#grass-to-js").click(function() {
				try {
					$("#js").val("");
					$("#js").val(translator.toJS($("#grass").val()));
				} catch (e) {
					alert(e);
				}
			});
		$("#js-to-stdout").click(function() {
				var originalDocumentWrite = document.write;
				try {
					$("#stdout").val("");
					document.write = function(string) {
						$("#stdout").val($("#stdout").val() + string);
					};
					eval($("#js").val());
				} catch (e) {
					alert(e);
				} finally {
					document.write = originalDocumentWrite;
				}
			});
});
