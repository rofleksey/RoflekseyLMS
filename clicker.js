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
setTimeout(function(){
	var pudge = setInterval(function(){
		try{
			var el = document.querySelector('#content-iframe').contentWindow.document
			.querySelector('#ScormContent').contentWindow.document
			.querySelector('#sec > footer > div.div2 > nav > div.right-button-bar > div:nth-child(1) > button');
			if(el) {
				window.roflanClick(el);
				clearInterval(pudge);
			}
		} catch(e){}
	}, 1000);
}, 4000);