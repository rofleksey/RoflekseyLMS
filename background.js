	chrome.webRequest.onBeforeRequest.addListener(function (r) {
		if (r.url.indexOf("controllers.js")!=-1) {
			var request = new XMLHttpRequest();
			request.open('GET', r.url, false);  // `false` makes the request synchronous
			request.send(null);
			var text = request.responseText;
			text = text.replace("isAllCorrect: isAllCorrect", "isAllCorrect: true");
			if(text.indexOf("totalCount: totalCount") != -1) {
				text = text.replace("correctCount: correctCount", "correctCount: totalCount")
				.replace("correctCount: correctAns", "correctCount: totalCount")
				.replace("correctCount: totalHorizontalCorrectAns", "correctCount: totalCount");
			} else if(text.indexOf("totalCount: totalAns") != -1) {
				text = text.replace("correctCount: correctCount", "correctCount: totalAns")
				.replace("correctCount: correctAns", "correctCount: totalAns")
				.replace("correctCount: totalHorizontalCorrectAns", "correctCount: totalAns");
			} else if(text.indexOf("totalCount: totalHorizontalCorrectQuestion") != -1) {
				text = text.replace("correctCount: correctCount", "correctCount: totalHorizontalCorrectQuestion")
				.replace("correctCount: correctAns", "correctCount: totalHorizontalCorrectQuestion")
				.replace("correctCount: totalHorizontalCorrectAns", "correctCount: totalHorizontalCorrectQuestion");
			}
			return { redirectUrl: "data:text/javascript,"  + encodeURIComponent(text) };
		}
	},{urls: ["*://*.cambridgelms.org/*"]},["blocking"]);
	//POSHEL EST' SUP
