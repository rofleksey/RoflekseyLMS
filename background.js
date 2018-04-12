
	chrome.webRequest.onBeforeRequest.addListener(function (r) {
		if (r.url.indexOf("controllers.js")!=-1) {
			var request = new XMLHttpRequest();
			request.open('GET', r.url, false);  // `false` makes the request synchronous
			request.send(null);
			var text = request.responseText;
			text = text.replace("isAllCorrect: isAllCorrect", "isAllCorrect: true");
			if(text.indexOf("totalCount: totalCount") != -1) {
				text = text.replace("correctCount: correctCount", "correctCount: totalCount").replace("correctCount: correctAns", "correctCount: totalCount");
			} else if(text.indexOf("totalCount: totalAns") != -1) {
				text = text.replace("correctCount: correctCount", "correctCount: totalAns").replace("correctCount: correctAns", "correctCount: totalAns");
			}
			return { redirectUrl: "data:text/javascript,"  + encodeURIComponent(text) };
		}
	},{urls: ["*://*.cambridgelms.org/*"]},["blocking"]);
	chrome.extension.getBackgroundPage().console.log('ROFLEKSEY IS HERE');
