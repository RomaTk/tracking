import LabelClass from '../label-class.js';
import ErrorListener from "../error-listener/index.js";

/**
 * Used to execute the command in this library
 */
export default class Command extends LabelClass {
	/**
	 * 
	 * @param {function|undefined} func - function to eval
	 * @param  {...any} args - arguments for function
	 */
	constructor(func = undefined, ...args) {
		super(func, ...args);
		if (!((func instanceof Function) || (func === undefined))) {
			ErrorListener.throwError(0);
		}
		this.func = func;
		this.args = args;
	}

	/**
	 * 
	 * @param {Proxy} object 
	 * @param {*} target 
	 * @param {string|number} prop 
	 * @param {*} value 
	 */
	execute(object, target, prop, value) {
		if (prop === 'runFunction') {
			const runFunction = this.func.bind(object);
			runFunction(target, prop, value, ...this.args);
		} else {
			return false;
		}
		return true;
	}
}