import Command from "../command-object/index.js";
import LabelClass from "../label-class.js";
import ErrorListener from "../error-listener/index.js";
import defineObjectType from "../define-object-type/index.js";
import TrackingProxy from "../proxy-object/index.js";
import ProxyHandler, {nameOfproperty as nameOfHandlerProperty} from "../proxy-object/handler/index.js";

/**
 * Creates the command which returns the number of object in some object
 */
export class HowManyTimesIn extends LabelClass {
	/**
	 * @param {TrackingProxy} target object in which look
	 * @param {{times: number}} objectSavingReturnValue object which is working as a result (times = number of object in some object)
	 * @returns {Command}
	 */
	constructor(target = undefined, objectSavingReturnValue = {times: 0}) {
		super();
		if (target === undefined) {
			ErrorListener.throwError(0);
		} else if (defineObjectType(target) === 'D') {
			if (!(target[nameOfHandlerProperty] && target[nameOfHandlerProperty] instanceof ProxyHandler)) {
				ErrorListener.throwError(4);
			}
		}
		if (objectSavingReturnValue === undefined) {
			ErrorListener.throwError(0);
		} else if (!(objectSavingReturnValue instanceof Object)) {
			ErrorListener.throwError(0);
		}
		const argsToCommand = objectSavingReturnValue;
		const checkTarget = target;
		argsToCommand.times = 0;
		const returnCommand = new Command(function (target, prop, value) {
			const commandArguments = value.args[0];
			if (checkTarget === this.info.proxy) {
				commandArguments.times += 1;
			}
			for (const parentProperty in this.info.parents) {
				for (const parent of this.info.parents[parentProperty]) {
					parent.runFunction = returnCommand;
				}
			}
		}, argsToCommand);
		return returnCommand;
	}
}