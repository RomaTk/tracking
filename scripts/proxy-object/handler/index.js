import LabelClass from '../../label-class.js';
import TrackInfoObject from '../../track-info-object/index.js';
import defineObjectType from "../../define-object-type/index.js";
import ErrorListener from "../../error-listener/index.js";
import Command from "../../command-object/index.js";

/**
 * @constant nameOfproperty the property with wich ProxyHandler saved in TrackingProxy
 * @type {string}
 */
export const nameOfproperty = 'proxyHandler';

/**
 * This is a handler for Proxy object
 */
export default class ProxyHandler extends LabelClass {
	/**
	 * @param {*} target element which should be proxied
	 * @param {function | undefined} func function which will eval 
	 */
	constructor(target, func = undefined) {
		super();
		this._info = new TrackInfoObject(target, func);
	}

	/**
	 * @returns {TrackInfoObject}
	 */
	get info() {
		return this._info;
	}

	/**
	 * setter
	 * @param {*} target the object which was changed
	 * @param {string|number|symbol} prop the property of object (or name of command (if value instance of Command)
	 * @param {*} value the new value or Command object
	 * 
	 * if (value instanceof Command){ // Command - object by this library
	 * 	prop - is the type of command
	 * }
	 */
	set(target = undefined, prop = undefined, value = undefined) {

		// check admissible types
		if (target === undefined || (defineObjectType(target) !== 'C' && defineObjectType(target) !== 'D')) {
			ErrorListener.throwError(0);
		} else if (prop === undefined || (defineObjectType(prop) !== 'A' && defineObjectType(prop) !== 'B')) {
			ErrorListener.throwError(0);
		}

		if (value instanceof Command) {
			return value.execute(this, target, prop, value);
		} else {
			const oldValue = Reflect.get(target, prop);
			const resultOfReflect = Reflect.set(target, prop, value);
			const newValue = Reflect.get(target, prop);
			if (resultOfReflect) {
				if (value instanceof Object) {
					if (this.info.isTrackingProxy(value)) {
						value[nameOfproperty].info.addParentIfNecessary(this.info.proxy, prop);
					}
				}

				const argsToCommand = {
					props: [prop],
					oldValue: oldValue,
					newValue: newValue
				};
				const firstTartget = target;
				const sayParentsCommand = new Command(function (target, prop, value) {
					const commandArguments = value.args[0];
					let continueInform = true;
					if (this.info.callFunction) {
						this.info.callFunction(target, commandArguments.props, commandArguments.oldValue, commandArguments.newValue);
						if (Reflect.get(firstTartget, commandArguments.props[0]) != newValue) {
							continueInform = false;
						}
					}
					if (continueInform) {
						for (const parentProperty in this.info.parents) {
							for (const parent of this.info.parents[parentProperty]) {
								argsToCommand.props.push(parentProperty);
								parent.runFunction = sayParentsCommand;
								argsToCommand.props.pop(parentProperty);
							}
						}
					}
				}, argsToCommand);
				if (newValue !== oldValue) {
					this.info.proxy.runFunction = sayParentsCommand;
				}
				return true;
			} else {
				return false;
			}
		}
	}

	/**
	 * getter
	 * @param {*} target the object which value was taken
	 * @param {string|number|symbol} prop the property of object
	 * @param {*} reciever the reciever
	 */
	get(target = undefined, prop = undefined, reciever = undefined) {

		// check admissible types
		if (target === undefined || (defineObjectType(target) !== 'C' && defineObjectType(target) !== 'D')) {
			ErrorListener.throwError(0);
		} else if (prop === undefined || (defineObjectType(prop) !== 'A' && defineObjectType(prop) !== 'B')) {
			ErrorListener.throwError(0);
		}
		return Reflect.get(target, prop, reciever);
	}
};