import LabelClass from '../label-class.js';
import defineObjectType from "../define-object-type/index.js";
import ProxyHandler from "./handler/index.js";

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
			//TODO throw error with id = 7
			console.log('Error: 7');
			return;
		}

		let typeOfObject = defineObjectType(target);
		if (typeOfObject !== 'C') {
			//TODO throw error with id = 8
			console.log('Error: 8');
			return;
		}

		this.proxyObject = new Proxy(target, new ProxyHandler(target, undefined));  
		
		return this.proxyObject; 
	}
}