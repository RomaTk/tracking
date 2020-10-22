import LabelClass from '../../label-class.js';
import TrackInfoObject from '../../track-info-object/index.js';
import defineObjectType from "../../define-object-type/index.js";
import ErrorListener from "../../error-listener/index.js";
import Command from "../../command-object/index.js";

/**
 * This is a handler for Proxy object
 */
export default class ProxyHandler extends LabelClass {
	/**
	 * 
	 * @param {*} target element which should be proxied
	 * @param {function | undefined} func function which will eval 
	 */
	constructor(target, func = undefined) {
		super();
		this.info = new TrackInfoObject(target, func);
	}

	/**
	 * 
	 * @param {*} target the object which was changed
	 * @param {string|number} prop the property of object (or name of command (if value instance of Command)
	 * @param {*} value the new value or Command object
	 * 
	 * if (value instanceof Command){ // Command - object by this library
	 * 	prop - is the type of command
	 * }
	 */
	set(target = undefined, prop = undefined, value = undefined) {

		// check admissible types
		if (target === undefined || defineObjectType(target) !== 'C') {
			ErrorListener.throwError(0);
		} else if (prop === undefined || (defineObjectType(prop) !== 'A' && defineObjectType(prop) !== 'B')) {
			ErrorListener.throwError(0);
		}

		if (value instanceof Command) {
			return value.execute(this, target, prop, value);
		} else {
			return Reflect.set(target, prop, value);
		}
	}

	/**
	 * 
	 * @param {*} target the object which value was taken
	 * @param {string|number} prop the property of object
	 * @param {*} value the new value
	 */
	get(target = undefined, prop = undefined, value = undefined) {

		// check admissible types
		if (target === undefined || defineObjectType(target) !== 'C') {
			ErrorListener.throwError(0);
		} else if (prop === undefined || (defineObjectType(prop) !== 'A' && defineObjectType(prop) !== 'B')) {
			ErrorListener.throwError(0);
		}
		return Reflect.get(target, prop, value);
	}
};