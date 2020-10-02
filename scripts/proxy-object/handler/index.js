import LabelClass from '../../label-class.js';
import TrackInfoObject from '../../track-info-object/index.js';
import defineObjectType from "../../define-object-type/index.js";
import ErrorListener from "../../error-listener/index.js";

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
	 * @param {string} prop the property of object
	 * @param {*} value the new value
	 */
	set(target = undefined, prop = undefined, value = undefined) {
		
		// check admissible types
		if (target === undefined || defineObjectType(target) !== 'C') {
			ErrorListener.throwError(0);
		} else if (prop === undefined || (defineObjectType(prop) !== 'A' && defineObjectType(prop) !== 'B')) {
			ErrorListener.throwError(0);
		}
		return Reflect.set(target, prop, value);
	}
};