import LabelClass from '../label-class.js';
import ErrorListener from "../error-listener/index.js";
import TrackingProxy from "../proxy-object/index.js";
import ProxyHandler, {nameOfproperty as nameOfHandlerProperty} from "../proxy-object/handler/index.js";
import defineObjectType from "../define-object-type/index.js";

/**
 * Used to run a command in this TrackingProxy object
 */
export default class Command extends LabelClass {
	/**
	 * Create the command with function to run in TrackingProxy object
	 * @param {function=} func
	 * @param  {...any=} args
	 */
	constructor(func = undefined, ...args) {
		super(func, ...args);
		if (!((func instanceof Function) || (func === undefined))) {
			ErrorListener.throwError(0);
		}
		this.func = func;
		this.args = args;
		this._doOnceFunctions = [];
	}

	/**
	 * Choose what to do with TrackingProxy object
	 * @param {TrackingProxy} object
	 * @param {object} target
	 * @param {string|number|symbol} prop 
	 * @param {Command} value
	 */
	execute(object = undefined, target = undefined, prop = undefined, value) {
		if (object !== undefined && target !== undefined && prop !== undefined
			&& target instanceof Object && value instanceof Command) {
			if (target[nameOfHandlerProperty] && target[nameOfHandlerProperty] instanceof ProxyHandler) {
				const propertyType = defineObjectType(prop);
				if (propertyType === 'A' || propertyType === 'B' || propertyType === 'E') {
					if (prop === 'runFunction') {
						const runFunction = this.func.bind(object);
						runFunction(object.info.proxy, prop, value, ...this.args);
					} else {
						return false;
					}
					return true;
				} else {
					ErrorListener.throwError(0);
				}
			} else {
				ErrorListener.throwError(4);
			}
		} else {
			ErrorListener.throwError(0);
		}
	}

	/**
	 * Set function which to do once after command done (if value was not changed)
	 * @param {function} func 
	 */
	addDoOnce(func = undefined) {
		if (func && (typeof func === 'function')) {
			if (!this._doOnceFunctions.includes(func)) {
				this._doOnceFunctions.push(func);
			}
		} else {
			ErrorListener.throwError(0);
		}
	}

	/**
	 * Return the array of functions to run once after command done (if value was not changed)
	 * @returns {function[]}
	 */
	get doOnceFunctions() {
		return this._doOnceFunctions;
	}
}