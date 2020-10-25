import TrackingProxy from "./scripts/proxy-object/index.js";

let totalObjects = 0;
let newObjectTop = new TrackingProxy([], function (target, properties, oldValue, newValue) {
	if (Array.isArray(target) && properties[0] !== 'length' && !(Array.isArray(newValue))) {
		totalObjects += 1;
	}
	if (Array.isArray(oldValue)) {
		totalObjects -= oldValue.length;
	}
	if (Array.isArray(newValue)) {
		totalObjects += newValue.length;
	}
});


let newObject = new TrackingProxy([]);
newObjectTop.push(newObject);
newObjectTop.push(newObject);
newObject.push(1);
newObject.push(2);

console.log(totalObjects);