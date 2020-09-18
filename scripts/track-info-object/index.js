import defineObjectType from '../define-object-type/index.js';
import LabelClass from '../label-class.js';


/**
 * This object saves info about some object
 */
export default class TrackInfoObject extends LabelClass {
	/**
	 * 
	 * @param {*} object object about which should be info saved
	 * @param {function | undefined} func  function which should be called when this object changed
	 * 
	 */
	constructor(object = undefined, func = undefined) {
		super();
		this.object = object;
		this.callFunction = func;
	}



	/**
	 *
	 * @param {*} object object about which should be info saved
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
	 * @return {*} object about which was info saved
	 */
	get object() {
		return this._object;
	}



	/**
	 *
	 * @param {function | undefined} func function which should be called when this object changed
	 * 
	 */
	set callFunction(func) {
		if (func === undefined || typeof func === 'function') {
			this._callFunction = func;
		} else {
			//TODO throw error id = 3
		}
	}

	/**
	 * 
	 * @return {function | undefined} function which calls when this object changes
	 * 
	 */
	get callFunction() {
		return this._callFunction;
	}

	/**
	 * 
	 * @param {defineObjectType()} objectType type of object about which info was saved
	 * 
	 */
	set objectType(objectType) {
		//TODO throw error with id = 4
	}
	/**
	 *
	 * @return {defineObjectType()} type of object about which info was saved
	 *
	 */
	get objectType() {
		return this._objectType;
	}
}