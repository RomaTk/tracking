import LabelClass from '../label-class.js';
import ProxyHandler, {nameOfproperty as nameOfHandlerProperty} from "../proxy-object/handler/index.js";

/**
 * 
 * Function returns 'A' or 'B' or 'C' or 'D' or 'E' according to parameter
 * 
 * 
 * 1) A - number
 * 2) B - string
 * 3) C - object with type not A, B, D, E
 * 4) D - object created by this library
 * 5) E - symbol
 * 
 * @param {*} object The type of this object should be defined
 * @return {'A' | 'B' | 'C' | 'D' | 'E'} String showing defined type
 */

export default (object) => {
	let name = typeof object;

	if (name === 'number') {
		return 'A';
	} else if (name === 'string') {
		return 'B';
	} else if (name === 'symbol') {
		return 'E';
	} else {
		if (object instanceof LabelClass) {
			return 'D'
		} else if (object[nameOfHandlerProperty] instanceof ProxyHandler) {
			return 'D'
		} else {
			return 'C';
		}
	}
};