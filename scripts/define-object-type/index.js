/**
 * 
 * Function returns 'A' or 'B' or 'C' or 'D' 
 * If it changed it won't say that is was changed (type A)
 * if it changed it will say that it was changed (type B)
 * if its property was changed it will say that it was changed (type C)
 * if it is object created by this library (type D)
 * 
 * @param object {*} The type of this object should be defined 
 * 
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