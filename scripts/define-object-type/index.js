/**
 * 
 * Function returns 'A' or 'B' or 'C' or 'D' according to parameter
 * 
 * 
 * 1) A - number
 * 2) B - string
 * 3) C - any object if it is not any other option
 * 4) D - object created by this library
 * 
 * @param {*} object The type of this object should be defined
 * @return {'A' | 'B' | 'C' | 'D'} String showing defined type
 */

export default (object) => {
	let name = typeof object;

	//TODO implement type D
	if (name === 'number') {
		return 'A';
	} else if (name === 'string') {
		return 'B';
	} else {
		return 'C';
	}
};