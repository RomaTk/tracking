import defineObjectType from '../define-object-type/index.js';

export default class TrackInfoObject {
	/**
	 * 
	 * @param {*} object 
	 * @param func {function | undefined}
	 * 
	 */
	constructor(object = undefined, func = undefined) {
		this.object = object;
		this.callFunction = func;
	}

	/**
	 *
	 * @param {*} object
	 * 
	 */
	set object(object) {
		if (object === undefined) {
			//TODO throw error id = 2
		} else {
			this._object = object;
			this._objectType = defineObjectType(object);
		}
		
	}

	/**
	 *
	 * @param func {function | undefined}
	 * 
	 */
	set callFunction(func) {
		if (func === undefined || typeof func === 'function') {
			this._callFunction = func;
		} else {
			//TODO throw error id = 3
		}
	}
}