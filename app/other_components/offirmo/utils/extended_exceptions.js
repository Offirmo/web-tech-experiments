/* New Errors to be thrown,
 * to complement the rather limited js set.
 * Note : we keep the "error" naming scheme of javascript
 *
 * new hierarchy :
 * Error
 *  ExtendedError
 *   LogicError
 *    InvalidArgument
 *    LengthError
 *    OutOfRange
 *   RuntimeError
 *    NotImplementedError
 *    UnknownEnumValueError
 *    IllegalStateError
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define(
[
	'underscore' // XXX I must fake a dependency or it doesn't work !!!
],
function() {
	"use strict";

	// Note : extending js errors is not trivial at all !
	// http://stackoverflow.com/questions/17530782/extending-javascript-error
	// http://stackoverflow.com/questions/8802845/inheriting-from-the-error-object-where-is-the-message-property
	// http://stackoverflow.com/questions/783818/how-do-i-create-a-custom-error-in-javascript
	// http://stackoverflow.com/a/8804539/587407

	var error_instance = Error; // to clearly remind us that Error always return a new object
	// cf. http://www.ecma-international.org/ecma-262/5.1/#sec-15.11.1

	// the object we'll return
	var extended_exceptions = {};


	// a base, for other exceptions to derive
	// contrary to Error, this error will be correctly derivable
	function ExtendedError(message) {
		// Note : This is ONE way to derive from error.
		// I find it convenient but I don't pretend it's the best
		//console.log("ExtendedError constructor...");

		if(typeof message === 'undefined')
			message = ""; //<default message>";

		// we must create an error to have an up-to-date stacktrace
		var err = new Error(message);

		// import everything neded into 'this' object
		// so it has the same prototype as an Error object
		// we must copy manually due to Error specificity
		this.message = message; // assign directly from param. If we assign from err.message, FF sometimes fails to copy for unknown reasons
		this.stack = err.stack;

		// fix stuff
		this.name = "ExtendedError";

		//console.log("ExtendedError constructor done, message = " + this.message);
	}
	ExtendedError.prototype = Object.create(error_instance.prototype); // no, we can't directly access Error.prototype
	ExtendedError.prototype.constructor = ExtendedError;


	// now that we have a base error which is derivable
	// wrap classical inheritance in this utility func to avoid code duplication
	function create_custom_error(name, ParentErrorClass) {
		if (typeof ParentErrorClass === 'undefined') ParentErrorClass = ExtendedError;

		function CustomExtendedErrorClass() {
			//console.log("CustomExtendedErrorClass[" + name + "] constructor with args... ");
			//console.log(arguments);
			// Call the parent constructor
			ParentErrorClass.prototype.constructor.apply(this, arguments);
			this.name = name;
			//console.log("CustomExtendedErrorClass[" + name + "].message = " + this.message);
		}
		CustomExtendedErrorClass.prototype = Object.create(ParentErrorClass.prototype);
		CustomExtendedErrorClass.prototype.constructor = CustomExtendedErrorClass;

		return CustomExtendedErrorClass;
	}


	// so we can create other custom errors outside of this module
	extended_exceptions.ExtendedError = ExtendedError;
	extended_exceptions.create_custom_error = create_custom_error;

	// a first batch inspired by C++

	// LogicError : represent problems in the internal logic of a program;
	// in theory, these are preventable, and even detectable before the program runs
	// (e.g., violations of class invariants).
	extended_exceptions.LogicError = create_custom_error("LogicError");

	// invalid_argument thr. to report invalid arguments to functions.
	extended_exceptions.InvalidArgument = create_custom_error("InvalidArgument", extended_exceptions.LogicError);

	// length_error thr. when an object is constructed
	// that would exceed its maximum permitted size
	// (e.g., a basic_string instance).
	extended_exceptions.LengthError = create_custom_error("LengthError", extended_exceptions.LogicError);

	// out_of_range indicate an argument whose value
	// is not within the expected range
	// (e.g., boundary checks in basic_string).
	extended_exceptions.OutOfRange = create_custom_error("OutOfRange", extended_exceptions.LogicError);

	// runtime_error represent problems outside the scope
	// of a program; they cannot be easily predicted
	// and can generally only be caught as the program executes.
	extended_exceptions.RuntimeError = create_custom_error("RuntimeError");


	// a second batch with other commonly needed errors
	// when we encounter code not implemented
	extended_exceptions.NotImplementedError = create_custom_error("NotImplementedError", extended_exceptions.RuntimeError);
	// when we switch case on an enumerated var and don't recognize a value (usually a newly added one)
	extended_exceptions.UnknownEnumValueError = create_custom_error("UnknownEnumValueError", extended_exceptions.RuntimeError);
	// Signals that a method has been invoked at an illegal or inappropriate time.
	// In other words, the application is not in an appropriate state for the
	// requested operation.
	extended_exceptions.IllegalStateError = create_custom_error("IllegalStateError", extended_exceptions.RuntimeError);


	return extended_exceptions;
}); // requirejs module
