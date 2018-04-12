var dispatchMouseEvent = function(target, var_args) {
  var e = document.createEvent('MouseEvents');
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};
var roflanClick = function(e) {
	dispatchMouseEvent(e, 'mouseover', true, true);
	dispatchMouseEvent(e, 'mousedown', true, true);
	dispatchMouseEvent(e, 'click', true, true);
	dispatchMouseEvent(e, 'mouseup', true, true);
}
setInterval(function(){
	try{
		var el = document.querySelector('#content-iframe').contentWindow.document
		.querySelector('#ScormContent').contentWindow.document
		.querySelector('#sec > footer > div.div2 > nav > div.right-button-bar > div:nth-child(1) > button');
		if(el) {
			window.roflanClick(el);
			el = document.querySelector('body > div.container.content-play > div.scorm-navigation.clearfix > div.right-arrow-container.f-right > a');
			if(el) window.roflanClick(el);
		}
	} catch(e){}
}, 1000);