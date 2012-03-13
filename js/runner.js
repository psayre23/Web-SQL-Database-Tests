/*!
 * A quick library for testing Web SQL DB API
 */


// Return element by selector
function $(selector, parent) {
	return (parent || document).querySelector(selector);
}


// Return array of elements by selector
function $$(selector, parent) {
	return (parent || document).querySelectorAll(selector);
}



// Simple template system
function tmpl(str, data) {
	for(var key in data) {
		if(!data.hasOwnProperty(key)) continue;
		str = str.split('{'+key+'}').join(data[key]);
	}
	return str;
}


function buildHTML(html) {
	var elem = document.createElement('div');
	elem.innerHTML = html;
	return Array.prototype.slice.call(elem.children);
}


function appendHTML(elem, html) {
	var elems = buildHTML(html);
	for(var i = 0; i < elems.length; i++) {
		elem.appendChild(elems[i]);
	}
}


function prependHTML(elem, html) {
	var elems = buildHTML(html);
	var i = elems.length;
	while(i--) {
		elem.insertBefore(elems[i], elem.firstChild);
	}
}



// Log an item to the log table
var tmplLog;
function log(str) {
	if(!tmplLog) {
		tmplLog = $('#tmpl-log-item').innerHTML;
	}
	appendHTML($('#log'), tmpl(tmplLog, {str: str}));
}



function Timer(title, autoStart) {
	var start,
		pub,
		laps = [];

	pub = {
		start: function () {
			log('timer start: '+title);
			start = +(new Date);
		},
		stop: function () {
			pub.lap('stop');
			log('timer stop: '+title);
		},
		lap: function (label) {
			laps.push({
				label: label,
				time: +(new Date)
			});
		},
		display: function () {
			var res = [];
			for(var i = 0; i < laps.length; i++) {
				res[i] = ((laps[i].time - start) / 1000).toFixed(3)+' - '+laps[i].label;
			}
			log(res.join('<br/>'));
		}
	};

	if(autoStart !== false) {
		pub.start();
	}

	return pub;
}