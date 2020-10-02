import errorsDictionary from './errors-dictionary.js';
import defineObjectType from '../define-object-type/index.js';

/**
 * Object which should show errors in this module
 */
class ErrorListener{
	/** */
	constructor() {
		this.errorsDictionary = errorsDictionary;
	}

	/**
	 * 
	 * @param {string | number} id the id of error
	 */
	throwError(id = undefined) {

		if (id === undefined || (defineObjectType(id) !== 'A' && defineObjectType(id) !== 'B')) {
			if (id !== 0) {
				this.throwError(0);	
			} else {
				throw 'RECURSION: CREATE ERROR WITH ID 0';
			}
		}

		const explanationText = this.errorsDictionary[id];
		if (!explanationText) {
			if (id !== 1) {
				this.throwError(1);		
			} else {
				throw 'RECURSION: CREATE ERROR WITH ID 1';
			}
		}

		throw 'Error ' + id + ': ' + explanationText;
	}

}

export default new ErrorListener();