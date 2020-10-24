import defineObjectType from '../define-object-type/index.js';
import LabelClass from '../label-class.js';
import ErrorListener from "../error-listener/index.js";
import ProxyHandler, {nameOfproperty as nameOfHandlerProperty} from "../proxy-object/handler/index.js";

/**
 * This object saves info about some object
 */
export default class TrackInfoObject extends LabelClass {
	/**
	 * 
	 * @param {*} object object about which should be info saved
	 * @param {function | undefined} func  function which should be called when this object changed
	 * @param {object} parents object which have this object as property 
	 */
	constructor(object = undefined, func = undefined, parents = {}) {
		super();
		this.object = object;
		this.callFunction = func;
		this.parents = parents;
	}



	set proxy(object) {
		if (object instanceof Object) {
			if (this.isTrackingProxy(object)) {
				this._proxy = object;
			} else {
				ErrorListener.throwError(4);
			}
		} else {
			ErrorListener.throwError(0);
		}
	}

	get proxy() {
		return this._proxy;
	}

	isTrackingProxy(object) {
		if (object[nameOfHandlerProperty] && object[nameOfHandlerProperty] instanceof ProxyHandler) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 *
	 * @param {*} object object about which should be info saved
	 * 
	 */
	set object(object) {
		if (object === undefined) {
			ErrorListener.throwError(0);
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
			ErrorListener.throwError(0);
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
		ErrorListener.throwError(0);
	}
	/**
	 *
	 * @return {defineObjectType()} type of object about which info was saved
	 *
	 */
	get objectType() {
		return this._objectType;
	}

	/**
	 * @param {Array} object array of parents TrackingProxy
	 */
	set parents(object) {
		if (!(object instanceof Object)) {
			ErrorListener.throwError(0);
		} else {
			for (const parentProp in object) {
				const arrayOfParents = parobjectent[parentProp];
				if (Array.isArray(arrayOfParents)) {
					for (const parent of arrayOfParents) {
						this.addParent(parent, parentProp);
					}
				} else {
					//TODO throw error if it is not array
				}
			}
			if (!this._parents) {
				this._parents = {};
			}
		}
	}

	/**
	 * @return {Array} array of parents TrackingProxy
	 */
	get parents() {
		return this._parents;
	}

	/**
	 * 
	 * @param {TrackInfoObject} object
	 */
	addParent(object, prop) {
		if (this.isTrackingProxy(object) &&
			((defineObjectType(prop) === 'A') || defineObjectType(prop) === 'B' || defineObjectType(prop) === 'E')) {
			if (this.parents[prop]) {
				if (!this.parents.includes(object)) {
					this.parents.push(object);
				} else {
					ErrorListener.throwError(2);
				}
			} else {
				this.parents[prop] = [object];
			}
		} else {
			ErrorListener.throwError(3);
		}
	}

	/**
	 * 
	 * @param {TrackInfoObject} object
	 */
	addParentIfNecessary(object, prop) {
		if (this.isTrackingProxy(object) &&
			((defineObjectType(prop) === 'A') || defineObjectType(prop) === 'B' || defineObjectType(prop) === 'E')) {
			if (this.parents[prop]) {
				if (!this.parents.includes(object)) {
					this.parents.push(object);
				}
			} else {
				this.parents[prop] = [object];
			}
		} else {
			ErrorListener.throwError(3);
		}
	}
}