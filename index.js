import TrackingProxy from "./scripts/proxy-object/index.js";

/*
	Example:
	let newObject = new TrackingProxy([], function (target, properties, oldValue, newValue) {
		console.log({target, properties, oldValue, newValue});
	});
	newObject.push(1);
*/