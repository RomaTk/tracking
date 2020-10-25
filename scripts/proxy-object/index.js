import LabelClass from '../label-class.js';
import defineObjectType from "../define-object-type/index.js";
import ProxyHandler, {nameOfproperty as nameOfHandlerProperty} from "./handler/index.js";
import ErrorListener from "../error-listener/index.js";

/**
 * This class is used to create new Proxy object
 */
export default class TrackingProxy extends LabelClass {
	/**
	 * @param {object} target Object which should be proxied
	 */
	constructor(target = undefined, func = undefined) {
		super();
		if (target === undefined) {
			ErrorListener.throwError(0);
		}

		let typeOfObject = defineObjectType(target);
		if (typeOfObject !== 'C') {
			ErrorListener.throwError(0);
		}

		const proxyHandler = new ProxyHandler(target, func);
		Object.defineProperty(target, nameOfHandlerProperty, {
			value: proxyHandler,
			configurable: false,
			enumerable: false,
			writable: false
		});
		this.proxyObject = new Proxy(target, proxyHandler);
		proxyHandler.info.proxy = this.proxyObject;

		return this.proxyObject;
	}
}