import LabelClass from '../label-class.js';
import defineObjectType from "../define-object-type/index.js";
import ProxyHandler from "./handler/index.js";
import ErrorListener from "../error-listener/index.js";

/**
 * This class is used to create new Proxy object
 */
export default class TrackingProxy extends LabelClass{
	/**
	 * 
	 * @param {*} target Object which should be proxied
	 */
	constructor(target = undefined) {
		super();
		if (target === undefined) {
			ErrorListener.throwError(0);
		}

		let typeOfObject = defineObjectType(target);
		if (typeOfObject !== 'C') {
			ErrorListener.throwError(0);
		}

		this.proxyObject = new Proxy(target, new ProxyHandler(target, undefined));  
		
		return this.proxyObject; 
	}
}