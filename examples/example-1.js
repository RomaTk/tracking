/*
	This is example how to create array with nested array to get how many objects in it
	1) totalObjects - the number of objects as properties
	2) uniqueObjects - the number of unique objects 

	!!!Arrays are not canculating here

	There are necessary strict build:
	1) do not add array which is filled. Firstly add array where you need/want and then fill
*/


import {TrackingProxy, defineObjectType, CommonCommands} from "../index.js";

let totalObjects = 0;
let uniqueObjects = 0;
let newUniqueObjects = 0;

let toDoOnce = function (target, prop, oldValue, newValue) {
	const resultObject = {
		times: 0
	};
	const commandToCalc = new CommonCommands.HowManyTimesIn(newObjectTop, resultObject);
	newValue.runFunction = commandToCalc;
	if (resultObject.times === newUniqueObjects) {
		uniqueObjects += 1;
	}
	newUniqueObjects = 0;
}

let newObjectTop = new TrackingProxy([], function (target, properties, oldValue, newValue, commandObject) {
	if (Array.isArray(target) && properties[0] !== 'length' && !(Array.isArray(newValue))) {
		totalObjects += 1;
	}
	if (!Array.isArray(newValue)) {
		const valueType = defineObjectType(newValue);
		if (valueType === 'D') {
			newUniqueObjects += 1;
			commandObject.addDoOnce(toDoOnce);
		}
	}
});



let newObject = new TrackingProxy([]);
newObjectTop.push(newObject);
newObjectTop.push(newObject);
newObjectTop.push(newObject);
const newObject1 = new TrackingProxy({});
newObject.push(newObject1);
console.log({totalObjects, uniqueObjects});
newObject.push(newObject1);
console.log({totalObjects, uniqueObjects});
newObject.push(newObject1);
console.log({totalObjects, uniqueObjects});
newObject.push(new TrackingProxy(new Number(1)));
console.log({totalObjects, uniqueObjects});