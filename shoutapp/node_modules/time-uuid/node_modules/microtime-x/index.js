'use strict';

module.exports = (function () {
	var name, round, base, dateNow, nodeMicrotime;

	if ((typeof performance !== 'undefined') && performance) {
		if (typeof performance.now === 'function') name = 'now';
		else if (typeof performance.mozNow === 'function') name = 'mozNow';
		else if (typeof performance.msNow === 'function') name = 'msNow';
		else if (typeof performance.oNow === 'function') name = 'oNow';
		else if (typeof performance.webkitNow === 'function') name = 'webkitNow';

		if (name) {
			round = Math.round;
			if (performance.timing &&
					(typeof performance.timing.navigationStart === 'number')) {
				base = performance.timing.navigationStart;
			} else {
				base = Date.now();
			}
			return function () { return round((base + performance[name]()) * 1000); };
		}
	}

	if ((typeof process === 'object') && process) {
		try { nodeMicrotime = (require)('microtime'); } catch (ignore) {} //jslint: ignore
		if (nodeMicrotime) return nodeMicrotime.now;
	}

	dateNow = Date.now;
	return function () { return dateNow() * 1000; };
}());
