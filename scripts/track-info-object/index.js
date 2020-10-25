import defineObjectType from '../define-object-type/index.js';
import LabelClass from '../label-class.js';
import ErrorListener from "../error-listener/index.js";
import ProxyHandler, {nameOfproperty as nameOfHandlerProperty} from "../proxy-object/handler/index.js";
import TrackingProxy from "../proxy-object/index.js";

/**
 * This object saves info for ProxyHandler
 */
export default class TrackInfoObject extends LabelClass {
	/**
	 * @param {*} object object about which should be info saved
	 * @param {function=} func  function which should be called when this object changed
	 * @param {Object.<string, (TrackingProxy)[]>=} parents TrackingProxy objects which have this object as property
	 */
	constructor(object = undefined, func = undefined, parents = {}) {
		super();
		this.object = object;
		this.callFunction = func;
		this.parents = parents;
	}


	/**
	 * Set TrackingProxy object to info
	 * @param {TrackingProxy} object TrackingProxy object
	 */
	set proxy(object = undefined) {
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

	/**
	 * Return TrackingProxy from info
	 * @returns {TrackingProxy | undefined} TrackingProxy object
	 */
	get proxy() {
		return this._proxy;
	}

	/**
	 * Check is object TrackingProxy
	 * @param {object} object
	 * @returns {boolean} true / false
	 */
	isTrackingProxy(object = undefined) {
		if (object !== undefined && object instanceof Object) {
			if (object[nameOfHandlerProperty] && object[nameOfHandlerProperty] instanceof ProxyHandler) {
				return true;
			} else {
				return false;
			}
		} else {
			ErrorListener.throwError(0);
		}
	}

	/**
	 * Set object which is tracked
	 * @param {object} object tracked object
	 */
	set object(object = undefined) {
		if (object === undefined) {
			ErrorListener.throwError(0);
		} else {
			const definedType = defineObjectType(object);
			if (definedType === 'C' || definedType === 'D') {
				this._object = object;
				this._objectType = defineObjectType(object);
			} else {
				ErrorListener.throwError(0);
			}
		}
	}

	/**
	 * Return object which is tracked
	 * @returns {object} tracked object
	 */
	get object() {
		return this._object;
	}



	/**
	 * Set function which should be called when this object changed
	 * @param {function=} func function which should be called when this object changed
	 */
	set callFunction(func = undefined) {
		if (func === undefined || typeof func === 'function') {
			this._callFunction = func;
		} else {
			ErrorListener.throwError(0);
		}
	}

	/**
	 * Return function which should be changed
	 * @returns {function | undefined} function which calls when this object changes
	 */
	get callFunction() {
		return this._callFunction;
	}

	/**
	 * Set the type of object
	 * @param {'C' | 'D'} type of object about which info was saved
	 */
	set objectType(type = undefined) {
		if (type === 'C' || type === 'D') {
			this._objectType = type;
		} else {
			ErrorListener.throwError(0);
		}
	}
	/**
	 * Retun the type of object
	 * @returns {'C' | 'D' } type of object about which info was saved
	 */
	get objectType() {
		return this._objectType;
	}

	/**
	 * Sets the parent of object
	 * @param {{Object.<string, (TrackingProxy)[]>=}} object
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
					ErrorListener.throwError(0);
				}
			}
			if (!this._parents) {
				this._parents = {};
			}
		}
	}

	/**
	 * Sets the parent of object
	 * @returns {{Object.<string, (TrackingProxy)[]>=}} object
	 */
	get parents() {
		return this._parents;
	}

	/**
	 * Add parent with current property with throwingError if it exists
	 * @param {TrackInfoObject} object
	 * @param {string|number|symbol} prop
	 */
	addParent(object = undefined, prop = undefined) {
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
			ErrorListener.throwError(0);
		}
	}

	/**
	 * Add parent with current property
	 * @param {TrackInfoObject} object
	 * @param {string|number|symbol} prop
	 */
	addParentIfNecessary(object = undefined, prop = undefined) {
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
			ErrorListener.throwError(0);
		}
	}
}