	String.prototype.regexIndexOf = function(regex, startpos) {
		var indexOf = this.substring(startpos || 0).search(regex);
		return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
	}
	chrome.webRequest.onBeforeRequest.addListener(function (r) {
		if (r.url.indexOf("controllers.js")!=-1) {
			var request = new XMLHttpRequest();
			request.open('GET', r.url, false);  // `false` makes the request synchronous
			request.send(null);
			var text = request.responseText;
			text = text.replace(/isAllCorrect:\s*isAllCorrect/, "isAllCorrect: true");
			if(text.regexIndexOf(/totalCount:\s*totalCount/) != -1) {
				text = text.replace(/correctCount:\s*correctCount/, "correctCount: totalCount")
				.replace(/correctCount:\s*correctAns/, "correctCount: totalCount")
				.replace(/correctCount:\s*totalHorizontalCorrectAns/, "correctCount: totalCount");
			} else if(text.regexIndexOf(/totalCount:\s*totalAns/) != -1) {
				text = text.replace(/correctCount:\s*correctCount/, "correctCount: totalAns")
				.replace(/correctCount:\s*correctAns/, "correctCount: totalAns")
				.replace(/correctCount:\s*totalHorizontalCorrectAns/, "correctCount: totalAns");
			} else if(text.regexIndexOf(/totalCount:\s*totalHorizontalCorrectQuestion/) != -1) {
				text = text.replace(/correctCount:\s*correctCount/, "correctCount: totalHorizontalCorrectQuestion")
				.replace(/correctCount:\s*correctAns/, "correctCount: totalHorizontalCorrectQuestion")
				.replace(/correctCount:\s*totalHorizontalCorrectAns/, "correctCount: totalHorizontalCorrectQuestion");
			}
			return { redirectUrl: "data:text/javascript,"  + encodeURIComponent(text) };
		}
	},{urls: ["*://*.cambridgelms.org/*"]},["blocking"]);
	//POSHEL EST' SUP
